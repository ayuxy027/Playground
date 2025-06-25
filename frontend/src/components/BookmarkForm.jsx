import { useState, useEffect } from 'react';
import { X, Save, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';

const BookmarkForm = ({ bookmark, onSubmit, onCancel }) => {
  const isEditing = !!bookmark;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      title: '',
      url: '',
      category: '',
      description: '',
      tags: '',
      isPrivate: false,
    }
  });

  const watchedUrl = watch('url');

  useEffect(() => {
    if (isEditing && bookmark) {
      setValue('title', bookmark.title || '');
      setValue('url', bookmark.url || '');
      setValue('category', bookmark.category || '');
      setValue('description', bookmark.description || '');
      setValue('tags', bookmark.tags ? bookmark.tags.join(', ') : '');
      setValue('isPrivate', bookmark.isPrivate || false);
    }
  }, [bookmark, isEditing, setValue]);

  const onFormSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Process tags
      const tags = data.tags
        ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : [];

      const formData = {
        ...data,
        tags,
        category: data.category || 'General',
      };

      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlBlur = async () => {
    if (watchedUrl && !watch('title')) {
      try {
        // Try to fetch page title
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(watchedUrl)}`);
        const data = await response.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        const title = doc.querySelector('title')?.textContent;
        
        if (title) {
          setValue('title', title.trim());
        }
      } catch (error) {
        console.log('Could not fetch page title:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-vintage-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-vintage-white w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-vintage-pearl">
            <h2 className="text-xl font-semibold text-vintage-black tracking-tight">
              {isEditing ? 'Edit Bookmark' : 'Add New Bookmark'}
            </h2>
            <button
              type="button"
              onClick={onCancel}
              className="p-2 text-vintage-slate hover:text-vintage-black transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-6 space-y-4">
            {/* URL Field */}
            <div>
              <label className="block text-sm font-medium text-vintage-black tracking-tight mb-2">
                URL *
              </label>
              <div className="relative">
                <Globe size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vintage-slate" />
                <input
                  type="url"
                  {...register('url', {
                    required: 'URL is required',
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Please enter a valid URL starting with http:// or https://'
                    }
                  })}
                  onBlur={handleUrlBlur}
                  className="input pl-10"
                  placeholder="https://example.com"
                />
              </div>
              {errors.url && (
                <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
              )}
            </div>

            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-vintage-black tracking-tight mb-2">
                Title *
              </label>
              <input
                type="text"
                {...register('title', {
                  required: 'Title is required',
                  maxLength: {
                    value: 200,
                    message: 'Title cannot exceed 200 characters'
                  }
                })}
                className="input"
                placeholder="Enter bookmark title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium text-vintage-black tracking-tight mb-2">
                Category
              </label>
              <input
                type="text"
                {...register('category', {
                  maxLength: {
                    value: 50,
                    message: 'Category cannot exceed 50 characters'
                  }
                })}
                className="input"
                placeholder="e.g., Work, Personal, Learning"
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-vintage-black tracking-tight mb-2">
                Description
              </label>
              <textarea
                {...register('description', {
                  maxLength: {
                    value: 500,
                    message: 'Description cannot exceed 500 characters'
                  }
                })}
                rows={3}
                className="input resize-none"
                placeholder="Add a description (optional)"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Tags Field */}
            <div>
              <label className="block text-sm font-medium text-vintage-black tracking-tight mb-2">
                Tags
              </label>
              <input
                type="text"
                {...register('tags')}
                className="input"
                placeholder="javascript, react, tutorial (separated by commas)"
              />
              <p className="mt-1 text-xs text-vintage-slate tracking-tight">
                Separate multiple tags with commas
              </p>
            </div>

            {/* Privacy Toggle */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isPrivate"
                {...register('isPrivate')}
                className="w-4 h-4 border border-vintage-platinum focus:ring-vintage-slate"
              />
              <label htmlFor="isPrivate" className="text-sm text-vintage-black tracking-tight">
                Private bookmark
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-vintage-pearl">
            <button
              type="button"
              onClick={onCancel}
              className="btn-ghost"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-solid flex items-center space-x-2"
              disabled={loading}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-vintage-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              <span>{isEditing ? 'Update' : 'Save'} Bookmark</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookmarkForm; 