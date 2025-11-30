import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../config/technologies';

const Home = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-6 text-white">
          Master Backend & Data Engineering
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Deep-dive documentation and interactive visualizations for the most critical technologies 
          in modern software engineering.
        </p>
        
        <div className="space-y-8">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            const availableTechs = category.technologies.filter(t => t.hasDoc);
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className={`text-${category.color}-400`} size={32} />
                  <div>
                    <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                    <p className="text-sm text-gray-400">
                      {availableTechs.length} of {category.technologies.length} modules available
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.technologies.map((tech) => (
                    <Link
                      key={tech.id}
                      to={tech.comingSoon ? '#' : `/${category.id}/${tech.id}`}
                      className={`group relative p-4 rounded-lg border transition-all ${
                        tech.comingSoon
                          ? 'border-gray-700 bg-gray-900/50 cursor-not-allowed'
                          : `border-gray-700 bg-gray-900 hover:border-${category.color}-500 hover:bg-gray-800`
                      }`}
                      onClick={(e) => tech.comingSoon && e.preventDefault()}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-semibold ${tech.comingSoon ? 'text-gray-500' : 'text-white group-hover:text-' + category.color + '-400'}`}>
                          {tech.name}
                        </h3>
                        {tech.hasVisualizer && !tech.comingSoon && (
                          <span className="text-[10px] bg-green-900/50 text-green-400 px-2 py-0.5 rounded border border-green-700/50">
                            Visual
                          </span>
                        )}
                      </div>
                      <p className={`text-xs ${tech.comingSoon ? 'text-gray-600' : 'text-gray-400'}`}>
                        {tech.badge}
                      </p>
                      {tech.comingSoon && (
                        <div className="absolute top-2 right-2">
                          <span className="text-xs bg-gray-700 text-gray-500 px-2 py-1 rounded">
                            Coming Soon
                          </span>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-700/30">
          <h3 className="text-xl font-bold text-white mb-2">🚀 Interactive Learning</h3>
          <p className="text-gray-300">
            Each module includes comprehensive documentation with syntax-highlighted code examples, 
            Mermaid architecture diagrams, and for select technologies, interactive visualizations 
            to see concepts in action.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
