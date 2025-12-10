import { categories } from '../config/technologies';
import { ddiaChaptersDetailed as ddiaChapters } from '../data/ddia-chapters-data';
import { dbInternalsChapters } from '../data/db-internals-chapters-data';
import { complexAnalysisChapters } from '../data/complex-analysis-chapters-data';
import { linearAlgebraChapters } from '../data/linear-algebra-chapters-data';
import { deepLearningChapters } from '../data/deep-learning-chapters-data';
import { patternRecognitionChapters } from '../data/pattern-recognition-chapters-data';
import { hullChaptersDetailed as hullChapters } from '../data/hull-chapters-data';
import { securityAnalysisChapters } from '../data/security-analysis-chapters-data';

// Map tech ID to its data
const bookChapterData = {
  'ddia': ddiaChapters,
  'database-internals': dbInternalsChapters,
  'complex-analysis-spiegel': complexAnalysisChapters,
  'linear-algebra-lipschutz': linearAlgebraChapters,
  'deep-learning-goodfellow': deepLearningChapters,
  'pattern-recognition-bishop': patternRecognitionChapters,
  'hull-options': hullChapters,
  'security-analysis': securityAnalysisChapters,
};

// Simple search scoring
const calculateScore = (text, query) => {
  if (!text) return 0;
  const normalizedText = text.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  // Exact match
  if (normalizedText === normalizedQuery) return 100;
  
  // Starts with
  if (normalizedText.startsWith(normalizedQuery)) return 80;
  
  // Word match
  const words = normalizedText.split(' ');
  if (words.some(w => w === normalizedQuery)) return 70;
  
  // Partial match
  if (normalizedText.includes(normalizedQuery)) return 50;
  
  return 0;
};

export const searchContent = (query) => {
  if (!query || query.length < 2) return [];

  const results = [];
  const normalizedQuery = query.toLowerCase();

  // 1. Search Categories & Technologies
  categories.forEach(category => {
    // Search Category
    const categoryScore = calculateScore(category.name, query);
    if (categoryScore > 0) {
      results.push({
        type: 'category',
        title: category.name,
        path: '#', // Categories just expand in sidebar usually
        description: `Category containing ${category.technologies.length} topics`,
        icon: category.icon,
        score: categoryScore,
        category: category.name
      });
    }

    // Search Technologies
    category.technologies.forEach(tech => {
      const techScore = calculateScore(tech.name, query);
      const badgeScore = calculateScore(tech.badge, query);
      const score = Math.max(techScore, badgeScore);

      if (score > 0) {
        results.push({
          type: 'technology',
          title: tech.name,
          path: `/${category.id}/${tech.id}`,
          description: tech.badge,
          icon: category.icon, // Inherit category icon
          score: score + 10, // Boost tech title matches
          category: category.name
        });
      }

      // 2. Search Book Content (if available)
      const bookData = bookChapterData[tech.id];
      if (bookData) {
        bookData.forEach(chapter => {
          // Check Chapter Title
          const chapterTitleScore = calculateScore(chapter.title, query);
          if (chapterTitleScore > 0) {
            results.push({
              type: 'chapter',
              title: `${tech.name} - ${chapter.title}`,
              path: `/${category.id}/${tech.id}?chapter=${chapter.id}`,
              description: chapter.summary || `Chapter ${chapter.id}`,
              icon: category.icon,
              score: chapterTitleScore,
              category: category.name
            });
          }

          // Check Chapter Sections
          if (chapter.sections) {
            chapter.sections.forEach(section => {
              const sectionTitleScore = calculateScore(section.title, query);
              const contentScore = section.content && section.content.toLowerCase().includes(normalizedQuery) ? 30 : 0;
              
              const finalSectionScore = Math.max(sectionTitleScore, contentScore);

              if (finalSectionScore > 0) {
                // Snippet extraction for content match
                let snippet = section.content || '';
                if (contentScore > 0 && snippet) {
                  const queryIdx = snippet.toLowerCase().indexOf(normalizedQuery);
                  const start = Math.max(0, queryIdx - 40);
                  const end = Math.min(snippet.length, queryIdx + 80);
                  snippet = (start > 0 ? '...' : '') + snippet.substring(start, end) + (end < snippet.length ? '...' : '');
                } else {
                    snippet = `Section in ${chapter.title}`;
                }

                results.push({
                  type: 'section',
                  title: `${tech.name}: ${section.title}`,
                  path: `/${category.id}/${tech.id}?chapter=${chapter.id}`,
                  description: snippet,
                  icon: category.icon,
                  score: finalSectionScore,
                  category: category.name
                });
              }
            });
          }

           // Check Deeper Content (Points, Definitions, etc)
           // This is a simplified check, can be expanded
           if (chapter.keyPoints && chapter.keyPoints.some(p => p.toLowerCase().includes(normalizedQuery))) {
             results.push({
               type: 'key-point',
               title: `${tech.name}: Key Points - ${chapter.title}`,
               path: `/${category.id}/${tech.id}?chapter=${chapter.id}`,
               description: "Matching text in key points",
               icon: category.icon,
               score: 25,
               category: category.name
             });
           }
        });
      }
    });
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 50); // Increased limit due to more content
};
