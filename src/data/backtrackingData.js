export const backtrackingResources = [
  {
    title: 'Backtracking Patterns - LeetCode',
    url: 'https://leetcode.com/problems/permutations/solutions/18239/A-general-approach-to-backtracking-questions-in-Java-(Subsets-Permutations-Combination-Sum-Palindrome-Partioning)/',
    type: 'Guide'
  },
  {
    title: 'Backtracking MyList',
    url: 'https://leetcode.com/problem-list/ogcizgl5/',
    type: 'Problem List'
  },
  {
    title: 'Subsets Pattern',
    url: 'https://leetcode.com/problems/subsets/solutions/27281/A-general-approach-to-backtracking-questions-in-Java-(Subsets-Permutations-Combination-Sum-Palindrome-Partitioning)/',
    type: 'Guide'
  }
];

export const backtrackingProblems = [
  {
    id: 1,
    title: 'Permutations Template',
    category: 'Permutation',
    difficulty: 'Medium',
    tags: ['Backtracking', 'Permutation'],
    thought: 'Try each unused element at current position. Mark used, recurse, then backtrack.',
    solution: {
      language: 'cpp',
      code: `// Generate all permutations
vector<int> permutation;
vector<bool> chosen;
int n;

void search() {
    if (permutation.size() == n) {
        // Process permutation here
        return;
    }
    
    for (int i = 0; i < n; i++) {
        if (chosen[i]) continue;
        
        chosen[i] = true;
        permutation.push_back(i);
        
        search();
        
        chosen[i] = false;
        permutation.pop_back();
    }
}

// Usage
void generatePermutations(int size) {
    n = size;
    chosen.assign(n, false);
    search();
}`
    }
  },
  {
    id: 2,
    title: 'Subsets Template',
    category: 'Subset',
    difficulty: 'Medium',
    tags: ['Backtracking', 'Subset', 'Power Set'],
    thought: 'For each element, either include or exclude it. Generates 2^n subsets.',
    solution: {
      language: 'cpp',
      code: `// Generate all subsets (power set)
vector<vector<int>> result;
vector<int> current;

void generateSubsets(vector<int>& nums, int index) {
    result.push_back(current);
    
    for (int i = index; i < nums.size(); i++) {
        current.push_back(nums[i]);
        generateSubsets(nums, i + 1);
        current.pop_back();
    }
}

// Alternative: Bit manipulation approach
vector<vector<int>> subsets(vector<int>& nums) {
    int n = nums.size();
    int total = 1 << n; // 2^n subsets
    vector<vector<int>> result;
    
    for (int mask = 0; mask < total; mask++) {
        vector<int> subset;
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                subset.push_back(nums[i]);
            }
        }
        result.push_back(subset);
    }
    return result;
}`
    }
  },
  {
    id: 3,
    title: 'Combination Sum Template',
    category: 'Combination',
    difficulty: 'Medium',
    tags: ['Backtracking', 'Combination'],
    thought: 'Include element and try again with same element (if allowed) or move to next.',
    solution: {
      language: 'cpp',
      code: `// Combination Sum - elements can be reused
void combinationSum(vector<int>& candidates, int target, 
                    int index, vector<int>& current, 
                    vector<vector<int>>& result) {
    if (target == 0) {
        result.push_back(current);
        return;
    }
    if (target < 0) return;
    
    for (int i = index; i < candidates.size(); i++) {
        current.push_back(candidates[i]);
        // Pass i (not i+1) to allow reuse
        combinationSum(candidates, target - candidates[i], 
                       i, current, result);
        current.pop_back();
    }
}

// Combination Sum II - elements used once, skip duplicates
void combinationSum2(vector<int>& candidates, int target,
                     int index, vector<int>& current,
                     vector<vector<int>>& result) {
    if (target == 0) {
        result.push_back(current);
        return;
    }
    
    for (int i = index; i < candidates.size(); i++) {
        // Skip duplicates
        if (i > index && candidates[i] == candidates[i-1]) 
            continue;
        if (candidates[i] > target) break;
        
        current.push_back(candidates[i]);
        combinationSum2(candidates, target - candidates[i],
                        i + 1, current, result);
        current.pop_back();
    }
}`
    }
  },
  {
    id: 4,
    title: 'Palindrome Partitioning',
    category: 'Partition',
    difficulty: 'Medium',
    tags: ['Backtracking', 'Palindrome'],
    thought: 'Try all partition points. If prefix is palindrome, recurse on suffix.',
    solution: {
      language: 'cpp',
      code: `bool isPalindrome(string& s, int l, int r) {
    while (l < r) {
        if (s[l++] != s[r--]) return false;
    }
    return true;
}

void partition(string& s, int start, vector<string>& current,
               vector<vector<string>>& result) {
    if (start >= s.size()) {
        result.push_back(current);
        return;
    }
    
    for (int end = start; end < s.size(); end++) {
        if (isPalindrome(s, start, end)) {
            current.push_back(s.substr(start, end - start + 1));
            partition(s, end + 1, current, result);
            current.pop_back();
        }
    }
}

vector<vector<string>> partition(string s) {
    vector<vector<string>> result;
    vector<string> current;
    partition(s, 0, current, result);
    return result;
}`
    }
  },
  {
    id: 5,
    title: 'N-Queens',
    category: 'Classic',
    difficulty: 'Hard',
    tags: ['Backtracking', 'Chess'],
    thought: 'Place queen row by row. Check column, diagonal conflicts before placing.',
    solution: {
      language: 'cpp',
      code: `bool isSafe(vector<string>& board, int row, int col, int n) {
    // Check column
    for (int i = 0; i < row; i++)
        if (board[i][col] == 'Q') return false;
    
    // Check upper-left diagonal
    for (int i = row-1, j = col-1; i >= 0 && j >= 0; i--, j--)
        if (board[i][j] == 'Q') return false;
    
    // Check upper-right diagonal
    for (int i = row-1, j = col+1; i >= 0 && j < n; i--, j++)
        if (board[i][j] == 'Q') return false;
    
    return true;
}

void solve(int row, int n, vector<string>& board,
           vector<vector<string>>& result) {
    if (row == n) {
        result.push_back(board);
        return;
    }
    
    for (int col = 0; col < n; col++) {
        if (isSafe(board, row, col, n)) {
            board[row][col] = 'Q';
            solve(row + 1, n, board, result);
            board[row][col] = '.';
        }
    }
}

vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> result;
    vector<string> board(n, string(n, '.'));
    solve(0, n, board, result);
    return result;
}`
    }
  },
  {
    id: 6,
    title: 'Longest Increasing Subsequence',
    category: 'DP + Backtracking',
    difficulty: 'Medium',
    tags: ['LIS', 'DP'],
    thought: 'DP: dp[i] = max LIS ending at i. For each j < i, if nums[i] > nums[j], update.',
    solution: {
      language: 'cpp',
      code: `// O(n²) DP approach
int lengthOfLIS(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n, 1);
    
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < i; ++j) {
            if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
            }
        }
    }
    return *max_element(dp.begin(), dp.end());
}

// O(n log n) Binary Search approach
int lengthOfLIS_optimized(vector<int>& nums) {
    vector<int> tails; // tails[i] = smallest tail for LIS of length i+1
    
    for (int num : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), num);
        if (it == tails.end()) {
            tails.push_back(num);
        } else {
            *it = num;
        }
    }
    return tails.size();
}`
    }
  }
];
