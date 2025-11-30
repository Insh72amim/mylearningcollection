import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { categories } from '../config/technologies';

const Layout = () => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState(['data-engineering', 'databases']);

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
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-72 bg-gray-800 border-r border-gray-700 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
            <h1 className="text-xl font-bold">LearnWithAI</h1>
          </Link>
          <p className="text-xs text-gray-400 mt-1">Master Backend & Data Engineering</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Home Link */}
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <BookOpen size={20} />
            <span>Home</span>
          </Link>

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
                          className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                            active
                              ? `${colorClasses.bg} ${colorClasses.text} font-medium`
                              : tech.comingSoon
                              ? 'text-gray-500 cursor-not-allowed'
                              : 'text-gray-400 hover:text-white hover:bg-gray-700'
                          }`}
                          onClick={(e) => tech.comingSoon && e.preventDefault()}
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

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-900">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
