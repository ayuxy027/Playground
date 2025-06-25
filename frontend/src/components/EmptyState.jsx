import { Bookmark } from 'lucide-react';

const EmptyState = ({ title, description, action }) => {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="w-16 h-16 mx-auto mb-4 bg-vintage-pearl flex items-center justify-center">
        <Bookmark size={32} className="text-vintage-slate" />
      </div>
      
      <h3 className="text-lg font-medium text-vintage-black tracking-tight mb-2">
        {title}
      </h3>
      
      <p className="text-vintage-slate tracking-tight mb-6 max-w-md mx-auto">
        {description}
      </p>
      
      {action && (
        <button
          onClick={action.onClick}
          className="btn-outline"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState; 