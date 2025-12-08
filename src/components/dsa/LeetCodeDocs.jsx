import React, { useState, useMemo } from 'react';
import { ExternalLink, ChevronDown, ChevronRight, Target, Filter, TrendingUp } from 'lucide-react';
import { leetcodeProblems, getCategoryCounts } from '../../data/leetcodeProblems';

const LeetCodeDocs = () => {
  const [expandedCategories, setExpandedCategories] = useState(new Set(['Arrays & Hashing']));
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [sortBy, setSortBy] = useState('frequency');

  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const expandAll = () => {
    setExpandedCategories(new Set(Object.keys(leetcodeProblems)));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  const getFilteredProblems = (problems) => {
    let filtered = difficultyFilter === 'All' 
      ? problems 
      : problems.filter(p => p.difficulty === difficultyFilter);
    
    if (sortBy === 'frequency') {
      return [...filtered].sort((a, b) => b.frequency - a.frequency);
    } else if (sortBy === 'difficulty') {
      const order = { 'Easy': 0, 'Medium': 1, 'Hard': 2 };
      return [...filtered].sort((a, b) => order[a.difficulty] - order[b.difficulty]);
    }
    return filtered;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-900/30 border-green-800';
      case 'Medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-800';
      case 'Hard': return 'text-red-400 bg-red-900/30 border-red-800';
      default: return 'text-gray-400 bg-gray-800';
    }
  };

  const getFrequencyBar = (frequency) => {
    const width = Math.min(100, frequency);
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            style={{ width: `${width}%` }}
          />
        </div>
        <span className="text-xs text-gray-500">{frequency.toFixed(1)}</span>
      </div>
    );
  };

  const totalProblems = Object.values(leetcodeProblems).flat().length;
  const easyCount = Object.values(leetcodeProblems).flat().filter(p => p.difficulty === 'Easy').length;
  const mediumCount = Object.values(leetcodeProblems).flat().filter(p => p.difficulty === 'Medium').length;
  const hardCount = Object.values(leetcodeProblems).flat().filter(p => p.difficulty === 'Hard').length;

  return (
    <div className="h-full overflow-y-auto bg-gray-900">
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-700 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-orange-600/20 border border-orange-500/30">
              <Target className="text-orange-400" size={24} />
            </div>
            <h1 className="text-4xl font-bold text-white">LeetCode Problem List</h1>
          </div>
          <p className="text-lg text-gray-400">
            Curated list of {totalProblems} interview problems organized by pattern with frequency scores.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-3xl font-bold text-white">{totalProblems}</div>
            <div className="text-sm text-gray-400">Total Problems</div>
          </div>
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-800/50">
            <div className="text-3xl font-bold text-green-400">{easyCount}</div>
            <div className="text-sm text-gray-400">Easy</div>
          </div>
          <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-800/50">
            <div className="text-3xl font-bold text-yellow-400">{mediumCount}</div>
            <div className="text-sm text-gray-400">Medium</div>
          </div>
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-800/50">
            <div className="text-3xl font-bold text-red-400">{hardCount}</div>
            <div className="text-sm text-gray-400">Hard</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <span className="text-sm text-gray-400">Difficulty:</span>
            {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  difficultyFilter === diff
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <TrendingUp size={16} className="text-gray-400" />
            <span className="text-sm text-gray-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm border border-gray-600"
            >
              <option value="frequency">By Frequency</option>
              <option value="difficulty">By Difficulty</option>
            </select>
            
            <button
              onClick={expandAll}
              className="px-3 py-1 rounded-lg text-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1 rounded-lg text-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {Object.entries(leetcodeProblems).map(([category, problems]) => {
            const filteredProblems = getFilteredProblems(problems);
            const stats = categoryCounts.find(c => c.category === category);
            
            return (
              <div
                key={category}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold text-white">{category}</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-green-900/30 text-green-400 border border-green-800">
                        {stats?.easy || 0}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-yellow-900/30 text-yellow-400 border border-yellow-800">
                        {stats?.medium || 0}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-red-900/30 text-red-400 border border-red-800">
                        {stats?.hard || 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{filteredProblems.length} problems</span>
                    {expandedCategories.has(category) ? (
                      <ChevronDown className="text-gray-400" />
                    ) : (
                      <ChevronRight className="text-gray-400" />
                    )}
                  </div>
                </button>

                {expandedCategories.has(category) && filteredProblems.length > 0 && (
                  <div className="border-t border-gray-700">
                    <table className="w-full">
                      <thead className="bg-gray-900/50">
                        <tr className="text-xs text-gray-400 uppercase">
                          <th className="px-6 py-2 text-left">Problem</th>
                          <th className="px-4 py-2 text-center">Difficulty</th>
                          <th className="px-4 py-2 text-center">Frequency</th>
                          <th className="px-4 py-2 text-right">Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProblems.map((problem, idx) => (
                          <tr
                            key={problem.id}
                            className={`border-t border-gray-700/50 hover:bg-gray-700/30 ${
                              idx % 2 === 0 ? 'bg-gray-800/30' : ''
                            }`}
                          >
                            <td className="px-6 py-3">
                              <span className="text-gray-300">{problem.id}. </span>
                              <span className="text-white">{problem.title}</span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-xs px-2 py-1 rounded border ${getDifficultyColor(problem.difficulty)}`}>
                                {problem.difficulty}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {getFrequencyBar(problem.frequency)}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <a
                                href={problem.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors"
                              >
                                <span className="text-sm">Solve</span>
                                <ExternalLink size={14} />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeetCodeDocs;
