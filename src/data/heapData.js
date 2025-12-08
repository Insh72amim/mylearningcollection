export const heapResources = [
  {
    title: 'Heap LeetCode MyList',
    url: 'https://leetcode.com/problem-list/o47dbbme/',
    type: 'Problem List'
  },
  {
    title: 'Top K Elements Pattern',
    url: 'https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed',
    type: 'Guide'
  }
];

export const heapProblems = [
  {
    id: 1,
    title: 'Build Max Heap from Array',
    category: 'Implementation',
    difficulty: 'Medium',
    tags: ['Heap', 'Heapify'],
    thought: 'Start from last non-leaf node (n/2-1) and heapify down. O(n) time complexity.',
    solution: {
      language: 'cpp',
      code: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest])
        largest = l;

    if (r < n && arr[r] > arr[largest])
        largest = r;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void buildHeap(int arr[], int n) {
    // Start from last non-leaf node
    int startIdx = (n / 2) - 1;
    for (int i = startIdx; i >= 0; i--) {
        heapify(arr, n, i);
    }
}`
    }
  },
  {
    id: 2,
    title: 'Find K Pairs with Smallest Sums',
    category: 'Top K',
    difficulty: 'Medium',
    tags: ['Heap', 'Priority Queue'],
    thought: 'Use max heap of size K. Push pairs, if sum < top sum, replace top.',
    solution: {
      language: 'cpp',
      code: `struct mycompare {
    bool operator()(pair<int, int>& p1, pair<int, int>& p2) {
        return p1.first + p1.second < p2.first + p2.second;
    }
};

vector<vector<int>> kSmallestPairs(vector<int>& nums1, 
                                    vector<int>& nums2, int k) {
    vector<vector<int>> res;
    priority_queue<pair<int,int>, vector<pair<int, int>>, mycompare> pq;
    
    for (int i = 0; i < min((int)nums1.size(), k); i++) {
        for (int j = 0; j < min((int)nums2.size(), k); j++) {
            if (pq.size() < k) {
                pq.push(make_pair(nums1[i], nums2[j]));
            } else if (nums1[i] + nums2[j] < 
                       pq.top().first + pq.top().second) {
                pq.push(make_pair(nums1[i], nums2[j]));
                pq.pop();
            }
        }
    }
    
    while (!pq.empty()) {
        vector<int> v;
        v.push_back(pq.top().first);
        v.push_back(pq.top().second);
        res.push_back(v);
        pq.pop();
    }
    return res;
}`
    }
  },
  {
    id: 3,
    title: 'K-way Merge Pattern',
    category: 'Patterns',
    difficulty: 'Hard',
    tags: ['Heap', 'Merge', 'K-way'],
    thought: 'Insert first element of each array in min heap. Pop min, push next from same array.',
    solution: {
      language: 'cpp',
      code: `// K-way Merge: Merge K sorted arrays
// Time: O(N log K) where N = total elements

vector<int> mergeKSortedArrays(vector<vector<int>>& arrays) {
    // {value, array_index, element_index}
    priority_queue<tuple<int,int,int>, 
                   vector<tuple<int,int,int>>,
                   greater<tuple<int,int,int>>> pq;
    
    // Insert first element of each array
    for (int i = 0; i < arrays.size(); i++) {
        if (!arrays[i].empty()) {
            pq.push({arrays[i][0], i, 0});
        }
    }
    
    vector<int> result;
    while (!pq.empty()) {
        auto [val, arr_idx, elem_idx] = pq.top();
        pq.pop();
        result.push_back(val);
        
        // Push next element from same array
        if (elem_idx + 1 < arrays[arr_idx].size()) {
            pq.push({arrays[arr_idx][elem_idx + 1], 
                     arr_idx, elem_idx + 1});
        }
    }
    return result;
}`
    }
  },
  {
    id: 4,
    title: 'Two Heaps - Find Median',
    category: 'Patterns',
    difficulty: 'Hard',
    tags: ['Heap', 'Two Heaps', 'Median'],
    thought: 'Use max heap for left half, min heap for right half. Balance sizes to get median.',
    solution: {
      language: 'cpp',
      code: `// Two Heaps Pattern for Running Median
class MedianFinder {
    priority_queue<int> maxHeap; // left half
    priority_queue<int, vector<int>, greater<int>> minHeap; // right half
    
public:
    void addNum(int num) {
        // Add to max heap (left half)
        maxHeap.push(num);
        
        // Balance: largest of left <= smallest of right
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        
        // Balance sizes: left can have at most 1 more
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
};`
    }
  },
  {
    id: 5,
    title: 'Top K Elements Pattern',
    category: 'Patterns',
    difficulty: 'Medium',
    tags: ['Heap', 'Top K'],
    thought: 'For top K largest: use min heap of size K. For K smallest: use max heap of size K.',
    solution: {
      language: 'cpp',
      code: `// Top K Elements Pattern
// Time: O(N log K), Space: O(K)

// Find K largest elements
vector<int> findKLargest(vector<int>& nums, int k) {
    // Min heap of size K
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop(); // Remove smallest
        }
    }
    
    vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top());
        minHeap.pop();
    }
    return result;
}

// Find K smallest elements
vector<int> findKSmallest(vector<int>& nums, int k) {
    // Max heap of size K
    priority_queue<int> maxHeap;
    
    for (int num : nums) {
        maxHeap.push(num);
        if (maxHeap.size() > k) {
            maxHeap.pop(); // Remove largest
        }
    }
    
    vector<int> result;
    while (!maxHeap.empty()) {
        result.push_back(maxHeap.top());
        maxHeap.pop();
    }
    return result;
}`
    }
  }
];
