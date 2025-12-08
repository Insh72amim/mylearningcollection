export const standardPatternsResources = [
  {
    title: '14 Patterns to Ace Any Coding Interview',
    url: 'https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed',
    type: 'Guide'
  },
  {
    title: 'Grokking the Coding Interview',
    url: 'https://www.designgurus.io/course/grokking-the-coding-interview',
    type: 'Course'
  },
  {
    title: 'LeetCode Patterns',
    url: 'https://seanprashad.com/leetcode-patterns/',
    type: 'Patterns'
  },
  {
    title: 'NeetCode Roadmap',
    url: 'https://neetcode.io/roadmap',
    type: 'Roadmap'
  }
];

export const standardPatternsProblems = [
  // Pattern 1: Sliding Window
  {
    id: 1,
    title: 'Sliding Window',
    category: 'Array/String',
    difficulty: 'Medium',
    tags: ['Window', 'Subarray', 'Substring'],
    thought: 'Used for problems involving contiguous subarrays/substrings. Maintain a window that expands (right pointer) and contracts (left pointer) based on conditions. Avoids nested loops by reusing calculations.',
    solution: {
      language: 'cpp',
      code: `// Sliding Window Pattern
// Use when: Find subarrays/substrings satisfying some condition
// Time: O(n), Space: O(1) or O(k) for window elements

// Template: Variable size window
int slidingWindow(vector<int>& arr) {
    int left = 0, right = 0;
    int windowSum = 0, result = 0;
    
    while (right < arr.size()) {
        // Expand window - add arr[right] to window
        windowSum += arr[right];
        
        // Contract window while condition violated
        while (/* window condition violated */) {
            windowSum -= arr[left];
            left++;
        }
        
        // Update result
        result = max(result, right - left + 1);
        right++;
    }
    return result;
}

// Example: Longest Substring with K Distinct Characters
int longestSubstringKDistinct(string s, int k) {
    unordered_map<char, int> freq;
    int left = 0, maxLen = 0;
    
    for (int right = 0; right < s.size(); right++) {
        freq[s[right]]++;
        
        // Shrink window if more than k distinct chars
        while (freq.size() > k) {
            freq[s[left]]--;
            if (freq[s[left]] == 0) freq.erase(s[left]);
            left++;
        }
        
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}

// Common Problems:
// - Maximum Sum Subarray of Size K
// - Longest Substring Without Repeating Characters
// - Minimum Window Substring
// - Fruits Into Baskets`
    }
  },
  // Pattern 2: Two Pointers
  {
    id: 2,
    title: 'Two Pointers',
    category: 'Array/String',
    difficulty: 'Easy',
    tags: ['Pointers', 'Sorted Array', 'Pair Sum'],
    thought: 'Use when dealing with sorted arrays or linked lists to find pairs/triplets. Move pointers based on comparison with target. Reduces O(n²) brute force to O(n).',
    solution: {
      language: 'cpp',
      code: `// Two Pointers Pattern
// Use when: Sorted input, find pairs/triplets, palindrome check
// Time: O(n), Space: O(1)

// Template: Find pair with target sum in sorted array
pair<int,int> twoSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left < right) {
        int sum = arr[left] + arr[right];
        
        if (sum == target) {
            return {left, right};
        } else if (sum < target) {
            left++;  // Need larger sum
        } else {
            right--; // Need smaller sum
        }
    }
    return {-1, -1}; // Not found
}

// Template: Remove duplicates in-place
int removeDuplicates(vector<int>& arr) {
    if (arr.empty()) return 0;
    
    int slow = 0;
    for (int fast = 1; fast < arr.size(); fast++) {
        if (arr[fast] != arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }
    return slow + 1;
}

// Template: Three Sum
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    
    for (int i = 0; i < nums.size() - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        
        int left = i + 1, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left+1]) left++;
                while (left < right && nums[right] == nums[right-1]) right--;
                left++; right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}

// Common Problems:
// - Two Sum II (sorted array)
// - 3Sum, 4Sum
// - Container With Most Water
// - Trapping Rain Water`
    }
  },
  // Pattern 3: Fast & Slow Pointers
  {
    id: 3,
    title: 'Fast & Slow Pointers (Floyd\'s Cycle)',
    category: 'Linked List',
    difficulty: 'Medium',
    tags: ['Cycle Detection', 'Linked List', 'Tortoise Hare'],
    thought: 'Two pointers moving at different speeds. If there\'s a cycle, fast and slow will meet. Also finds middle element, and cycle start point.',
    solution: {
      language: 'cpp',
      code: `// Fast & Slow Pointers Pattern
// Use when: Cycle detection, middle element, cycle length
// Time: O(n), Space: O(1)

struct ListNode {
    int val;
    ListNode *next;
};

// Detect Cycle
bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        
        if (slow == fast) return true;
    }
    return false;
}

// Find Cycle Start
ListNode* detectCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    
    // Find meeting point
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        
        if (slow == fast) {
            // Move one pointer to head
            slow = head;
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow; // Cycle start
        }
    }
    return nullptr;
}

// Find Middle of Linked List
ListNode* middleNode(ListNode *head) {
    ListNode *slow = head, *fast = head;
    
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow; // Middle node
}

// Check Palindrome Linked List
bool isPalindrome(ListNode *head) {
    // Find middle
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    // Reverse second half
    ListNode *prev = nullptr;
    while (slow) {
        ListNode *next = slow->next;
        slow->next = prev;
        prev = slow;
        slow = next;
    }
    
    // Compare halves
    while (prev) {
        if (head->val != prev->val) return false;
        head = head->next;
        prev = prev->next;
    }
    return true;
}

// Common Problems:
// - Linked List Cycle I & II
// - Happy Number
// - Middle of Linked List
// - Palindrome Linked List`
    }
  },
  // Pattern 4: Merge Intervals
  {
    id: 4,
    title: 'Merge Intervals',
    category: 'Intervals',
    difficulty: 'Medium',
    tags: ['Sorting', 'Intervals', 'Overlapping'],
    thought: 'Sort intervals by start time. Iterate and merge overlapping intervals. Two intervals overlap if a.start <= b.end (after sorting).',
    solution: {
      language: 'cpp',
      code: `// Merge Intervals Pattern
// Use when: Overlapping intervals, scheduling, time ranges
// Time: O(n log n), Space: O(n)

// Check if two intervals overlap (assuming sorted by start)
bool overlaps(vector<int>& a, vector<int>& b) {
    return a[0] <= b[1] && b[0] <= a[1];
}

// Merge overlapping intervals
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    
    // Sort by start time
    sort(intervals.begin(), intervals.end());
    
    vector<vector<int>> merged;
    merged.push_back(intervals[0]);
    
    for (int i = 1; i < intervals.size(); i++) {
        vector<int>& last = merged.back();
        
        if (intervals[i][0] <= last[1]) {
            // Overlapping - merge
            last[1] = max(last[1], intervals[i][1]);
        } else {
            // Non-overlapping - add new interval
            merged.push_back(intervals[i]);
        }
    }
    return merged;
}

// Insert interval into sorted list
vector<vector<int>> insert(vector<vector<int>>& intervals, 
                           vector<int>& newInterval) {
    vector<vector<int>> result;
    int i = 0, n = intervals.size();
    
    // Add all intervals before newInterval
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push_back(intervals[i++]);
    }
    
    // Merge overlapping intervals
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = min(newInterval[0], intervals[i][0]);
        newInterval[1] = max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push_back(newInterval);
    
    // Add remaining intervals
    while (i < n) {
        result.push_back(intervals[i++]);
    }
    return result;
}

// Find intersection of two interval lists
vector<vector<int>> intervalIntersection(
    vector<vector<int>>& A, vector<vector<int>>& B) {
    vector<vector<int>> result;
    int i = 0, j = 0;
    
    while (i < A.size() && j < B.size()) {
        int lo = max(A[i][0], B[j][0]);
        int hi = min(A[i][1], B[j][1]);
        
        if (lo <= hi) {
            result.push_back({lo, hi});
        }
        
        // Move pointer with smaller end
        if (A[i][1] < B[j][1]) i++;
        else j++;
    }
    return result;
}

// Common Problems:
// - Merge Intervals
// - Insert Interval
// - Interval List Intersections
// - Meeting Rooms I & II`
    }
  },
  // Pattern 5: Cyclic Sort
  {
    id: 5,
    title: 'Cyclic Sort',
    category: 'Array',
    difficulty: 'Easy',
    tags: ['In-place', 'Missing Numbers', 'Duplicates'],
    thought: 'When given array of numbers in range [1, n], place each number at its correct index (num at index num-1). After sorting, any mismatch reveals missing/duplicate numbers.',
    solution: {
      language: 'cpp',
      code: `// Cyclic Sort Pattern
// Use when: Array contains numbers in range [1, n] or [0, n-1]
// Time: O(n), Space: O(1)

// Template: Sort numbers 1 to n in-place
void cyclicSort(vector<int>& nums) {
    int i = 0;
    while (i < nums.size()) {
        int correctIdx = nums[i] - 1; // For [1, n]
        // int correctIdx = nums[i];  // For [0, n-1]
        
        if (nums[i] != nums[correctIdx]) {
            swap(nums[i], nums[correctIdx]);
        } else {
            i++;
        }
    }
}

// Find Missing Number (0 to n, one missing)
int missingNumber(vector<int>& nums) {
    int i = 0, n = nums.size();
    
    while (i < n) {
        if (nums[i] < n && nums[i] != nums[nums[i]]) {
            swap(nums[i], nums[nums[i]]);
        } else {
            i++;
        }
    }
    
    for (int i = 0; i < n; i++) {
        if (nums[i] != i) return i;
    }
    return n;
}

// Find All Missing Numbers
vector<int> findDisappearedNumbers(vector<int>& nums) {
    int i = 0;
    while (i < nums.size()) {
        int correctIdx = nums[i] - 1;
        if (nums[i] != nums[correctIdx]) {
            swap(nums[i], nums[correctIdx]);
        } else {
            i++;
        }
    }
    
    vector<int> missing;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] != i + 1) {
            missing.push_back(i + 1);
        }
    }
    return missing;
}

// Find Duplicate Number
int findDuplicate(vector<int>& nums) {
    int i = 0;
    while (i < nums.size()) {
        if (nums[i] != i + 1) {
            int correctIdx = nums[i] - 1;
            if (nums[i] != nums[correctIdx]) {
                swap(nums[i], nums[correctIdx]);
            } else {
                return nums[i]; // Found duplicate
            }
        } else {
            i++;
        }
    }
    return -1;
}

// Common Problems:
// - Missing Number
// - Find All Numbers Disappeared in Array
// - Find the Duplicate Number
// - Find All Duplicates in Array
// - First Missing Positive`
    }
  },
  // Pattern 6: In-place Reversal of Linked List
  {
    id: 6,
    title: 'In-place Reversal of Linked List',
    category: 'Linked List',
    difficulty: 'Medium',
    tags: ['Reversal', 'In-place', 'Pointers'],
    thought: 'Reverse links by maintaining three pointers: prev, current, next. For partial reversal, track nodes before and after the reversed section.',
    solution: {
      language: 'cpp',
      code: `// In-place Linked List Reversal Pattern
// Use when: Reverse entire or part of linked list
// Time: O(n), Space: O(1)

struct ListNode {
    int val;
    ListNode *next;
};

// Reverse entire linked list
ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    
    while (curr != nullptr) {
        ListNode *next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// Reverse linked list between positions m and n
ListNode* reverseBetween(ListNode* head, int m, int n) {
    if (!head || m == n) return head;
    
    ListNode dummy(0);
    dummy.next = head;
    ListNode *prev = &dummy;
    
    // Move to position m-1
    for (int i = 0; i < m - 1; i++) {
        prev = prev->next;
    }
    
    // Reverse from m to n
    ListNode *curr = prev->next;
    for (int i = 0; i < n - m; i++) {
        ListNode *next = curr->next;
        curr->next = next->next;
        next->next = prev->next;
        prev->next = next;
    }
    
    return dummy.next;
}

// Reverse in groups of k
ListNode* reverseKGroup(ListNode* head, int k) {
    // Check if k nodes available
    ListNode *curr = head;
    int count = 0;
    while (curr && count < k) {
        curr = curr->next;
        count++;
    }
    
    if (count < k) return head;
    
    // Reverse k nodes
    ListNode *prev = nullptr;
    curr = head;
    for (int i = 0; i < k; i++) {
        ListNode *next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    
    // Recursively reverse remaining
    head->next = reverseKGroup(curr, k);
    return prev;
}

// Common Problems:
// - Reverse Linked List
// - Reverse Linked List II
// - Reverse Nodes in k-Group
// - Swap Nodes in Pairs
// - Rotate List`
    }
  },
  // Pattern 7: Tree BFS
  {
    id: 7,
    title: 'Tree Breadth-First Search (BFS)',
    category: 'Tree',
    difficulty: 'Medium',
    tags: ['Level Order', 'Queue', 'Tree'],
    thought: 'Use queue to process tree level by level. Track level size to identify level boundaries. Useful for level-order operations or finding minimum depth.',
    solution: {
      language: 'cpp',
      code: `// Tree BFS Pattern
// Use when: Level-order traversal, level-wise operations
// Time: O(n), Space: O(w) where w is max width

struct TreeNode {
    int val;
    TreeNode *left, *right;
};

// Level Order Traversal
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int levelSize = q.size();
        vector<int> currentLevel;
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();
            
            currentLevel.push_back(node->val);
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(currentLevel);
    }
    return result;
}

// Reverse Level Order
vector<vector<int>> levelOrderBottom(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int size = q.size();
        vector<int> level;
        
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front();
            q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.insert(result.begin(), level);
    }
    return result;
}

// Zigzag Level Order
vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    bool leftToRight = true;
    
    while (!q.empty()) {
        int size = q.size();
        vector<int> level(size);
        
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front();
            q.pop();
            
            int idx = leftToRight ? i : size - 1 - i;
            level[idx] = node->val;
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
        leftToRight = !leftToRight;
    }
    return result;
}

// Minimum Depth of Binary Tree
int minDepth(TreeNode* root) {
    if (!root) return 0;
    
    queue<TreeNode*> q;
    q.push(root);
    int depth = 1;
    
    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front();
            q.pop();
            
            // First leaf node = minimum depth
            if (!node->left && !node->right) return depth;
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        depth++;
    }
    return depth;
}

// Common Problems:
// - Binary Tree Level Order Traversal (I, II)
// - Zigzag Level Order Traversal
// - Minimum Depth of Binary Tree
// - Connect Level Order Siblings
// - Right Side View`
    }
  },
  // Pattern 8: Tree DFS
  {
    id: 8,
    title: 'Tree Depth-First Search (DFS)',
    category: 'Tree',
    difficulty: 'Medium',
    tags: ['Recursion', 'Path Sum', 'Traversal'],
    thought: 'Use recursion or stack to explore tree depth-first. Three orders: preorder (root first), inorder (root middle), postorder (root last). Track path for path-sum problems.',
    solution: {
      language: 'cpp',
      code: `// Tree DFS Pattern
// Use when: Path sum, tree traversal, path finding
// Time: O(n), Space: O(h) where h is height

struct TreeNode {
    int val;
    TreeNode *left, *right;
};

// Check if path sum exists
bool hasPathSum(TreeNode* root, int sum) {
    if (!root) return false;
    
    // Leaf node check
    if (!root->left && !root->right) {
        return sum == root->val;
    }
    
    return hasPathSum(root->left, sum - root->val) ||
           hasPathSum(root->right, sum - root->val);
}

// Find all root-to-leaf paths with given sum
void findPaths(TreeNode* root, int sum, 
               vector<int>& path, vector<vector<int>>& result) {
    if (!root) return;
    
    path.push_back(root->val);
    
    // Found valid path at leaf
    if (!root->left && !root->right && sum == root->val) {
        result.push_back(path);
    } else {
        findPaths(root->left, sum - root->val, path, result);
        findPaths(root->right, sum - root->val, path, result);
    }
    
    path.pop_back(); // Backtrack
}

vector<vector<int>> pathSum(TreeNode* root, int sum) {
    vector<vector<int>> result;
    vector<int> path;
    findPaths(root, sum, path, result);
    return result;
}

// Count paths with sum (paths can start anywhere)
int countPaths(TreeNode* root, long sum) {
    if (!root) return 0;
    return pathsFrom(root, sum) + 
           countPaths(root->left, sum) + 
           countPaths(root->right, sum);
}

int pathsFrom(TreeNode* node, long sum) {
    if (!node) return 0;
    int count = (node->val == sum) ? 1 : 0;
    return count + 
           pathsFrom(node->left, sum - node->val) + 
           pathsFrom(node->right, sum - node->val);
}

// Maximum Path Sum (path between any two nodes)
int maxSum = INT_MIN;

int maxGain(TreeNode* node) {
    if (!node) return 0;
    
    // Max sum of left/right subtree (ignore if negative)
    int leftGain = max(0, maxGain(node->left));
    int rightGain = max(0, maxGain(node->right));
    
    // Path through current node
    int pathSum = node->val + leftGain + rightGain;
    maxSum = max(maxSum, pathSum);
    
    // Return max one-sided path
    return node->val + max(leftGain, rightGain);
}

int maxPathSum(TreeNode* root) {
    maxGain(root);
    return maxSum;
}

// Common Problems:
// - Path Sum I, II, III
// - Binary Tree Maximum Path Sum
// - Diameter of Binary Tree
// - Sum Root to Leaf Numbers
// - Lowest Common Ancestor`
    }
  },
  // Pattern 9: Two Heaps
  {
    id: 9,
    title: 'Two Heaps',
    category: 'Heap',
    difficulty: 'Hard',
    tags: ['Median', 'Priority Queue', 'Streaming'],
    thought: 'Use max heap for smaller half and min heap for larger half. Balancing heaps gives O(1) median access. Useful for streaming data where median is needed.',
    solution: {
      language: 'cpp',
      code: `// Two Heaps Pattern
// Use when: Find median in stream, schedule tasks
// Time: O(log n) insert, O(1) median

class MedianFinder {
    priority_queue<int> maxHeap; // smaller half
    priority_queue<int, vector<int>, greater<int>> minHeap; // larger half
    
public:
    void addNum(int num) {
        // Add to max heap first
        maxHeap.push(num);
        
        // Balance: ensure max of smaller <= min of larger
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        
        // Size balance: maxHeap can have at most 1 more
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.top();
        }
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
};

// Sliding Window Median
vector<double> medianSlidingWindow(vector<int>& nums, int k) {
    multiset<int> small, large;
    vector<double> result;
    
    auto balance = [&]() {
        while (small.size() > large.size() + 1) {
            large.insert(*small.rbegin());
            small.erase(prev(small.end()));
        }
        while (large.size() > small.size()) {
            small.insert(*large.begin());
            large.erase(large.begin());
        }
    };
    
    for (int i = 0; i < nums.size(); i++) {
        if (small.empty() || nums[i] <= *small.rbegin()) {
            small.insert(nums[i]);
        } else {
            large.insert(nums[i]);
        }
        balance();
        
        if (i >= k - 1) {
            result.push_back(k & 1 ? 
                *small.rbegin() : 
                (*small.rbegin() + *large.begin()) / 2.0);
            
            // Remove outgoing element
            int out = nums[i - k + 1];
            if (small.count(out)) small.erase(small.find(out));
            else large.erase(large.find(out));
            balance();
        }
    }
    return result;
}

// Common Problems:
// - Find Median from Data Stream
// - Sliding Window Median
// - IPO (Project Selection)
// - Maximize Capital`
    }
  },
  // Pattern 10: Subsets
  {
    id: 10,
    title: 'Subsets (Power Set)',
    category: 'Backtracking',
    difficulty: 'Medium',
    tags: ['Recursion', 'Combinations', 'Permutations'],
    thought: 'For each element, choose to include or exclude it. Generates 2^n subsets. Use backtracking or BFS approach. Handle duplicates by sorting and skipping.',
    solution: {
      language: 'cpp',
      code: `// Subsets Pattern
// Use when: Generate all combinations/permutations/subsets
// Time: O(n * 2^n), Space: O(n)

// All subsets using backtracking
void backtrack(vector<int>& nums, int start, 
               vector<int>& current, vector<vector<int>>& result) {
    result.push_back(current);
    
    for (int i = start; i < nums.size(); i++) {
        current.push_back(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.pop_back();
    }
}

vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    backtrack(nums, 0, current, result);
    return result;
}

// Subsets with duplicates
vector<vector<int>> subsetsWithDup(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    vector<int> current;
    
    function<void(int)> backtrack = [&](int start) {
        result.push_back(current);
        for (int i = start; i < nums.size(); i++) {
            // Skip duplicates
            if (i > start && nums[i] == nums[i-1]) continue;
            current.push_back(nums[i]);
            backtrack(i + 1);
            current.pop_back();
        }
    };
    
    backtrack(0);
    return result;
}

// Permutations
vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> result;
    
    function<void(int)> backtrack = [&](int start) {
        if (start == nums.size()) {
            result.push_back(nums);
            return;
        }
        for (int i = start; i < nums.size(); i++) {
            swap(nums[start], nums[i]);
            backtrack(start + 1);
            swap(nums[start], nums[i]);
        }
    };
    
    backtrack(0);
    return result;
}

// Letter Combinations of Phone Number
vector<string> letterCombinations(string digits) {
    if (digits.empty()) return {};
    
    vector<string> mapping = {"", "", "abc", "def", "ghi", 
                              "jkl", "mno", "pqrs", "tuv", "wxyz"};
    vector<string> result;
    
    function<void(int, string&)> backtrack = [&](int idx, string& combo) {
        if (idx == digits.size()) {
            result.push_back(combo);
            return;
        }
        for (char c : mapping[digits[idx] - '0']) {
            combo.push_back(c);
            backtrack(idx + 1, combo);
            combo.pop_back();
        }
    };
    
    string combo;
    backtrack(0, combo);
    return result;
}

// Common Problems:
// - Subsets I & II
// - Permutations I & II
// - Combinations, Combination Sum
// - Letter Combinations of Phone Number
// - Generate Parentheses`
    }
  },
  // Pattern 11: Modified Binary Search
  {
    id: 11,
    title: 'Modified Binary Search',
    category: 'Binary Search',
    difficulty: 'Medium',
    tags: ['Search', 'Rotated Array', 'Peak'],
    thought: 'Apply binary search to variations: rotated arrays, unknown size, peak finding, search on answer. Key: identify which half has the answer based on mid comparison.',
    solution: {
      language: 'cpp',
      code: `// Modified Binary Search Pattern
// Use when: Sorted/rotated array, search space optimization
// Time: O(log n)

// Search in Rotated Sorted Array
int searchRotated(vector<int>& nums, int target) {
    int lo = 0, hi = nums.size() - 1;
    
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        
        if (nums[mid] == target) return mid;
        
        // Left half is sorted
        if (nums[lo] <= nums[mid]) {
            if (target >= nums[lo] && target < nums[mid]) {
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[hi]) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
    }
    return -1;
}

// Find Minimum in Rotated Sorted Array
int findMin(vector<int>& nums) {
    int lo = 0, hi = nums.size() - 1;
    
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        
        if (nums[mid] > nums[hi]) {
            lo = mid + 1; // Min in right half
        } else {
            hi = mid; // Min in left half (including mid)
        }
    }
    return nums[lo];
}

// Find Peak Element
int findPeakElement(vector<int>& nums) {
    int lo = 0, hi = nums.size() - 1;
    
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        
        if (nums[mid] > nums[mid + 1]) {
            hi = mid; // Peak on left
        } else {
            lo = mid + 1; // Peak on right
        }
    }
    return lo;
}

// Binary Search on Answer (Koko Eating Bananas)
bool canFinish(vector<int>& piles, int h, int speed) {
    long hours = 0;
    for (int pile : piles) {
        hours += (pile + speed - 1) / speed;
    }
    return hours <= h;
}

int minEatingSpeed(vector<int>& piles, int h) {
    int lo = 1, hi = *max_element(piles.begin(), piles.end());
    
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (canFinish(piles, h, mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}

// Common Problems:
// - Search in Rotated Sorted Array I & II
// - Find Minimum in Rotated Sorted Array
// - Find Peak Element
// - Koko Eating Bananas
// - Capacity to Ship Packages`
    }
  },
  // Pattern 12: Top K Elements
  {
    id: 12,
    title: 'Top K Elements',
    category: 'Heap',
    difficulty: 'Medium',
    tags: ['Heap', 'Priority Queue', 'Quickselect'],
    thought: 'For K largest: use min heap of size K (smaller elements get removed). For K smallest: use max heap of size K. Alternative: Quickselect for O(n) average.',
    solution: {
      language: 'cpp',
      code: `// Top K Elements Pattern
// Use when: Find K largest/smallest/frequent
// Time: O(n log k) with heap, O(n) avg with quickselect

// K Largest using Min Heap
vector<int> findKLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    
    vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top());
        minHeap.pop();
    }
    return result;
}

// Kth Largest Element
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    return minHeap.top();
}

// K Closest Points to Origin
vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
    // Max heap with distance as key
    auto cmp = [](vector<int>& a, vector<int>& b) {
        return a[0]*a[0] + a[1]*a[1] < b[0]*b[0] + b[1]*b[1];
    };
    priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> maxHeap(cmp);
    
    for (auto& p : points) {
        maxHeap.push(p);
        if (maxHeap.size() > k) {
            maxHeap.pop();
        }
    }
    
    vector<vector<int>> result;
    while (!maxHeap.empty()) {
        result.push_back(maxHeap.top());
        maxHeap.pop();
    }
    return result;
}

// Top K Frequent Elements
vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> freq;
    for (int n : nums) freq[n]++;
    
    // Min heap of {frequency, element}
    priority_queue<pair<int,int>, 
                   vector<pair<int,int>>, 
                   greater<pair<int,int>>> minHeap;
    
    for (auto& [num, count] : freq) {
        minHeap.push({count, num});
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    
    vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top().second);
        minHeap.pop();
    }
    return result;
}

// Common Problems:
// - Kth Largest Element
// - K Closest Points to Origin
// - Top K Frequent Elements
// - Kth Largest in Stream
// - Reorganize String`
    }
  },
  // Pattern 13: K-way Merge
  {
    id: 13,
    title: 'K-way Merge',
    category: 'Heap',
    difficulty: 'Hard',
    tags: ['Merge', 'Sorted Lists', 'Priority Queue'],
    thought: 'Merge K sorted arrays/lists. Use min heap with one element from each array. Pop smallest, push next from same array. Similar to merge sort but for K lists.',
    solution: {
      language: 'cpp',
      code: `// K-way Merge Pattern
// Use when: Merge K sorted lists/arrays
// Time: O(N log K) where N = total elements

struct ListNode {
    int val;
    ListNode *next;
};

// Merge K Sorted Lists
ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) {
        return a->val > b->val;
    };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
    
    // Add first node from each list
    for (auto list : lists) {
        if (list) pq.push(list);
    }
    
    ListNode dummy(0);
    ListNode* tail = &dummy;
    
    while (!pq.empty()) {
        ListNode* node = pq.top();
        pq.pop();
        
        tail->next = node;
        tail = tail->next;
        
        if (node->next) {
            pq.push(node->next);
        }
    }
    return dummy.next;
}

// Merge K Sorted Arrays
vector<int> mergeKSortedArrays(vector<vector<int>>& arrays) {
    // {value, array_index, element_index}
    priority_queue<tuple<int,int,int>, 
                   vector<tuple<int,int,int>>,
                   greater<tuple<int,int,int>>> pq;
    
    for (int i = 0; i < arrays.size(); i++) {
        if (!arrays[i].empty()) {
            pq.push({arrays[i][0], i, 0});
        }
    }
    
    vector<int> result;
    while (!pq.empty()) {
        auto [val, arrIdx, elemIdx] = pq.top();
        pq.pop();
        result.push_back(val);
        
        if (elemIdx + 1 < arrays[arrIdx].size()) {
            pq.push({arrays[arrIdx][elemIdx + 1], arrIdx, elemIdx + 1});
        }
    }
    return result;
}

// Kth Smallest in Sorted Matrix
int kthSmallest(vector<vector<int>>& matrix, int k) {
    int n = matrix.size();
    priority_queue<tuple<int,int,int>,
                   vector<tuple<int,int,int>>,
                   greater<tuple<int,int,int>>> pq;
    
    // Add first column
    for (int i = 0; i < min(n, k); i++) {
        pq.push({matrix[i][0], i, 0});
    }
    
    int result = 0;
    while (k-- > 0) {
        auto [val, row, col] = pq.top();
        pq.pop();
        result = val;
        
        if (col + 1 < n) {
            pq.push({matrix[row][col + 1], row, col + 1});
        }
    }
    return result;
}

// Common Problems:
// - Merge K Sorted Lists
// - Kth Smallest in Sorted Matrix
// - Smallest Range Covering K Lists
// - Find K Pairs with Smallest Sums`
    }
  },
  // Pattern 14: Topological Sort
  {
    id: 14,
    title: 'Topological Sort',
    category: 'Graph',
    difficulty: 'Medium',
    tags: ['DAG', 'Ordering', 'Dependencies'],
    thought: 'Order nodes in DAG such that for every edge u→v, u comes before v. Use Kahn\'s BFS (process nodes with 0 indegree) or DFS with completion order.',
    solution: {
      language: 'cpp',
      code: `// Topological Sort Pattern
// Use when: Task scheduling, dependencies, course order
// Time: O(V + E)

// Kahn's Algorithm (BFS)
vector<int> topologicalSort(int n, vector<vector<int>>& edges) {
    vector<int> indegree(n, 0);
    vector<vector<int>> adj(n);
    
    for (auto& e : edges) {
        adj[e[0]].push_back(e[1]);
        indegree[e[1]]++;
    }
    
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    vector<int> result;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        result.push_back(node);
        
        for (int neighbor : adj[node]) {
            indegree[neighbor]--;
            if (indegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }
    
    // Check for cycle
    if (result.size() != n) return {};
    return result;
}

// Course Schedule (Cycle Detection)
bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<int> indegree(numCourses, 0);
    vector<vector<int>> adj(numCourses);
    
    for (auto& p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        indegree[p[0]]++;
    }
    
    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    int count = 0;
    while (!q.empty()) {
        int course = q.front();
        q.pop();
        count++;
        
        for (int next : adj[course]) {
            if (--indegree[next] == 0) {
                q.push(next);
            }
        }
    }
    return count == numCourses;
}

// All Topological Orderings (Backtracking)
void allOrders(vector<vector<int>>& adj, vector<int>& indegree,
               vector<int>& current, vector<vector<int>>& result,
               vector<bool>& visited) {
    bool found = false;
    
    for (int i = 0; i < adj.size(); i++) {
        if (indegree[i] == 0 && !visited[i]) {
            found = true;
            visited[i] = true;
            current.push_back(i);
            
            for (int n : adj[i]) indegree[n]--;
            allOrders(adj, indegree, current, result, visited);
            for (int n : adj[i]) indegree[n]++;
            
            current.pop_back();
            visited[i] = false;
        }
    }
    
    if (!found && current.size() == adj.size()) {
        result.push_back(current);
    }
}

// Common Problems:
// - Course Schedule I & II
// - Alien Dictionary
// - Sequence Reconstruction
// - Minimum Height Trees`
    }
  }
];
