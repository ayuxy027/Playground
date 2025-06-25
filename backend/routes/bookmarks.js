const express = require('express');
const Joi = require('joi');
const Bookmark = require('../models/Bookmark');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation schemas
const bookmarkSchema = Joi.object({
  title: Joi.string().required().max(200).trim(),
  url: Joi.string().uri().required().trim(),
  category: Joi.string().max(50).trim().default('General'),
  description: Joi.string().max(500).trim().allow(''),
  tags: Joi.array().items(Joi.string().max(30).trim()).max(10),
  isPrivate: Joi.boolean().default(false)
});

const updateBookmarkSchema = Joi.object({
  title: Joi.string().max(200).trim(),
  url: Joi.string().uri().trim(),
  category: Joi.string().max(50).trim(),
  description: Joi.string().max(500).trim().allow(''),
  tags: Joi.array().items(Joi.string().max(30).trim()).max(10),
  isPrivate: Joi.boolean()
}).min(1);

// Apply authentication to all bookmark routes
router.use(authenticateToken);

// GET /api/bookmarks - Get all bookmarks for the authenticated user
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      search, 
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    // Build query
    const query = { userId: req.user._id };
    
    if (category && category !== 'all') {
      query.category = new RegExp(category, 'i');
    }
    
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') }
      ];
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [bookmarks, total] = await Promise.all([
      Bookmark.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Bookmark.countDocuments(query)
    ]);

    res.json({
      bookmarks,
      pagination: {
        current: pageNum,
        total: Math.ceil(total / limitNum),
        count: bookmarks.length,
        totalItems: total
      }
    });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve bookmarks',
      code: 'FETCH_ERROR'
    });
  }
});

// POST /api/bookmarks - Create a new bookmark
router.post('/', async (req, res) => {
  try {
    const { error, value } = bookmarkSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map(detail => detail.message),
        code: 'VALIDATION_ERROR'
      });
    }

    // Check for duplicate URL for this user
    const existingBookmark = await Bookmark.findOne({
      userId: req.user._id,
      url: value.url
    });

    if (existingBookmark) {
      return res.status(409).json({
        message: 'Bookmark with this URL already exists',
        code: 'DUPLICATE_URL'
      });
    }

    const bookmark = new Bookmark({
      ...value,
      userId: req.user._id
    });

    const savedBookmark = await bookmark.save();
    res.status(201).json(savedBookmark);
  } catch (error) {
    console.error('Create bookmark error:', error);
    res.status(500).json({ 
      message: 'Failed to create bookmark',
      code: 'CREATE_ERROR'
    });
  }
});

// PUT /api/bookmarks/:id - Update a bookmark
router.put('/:id', async (req, res) => {
  try {
    const { error, value } = updateBookmarkSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map(detail => detail.message),
        code: 'VALIDATION_ERROR'
      });
    }

    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!bookmark) {
      return res.status(404).json({
        message: 'Bookmark not found',
        code: 'NOT_FOUND'
      });
    }

    // Check for duplicate URL if URL is being updated
    if (value.url && value.url !== bookmark.url) {
      const existingBookmark = await Bookmark.findOne({
        userId: req.user._id,
        url: value.url,
        _id: { $ne: req.params.id }
      });

      if (existingBookmark) {
        return res.status(409).json({
          message: 'Bookmark with this URL already exists',
          code: 'DUPLICATE_URL'
        });
      }
    }

    Object.assign(bookmark, value);
    const updatedBookmark = await bookmark.save();
    
    res.json(updatedBookmark);
  } catch (error) {
    console.error('Update bookmark error:', error);
    res.status(500).json({ 
      message: 'Failed to update bookmark',
      code: 'UPDATE_ERROR'
    });
  }
});

// DELETE /api/bookmarks/:id - Delete a bookmark
router.delete('/:id', async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!bookmark) {
      return res.status(404).json({
        message: 'Bookmark not found',
        code: 'NOT_FOUND'
      });
    }

    res.json({ 
      message: 'Bookmark deleted successfully',
      deletedId: req.params.id
    });
  } catch (error) {
    console.error('Delete bookmark error:', error);
    res.status(500).json({ 
      message: 'Failed to delete bookmark',
      code: 'DELETE_ERROR'
    });
  }
});

// GET /api/bookmarks/categories - Get all categories for the user
router.get('/categories', async (req, res) => {
  try {
    const categories = await Bookmark.distinct('category', { userId: req.user._id });
    res.json({ categories: categories.filter(Boolean) });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve categories',
      code: 'CATEGORIES_ERROR'
    });
  }
});

// GET /api/bookmarks/stats - Get bookmark statistics
router.get('/stats', async (req, res) => {
  try {
    const [total, byCategory] = await Promise.all([
      Bookmark.countDocuments({ userId: req.user._id }),
      Bookmark.aggregate([
        { $match: { userId: req.user._id } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    ]);

    res.json({
      total,
      byCategory: byCategory.map(item => ({
        category: item._id || 'Uncategorized',
        count: item.count
      }))
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve statistics',
      code: 'STATS_ERROR'
    });
  }
});

module.exports = router; 