import { useState } from 'react';
import { LogOut, Bookmark, User, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-vintage-white border-b border-vintage-platinum shadow-vintage">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-vintage-black text-vintage-white">
              <Bookmark size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-vintage-black tracking-tight">
                Bookmark Manager
              </h1>
              <p className="text-xs text-vintage-slate tracking-tight">
                Curated Collections
              </p>
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded hover:bg-vintage-pearl transition-colors duration-200 focus-ring"
              aria-label="User menu"
            >
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border border-vintage-platinum"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-vintage-graphite flex items-center justify-center">
                  <User size={16} className="text-vintage-white" />
                </div>
              )}
              <span className="text-sm font-medium text-vintage-black tracking-tight hidden sm:block">
                {user?.name}
              </span>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-64 bg-vintage-white border border-vintage-platinum shadow-vintage-lg z-20 animate-fade-in">
                  <div className="p-4 border-b border-vintage-pearl">
                    <p className="font-medium text-vintage-black tracking-tight">
                      {user?.name}
                    </p>
                    <p className="text-sm text-vintage-slate tracking-tight">
                      {user?.email}
                    </p>
                  </div>
                  
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Add settings functionality here
                      }}
                      className="w-full px-4 py-2 text-left flex items-center space-x-3 text-vintage-slate hover:bg-vintage-pearl hover:text-vintage-black transition-colors duration-200"
                    >
                      <Settings size={16} />
                      <span className="text-sm tracking-tight">Settings</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handleLogout();
                      }}
                      className="w-full px-4 py-2 text-left flex items-center space-x-3 text-vintage-slate hover:bg-vintage-pearl hover:text-vintage-black transition-colors duration-200"
                    >
                      <LogOut size={16} />
                      <span className="text-sm tracking-tight">Sign out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 