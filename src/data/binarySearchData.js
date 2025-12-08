export const binarySearchResources = [
  {
    title: 'Binary Search 101',
    url: 'https://leetcode.com/problems/binary-search/solutions/423162/binary-search-101/',
    type: 'Guide'
  },
  {
    title: 'Binary Search LeetCode MyList',
    url: 'https://leetcode.com/problem-list/oclgn8us/',
    type: 'Problem List'
  },
  {
    title: 'Python Binary Search Template',
    url: 'https://leetcode.com/discuss/study-guide/786126/Python-Powerful-Ultimate-Binary-Search-Template.-Solved-many-problems',
    type: 'Guide'
  }
];

export const binarySearchProblems = [
  {
    id: 1,
    title: 'Lower Bound',
    category: 'Bounds',
    difficulty: 'Easy',
    tags: ['Binary Search', 'STL'],
    thought: 'Returns first element >= target. If multiple equal values, returns first occurrence.',
    solution: {
      language: 'cpp',
      code: `// lower_bound: first element NOT LESS than val (>= val)
// Returns iterator to first such value

// Example:
// x = 5
// A = 1, 4, 5, 5, 5, 6
// lower_bound(5) = index 2 (value 5)

// x = 6  
// B = 1, 4, 5, 5, 6, 7
// lower_bound(6) = index 4 (value 6)

// Implementation
int lower_bound_impl(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size();
    
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo; // First element >= target
}

// STL usage
auto it = lower_bound(arr.begin(), arr.end(), target);
int index = it - arr.begin();`
    }
  },
  {
    id: 2,
    title: 'Upper Bound',
    category: 'Bounds',
    difficulty: 'Easy',
    tags: ['Binary Search', 'STL'],
    thought: 'Returns first element > target. Useful for finding range of equal elements.',
    solution: {
      language: 'cpp',
      code: `// upper_bound: first element GREATER than val (> val)
// Returns iterator to first such value

// Example:
// x = 5
// A = 1, 4, 5, 5, 5, 6
// upper_bound(5) = index 5 (value 6)

// x = 8
// B = 1, 4, 5, 5, 6, 7
// upper_bound(8) = index 6 (past end, not found)

// Implementation
int upper_bound_impl(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size();
    
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] <= target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo; // First element > target
}

// STL usage
auto it = upper_bound(arr.begin(), arr.end(), target);
int index = it - arr.begin();

// Count occurrences of target
int count = upper_bound(arr.begin(), arr.end(), target) 
          - lower_bound(arr.begin(), arr.end(), target);`
    }
  },
  {
    id: 3,
    title: 'Binary Search Template',
    category: 'Template',
    difficulty: 'Medium',
    tags: ['Binary Search', 'Template'],
    thought: 'Three key decisions: search space, condition, answer update. Template handles edge cases.',
    solution: {
      language: 'cpp',
      code: `// Universal Binary Search Template
// Find minimum x such that condition(x) is true

int binarySearch(int lo, int hi) {
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (condition(mid)) {
            hi = mid;      // Mid might be answer, search left
        } else {
            lo = mid + 1;  // Mid is not answer, search right
        }
    }
    return lo;
}

// Alternative: Find maximum x such that condition(x) is true
int binarySearchMax(int lo, int hi) {
    while (lo < hi) {
        int mid = lo + (hi - lo + 1) / 2; // Note: +1 to avoid infinite loop
        if (condition(mid)) {
            lo = mid;      // Mid might be answer, search right
        } else {
            hi = mid - 1;  // Mid is not answer, search left
        }
    }
    return lo;
}

// Standard binary search for exact match
int binarySearchExact(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return -1; // Not found
}`
    }
  },
  {
    id: 4,
    title: 'Search in Rotated Sorted Array',
    category: 'Classic',
    difficulty: 'Medium',
    tags: ['Binary Search', 'Rotated Array'],
    thought: 'One half is always sorted. Check which half target is in and adjust search space.',
    solution: {
      language: 'cpp',
      code: `int search(vector<int>& nums, int target) {
    int lo = 0, hi = nums.size() - 1;
    
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        
        if (nums[mid] == target) {
            return mid;
        }
        
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
}`
    }
  },
  {
    id: 5,
    title: 'Find Peak Element',
    category: 'Classic',
    difficulty: 'Medium',
    tags: ['Binary Search', 'Peak'],
    thought: 'If mid < mid+1, peak is on right. If mid > mid+1, peak is on left or at mid.',
    solution: {
      language: 'cpp',
      code: `int findPeakElement(vector<int>& nums) {
    int lo = 0, hi = nums.size() - 1;
    
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        
        if (nums[mid] > nums[mid + 1]) {
            // Peak is on left side (including mid)
            hi = mid;
        } else {
            // Peak is on right side
            lo = mid + 1;
        }
    }
    return lo;
}`
    }
  },
  {
    id: 6,
    title: 'Binary Search on Answer',
    category: 'Patterns',
    difficulty: 'Hard',
    tags: ['Binary Search', 'Optimization'],
    thought: 'When answer is in a range and you can verify if x is valid, binary search on x.',
    solution: {
      language: 'cpp',
      code: `// Pattern: Binary Search on Answer
// Use when: answer is in range [lo, hi] and you can check
// if a given answer x is valid in O(f(n))

// Example: Koko Eating Bananas
// Find minimum eating speed to finish all bananas in h hours
int minEatingSpeed(vector<int>& piles, int h) {
    int lo = 1;
    int hi = *max_element(piles.begin(), piles.end());
    
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        
        if (canFinish(piles, h, mid)) {
            hi = mid;  // Try to find smaller speed
        } else {
            lo = mid + 1;  // Need faster speed
        }
    }
    return lo;
}

bool canFinish(vector<int>& piles, int h, int speed) {
    long hours = 0;
    for (int pile : piles) {
        hours += (pile + speed - 1) / speed; // Ceiling division
    }
    return hours <= h;
}

// Similar problems:
// - Split Array Largest Sum
// - Capacity to Ship Packages
// - Allocate Minimum Pages`
    }
  }
];
