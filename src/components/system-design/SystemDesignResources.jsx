import React, { useState } from 'react';
import { ExternalLink, Search, BookOpen, Video, FileText, Code, Database, Server, Globe, Cpu, HelpCircle } from 'lucide-react';
import { systemDesignResources } from '../../data/systemDesignResources';

const SystemDesignResources = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories
  const categories = ['All', ...new Set(systemDesignResources.map(r => r.category))];

  // Filter resources
  const filteredResources = systemDesignResources.filter(resource => {
    const matchesFilter = filter === 'All' || resource.category === filter;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Helper to get icon based on category
  const getCategoryIcon = (category) => {
    if (category.includes('Video')) return <Video size={18} className="text-red-400" />;
    if (category.includes('Github')) return <Code size={18} className="text-gray-400" />;
    if (category.includes('Articles')) return <FileText size={18} className="text-blue-400" />;
    if (category.includes('DBMS')) return <Database size={18} className="text-green-400" />;
    if (category.includes('OS')) return <Cpu size={18} className="text-orange-400" />;
    if (category.includes('Networks')) return <Globe size={18} className="text-cyan-400" />;
    if (category.includes('Puzzles')) return <HelpCircle size={18} className="text-yellow-400" />;
    return <BookOpen size={18} className="text-purple-400" />;
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-900">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-700 pb-6">
          <h1 className="text-4xl font-bold text-white mb-3">System Design Resources</h1>
          <p className="text-lg text-gray-400">
            A curated collection of articles, videos, and repositories to master system design.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  filter === cat 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, idx) => (
            <a
              key={idx}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-blue-500 transition-all duration-200 group flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-1 rounded-full border border-gray-700/50">
                  {getCategoryIcon(resource.category)}
                  <span className="text-xs font-medium text-gray-300 truncate max-w-[150px]">
                    {resource.category}
                  </span>
                </div>
                <ExternalLink size={16} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                {resource.title}
              </h3>
              
              {resource.description && (
                <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-grow">
                  {resource.description}
                </p>
              )}
              
              <div className="mt-auto pt-4 border-t border-gray-700/50 flex items-center gap-2 text-xs text-gray-500">
                <span className="truncate">{new URL(resource.url).hostname}</span>
              </div>
            </a>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No resources found matching your criteria.</p>
            <button 
              onClick={() => {setFilter('All'); setSearchQuery('');}}
              className="mt-4 text-blue-400 hover:text-blue-300 underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemDesignResources;
