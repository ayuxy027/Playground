import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import { bookmarksApi } from '../api/bookmarks';
import BookmarkCard from '../components/BookmarkCard';
import BookmarkForm from '../components/BookmarkForm';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import toast from 'react-hot-toast';

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    count: 0,
    totalItems: 0,
  });

  useEffect(() => {
    loadBookmarks();
    loadCategories();
  }, [searchQuery, selectedCategory]);

  const loadBookmarks = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 20,
        search: searchQuery || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      };

      const data = await bookmarksApi.getBookmarks(params);
      setBookmarks(data.bookmarks);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Load bookmarks error:', error);
      toast.error('Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await bookmarksApi.getCategories();
      setCategories(data.categories);
    } catch (error) {
      console.error('Load categories error:', error);
    }
  };

  const handleCreateBookmark = async (bookmarkData) => {
    try {
      const newBookmark = await bookmarksApi.createBookmark(bookmarkData);
      setBookmarks(prev => [newBookmark, ...prev]);
      setShowForm(false);
      toast.success('Bookmark created successfully!');
      loadCategories(); // Refresh categories
    } catch (error) {
      console.error('Create bookmark error:', error);
      const message = error.response?.data?.message || 'Failed to create bookmark';
      toast.error(message);
    }
  };

  const handleUpdateBookmark = async (id, bookmarkData) => {
    try {
      const updatedBookmark = await bookmarksApi.updateBookmark(id, bookmarkData);
      setBookmarks(prev => 
        prev.map(bookmark => 
          bookmark._id === id ? updatedBookmark : bookmark
        )
      );
      setEditingBookmark(null);
      toast.success('Bookmark updated successfully!');
      loadCategories(); // Refresh categories
    } catch (error) {
      console.error('Update bookmark error:', error);
      const message = error.response?.data?.message || 'Failed to update bookmark';
      toast.error(message);
    }
  };

  const handleDeleteBookmark = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bookmark?')) {
      return;
    }

    try {
      await bookmarksApi.deleteBookmark(id);
      setBookmarks(prev => prev.filter(bookmark => bookmark._id !== id));
      toast.success('Bookmark deleted successfully!');
      loadCategories(); // Refresh categories
    } catch (error) {
      console.error('Delete bookmark error:', error);
      const message = error.response?.data?.message || 'Failed to delete bookmark';
      toast.error(message);
    }
  };

  const handlePageChange = (page) => {
    loadBookmarks(page);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-vintage-black tracking-tight">
            Your Bookmarks
          </h1>
          <p className="text-vintage-slate tracking-tight">
            {pagination.totalItems} bookmark{pagination.totalItems !== 1 ? 's' : ''} in your collection
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="btn-solid flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Bookmark</span>
        </button>
      </div>

      {/* Filters and Controls */}
      <div className="card p-4 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search bookmarks..."
            />
          </div>
          
          <div className="flex items-center gap-3">
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
            
            <div className="flex border border-vintage-platinum">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-vintage-black text-vintage-white'
                    : 'text-vintage-slate hover:bg-vintage-pearl'
                } transition-colors duration-200`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-vintage-black text-vintage-white'
                    : 'text-vintage-slate hover:bg-vintage-pearl'
                } transition-colors duration-200`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : bookmarks.length === 0 ? (
        <EmptyState
          title="No bookmarks found"
          description={
            searchQuery || selectedCategory !== 'all'
              ? "Try adjusting your search or filter criteria"
              : "Start building your collection by adding your first bookmark"
          }
          action={
            searchQuery || selectedCategory !== 'all' ? null : {
              label: "Add your first bookmark",
              onClick: () => setShowForm(true)
            }
          }
        />
      ) : (
        <>
          {/* Bookmarks Grid/List */}
          <div className={
            viewMode === 'grid'
              ? 'grid grid-auto-fit gap-6'
              : 'space-y-4'
          }>
            {bookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark}
                viewMode={viewMode}
                onEdit={() => setEditingBookmark(bookmark)}
                onDelete={() => handleDeleteBookmark(bookmark._id)}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.total > 1 && (
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                {Array.from({ length: pagination.total }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 text-sm border transition-colors duration-200 ${
                      page === pagination.current
                        ? 'bg-vintage-black text-vintage-white border-vintage-black'
                        : 'border-vintage-platinum text-vintage-slate hover:bg-vintage-pearl'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Bookmark Form Modal */}
      {(showForm || editingBookmark) && (
        <BookmarkForm
          bookmark={editingBookmark}
          onSubmit={editingBookmark ? 
            (data) => handleUpdateBookmark(editingBookmark._id, data) :
            handleCreateBookmark
          }
          onCancel={() => {
            setShowForm(false);
            setEditingBookmark(null);
          }}
        />
      )}
    </div>
  );
};

export default BookmarksPage; 