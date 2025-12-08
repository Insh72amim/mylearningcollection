// LeetCode problems organized by category with frequency scores
export const leetcodeProblems = {
  'Arrays & Hashing': [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', frequency: 100, url: 'https://leetcode.com/problems/two-sum' },
    { id: 217, title: 'Contains Duplicate', difficulty: 'Easy', frequency: 50.9, url: 'https://leetcode.com/problems/contains-duplicate' },
    { id: 238, title: 'Product of Array Except Self', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/product-of-array-except-self' },
    { id: 49, title: 'Group Anagrams', difficulty: 'Medium', frequency: 72.7, url: 'https://leetcode.com/problems/group-anagrams' },
    { id: 36, title: 'Valid Sudoku', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/valid-sudoku' },
    { id: 560, title: 'Subarray Sum Equals K', difficulty: 'Medium', frequency: 40.6, url: 'https://leetcode.com/problems/subarray-sum-equals-k' },
    { id: 380, title: 'Insert Delete GetRandom O(1)', difficulty: 'Medium', frequency: 64, url: 'https://leetcode.com/problems/insert-delete-getrandom-o1' },
    { id: 169, title: 'Majority Element', difficulty: 'Easy', frequency: 50.9, url: 'https://leetcode.com/problems/majority-element' },
    { id: 118, title: "Pascal's Triangle", difficulty: 'Easy', frequency: 50.9, url: 'https://leetcode.com/problems/pascals-triangle' },
    { id: 283, title: 'Move Zeroes', difficulty: 'Easy', frequency: 58.2, url: 'https://leetcode.com/problems/move-zeroes' },
    { id: 54, title: 'Spiral Matrix', difficulty: 'Medium', frequency: 40.6, url: 'https://leetcode.com/problems/spiral-matrix' },
    { id: 48, title: 'Rotate Image', difficulty: 'Medium', frequency: 64, url: 'https://leetcode.com/problems/rotate-image' },
    { id: 31, title: 'Next Permutation', difficulty: 'Medium', frequency: 64, url: 'https://leetcode.com/problems/next-permutation' },
  ],
  
  'Two Pointers': [
    { id: 11, title: 'Container With Most Water', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/container-with-most-water' },
    { id: 42, title: 'Trapping Rain Water', difficulty: 'Hard', frequency: 79.2, url: 'https://leetcode.com/problems/trapping-rain-water' },
    { id: 849, title: 'Maximize Distance to Closest Person', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/maximize-distance-to-closest-person' },
  ],
  
  'Sliding Window': [
    { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', frequency: 79.2, url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters' },
    { id: 424, title: 'Longest Repeating Character Replacement', difficulty: 'Medium', frequency: 72.7, url: 'https://leetcode.com/problems/longest-repeating-character-replacement' },
    { id: 76, title: 'Minimum Window Substring', difficulty: 'Hard', frequency: 68.7, url: 'https://leetcode.com/problems/minimum-window-substring' },
    { id: 239, title: 'Sliding Window Maximum', difficulty: 'Hard', frequency: 50.9, url: 'https://leetcode.com/problems/sliding-window-maximum' },
  ],
  
  'Stack': [
    { id: 20, title: 'Valid Parentheses', difficulty: 'Easy', frequency: 68.7, url: 'https://leetcode.com/problems/valid-parentheses' },
    { id: 155, title: 'Min Stack', difficulty: 'Medium', frequency: 64, url: 'https://leetcode.com/problems/min-stack' },
    { id: 22, title: 'Generate Parentheses', difficulty: 'Medium', frequency: 64, url: 'https://leetcode.com/problems/generate-parentheses' },
    { id: 84, title: 'Largest Rectangle in Histogram', difficulty: 'Hard', frequency: 40.6, url: 'https://leetcode.com/problems/largest-rectangle-in-histogram' },
    { id: 224, title: 'Basic Calculator', difficulty: 'Hard', frequency: 58.2, url: 'https://leetcode.com/problems/basic-calculator' },
    { id: 394, title: 'Decode String', difficulty: 'Medium', frequency: 40.6, url: 'https://leetcode.com/problems/decode-string' },
    { id: 496, title: 'Next Greater Element I', difficulty: 'Easy', frequency: 50.9, url: 'https://leetcode.com/problems/next-greater-element-i' },
  ],
  
  'Binary Search': [
    { id: 875, title: 'Koko Eating Bananas', difficulty: 'Medium', frequency: 79.2, url: 'https://leetcode.com/problems/koko-eating-bananas' },
    { id: 33, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', frequency: 64, url: 'https://leetcode.com/problems/search-in-rotated-sorted-array' },
    { id: 34, title: 'Find First and Last Position', difficulty: 'Medium', frequency: 79.2, url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array' },
    { id: 74, title: 'Search a 2D Matrix', difficulty: 'Medium', frequency: 64, url: 'https://leetcode.com/problems/search-a-2d-matrix' },
    { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', frequency: 68.7, url: 'https://leetcode.com/problems/median-of-two-sorted-arrays' },
    { id: 1011, title: 'Capacity To Ship Packages', difficulty: 'Medium', frequency: 58.2, url: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days' },
    { id: 1552, title: 'Magnetic Force Between Two Balls', difficulty: 'Medium', frequency: 40.6, url: 'https://leetcode.com/problems/magnetic-force-between-two-balls' },
  ],
  
  'Heap / Priority Queue': [
    { id: 347, title: 'Top K Frequent Elements', difficulty: 'Medium', frequency: 76.2, url: 'https://leetcode.com/problems/top-k-frequent-elements' },
    { id: 215, title: 'Kth Largest Element in an Array', difficulty: 'Medium', frequency: 58.2, url: 'https://leetcode.com/problems/kth-largest-element-in-an-array' },
    { id: 23, title: 'Merge k Sorted Lists', difficulty: 'Hard', frequency: 72.7, url: 'https://leetcode.com/problems/merge-k-sorted-lists' },
    { id: 973, title: 'K Closest Points to Origin', difficulty: 'Medium', frequency: 40.6, url: 'https://leetcode.com/problems/k-closest-points-to-origin' },
    { id: 692, title: 'Top K Frequent Words', difficulty: 'Medium', frequency: 58.2, url: 'https://leetcode.com/problems/top-k-frequent-words' },
    { id: 767, title: 'Reorganize String', difficulty: 'Medium', frequency: 92.5, url: 'https://leetcode.com/problems/reorganize-string' },
  ],
  
  'Linked List': [
    { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', frequency: 79.2, url: 'https://leetcode.com/problems/add-two-numbers' },
    { id: 61, title: 'Rotate List', difficulty: 'Medium', frequency: 40.6, url: 'https://leetcode.com/problems/rotate-list' },
    { id: 287, title: 'Find the Duplicate Number', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/find-the-duplicate-number' },
  ],
  
  'Trees': [
    { id: 226, title: 'Invert Binary Tree', difficulty: 'Easy', frequency: 58.2, url: 'https://leetcode.com/problems/invert-binary-tree' },
    { id: 108, title: 'Convert Sorted Array to BST', difficulty: 'Easy', frequency: 40.6, url: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree' },
    { id: 236, title: 'Lowest Common Ancestor', difficulty: 'Medium', frequency: 72.7, url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree' },
    { id: 102, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', frequency: 40.6, url: 'https://leetcode.com/problems/binary-tree-level-order-traversal' },
    { id: 98, title: 'Validate Binary Search Tree', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/validate-binary-search-tree' },
  ],
  
  'Graphs': [
    { id: 200, title: 'Number of Islands', difficulty: 'Medium', frequency: 92.5, url: 'https://leetcode.com/problems/number-of-islands' },
    { id: 994, title: 'Rotting Oranges', difficulty: 'Medium', frequency: 64, url: 'https://leetcode.com/problems/rotting-oranges' },
    { id: 417, title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/pacific-atlantic-water-flow' },
    { id: 207, title: 'Course Schedule', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/course-schedule' },
    { id: 210, title: 'Course Schedule II', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/course-schedule-ii' },
    { id: 547, title: 'Number of Provinces', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/number-of-provinces' },
    { id: 399, title: 'Evaluate Division', difficulty: 'Medium', frequency: 40.6, url: 'https://leetcode.com/problems/evaluate-division' },
    { id: 127, title: 'Word Ladder', difficulty: 'Hard', frequency: 50.9, url: 'https://leetcode.com/problems/word-ladder' },
    { id: 802, title: 'Find Eventual Safe States', difficulty: 'Medium', frequency: 40.6, url: 'https://leetcode.com/problems/find-eventual-safe-states' },
    { id: 733, title: 'Flood Fill', difficulty: 'Easy', frequency: 64, url: 'https://leetcode.com/problems/flood-fill' },
  ],
  
  'Backtracking': [
    { id: 79, title: 'Word Search', difficulty: 'Medium', frequency: 58.2, url: 'https://leetcode.com/problems/word-search' },
    { id: 39, title: 'Combination Sum', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/combination-sum' },
    { id: 77, title: 'Combinations', difficulty: 'Medium', frequency: 40.6, url: 'https://leetcode.com/problems/combinations' },
    { id: 37, title: 'Sudoku Solver', difficulty: 'Hard', frequency: 50.9, url: 'https://leetcode.com/problems/sudoku-solver' },
    { id: 212, title: 'Word Search II', difficulty: 'Hard', frequency: 50.9, url: 'https://leetcode.com/problems/word-search-ii' },
    { id: 472, title: 'Concatenated Words', difficulty: 'Hard', frequency: 68.7, url: 'https://leetcode.com/problems/concatenated-words' },
  ],
  
  'Dynamic Programming': [
    { id: 121, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', frequency: 92.5, url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock' },
    { id: 122, title: 'Best Time to Buy and Sell Stock II', difficulty: 'Medium', frequency: 64, url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii' },
    { id: 198, title: 'House Robber', difficulty: 'Medium', frequency: 68.7, url: 'https://leetcode.com/problems/house-robber' },
    { id: 322, title: 'Coin Change', difficulty: 'Medium', frequency: 64, url: 'https://leetcode.com/problems/coin-change' },
    { id: 62, title: 'Unique Paths', difficulty: 'Medium', frequency: 64, url: 'https://leetcode.com/problems/unique-paths' },
    { id: 72, title: 'Edit Distance', difficulty: 'Medium', frequency: 58.2, url: 'https://leetcode.com/problems/edit-distance' },
    { id: 53, title: 'Maximum Subarray', difficulty: 'Medium', frequency: 58.2, url: 'https://leetcode.com/problems/maximum-subarray' },
    { id: 5, title: 'Longest Palindromic Substring', difficulty: 'Medium', frequency: 86.7, url: 'https://leetcode.com/problems/longest-palindromic-substring' },
    { id: 746, title: 'Min Cost Climbing Stairs', difficulty: 'Easy', frequency: 50.9, url: 'https://leetcode.com/problems/min-cost-climbing-stairs' },
    { id: 45, title: 'Jump Game II', difficulty: 'Medium', frequency: 72.7, url: 'https://leetcode.com/problems/jump-game-ii' },
    { id: 55, title: 'Jump Game', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/jump-game' },
    { id: 135, title: 'Candy', difficulty: 'Hard', frequency: 68.7, url: 'https://leetcode.com/problems/candy' },
    { id: 1235, title: 'Maximum Profit in Job Scheduling', difficulty: 'Hard', frequency: 50.9, url: 'https://leetcode.com/problems/maximum-profit-in-job-scheduling' },
  ],
  
  'Intervals': [
    { id: 56, title: 'Merge Intervals', difficulty: 'Medium', frequency: 72.7, url: 'https://leetcode.com/problems/merge-intervals' },
    { id: 253, title: 'Meeting Rooms II', difficulty: 'Medium', frequency: 68.7, url: 'https://leetcode.com/problems/meeting-rooms-ii' },
  ],
  
  'Greedy': [
    { id: 45, title: 'Jump Game II', difficulty: 'Medium', frequency: 72.7, url: 'https://leetcode.com/problems/jump-game-ii' },
    { id: 55, title: 'Jump Game', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/jump-game' },
  ],
  
  'Math & Bit Manipulation': [
    { id: 9, title: 'Palindrome Number', difficulty: 'Easy', frequency: 58.2, url: 'https://leetcode.com/problems/palindrome-number' },
    { id: 13, title: 'Roman to Integer', difficulty: 'Easy', frequency: 58.2, url: 'https://leetcode.com/problems/roman-to-integer' },
    { id: 12, title: 'Integer to Roman', difficulty: 'Medium', frequency: 58.2, url: 'https://leetcode.com/problems/integer-to-roman' },
    { id: 7, title: 'Reverse Integer', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/reverse-integer' },
    { id: 136, title: 'Single Number', difficulty: 'Easy', frequency: 50.9, url: 'https://leetcode.com/problems/single-number' },
    { id: 202, title: 'Happy Number', difficulty: 'Easy', frequency: 40.6, url: 'https://leetcode.com/problems/happy-number' },
    { id: 412, title: 'Fizz Buzz', difficulty: 'Easy', frequency: 64, url: 'https://leetcode.com/problems/fizz-buzz' },
  ],
  
  'String': [
    { id: 443, title: 'String Compression', difficulty: 'Medium', frequency: 50.9, url: 'https://leetcode.com/problems/string-compression' },
    { id: 8, title: 'String to Integer (atoi)', difficulty: 'Medium', frequency: 58.2, url: 'https://leetcode.com/problems/string-to-integer-atoi' },
    { id: 273, title: 'Integer to English Words', difficulty: 'Hard', frequency: 50.9, url: 'https://leetcode.com/problems/integer-to-english-words' },
  ],
  
  'Design': [
    { id: 146, title: 'LRU Cache', difficulty: 'Medium', frequency: 92.5, url: 'https://leetcode.com/problems/lru-cache' },
    { id: 460, title: 'LFU Cache', difficulty: 'Hard', frequency: 64, url: 'https://leetcode.com/problems/lfu-cache' },
    { id: 1603, title: 'Design Parking System', difficulty: 'Easy', frequency: 40.6, url: 'https://leetcode.com/problems/design-parking-system' },
    { id: 588, title: 'Design In-Memory File System', difficulty: 'Hard', frequency: 40.6, url: 'https://leetcode.com/problems/design-in-memory-file-system' },
  ],
};

// Helper to get all problems sorted by frequency
export const getAllProblemsByFrequency = () => {
  const all = [];
  Object.entries(leetcodeProblems).forEach(([category, problems]) => {
    problems.forEach(p => all.push({ ...p, category }));
  });
  return all.sort((a, b) => b.frequency - a.frequency);
};

// Get problems by difficulty
export const getProblemsByDifficulty = (difficulty) => {
  const all = [];
  Object.entries(leetcodeProblems).forEach(([category, problems]) => {
    problems.forEach(p => {
      if (p.difficulty === difficulty) {
        all.push({ ...p, category });
      }
    });
  });
  return all.sort((a, b) => b.frequency - a.frequency);
};

// Get category counts
export const getCategoryCounts = () => {
  return Object.entries(leetcodeProblems).map(([category, problems]) => ({
    category,
    total: problems.length,
    easy: problems.filter(p => p.difficulty === 'Easy').length,
    medium: problems.filter(p => p.difficulty === 'Medium').length,
    hard: problems.filter(p => p.difficulty === 'Hard').length,
  }));
};
