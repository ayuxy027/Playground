import { useState } from 'react';
import { ExternalLink, Edit, Trash2, MoreVertical, Globe } from 'lucide-react';

const BookmarkCard = ({ bookmark, viewMode, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDomain = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="card-hover p-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className="flex-shrink-0">
              {getFaviconUrl(bookmark.url) ? (
                <img
                  src={getFaviconUrl(bookmark.url)}
                  alt=""
                  className="w-6 h-6"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="w-6 h-6 bg-vintage-graphite text-vintage-white rounded-sm flex items-center justify-center" style={{ display: 'none' }}>
                <Globe size={12} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-vintage-black tracking-tight truncate">
                {bookmark.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-vintage-slate tracking-tight">
                <span>{getDomain(bookmark.url)}</span>
                <span>•</span>
                <span>{formatDate(bookmark.createdAt)}</span>
                {bookmark.category && (
                  <>
                    <span>•</span>
                    <span className="px-2 py-0.5 bg-vintage-pearl text-vintage-black text-xs">
                      {bookmark.category}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-vintage-slate hover:text-vintage-black transition-colors duration-200"
              title="Open bookmark"
            >
              <ExternalLink size={16} />
            </a>
            
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-vintage-slate hover:text-vintage-black transition-colors duration-200"
                title="More options"
              >
                <MoreVertical size={16} />
              </button>
              
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-32 bg-vintage-white border border-vintage-platinum shadow-vintage-lg z-20 animate-fade-in">
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onEdit();
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-vintage-slate hover:bg-vintage-pearl hover:text-vintage-black transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onDelete();
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-vintage-slate hover:bg-vintage-pearl hover:text-vintage-black transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-hover animate-fade-in">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              {getFaviconUrl(bookmark.url) ? (
                <img
                  src={getFaviconUrl(bookmark.url)}
                  alt=""
                  className="w-8 h-8"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="w-8 h-8 bg-vintage-graphite text-vintage-white rounded flex items-center justify-center" style={{ display: 'none' }}>
                <Globe size={16} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-vintage-black tracking-tight line-clamp-2">
                {bookmark.title}
              </h3>
              <p className="text-sm text-vintage-slate tracking-tight">
                {getDomain(bookmark.url)}
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-vintage-slate hover:text-vintage-black transition-colors duration-200"
              title="More options"
            >
              <MoreVertical size={16} />
            </button>
            
            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-32 bg-vintage-white border border-vintage-platinum shadow-vintage-lg z-20 animate-fade-in">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onEdit();
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-vintage-slate hover:bg-vintage-pearl hover:text-vintage-black transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete();
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-vintage-slate hover:bg-vintage-pearl hover:text-vintage-black transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        {bookmark.description && (
          <p className="text-sm text-vintage-slate tracking-tight line-clamp-3">
            {bookmark.description}
          </p>
        )}

        {/* Tags */}
        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {bookmark.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-vintage-pearl text-vintage-black text-xs tracking-tight"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-vintage-pearl">
          <div className="flex items-center space-x-3 text-xs text-vintage-slate tracking-tight">
            {bookmark.category && (
              <span className="px-2 py-1 bg-vintage-snow border border-vintage-platinum">
                {bookmark.category}
              </span>
            )}
            <span>{formatDate(bookmark.createdAt)}</span>
          </div>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-secondary text-sm py-1 px-3 flex items-center space-x-2"
          >
            <span>Visit</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard; 