import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, X, ArrowRight } from 'lucide-react';
import { searchContent } from '../../utils/searchIndex';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const searchResults = searchContent(query);
    setResults(searchResults);
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (result) => {
    if (result.path && result.path !== '#') {
      navigate(result.path);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal - Modernized Design */}
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden transform transition-all scale-100 opacity-100 mx-4">
        
        {/* Search Input Header */}
        <div className="flex items-center px-4 py-4 border-b border-gray-800 bg-gray-900/50">
          <Search className="text-gray-400 w-5 h-5 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-0"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-gray-400 bg-gray-800 rounded border border-gray-700">
              <span className="text-xs">ESC</span>
            </kbd>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-800 rounded-md transition-colors text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar bg-gray-900/95">
          {results.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Top Results
              </div>
              {results.map((result, index) => {
                const Icon = result.icon || Command;
                const isSelected = index === selectedIndex;

                return (
                  <div
                    key={`${result.type}-${result.title}-${index}`}
                    onClick={() => handleSelect(result)}
                    className={`px-4 py-3 mx-2 rounded-lg cursor-pointer flex items-center justify-between group transition-all duration-150 ${
                      isSelected 
                        ? 'bg-blue-600/10 border border-blue-500/30' 
                        : 'hover:bg-gray-800 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className={`p-2 rounded-md ${isSelected ? 'bg-blue-600/20 text-blue-400' : 'bg-gray-800 text-gray-400'}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={`font-medium truncate ${isSelected ? 'text-blue-100' : 'text-gray-200'}`}>
                          {result.title}
                        </span>
                        <div className="flex items-center gap-2 text-xs">
                          <span className={`${isSelected ? 'text-blue-400' : 'text-gray-500'}`}>
                            {result.category}
                          </span>
                          {result.description && (
                            <>
                              <span className="text-gray-600">•</span>
                              <span className="text-gray-500 truncate max-w-[200px]">{result.description}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <ArrowRight size={16} className="text-blue-400" />
                    )}
                  </div>
                );
              })}
            </div>
          ) : query ? (
            <div className="py-12 text-center text-gray-500">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-gray-500 gap-4">
              <Command size={48} className="opacity-20" />
              <div className="text-center">
                <p className="text-sm">Type to search across technologies, books, and concepts.</p>
                <div className="mt-4 flex gap-4 justify-center text-xs">
                  <div className="flex items-center gap-1">
                    <kbd className="bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700">↑</kbd>
                    <kbd className="bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700">↓</kbd>
                    <span>to navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700">↵</kbd>
                    <span>to select</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        {results.length > 0 && (
          <div className="px-4 py-3 bg-gray-900 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
             <span>Found {results.length} matches</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
