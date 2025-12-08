export const arraysResources = [
  {
    title: '14 Patterns to Ace Any Coding Interview',
    url: 'https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed',
    type: 'Guide'
  },
  {
    title: "Striver's SDE Sheet",
    url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/',
    type: 'Problem List'
  },
  {
    title: 'NeetCode Practice',
    url: 'https://neetcode.io/practice',
    type: 'Practice'
  },
  {
    title: '450 DSA Cracker',
    url: 'https://450dsa.com/',
    type: 'Problem List'
  },
  {
    title: 'LeetCode Patterns',
    url: 'https://seanprashad.com/leetcode-patterns/',
    type: 'Patterns'
  },
  {
    title: 'Awesome LeetCode Resources',
    url: 'https://github.com/ashishps1/awesome-leetcode-resources',
    type: 'GitHub'
  }
];

export const arraysProblems = [
  // BIT Manipulation Section
  {
    id: 1,
    title: 'Bit Manipulation Basics',
    category: 'BIT Manipulation',
    difficulty: 'Easy',
    tags: ['Bits', 'Fundamentals'],
    thought: 'A number 1 << k has a one bit in position k. Use x & (1 << k) to check if kth bit is set.',
    solution: {
      language: 'cpp',
      code: `// Print bit representation of an int
for (int i = 31; i >= 0; i--) {
    if (x & (1<<i)) cout << "1";
    else cout << "0";
}

// Common Bit Operations:
// x | (1 << k)  : sets the kth bit of x to one
// x ^ (1 << k)  : inverts the kth bit of x
// x & ~(1 << k) : sets the kth bit of x to zero
// x & (x−1)     : sets the last one bit of x to zero
// x & −x        : sets all one bits to zero, except last one
// x | (x−1)     : inverts all bits after the last one bit
// x & (x−1) = 0 : implies x is a power of 2`
    }
  },
  // Sorting Section
  {
    id: 2,
    title: 'Merge Sort',
    category: 'Sorting',
    difficulty: 'Medium',
    tags: ['Sorting', 'Divide & Conquer', 'Stable'],
    thought: 'Divide array in half, sort each half, merge. O(nlogn) time, O(n) space. Stable sort.',
    solution: {
      language: 'cpp',
      code: `// Best: O(nlogn), Worst: O(nlogn), Average: O(nlogn)
// Stable: Yes

void merge(int array[], int l, int m, int r) {
    int len1 = m - l + 1, len2 = r - m;
    int larray[len1], rarray[len2];
    
    for (int i = 0; i < len1; i++)
        larray[i] = array[l + i];
    for (int j = 0; j < len2; j++)
        rarray[j] = array[m + 1 + j];

    int ind1 = 0, ind2 = 0, im = l;

    while (ind1 < len1 && ind2 < len2) {
        if (larray[ind1] <= rarray[ind2]) {
            array[im] = larray[ind1];
            ind1++;
        } else {
            array[im] = rarray[ind2];
            ind2++;
        }
        im++;
    }

    while (ind1 < len1) {
        array[im] = larray[ind1];
        ind1++;
        im++;
    }

    while (ind2 < len2) {
        array[im] = rarray[ind2];
        ind2++;
        im++;
    }
}

void mergeSort(int array[], int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(array, l, m);
    mergeSort(array, m + 1, r);
    merge(array, l, m, r);
}`
    }
  },
  {
    id: 3,
    title: 'Heap Sort',
    category: 'Sorting',
    difficulty: 'Medium',
    tags: ['Sorting', 'Heap', 'In-place'],
    thought: 'Build max heap, repeatedly extract max and heapify. O(nlogn), in-place, not stable.',
    solution: {
      language: 'cpp',
      code: `// Best: O(nlogn), Worst: O(nlogn), Average: O(nlogn)
// Stable: No

void heapify(int arr[], int n, int i) {
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

void heapSort(int arr[], int n) {
    // Build heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // Extract elements one by one
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`
    }
  },
  {
    id: 4,
    title: 'Quick Sort',
    category: 'Sorting',
    difficulty: 'Medium',
    tags: ['Sorting', 'Divide & Conquer', 'Partition'],
    thought: 'Pick pivot, partition array around pivot, recursively sort partitions. Avg O(nlogn), worst O(n²).',
    solution: {
      language: 'cpp',
      code: `// Best: O(nlogn), Worst: O(n²), Average: O(nlogn)
// Stable: No

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int j = low;
    for (int i = low; i <= high - 1; i++) {
        if (arr[i] < pivot) {
            swap(arr[i], arr[j]);
            j++;
        }
    }
    swap(arr[j], arr[high]);
    return j;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int p = partition(arr, low, high);
        quickSort(arr, low, p - 1);
        quickSort(arr, p + 1, high);
    }
}`
    }
  },
  // Classic Problems
  {
    id: 5,
    title: "Kadane's Algorithm - Max Subarray Sum",
    category: 'Classic Problems',
    difficulty: 'Easy',
    tags: ['DP', 'Subarray'],
    thought: 'Track current sum and max sum. Reset current sum when it goes negative.',
    solution: {
      language: 'cpp',
      code: `int maxSubarraySum(int arr[], int n) {
    int maxSum = INT_MIN, currSum = 0;
   
    for (int i = 0; i < n; i++) {
        currSum += arr[i];
        if (currSum > maxSum) maxSum = currSum;
        if (currSum < 0) currSum = 0;
    }
    return maxSum;
}`
    }
  },
  {
    id: 6,
    title: 'Max Subarray Sum Less Than K',
    category: 'Classic Problems',
    difficulty: 'Hard',
    tags: ['Prefix Sum', 'Binary Search', 'Set'],
    thought: 'Use prefix sums with ordered set. For each prefix sum, find smallest prefix > (cum - K).',
    solution: {
      language: 'cpp',
      code: `int best_cumulative_sum(int ar[], int N, int K) { 
    set<int> cumset; 
    cumset.insert(0); 
 
    int best = 0, cum = 0; 
 
    for (int i = 0; i < N; i++) { 
        cum += ar[i]; 
        set<int>::iterator sit = cumset.upper_bound(cum - K); 
        if (sit != cumset.end())
            best = max(best, cum - *sit); 
        cumset.insert(cum); 
    } 
 
    return best; 
}`
    }
  },
  {
    id: 7,
    title: 'Subarray Sum Equals K',
    category: 'Classic Problems',
    difficulty: 'Medium',
    tags: ['Prefix Sum', 'Hash Map'],
    thought: 'Use prefix sum with hash map. Count occurrences of (prefix - K) seen so far.',
    solution: {
      language: 'cpp',
      code: `// nums[i] can be negative
int subarraySum(vector<int>& nums, int k) {
    map<int, int> m;
    m[0] = 1;
    int cum = 0, cnt = 0;
    for (auto u : nums) {
        cum += u;
        cnt += m[cum - k];
        m[cum]++;
    }
    return cnt;
}`
    }
  },
  {
    id: 8,
    title: 'Top K Frequent Elements',
    category: 'Classic Problems',
    difficulty: 'Medium',
    tags: ['Bucket Sort', 'Hash Map'],
    thought: 'Count frequencies, use bucket sort by frequency, collect top K from highest buckets.',
    solution: {
      language: 'cpp',
      code: `vector<int> topKFrequent(vector<int>& nums, int k) {
    int n = nums.size();
    map<int, int> m;
    for (int i = 0; i < n; i++)
        m[nums[i]]++;

    vector<int> freq[n + 1];
    for (auto u : m)
        freq[u.second].push_back(u.first);

    vector<int> res;
    for (int i = n; i >= 1; i--) {
        for (int j = 0; j < freq[i].size(); j++) {
            res.push_back(freq[i][j]);
            if (res.size() == k) return res;
        }
    }
    return res;
}`
    }
  },
  {
    id: 9,
    title: 'Triplet Sum in Array',
    category: 'Classic Problems',
    difficulty: 'Medium',
    tags: ['Two Pointers', 'Sorting'],
    thought: 'Sort array. Fix one element, use two pointers for remaining pair.',
    solution: {
      language: 'cpp',
      code: `bool find3Numbers(int A[], int arr_size, int sum) {
    int l, r;
    sort(A, A + arr_size);
    for (int i = 0; i < arr_size - 2; i++) {
        l = i + 1; 
        r = arr_size - 1; 
        while (l < r) {
            if (A[i] + A[l] + A[r] == sum)
                return true;
            else if (A[i] + A[l] + A[r] < sum)
                l++;
            else 
                r--;
        }
    }
    return false;
}

// Alternative using Hash Set - O(n²) time, O(n) space
bool find3Numbers(int A[], int n, int X) {
    for (int i = 0; i < n; i++) {
        unordered_set<int> s;
        for (int j = i + 1; j < n; j++) {
            if (s.find(X - A[j] - A[i]) != s.end()) 
                return true;
            s.insert(A[j]);
        }
    }
    return false;
}`
    }
  },
  {
    id: 10,
    title: 'Maximum Product Subarray',
    category: 'Classic Problems',
    difficulty: 'Medium',
    tags: ['DP', 'Subarray'],
    thought: 'Track both max and min products (negative * negative = positive). Swap on negative.',
    solution: {
      language: 'cpp',
      code: `int maxProduct(int A[], int n) {
    int res = A[0], imax = A[0], imin = A[0];
    for (int i = 1; i < n; i++) {
        if (A[i] < 0)
            swap(imax, imin);
        imax = max(A[i], imax * A[i]);
        imin = min(A[i], imin * A[i]);
        res = max(res, imax);
    }
    return res;
}`
    }
  },
  {
    id: 11,
    title: 'Merge Two Sorted Arrays Without Extra Space',
    category: 'Classic Problems',
    difficulty: 'Hard',
    tags: ['Two Pointers', 'Sorting'],
    thought: 'Compare arr1 end with arr2 start. Swap if out of order, then sort both.',
    solution: {
      language: 'cpp',
      code: `void merge(int arr1[], int arr2[], int n, int m) {
    int i = 0, j = 0, k = n - 1;
    while (i <= k && j < m) {
        if (arr1[i] < arr2[j])
            i++;
        else {
            swap(arr2[j++], arr1[k--]);
        }
    }
    sort(arr1, arr1 + n);
    sort(arr2, arr2 + m);
}`
    }
  },
  {
    id: 12,
    title: 'Move All Negatives to One End',
    category: 'Classic Problems',
    difficulty: 'Easy',
    tags: ['Partition', 'Two Pointers'],
    thought: 'Dutch National Flag variant. Maintain boundary for negatives.',
    solution: {
      language: 'cpp',
      code: `void rearrange(int arr[], int n) {
    int j = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] < 0) {
            if (i != j)
                swap(arr[i], arr[j]);
            j++;
        }
    }
}`
    }
  },
  {
    id: 13,
    title: 'Allocate Minimum Pages',
    category: 'Classic Problems',
    difficulty: 'Hard',
    tags: ['Binary Search', 'Greedy'],
    thought: 'Binary search on answer. Check if allocation is valid for given max pages per student.',
    solution: {
      language: 'cpp',
      code: `bool isValid(int A[], int N, int M, int cap) {
    int stud = 1, pages = 0;
    for (int i = 0; i < N; i++) {
        if (A[i] + pages <= cap) 
            pages += A[i];
        else {
            stud++;
            pages = A[i];
        }
    }
    return stud <= M;
}

int findPages(int A[], int N, int M) {
    if (N < M) return -1;
    int sum = 0, maxel = -1;
    for (int i = 0; i < N; i++) {
        sum += A[i];
        maxel = max(A[i], maxel);
    }
    int s = maxel, e = sum, res = -1;
    while (s <= e) {
        int mid = (s + e) / 2;
        if (isValid(A, N, M, mid)) {
            res = mid;
            e = mid - 1;
        } else {
            s = mid + 1;
        }
    }
    return res;
}`
    }
  },
  {
    id: 14,
    title: 'Dynamic 2D Array Allocation',
    category: 'Memory',
    difficulty: 'Easy',
    tags: ['Memory', 'Pointers'],
    thought: 'Allocate array of pointers, then allocate each row. Remember to delete in reverse order.',
    solution: {
      language: 'cpp',
      code: `// Create a dynamic 1D array
int* p = new int[10];
    
// Create a dynamic 2D array: int a[m][n]
int** a = new int*[m];
for (int i = 0; i < m; i++)
    a[i] = new int[n];

// Delete 2D array
for (int i = 0; i < m; i++)  
    delete[] a[i];   
delete[] a;`
    }
  }
];
