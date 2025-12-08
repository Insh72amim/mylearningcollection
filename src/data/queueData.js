export const queueResources = [
  {
    title: 'Stack and Queue LeetCode MyList',
    url: 'https://leetcode.com/problem-list/o40gdw7d/',
    type: 'Problem List'
  },
  {
    title: 'Line Sweep Algorithms',
    url: 'https://leetcode.com/discuss/post/2166045/line-sweep-algorithms-by-c0d3m-8ebq/',
    type: 'Guide'
  },
  {
    title: 'LeetCode Design Questions',
    url: 'https://leetcode.com/problem-list/o47wehhe/',
    type: 'Problem List'
  }
];

export const queueProblems = [
  {
    id: 1,
    title: 'Circular Queue Implementation',
    category: 'Implementation',
    difficulty: 'Medium',
    tags: ['Queue', 'Circular'],
    thought: 'Use array with front and rear pointers. Wrap around using modulo operator.',
    solution: {
      language: 'cpp',
      code: `class Queue {
public:
    int front, rear, size;
    unsigned capacity;
    int *array;
};

Queue* createQueue(unsigned capacity) {
    Queue *queue = new Queue();
    queue->capacity = capacity;
    queue->front = queue->size = 0;
    queue->rear = capacity - 1;
    queue->array = new int[queue->capacity];
    return queue;
}

int isFull(Queue *queue) {
    return (queue->size == queue->capacity);
}

int isEmpty(Queue *queue) {
    return (queue->size == 0);
}

void enqueue(Queue *queue, int item) {
    if (isFull(queue)) return;
    queue->rear = (queue->rear + 1) % queue->capacity;
    queue->array[queue->rear] = item;
    queue->size++;
}

int dequeue(Queue *queue) {
    if (isEmpty(queue)) return INT_MIN;
    int item = queue->array[queue->front];
    queue->front = (queue->front + 1) % queue->capacity;
    queue->size--;
    return item;
}

int front(Queue *queue) {
    if (isEmpty(queue)) return INT_MIN;
    return queue->array[queue->front];
}

int rear(Queue *queue) {
    if (isEmpty(queue)) return INT_MIN;
    return queue->array[queue->rear];
}`
    }
  },
  {
    id: 2,
    title: 'BFS Pattern with Queue',
    category: 'Patterns',
    difficulty: 'Easy',
    tags: ['BFS', 'Queue', 'Graph'],
    thought: 'Push start node, process level by level. Use queue size to track level boundaries.',
    solution: {
      language: 'cpp',
      code: `// BFS Template for Level Order Processing
void bfs(int start, vector<vector<int>>& adj) {
    int n = adj.size();
    vector<bool> visited(n, false);
    vector<int> distance(n, -1);
    queue<int> q;
    
    q.push(start);
    visited[start] = true;
    distance[start] = 0;
    
    while (!q.empty()) {
        int levelSize = q.size();
        
        // Process all nodes at current level
        for (int i = 0; i < levelSize; i++) {
            int node = q.front();
            q.pop();
            
            // Process node here
            
            for (int neighbor : adj[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    distance[neighbor] = distance[node] + 1;
                    q.push(neighbor);
                }
            }
        }
    }
}`
    }
  },
  {
    id: 3,
    title: 'Line Sweep Algorithm',
    category: 'Patterns',
    difficulty: 'Medium',
    tags: ['Line Sweep', 'Events'],
    thought: 'Convert intervals to events (+1 at start, -1 at end). Sort and sweep to find overlaps.',
    solution: {
      language: 'cpp',
      code: `// Line Sweep Pattern
// Use case: Finding max overlapping intervals, meeting rooms

int minMeetingRooms(vector<vector<int>>& intervals) {
    // Create events: +1 for start, -1 for end
    vector<pair<int, int>> events;
    
    for (auto& interval : intervals) {
        events.push_back({interval[0], 1});  // start
        events.push_back({interval[1], -1}); // end
    }
    
    // Sort by time, if equal, process ends before starts
    sort(events.begin(), events.end(), [](auto& a, auto& b) {
        if (a.first != b.first) return a.first < b.first;
        return a.second < b.second; // -1 before +1
    });
    
    int maxRooms = 0, currentRooms = 0;
    for (auto& [time, delta] : events) {
        currentRooms += delta;
        maxRooms = max(maxRooms, currentRooms);
    }
    
    return maxRooms;
}

// Alternative: Separate arrays approach
int minMeetingRooms2(vector<vector<int>>& intervals) {
    vector<int> starts, ends;
    for (auto& i : intervals) {
        starts.push_back(i[0]);
        ends.push_back(i[1]);
    }
    sort(starts.begin(), starts.end());
    sort(ends.begin(), ends.end());
    
    int rooms = 0, endPtr = 0;
    for (int start : starts) {
        if (start < ends[endPtr]) {
            rooms++;
        } else {
            endPtr++;
        }
    }
    return rooms;
}`
    }
  },
  {
    id: 4,
    title: 'Monotonic Queue Pattern',
    category: 'Patterns',
    difficulty: 'Hard',
    tags: ['Deque', 'Monotonic'],
    thought: 'Maintain deque with monotonic property. Front always has optimal element.',
    solution: {
      language: 'cpp',
      code: `// Monotonic Queue for Sliding Window Minimum/Maximum
// Time: O(n), Space: O(k)

class MonotonicQueue {
    deque<pair<int, int>> dq; // {value, index}
    
public:
    // For sliding window maximum
    void push(int val, int idx) {
        // Remove smaller elements from back
        while (!dq.empty() && dq.back().first <= val) {
            dq.pop_back();
        }
        dq.push_back({val, idx});
    }
    
    // Remove expired elements
    void pop(int windowStart) {
        while (!dq.empty() && dq.front().second < windowStart) {
            dq.pop_front();
        }
    }
    
    int getMax() {
        return dq.empty() ? INT_MIN : dq.front().first;
    }
};

// Usage for Sliding Window Maximum
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    MonotonicQueue mq;
    vector<int> result;
    
    for (int i = 0; i < nums.size(); i++) {
        mq.push(nums[i], i);
        mq.pop(i - k + 1);
        
        if (i >= k - 1) {
            result.push_back(mq.getMax());
        }
    }
    return result;
}`
    }
  }
];
