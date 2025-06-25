import api from './auth';

export const bookmarksApi = {
  // Get all bookmarks with pagination and filtering
  getBookmarks: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    return api.get(`/bookmarks?${queryParams}`).then(res => res.data);
  },

  // Create a new bookmark
  createBookmark: (bookmarkData) => {
    return api.post('/bookmarks', bookmarkData).then(res => res.data);
  },

  // Update a bookmark
  updateBookmark: (id, bookmarkData) => {
    return api.put(`/bookmarks/${id}`, bookmarkData).then(res => res.data);
  },

  // Delete a bookmark
  deleteBookmark: (id) => {
    return api.delete(`/bookmarks/${id}`).then(res => res.data);
  },

  // Get categories
  getCategories: () => {
    return api.get('/bookmarks/categories').then(res => res.data);
  },

  // Get bookmark statistics
  getStats: () => {
    return api.get('/bookmarks/stats').then(res => res.data);
  },
}; 