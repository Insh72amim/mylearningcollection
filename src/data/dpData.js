export const dpResources = [
  {
    title: 'DP for Beginners LeetCode',
    url: 'https://leetcode.com/discuss/general-discussion/662866/DP-for-Beginners-Problems-or-Patterns-or-Sample-Solutions',
    type: 'Article'
  },
  {
    title: 'Dynamic Programming Patterns - 1',
    url: 'https://leetcode.com/discuss/study-guide/1437879/Dynamic-Programming-Patterns',
    type: 'Guide'
  },
  {
    title: 'Dynamic Programming Patterns - 2',
    url: 'https://leetcode.com/discuss/study-guide/458695/Dynamic-Programming-Patterns',
    type: 'Guide'
  },
  {
    title: 'DP on Tree Tutorial CF',
    url: 'https://codeforces.com/blog/entry/20935',
    type: 'Tutorial'
  },
  {
    title: 'DP Digit CF',
    url: 'https://codeforces.com/blog/entry/53960',
    type: 'Tutorial'
  }
];

export const dpProblems = [
  {
    id: 1,
    title: 'Filling Bookcase Shelves',
    url: 'https://leetcode.com/problems/filling-bookcase-shelves/',
    difficulty: 'Medium',
    tags: ['2D', 'Partition'],
    viewed: 'Once',
    thought: '2D DP. State: dp[i] = min height for first i books.',
    statement: `You are given an array books where books[i] = [thickness_i, height_i] indicates the thickness and height of the ith book. You are also given an integer shelfWidth.

We want to place these books in order onto bookcase shelves that have a total width shelfWidth.

We choose some of the books to place on this shelf such that the sum of their thickness is less than or equal to shelfWidth. We then build another level of the shelf of the bookcase so that the total height of the bookcase has increased by the maximum height of the books we just put down. We repeat this process until there are no more books to place.

Return the minimum possible height that the total bookshelf can be after placing shelves in this manner.`,
    hints: [
      'Use dynamic programming: dp[i] will be the minimum height of the bookshelf containing the first i books.',
      'To compute dp[i], try placing the last k books (ending at i) on the same shelf, where the total thickness of these k books <= shelfWidth.',
      'Transition: dp[i] = min(dp[j] + max(height[j+1]...height[i])) for all valid j.'
    ],
    solution: {
      language: 'cpp',
      code: `
class Solution {
public:
    int minHeightShelves(vector<vector<int>>& books, int shelfWidth) {
        int n = books.size();
        vector<int> dp(n + 1, INT_MAX);
        dp[0] = 0;
        
        for (int i = 1; i <= n; ++i) {
            int width = 0;
            int height = 0;
            for (int j = i; j > 0; --j) {
                width += books[j-1][0];
                if (width > shelfWidth) break;
                height = max(height, books[j-1][1]);
                dp[i] = min(dp[i], dp[j-1] + height);
            }
        }
        return dp[n];
    }
};
`
    }
  },
  {
    id: 2,
    title: 'Knight Probability in Chessboard',
    url: 'https://leetcode.com/problems/knight-probability-in-chessboard/',
    difficulty: 'Medium',
    tags: ['2D', 'Probability'],
    viewed: 'Once',
    thought: 'DP on grid. State: dp[k][r][c] = prob of being at (r,c) after k moves.',
    statement: `On an n x n chessboard, a knight starts at the cell (row, column) and attempts to make exactly k moves. The rows and columns are 0-indexed, so the top-left cell is (0, 0), and the bottom-right cell is (n - 1, n - 1).

A chess knight has 8 possible moves it can make, as illustrated below. Each move is two cells in a cardinal direction, then one cell in an orthogonal direction.

Each time the knight is to move, it chooses one of eight possible moves uniformly at random (even if the piece would go off the chessboard) and moves there.

The knight continues moving until it has made k moves or has moved off the chessboard.

Return the probability that the knight remains on the board after it has stopped moving.`,
    hints: [
      'Use a 3D DP array dp[k][i][j] representing the probability of being at (i, j) after k moves.',
      'Base case: dp[0][start_row][start_col] = 1.',
      'Iterate k from 1 to K. For each cell (r, c), update probabilities based on the 8 possible previous positions.'
    ],
    solution: {
      language: 'cpp',
      code: `
class Solution {
public:
    double knightProbability(int n, int k, int row, int column) {
        vector<vector<double>> dp(n, vector<double>(n, 0.0));
        dp[row][column] = 1.0;
        
        int dr[] = {-2, -2, -1, -1, 1, 1, 2, 2};
        int dc[] = {-1, 1, -2, 2, -2, 2, -1, 1};
        
        for (int move = 0; move < k; ++move) {
            vector<vector<double>> newDp(n, vector<double>(n, 0.0));
            for (int r = 0; r < n; ++r) {
                for (int c = 0; c < n; ++c) {
                    if (dp[r][c] > 0) {
                        for (int i = 0; i < 8; ++i) {
                            int nr = r + dr[i];
                            int nc = c + dc[i];
                            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                                newDp[nr][nc] += dp[r][c] / 8.0;
                            }
                        }
                    }
                }
            }
            dp = newDp;
        }
        
        double totalProb = 0.0;
        for (int r = 0; r < n; ++r) {
            for (int c = 0; c < n; ++c) {
                totalProb += dp[r][c];
            }
        }
        return totalProb;
    }
};
`
    }
  },
  {
    id: 3,
    title: 'Best Time to Buy and Sell Stock',
    url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    difficulty: 'Easy',
    tags: ['Decision Making', 'Array'],
    viewed: 'Twice',
    thought: 'Simple Loop! Go from back maintain one max and res, res = max(res, max - nums[i]), max = max(max, nums[i])',
    statement: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    hints: [
      'You need to find the largest peak following the smallest valley.',
      'Keep track of the minimum price seen so far and the maximum profit achievable at each step.'
    ],
    solution: {
      language: 'cpp',
      code: `
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfit = 0;
        
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        
        return maxProfit;
    }
};
`
    }
  },
  {
    id: 4,
    title: 'Greatest Sum Divisible by Three',
    url: 'https://leetcode.com/problems/greatest-sum-divisible-by-three',
    difficulty: 'Medium',
    tags: ['Math', 'DP'],
    thought: 'Keep track of max sum with remainder 0, 1, 2.'
  },
  {
    id: 5,
    title: 'Minimum Cost Tree From Leaf Values',
    url: 'https://leetcode.com/problems/minimum-cost-tree-from-leaf-values',
    difficulty: 'Medium',
    tags: ['Stack', 'DP', 'Tree'],
    thought: 'Monotonic stack or interval DP.'
  },
  {
    id: 6,
    title: 'House Robber II',
    url: 'https://leetcode.com/problems/house-robber-ii',
    difficulty: 'Medium',
    tags: ['DP', 'Array'],
    thought: 'Circular dependency. Solve linear House Robber twice: 0 to n-2 and 1 to n-1.'
  },
  {
    id: 7,
    title: 'Decode Ways',
    url: 'https://leetcode.com/problems/decode-ways',
    difficulty: 'Medium',
    tags: ['DP', 'String'],
    thought: 'Fibonacci-like. dp[i] depends on s[i] and s[i-1]s[i].'
  },
  {
    id: 8,
    title: 'Maximum Product Subarray',
    url: 'https://leetcode.com/problems/maximum-product-subarray',
    difficulty: 'Medium',
    tags: ['DP', 'Array'],
    thought: 'Keep track of max and min product ending at i because negative * negative = positive.'
  },
  {
    id: 9,
    title: 'Jump Game',
    url: 'https://leetcode.com/problems/jump-game',
    difficulty: 'Medium',
    tags: ['Greedy', 'DP'],
    thought: 'Greedy: track max reachable index.'
  },
  {
    id: 10,
    title: 'Perfect Squares',
    url: 'https://leetcode.com/problems/perfect-squares',
    difficulty: 'Medium',
    tags: ['DP', 'Math'],
    thought: 'Knapsack-like. dp[i] = min(dp[i - j*j]) + 1.'
  },
  {
    id: 11,
    title: 'House Robber',
    url: 'https://leetcode.com/problems/house-robber',
    difficulty: 'Medium',
    tags: ['DP', 'Array'],
    thought: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i]).'
  },
  {
    id: 12,
    title: 'Longest Increasing Subsequence',
    url: 'https://leetcode.com/problems/longest-increasing-subsequence',
    difficulty: 'Medium',
    tags: ['DP', 'Binary Search'],
    thought: 'O(n^2) DP or O(n log n) with patience sorting.'
  },
  {
    id: 13,
    title: 'Longest Arithmetic Subsequence of Given Difference',
    url: 'https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference',
    difficulty: 'Medium',
    tags: ['DP', 'Hash Table'],
    thought: 'dp[x] = dp[x - difference] + 1.'
  },
  {
    id: 14,
    title: 'Minimum Number of Removals to Make Mountain Array',
    url: 'https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array',
    difficulty: 'Hard',
    tags: ['DP', 'LIS'],
    thought: 'LIS from left + LIS from right.'
  },
  {
    id: 15,
    title: 'Maximum Height by Stacking Cuboids',
    url: 'https://leetcode.com/problems/maximum-height-by-stacking-cuboids',
    difficulty: 'Hard',
    tags: ['DP', 'Sorting'],
    thought: 'Sort dimensions, then LIS variant.'
  },
  {
    id: 16,
    title: 'Partition Array Into Two Arrays to Minimize Sum Difference',
    url: 'https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference',
    difficulty: 'Hard',
    tags: ['Meet-in-the-middle', 'DP'],
    thought: 'Split array, generate sums, binary search.'
  },
  {
    id: 17,
    title: 'Longest Turbulent Subarray',
    url: 'https://leetcode.com/problems/longest-turbulent-subarray',
    difficulty: 'Medium',
    tags: ['DP', 'Sliding Window'],
    thought: 'Compare signs of differences.'
  },
  {
    id: 18,
    title: 'Longest Arithmetic Subsequence',
    url: 'https://leetcode.com/problems/longest-arithmetic-subsequence',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'dp[i][diff] = length.'
  },
  {
    id: 19,
    title: 'Russian Doll Envelopes',
    url: 'https://leetcode.com/problems/russian-doll-envelopes',
    difficulty: 'Hard',
    tags: ['DP', 'Sorting', 'LIS'],
    thought: 'Sort by width asc, height desc. Then LIS on height.'
  },
  {
    id: 20,
    title: 'Maximum Profit in Job Scheduling',
    url: 'https://leetcode.com/problems/maximum-profit-in-job-scheduling',
    difficulty: 'Hard',
    tags: ['DP', 'Binary Search', 'Sorting'],
    thought: 'Sort by end time. dp[i] = max(dp[i-1], profit + dp[prev_compatible]).'
  },
  {
    id: 21,
    title: 'Number of Longest Increasing Subsequence',
    url: 'https://leetcode.com/problems/number-of-longest-increasing-subsequence',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Track length and count in DP.'
  },
  {
    id: 22,
    title: 'Minimum Number of Taps to Open to Water a Garden',
    url: 'https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden',
    difficulty: 'Hard',
    tags: ['DP', 'Greedy'],
    thought: 'Jump Game II variation.'
  },
  {
    id: 23,
    title: 'Video Stitching',
    url: 'https://leetcode.com/problems/video-stitching',
    difficulty: 'Medium',
    tags: ['DP', 'Greedy'],
    thought: 'Similar to Taps/Jump Game.'
  },
  {
    id: 24,
    title: 'Maximum Length of Pair Chain',
    url: 'https://leetcode.com/problems/maximum-length-of-pair-chain',
    difficulty: 'Medium',
    tags: ['DP', 'Greedy', 'Sorting'],
    thought: 'Sort by end time, greedy pick.'
  },
  {
    id: 25,
    title: 'Jump Game II',
    url: 'https://leetcode.com/problems/jump-game-ii',
    difficulty: 'Medium',
    tags: ['Greedy', 'DP'],
    thought: 'BFS-like greedy.'
  },
  {
    id: 26,
    title: 'Largest Divisible Subset',
    url: 'https://leetcode.com/problems/largest-divisible-subset',
    difficulty: 'Medium',
    tags: ['DP', 'Math'],
    thought: 'Sort, then LIS variant where condition is divisibility.'
  },
  {
    id: 27,
    title: 'Interleaving String',
    url: 'https://leetcode.com/problems/interleaving-string',
    difficulty: 'Medium',
    tags: ['DP', 'String'],
    thought: '2D DP. dp[i][j] depends on s1[i] and s2[j].'
  },
  {
    id: 28,
    title: 'Largest Sum of Averages',
    url: 'https://leetcode.com/problems/largest-sum-of-averages',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Partition DP.'
  },
  {
    id: 29,
    title: 'Stone Game',
    url: 'https://leetcode.com/problems/stone-game',
    difficulty: 'Medium',
    tags: ['DP', 'Game Theory'],
    thought: 'Minimax or simple math (Alice always wins).'
  },
  {
    id: 30,
    title: 'Coin Change',
    url: 'https://leetcode.com/problems/coin-change',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Unbounded Knapsack.'
  },
  {
    id: 31,
    title: 'Number of Ways to Rearrange Sticks With K Sticks Visible',
    url: 'https://leetcode.com/problems/number-of-ways-to-rearrange-sticks-with-k-sticks-visible',
    difficulty: 'Hard',
    tags: ['DP', 'Combinatorics'],
    thought: 'Stirling numbers of the first kind.'
  },
  {
    id: 32,
    title: 'Stone Game V',
    url: 'https://leetcode.com/problems/stone-game-v',
    difficulty: 'Hard',
    tags: ['DP', 'Game Theory'],
    thought: 'Interval DP.'
  },
  {
    id: 33,
    title: 'Count Vowels Permutation',
    url: 'https://leetcode.com/problems/count-vowels-permutation',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'Linear DP with 5 states.'
  },
  {
    id: 34,
    title: 'Number of Dice Rolls With Target Sum',
    url: 'https://leetcode.com/problems/number-of-dice-rolls-with-target-sum',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Knapsack-like.'
  },
  {
    id: 35,
    title: 'Minimum Cost For Tickets',
    url: 'https://leetcode.com/problems/minimum-cost-for-tickets',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'dp[i] = min cost to cover day i.'
  },
  {
    id: 36,
    title: 'Numbers With Repeated Digits',
    url: 'https://leetcode.com/problems/numbers-with-repeated-digits',
    difficulty: 'Hard',
    tags: ['Digit DP', 'Math'],
    thought: 'Count numbers without repeated digits.'
  },
  {
    id: 37,
    title: 'Last Stone Weight II',
    url: 'https://leetcode.com/problems/last-stone-weight-ii',
    difficulty: 'Medium',
    tags: ['DP', 'Knapsack'],
    thought: 'Partition problem. Minimize difference between two subsets.'
  },
  {
    id: 38,
    title: 'Delete and Earn',
    url: 'https://leetcode.com/problems/delete-and-earn',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Reduce to House Robber.'
  },
  {
    id: 39,
    title: 'Numbers At Most N Given Digit Set',
    url: 'https://leetcode.com/problems/numbers-at-most-n-given-digit-set',
    difficulty: 'Hard',
    tags: ['Digit DP', 'Math'],
    thought: 'Count by length, then by prefix.'
  },
  {
    id: 40,
    title: 'Uncrossed Lines',
    url: 'https://leetcode.com/problems/uncrossed-lines',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Same as Longest Common Subsequence.'
  },
  {
    id: 41,
    title: 'Tallest Billboard',
    url: 'https://leetcode.com/problems/tallest-billboard',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'dp[diff] = max height.'
  },
  {
    id: 42,
    title: 'Combination Sum IV',
    url: 'https://leetcode.com/problems/combination-sum-iv',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Permutation sum.'
  },
  {
    id: 43,
    title: 'K Inverse Pairs Array',
    url: 'https://leetcode.com/problems/k-inverse-pairs-array',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'Prefix sum optimization.'
  },
  {
    id: 44,
    title: 'Target Sum',
    url: 'https://leetcode.com/problems/target-sum',
    difficulty: 'Medium',
    tags: ['DP', 'Knapsack'],
    thought: 'Subset sum.'
  },
  {
    id: 45,
    title: 'Frog Jump',
    url: 'https://leetcode.com/problems/frog-jump',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'Map state (pos, jump).'
  },
  {
    id: 46,
    title: 'Non-negative Integers without Consecutive Ones',
    url: 'https://leetcode.com/problems/non-negative-integers-without-consecutive-ones',
    difficulty: 'Hard',
    tags: ['Digit DP'],
    thought: 'Fibonacci numbers.'
  },
  {
    id: 47,
    title: 'Partition Equal Subset Sum',
    url: 'https://leetcode.com/problems/partition-equal-subset-sum',
    difficulty: 'Medium',
    tags: ['DP', 'Knapsack'],
    thought: 'Subset sum target = total/2.'
  },
  {
    id: 48,
    title: 'Coin Change II',
    url: 'https://leetcode.com/problems/coin-change-ii',
    difficulty: 'Medium',
    tags: ['DP', 'Knapsack'],
    thought: 'Unbounded Knapsack (Combinations).'
  },
  {
    id: 49,
    title: 'Partition to K Equal Sum Subsets',
    url: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets',
    difficulty: 'Medium',
    tags: ['Backtracking', 'DP'],
    thought: 'Bitmask DP or Backtracking.'
  },
  {
    id: 50,
    title: 'Remove K Digits',
    url: 'https://leetcode.com/problems/remove-k-digits',
    difficulty: 'Medium',
    tags: ['Stack', 'Greedy'],
    thought: 'Monotonic stack.'
  },
  {
    id: 51,
    title: 'Predict the Winner',
    url: 'https://leetcode.com/problems/predict-the-winner',
    difficulty: 'Medium',
    tags: ['DP', 'Game Theory'],
    thought: 'Minimax.'
  },
  {
    id: 52,
    title: 'Ones and Zeroes',
    url: 'https://leetcode.com/problems/ones-and-zeroes',
    difficulty: 'Medium',
    tags: ['DP', 'Knapsack'],
    thought: '2D Knapsack.'
  },
  {
    id: 53,
    title: 'Word Break',
    url: 'https://leetcode.com/problems/word-break',
    difficulty: 'Medium',
    tags: ['DP', 'Trie'],
    thought: 'dp[i] = valid prefix.'
  },
  {
    id: 54,
    title: 'Ugly Number II',
    url: 'https://leetcode.com/problems/ugly-number-ii',
    difficulty: 'Medium',
    tags: ['DP', 'Heap'],
    thought: 'Merge 3 sorted lists.'
  },
  {
    id: 55,
    title: 'Triangle',
    url: 'https://leetcode.com/problems/triangle',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Bottom-up path finding.'
  },
  {
    id: 56,
    title: 'Tiling a Rectangle with the Fewest Squares',
    url: 'https://leetcode.com/problems/tiling-a-rectangle-with-the-fewest-squares',
    difficulty: 'Hard',
    tags: ['Backtracking'],
    thought: 'NP-hard, small constraints.'
  },
  {
    id: 57,
    title: 'Best Time to Buy and Sell Stock II',
    url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii',
    difficulty: 'Medium',
    tags: ['Greedy', 'DP'],
    thought: 'Sum of positive differences.'
  },
  {
    id: 58,
    title: 'Best Time to Buy and Sell Stock III',
    url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: '2 transactions. Forward and backward pass.'
  },
  {
    id: 59,
    title: 'Best Time to Buy and Sell Stock IV',
    url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'k transactions. Generalized version.'
  },
  {
    id: 60,
    title: 'Maximum Alternating Subsequence Sum',
    url: 'https://leetcode.com/problems/maximum-alternating-subsequence-sum',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Two states: odd/even index.'
  },
  {
    id: 61,
    title: 'Best Time to Buy and Sell Stock with Transaction Fee',
    url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'State machine: hold/sold.'
  },
  {
    id: 62,
    title: 'Best Time to Buy and Sell Stock with Cooldown',
    url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'State machine: hold/sold/cooldown.'
  },
  {
    id: 63,
    title: 'Maximum Product of Splitted Binary Tree',
    url: 'https://leetcode.com/problems/maximum-product-of-splitted-binary-tree',
    difficulty: 'Medium',
    tags: ['Tree', 'DFS'],
    thought: 'Total sum, then check each subtree sum.'
  },
  {
    id: 64,
    title: 'Sum of Distances in Tree',
    url: 'https://leetcode.com/problems/sum-of-distances-in-tree',
    difficulty: 'Hard',
    tags: ['Tree', 'DP'],
    thought: 'Re-rooting technique.'
  },
  {
    id: 65,
    title: 'Binary Trees With Factors',
    url: 'https://leetcode.com/problems/binary-trees-with-factors',
    difficulty: 'Medium',
    tags: ['DP', 'Sorting'],
    thought: 'Sort, then check divisors.'
  },
  {
    id: 66,
    title: 'Binary Tree Maximum Path Sum',
    url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum',
    difficulty: 'Hard',
    tags: ['Tree', 'DFS'],
    thought: 'Max path through root vs max path in subtrees.'
  },
  {
    id: 67,
    title: 'Minimum Score Triangulation of Polygon',
    url: 'https://leetcode.com/problems/minimum-score-triangulation-of-polygon',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Interval DP.'
  },
  {
    id: 68,
    title: 'Minimum Cost to Merge Stones',
    url: 'https://leetcode.com/problems/minimum-cost-to-merge-stones',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'Interval DP.'
  },
  {
    id: 69,
    title: 'Super Egg Drop',
    url: 'https://leetcode.com/problems/super-egg-drop',
    difficulty: 'Hard',
    tags: ['DP', 'Binary Search'],
    thought: 'Invert the problem: max floors with k eggs and m moves.'
  },
  {
    id: 70,
    title: 'Remove Boxes',
    url: 'https://leetcode.com/problems/remove-boxes',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'Interval DP with extra state for attached boxes.'
  },
  {
    id: 71,
    title: 'Burst Balloons',
    url: 'https://leetcode.com/problems/burst-balloons',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'Interval DP. Reverse thinking: which balloon bursts last?'
  },
  {
    id: 72,
    title: 'Cherry Pickup II',
    url: 'https://leetcode.com/problems/cherry-pickup-ii',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: '3D DP (row, col1, col2).'
  },
  {
    id: 73,
    title: 'Paths in Matrix Whose Sum Is Divisible by K',
    url: 'https://leetcode.com/problems/paths-in-matrix-whose-sum-is-divisible-by-k',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'dp[r][c][remainder].'
  },
  {
    id: 74,
    title: 'Cherry Pickup',
    url: 'https://leetcode.com/problems/cherry-pickup',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'Two people starting from (0,0) to (N-1,N-1).'
  },
  {
    id: 75,
    title: 'Matrix Block Sum',
    url: 'https://leetcode.com/problems/matrix-block-sum',
    difficulty: 'Medium',
    tags: ['DP', 'Prefix Sum'],
    thought: '2D Prefix Sum.'
  },
  {
    id: 76,
    title: 'Minimum Falling Path Sum',
    url: 'https://leetcode.com/problems/minimum-falling-path-sum',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Simple grid DP.'
  },
  {
    id: 77,
    title: 'Longest Increasing Path in a Matrix',
    url: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix',
    difficulty: 'Hard',
    tags: ['DFS', 'Memoization'],
    thought: 'DFS with memoization.'
  },
  {
    id: 78,
    title: 'Max Sum of Rectangle No Larger Than K',
    url: 'https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k',
    difficulty: 'Hard',
    tags: ['DP', 'Binary Search'],
    thought: '2D Kadane + Binary Search.'
  },
  {
    id: 79,
    title: 'Out of Boundary Paths',
    url: 'https://leetcode.com/problems/out-of-boundary-paths',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'dp[k][r][c].'
  },
  {
    id: 80,
    title: 'Range Sum Query 2D - Immutable',
    url: 'https://leetcode.com/problems/range-sum-query-2d-immutable',
    difficulty: 'Medium',
    tags: ['DP', 'Prefix Sum'],
    thought: '2D Prefix Sum.'
  },
  {
    id: 81,
    title: 'Maximal Square',
    url: 'https://leetcode.com/problems/maximal-square',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'dp[i][j] = min(neighbors) + 1.'
  },
  {
    id: 82,
    title: 'Minimum Path Sum',
    url: 'https://leetcode.com/problems/minimum-path-sum',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Standard Grid DP.'
  },
  {
    id: 83,
    title: 'Maximal Rectangle',
    url: 'https://leetcode.com/problems/maximal-rectangle',
    difficulty: 'Hard',
    tags: ['DP', 'Stack'],
    thought: 'Histogram area problem on each row.'
  },
  {
    id: 84,
    title: 'Dungeon Game',
    url: 'https://leetcode.com/problems/dungeon-game',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'Reverse DP from bottom-right.'
  },
  {
    id: 85,
    title: 'Unique Paths',
    url: 'https://leetcode.com/problems/unique-paths',
    difficulty: 'Medium',
    tags: ['DP', 'Combinatorics'],
    thought: 'Grid DP or nCr.'
  },
  {
    id: 86,
    title: 'Unique Paths II',
    url: 'https://leetcode.com/problems/unique-paths-ii',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Grid DP with obstacles.'
  },
  {
    id: 87,
    title: 'Longest Palindromic Subsequence',
    url: 'https://leetcode.com/problems/longest-palindromic-subsequence',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'LCS of s and reverse(s).'
  },
  {
    id: 88,
    title: 'Longest Common Subsequence',
    url: 'https://leetcode.com/problems/longest-common-subsequence',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Standard 2D DP.'
  },
  {
    id: 89,
    title: 'Longest String Chain',
    url: 'https://leetcode.com/problems/longest-string-chain',
    difficulty: 'Medium',
    tags: ['DP', 'Hash Table'],
    thought: 'Sort by length, then DP.'
  },
  {
    id: 90,
    title: 'Longest Duplicate Substring',
    url: 'https://leetcode.com/problems/longest-duplicate-substring',
    difficulty: 'Hard',
    tags: ['String', 'Binary Search', 'Rolling Hash'],
    thought: 'Binary search on length + Rabin-Karp.'
  },
  {
    id: 91,
    title: 'Minimum ASCII Delete Sum for Two Strings',
    url: 'https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings',
    difficulty: 'Medium',
    tags: ['DP'],
    thought: 'Variation of LCS.'
  },
  {
    id: 92,
    title: 'Distinct Subsequences II',
    url: 'https://leetcode.com/problems/distinct-subsequences-ii',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'Count distinct subsequences ending with char c.'
  },
  {
    id: 93,
    title: 'Palindromic Substrings',
    url: 'https://leetcode.com/problems/palindromic-substrings',
    difficulty: 'Medium',
    tags: ['DP', 'String'],
    thought: 'Expand around center.'
  },
  {
    id: 94,
    title: 'Edit Distance',
    url: 'https://leetcode.com/problems/edit-distance',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'Standard 2D DP.'
  },
  {
    id: 95,
    title: 'Distinct Subsequences',
    url: 'https://leetcode.com/problems/distinct-subsequences',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: '2D DP counting paths.'
  },
  {
    id: 96,
    title: 'Regular Expression Matching',
    url: 'https://leetcode.com/problems/regular-expression-matching',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'Complex 2D DP.'
  },
  {
    id: 97,
    title: 'Wildcard Matching',
    url: 'https://leetcode.com/problems/wildcard-matching',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: '2D DP.'
  },
  {
    id: 98,
    title: 'Palindrome Partitioning',
    url: 'https://leetcode.com/problems/palindrome-partitioning',
    difficulty: 'Medium',
    tags: ['Backtracking', 'DP'],
    thought: 'Backtracking with palindrome check.'
  },
  {
    id: 99,
    title: 'Palindrome Partitioning II',
    url: 'https://leetcode.com/problems/palindrome-partitioning-ii',
    difficulty: 'Hard',
    tags: ['DP'],
    thought: 'Min cuts.'
  },
  {
    id: 100,
    title: 'Longest Palindromic Substring',
    url: 'https://leetcode.com/problems/longest-palindromic-substring',
    difficulty: 'Medium',
    tags: ['DP', 'String'],
    thought: 'Expand around center or Manacher.'
  }
];
