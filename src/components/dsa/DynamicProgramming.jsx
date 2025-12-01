import React, { useState } from 'react';
import { BookOpen, Code, ExternalLink, ChevronDown, ChevronRight, Lightbulb, CheckCircle, ArrowLeft } from 'lucide-react';
import CodeBlock from '../common/CodeBlock';
import { dpProblems, dpResources } from '../../data/dpData';

const DynamicProgramming = () => {
  const [expandedProblem, setExpandedProblem] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleProblem = (id) => {
    if (expandedProblem === id) {
      setExpandedProblem(null);
    } else {
      setExpandedProblem(id);
    }
  };

  // Get unique tags for filter
  const allTags = ['All', ...new Set(dpProblems.flatMap(p => p.tags || []))].sort();

  // Filter problems
  const filteredProblems = dpProblems.filter(problem => {
    const matchesFilter = filter === 'All' || (problem.tags && problem.tags.includes(filter));
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-full overflow-y-auto bg-gray-900">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-700 pb-6">
          <h1 className="text-4xl font-bold text-white mb-3">Dynamic Programming</h1>
          <p className="text-lg text-gray-400">
            Master the art of optimizing complex problems by breaking them down into simpler subproblems.
          </p>
        </div>

        {/* Resources Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dpResources.map((resource, idx) => (
            <a
              key={idx}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded bg-blue-900/30 text-blue-400 border border-blue-800/50">
                  {resource.type}
                </span>
                <ExternalLink size={16} className="text-gray-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                {resource.title}
              </h3>
            </a>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  filter === tag 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Code className="text-green-400" />
            Curated Problems ({filteredProblems.length})
          </h2>
          
          {filteredProblems.map((problem) => (
            <div 
              key={problem.id}
              className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-200 hover:border-gray-600"
            >
              <button 
                onClick={() => toggleProblem(problem.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm border 
                    ${problem.difficulty === 'Easy' ? 'bg-green-900/30 text-green-400 border-green-800' : 
                      problem.difficulty === 'Hard' ? 'bg-red-900/30 text-red-400 border-red-800' : 
                      'bg-yellow-900/30 text-yellow-400 border-yellow-800'}`}
                  >
                    {problem.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-3">
                      {problem.title}
                      {problem.difficulty && (
                        <span className={`text-xs px-2 py-0.5 rounded-full border 
                          ${problem.difficulty === 'Easy' ? 'border-green-800 text-green-400' : 
                            problem.difficulty === 'Hard' ? 'border-red-800 text-red-400' : 
                            'border-yellow-800 text-yellow-400'}`}>
                          {problem.difficulty}
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {problem.tags && problem.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs text-gray-500 bg-gray-900 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {expandedProblem === problem.id ? <ChevronDown className="text-gray-400" /> : <ChevronRight className="text-gray-400" />}
              </button>

              {expandedProblem === problem.id && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-700 bg-gray-900/30">
                  {/* External Link */}
                  <div className="flex justify-end mb-4">
                    <a 
                      href={problem.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View on LeetCode <ExternalLink size={14} />
                    </a>
                  </div>

                  {/* Thought Process */}
                  {problem.thought && (
                    <div className="mb-6 bg-blue-900/10 border border-blue-800/30 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                        <Lightbulb size={16} />
                        Thought Process
                      </h4>
                      <p className="text-gray-300 text-sm italic">
                        {problem.thought}
                      </p>
                    </div>
                  )}

                  {/* Problem Statement */}
                  {problem.statement && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Problem Statement</h4>
                      <p className="text-gray-300 whitespace-pre-wrap leading-relaxed font-mono text-sm bg-gray-950 p-4 rounded-lg border border-gray-800">
                        {problem.statement}
                      </p>
                    </div>
                  )}

                  {/* Hints */}
                  {problem.hints && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Hints</h4>
                      <ul className="space-y-2">
                        {problem.hints.map((hint, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-500 shrink-0"></span>
                            <span>{hint}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Solution */}
                  {problem.solution && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Solution ({problem.solution.language})
                      </h4>
                      <CodeBlock 
                        language={problem.solution.language}
                        code={problem.solution.code}
                      />
                    </div>
                  )}
                  
                  {!problem.statement && !problem.solution && (
                    <div className="text-center py-8 text-gray-500">
                      <p>Detailed content for this problem is coming soon.</p>
                      <p className="text-sm mt-2">Click the link above to view it on LeetCode.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicProgramming;
