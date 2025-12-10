import { categories } from '../config/technologies';

// Simple search scoring
const calculateScore = (text, query) => {
  if (!text) return 0;
  const normalizedText = text.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (normalizedText === normalizedQuery) return 100;
  if (normalizedText.startsWith(normalizedQuery)) return 80;
  if (normalizedText.includes(normalizedQuery)) return 50;
  return 0;
};

export const searchContent = (query) => {
  if (!query || query.length < 2) return [];

  const results = [];

  // 1. Search Categories & Technologies
  categories.forEach(category => {
    // Search Category
    const categoryScore = calculateScore(category.name, query);
    if (categoryScore > 0) {
      results.push({
        type: 'category',
        title: category.name,
        path: '#', // Categories just expand in sidebar usually, but we might want to link to first child
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
          score,
          category: category.name
        });
      }
    });
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 10);
};
