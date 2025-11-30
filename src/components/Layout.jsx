import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, ChevronDown, ChevronRight, ChevronsUp, Menu, X } from 'lucide-react';
import { categories } from '../config/technologies';

const Layout = () => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState(['data-engineering', 'databases']);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isActive = (path) => location.pathname === path;

  const getColorClasses = (color, isExpanded) => {
    const colors = {
      blue: {
        bg: 'bg-blue-900/30',
        border: 'border-blue-700/50',
        text: 'text-blue-400',
        hover: 'hover:bg-blue-900/50',
      },
      purple: {
        bg: 'bg-purple-900/30',
        border: 'border-purple-700/50',
        text: 'text-purple-400',
        hover: 'hover:bg-purple-900/50',
      },
      green: {
        bg: 'bg-green-900/30',
        border: 'border-green-700/50',
        text: 'text-green-400',
        hover: 'hover:bg-green-900/50',
      },
      orange: {
        bg: 'bg-orange-900/30',
        border: 'border-orange-700/50',
        text: 'text-orange-400',
        hover: 'hover:bg-orange-900/50',
      },
      red: {
        bg: 'bg-red-900/30',
        border: 'border-red-700/50',
        text: 'text-red-400',
        hover: 'hover:bg-red-900/50',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 z-50">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
          <h1 className="text-xl font-bold">LearnWithAI</h1>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile Overlay */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-40 w-72 bg-gray-800 border-r border-gray-700 flex flex-col transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-700 flex-shrink-0 hidden md:block">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
            <h1 className="text-xl font-bold">LearnWithAI</h1>
          </Link>
          <p className="text-xs text-gray-400 mt-1">Master Backend & Data Engineering</p>
        </div>

        {/* Mobile Menu Header (just for spacing/close) */}
        <div className="md:hidden h-16 flex items-center justify-end px-4 border-b border-gray-700">
           {/* Spacer to align with header */}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Home Link */}
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <BookOpen size={20} />
            <span>Home</span>
          </Link>

          {/* Collapse All Option */}
          {expandedCategories.length > 0 && (
            <button
              onClick={() => setExpandedCategories([])}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors group"
            >
              <ChevronsUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
              <span>Collapse All</span>
            </button>
          )}

          {/* Categories */}
          {categories.map((category) => {
            const Icon = category.icon;
            const isExpanded = expandedCategories.includes(category.id);
            const colorClasses = getColorClasses(category.color, isExpanded);

            return (
              <div key={category.id} className="mb-2">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${colorClasses.hover} ${
                    isExpanded ? `${colorClasses.bg} border ${colorClasses.border}` : 'text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={isExpanded ? colorClasses.text : ''} />
                    <span className="font-semibold text-sm">{category.name}</span>
                  </div>
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>

                {/* Technologies List */}
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-700 pl-4">
                    {category.technologies.map((tech) => {
                      const techPath = `/${category.id}/${tech.id}`;
                      const active = isActive(techPath);

                      return (
                        <Link
                          key={tech.id}
                          to={tech.comingSoon ? '#' : techPath}
                          onClick={(e) => {
                            if (tech.comingSoon) {
                              e.preventDefault();
                            } else {
                              setIsMobileMenuOpen(false);
                            }
                          }}
                        >
                          <span>{tech.name}</span>
                          {tech.comingSoon ? (
                            <span className="text-[10px] bg-gray-700 text-gray-400 px-2 py-0.5 rounded">
                              Soon
                            </span>
                          ) : tech.hasVisualizer ? (
                            <span className="text-[10px] bg-green-900/50 text-green-400 px-2 py-0.5 rounded border border-green-700/50">
                              Visual
                            </span>
                          ) : null}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Overlay backdrop for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-900 pt-16 md:pt-0 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
