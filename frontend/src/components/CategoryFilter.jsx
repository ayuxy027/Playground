import { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

const CategoryFilter = ({ categories, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category) => {
    onChange(category);
    setIsOpen(false);
  };

  const selectedLabel = selected === 'all' ? 'All Categories' : selected;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-outline-secondary flex items-center space-x-2 min-w-[140px] justify-between"
      >
        <div className="flex items-center space-x-2">
          <Filter size={14} />
          <span className="truncate">{selectedLabel}</span>
        </div>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-full min-w-[200px] bg-vintage-white border border-vintage-platinum shadow-vintage-lg z-20 max-h-60 overflow-y-auto animate-fade-in">
            <button
              onClick={() => handleSelect('all')}
              className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                selected === 'all'
                  ? 'bg-vintage-pearl text-vintage-black'
                  : 'text-vintage-slate hover:bg-vintage-pearl hover:text-vintage-black'
              }`}
            >
              All Categories
            </button>
            
            {categories.length > 0 && (
              <div className="border-t border-vintage-pearl">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleSelect(category)}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                      selected === category
                        ? 'bg-vintage-pearl text-vintage-black'
                        : 'text-vintage-slate hover:bg-vintage-pearl hover:text-vintage-black'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
            
            {categories.length === 0 && (
              <div className="px-4 py-2 text-sm text-vintage-silver">
                No categories available
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryFilter; 