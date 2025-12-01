import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy, Terminal } from 'lucide-react';

// Register only languages we actually use
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import protobuf from 'react-syntax-highlighter/dist/esm/languages/prism/protobuf';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import scala from 'react-syntax-highlighter/dist/esm/languages/prism/scala';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('protobuf', protobuf);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('scala', scala);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('text', markup);

const CodeBlock = ({ code, language = 'python', title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl bg-[#1e1e1e] my-8 group/code transition-all duration-300 hover:border-blue-500/30 hover:shadow-blue-900/10">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          {title ? (
            <span className="ml-2 text-xs text-gray-400 font-mono flex items-center gap-2 font-medium">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span style={{ fontFamily: '"JetBrains Mono", monospace' }}>{title}</span>
            </span>
          ) : (
            <span className="ml-2 text-xs text-blue-400 font-mono uppercase tracking-wider font-bold" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-gray-700 rounded-md transition-colors text-gray-400 hover:text-white flex items-center gap-2"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-green-400 font-medium">Copied!</span>
            </>
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="relative group">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: '#1e1e1e',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          }}
          showLineNumbers={true}
          wrapLines={true}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#6e7681',
            textAlign: 'right',
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
