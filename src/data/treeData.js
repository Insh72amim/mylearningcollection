export const treeResources = [
  {
    title: 'Tree Patterns - LeetCode',
    url: 'https://leetcode.com/discuss/study-guide/937307/Iterative-or-Recursive-or-DFS-and-BFS-Tree-Traversal-or-In-Pre-Post-and-LevelOrder-or-Views',
    type: 'Guide'
  },
  {
    title: 'Binary Tree Interview Questions',
    url: 'https://medium.com/techie-delight/binary-tree-interview-questions-and-practice-problems-439df7e5ea1f',
    type: 'Article'
  },
  {
    title: 'LeetCode Tree Problems List',
    url: 'https://leetcode.com/problem-list/ej578cpd/',
    type: 'Problem List'
  },
  {
    title: 'AVL Tree - Programiz',
    url: 'https://www.programiz.com/dsa/avl-tree',
    type: 'Tutorial'
  },
  {
    title: 'Binary Indexed Tree (Fenwick)',
    url: 'https://www.hackerearth.com/practice/notes/binary-indexed-tree-or-fenwick-tree/',
    type: 'Tutorial'
  }
];

export const treeProblems = [
  // Linked List Section
  {
    id: 1,
    title: 'Reverse a Linked List',
    category: 'Linked List',
    difficulty: 'Easy',
    tags: ['Linked List', 'Two Pointers'],
    thought: 'Use three pointers: prev, current, temp. Iterate and reverse links.',
    solution: {
      language: 'cpp',
      code: `Node *reverse(Node *head)
{
    Node *current = head;
    Node *prev = NULL, *temp = NULL;
    while (current != NULL)
    {
        temp = current->next;
        current->next = prev;
        prev = current;
        current = temp;
    }
    head = prev;
    return head;
}`
    }
  },
  {
    id: 2,
    title: 'Detect a Loop in Linked List',
    category: 'Linked List',
    difficulty: 'Easy',
    tags: ['Linked List', 'Floyd Cycle'],
    thought: 'Floyd Cycle Detection: slow and fast pointer. If they meet, loop exists.',
    solution: {
      language: 'cpp',
      code: `bool detectLoop(Node* head)
{
    Node *ss = head, *ff = head;
    while(ff && ff->next){
        ss = ss->next;
        ff = ff->next->next;
        if(ss==ff) return 1;
    }
    return 0;
}`
    }
  },
  // Trie Section
  {
    id: 3,
    title: 'Trie Implementation',
    category: 'Trie',
    difficulty: 'Medium',
    tags: ['Trie', 'String'],
    thought: 'Each node has 26 children (for lowercase letters). Track end of word.',
    solution: {
      language: 'cpp',
      code: `class Trie
{
public:
    vector<Trie *> vchild;
    bool isend;

    Trie()
    {
        this->isend = false;
        for (int i = 0; i < 26; i++)
            vchild.push_back(NULL);
    }

    void insert(string w)
    {
        int n = w.size();
        Trie *prev = this;
        for (int i = 0; i < n; i++)
        {
            int j = w[i] - 'a';
            if (!prev->vchild[j])
                prev->vchild[j] = new Trie();
            prev = prev->vchild[j];
        }
        if (prev)
            prev->isend = true;
    }

    bool search(string w)
    {
        int n = w.size();
        Trie *prev = this;
        for (int i = 0; i < n; i++)
        {
            int j = w[i] - 'a';
            if (!prev->vchild[j])
                return false;
            prev = prev->vchild[j];
        }
        return prev->isend;
    }

    bool startsWith(string w)
    {
        int n = w.size();
        Trie *prev = this;
        for (int i = 0; i < n; i++)
        {
            int j = w[i] - 'a';
            if (!prev || !prev->vchild[j])
                return false;
            prev = prev->vchild[j];
        }
        return true;
    }
};`
    }
  },
  // Binary Tree Section
  {
    id: 4,
    title: 'Create a Binary Tree',
    category: 'Binary Tree',
    difficulty: 'Easy',
    tags: ['Binary Tree', 'Basic'],
    thought: 'Node struct with data, left, right pointers. Constructor initializes them.',
    solution: {
      language: 'cpp',
      code: `struct Node {
    int data;
    struct Node* left;
    struct Node* right;
    Node(int val)
    {
        data = val;
        left = NULL;
        right = NULL;
    }
};

Node* CreateNode(int data)
{
    Node* newNode = new Node(data);
    if (!newNode)
        return NULL;
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

int main()
{
    struct Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    return 0;
}`
    }
  },
  {
    id: 5,
    title: 'Insertion in Binary Tree (Level Order)',
    category: 'Binary Tree',
    difficulty: 'Easy',
    tags: ['Binary Tree', 'BFS'],
    thought: 'Use BFS with queue. Find first node with missing child and insert.',
    solution: {
      language: 'cpp',
      code: `Node* InsertNode(Node* root, int data)
{
    if (root == NULL) {
        root = CreateNode(data);
        return root;
    }

    queue<Node*> q;
    q.push(root);

    while (!q.empty()) {
        Node* temp = q.front();
        q.pop();

        if (temp->left != NULL)
            q.push(temp->left);
        else {
            temp->left = CreateNode(data);
            return root;
        }
        if (temp->right != NULL)
            q.push(temp->right);
        else {
            temp->right = CreateNode(data);
            return root;
        }
    }
}`
    }
  },
  {
    id: 6,
    title: 'Maximum Depth of Binary Tree',
    category: 'Binary Tree',
    difficulty: 'Easy',
    tags: ['Binary Tree', 'DFS', 'BFS'],
    thought: 'DFS: 1 + max(left, right). BFS: count levels.',
    solution: {
      language: 'cpp',
      code: `// BFS Approach
int maxDepth(TreeNode* root) {
    if(root==NULL) return 0;
    int d = 0;
    queue<TreeNode*> q;
    q.push(root);
    TreeNode *temp;
    while(!q.empty()){
        int i = 0, n = q.size();
        d++;
        for(i=0;i<n;i++){
            temp = q.front(); q.pop();
            if(temp->left!=NULL) q.push(temp->left);
            if(temp->right!=NULL) q.push(temp->right);
        }
    }
    return d;
}

// DFS Approach
int maxDepth(TreeNode* root) {
    if(root==NULL) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`
    }
  },
  {
    id: 7,
    title: 'Construct Tree from Inorder and Preorder',
    category: 'Binary Tree',
    difficulty: 'Medium',
    tags: ['Binary Tree', 'Recursion'],
    thought: 'Preorder first element is root. Find it in inorder to split left/right subtrees.',
    solution: {
      language: 'cpp',
      code: `Node* buildTreeHelp(int in[], int pre[], int n, int in_low, int in_high, int l_pre, int r_pre)
{
    Node* root = NULL;
    if(in_low > in_high || l_pre > r_pre || in_high>=n || r_pre>=n) return root;
    int i;
    for(i = in_low; i<=in_high; i++){
        if(in[i]==pre[l_pre]) break;
    }
    root = new Node(pre[l_pre]);
    int le = i - in_low;
    root->left  = buildTreeHelp(in,pre,n,in_low,i-1,l_pre+1,l_pre+le);
    root->right = buildTreeHelp(in,pre,n,i+1,in_high,l_pre+le+1,r_pre);
    return root;
}

Node* buildTree(int in[], int pre[], int n)
{
    return buildTreeHelp(in,pre,n,0,n-1,0,n-1);
}`
    }
  },
  {
    id: 8,
    title: 'Lowest Common Ancestor',
    category: 'Binary Tree',
    difficulty: 'Medium',
    tags: ['Binary Tree', 'LCA'],
    thought: 'Find paths to both nodes, compare paths to find LCA.',
    solution: {
      language: 'cpp',
      code: `void anc(Node* root, vector<int> v, int val, vector<int> &vp){
    if(!root) return;
    v.push_back(root->data);
    if(root->data==val){
        vp = v;
        return;
    }
    anc(root->left,v,val,vp);
    anc(root->right,v,val,vp);
    v.pop_back();
}

Node* ans = NULL;
void findNode(Node* root, int val){
    if(!root) return;
    if(root->data==val) ans = root;
    findNode(root->left,val);
    findNode(root->right,val);
}

Node* lca(Node* root, int n1, int n2)
{
    vector<int> v,v1,v2;
    anc(root,v,n1,v1);
    anc(root,v,n2,v2);
    int val, i, l = min(v1.size(),v2.size());
    if(l==0) return NULL;
    for(i = 0; i<l; i++){
        if(v1[i]!=v2[i]) break;
    }
    findNode(root,v1[i-1]);
    return ans;
}`
    }
  },
  {
    id: 9,
    title: 'Maximum Path Sum',
    category: 'Binary Tree',
    difficulty: 'Hard',
    tags: ['Binary Tree', 'DFS'],
    thought: 'At each node, max path is max(left, right) + node. Track global max.',
    solution: {
      language: 'cpp',
      code: `int findMaxUtil(Node* root, int &res)
{
    if (root == NULL)
        return 0;
    int l = findMaxUtil(root->left, res);
    int r = findMaxUtil(root->right, res);
    int max_single = max(max(l, r) + root->data, root->data);
    int max_top = max(max_single, l + r + root->data);
    res = max(res, max_top);
    return max_single;
}

int findMaxSum(Node *root)
{
    int res = INT_MIN;
    findMaxUtil(root, res);
    return res;
}`
    }
  },
  {
    id: 10,
    title: 'Iterative Inorder Traversal',
    category: 'Binary Tree',
    difficulty: 'Medium',
    tags: ['Binary Tree', 'Stack'],
    thought: 'Use stack. Go left until NULL, pop and process, then go right.',
    solution: {
      language: 'cpp',
      code: `void inorderIterative(Node* root)
{
    stack<Node*> stack;
    Node* curr = root;

    while (!stack.empty() || curr != nullptr)
    {
        if (curr != nullptr)
        {
            stack.push(curr);
            curr = curr->left;
        }
        else {
            curr = stack.top();
            stack.pop();
            cout << curr->data << " ";
            curr = curr->right;
        }
    }
}`
    }
  },
  // BST Section
  {
    id: 11,
    title: 'Check if BST is Balanced',
    category: 'BST',
    difficulty: 'Easy',
    tags: ['BST', 'Recursion'],
    thought: 'Check height of left and right subtrees. Difference should be <= 1.',
    solution: {
      language: 'cpp',
      code: `int getHeight(TreeNode *root) {
    if (root == NULL) return 0;
    int l = getHeight(root->left);
    int r = getHeight(root->right);
    if (l == -1 || r == -1 || abs(l - r) > 1) return -1;
    return max(l, r) + 1;
}

bool isBalanced(TreeNode* root) {
    return getHeight(root) != -1;
}`
    }
  },
  {
    id: 12,
    title: 'Search in BST',
    category: 'BST',
    difficulty: 'Easy',
    tags: ['BST', 'Search'],
    thought: 'If key < root, go left. If key > root, go right.',
    solution: {
      language: 'cpp',
      code: `struct node* search(struct node* root, int key)
{
    if (root == NULL || root->key == key)
        return root;
    if (root->key < key)
        return search(root->right, key);
    else 
        return search(root->left, key);
}`
    }
  },
  {
    id: 13,
    title: 'Create a BST',
    category: 'BST',
    difficulty: 'Easy',
    tags: ['BST', 'Basic'],
    thought: 'Insert: if val > root, go right; else go left. Repeat until NULL.',
    solution: {
      language: 'cpp',
      code: `class BST
{
    int data;
    BST *left, *right;

public:
    BST() : data(0), left(NULL), right(NULL) {}
    BST(int value) {
        data = value;
        left = right = NULL;
    }

    BST* Insert(BST* root, int value)
    {
        if (!root)
            return new BST(value);
        
        if (value > root->data)
            root->right = Insert(root->right, value);
        else
            root->left = Insert(root->left, value);
        
        return root;
    }
};`
    }
  },
  {
    id: 14,
    title: 'Validate BST',
    category: 'BST',
    difficulty: 'Medium',
    tags: ['BST', 'Validation'],
    thought: 'Track min/max bounds. Each node must be within its valid range.',
    solution: {
      language: 'cpp',
      code: `// Using NULL Pointer approach
bool isBST(Node* root, Node* low, Node* high){
    if(!root) return true;
    if(low && low->val >= root->val || high && high->val <= root->val) 
        return false;
    return isBST(root->left, low, root) && isBST(root->right, root, high);
}

bool isValidBST(Node* root) {
    return isBST(root, NULL, NULL);
}

// Using INT_MIN/MAX approach
int isBSTUtil(node *node, int min, int max)
{
    if (!node) return 1;
    if (node->data < min || node->data > max)
        return 0;
    return isBSTUtil(node->left, min, node->data - 1) 
        && isBSTUtil(node->right, node->data + 1, max);
}

int isBST(node *node) {
    return isBSTUtil(node, INT_MIN, INT_MAX);
}`
    }
  },
  {
    id: 15,
    title: 'Delete Node in BST',
    category: 'BST',
    difficulty: 'Medium',
    tags: ['BST', 'Delete'],
    thought: 'Three cases: leaf node, one child, two children (find inorder successor).',
    solution: {
      language: 'cpp',
      code: `TreeNode* deleteNode(TreeNode* root, int val) {
    if (!root) return root;
    if (val < root->val)
        root->left = deleteNode(root->left, val);
    else if (val > root->val)
        root->right = deleteNode(root->right, val);
    else {
        if (!root->left && !root->right) {
            delete(root);
            return NULL;
        }
        if (!root->left || !root->right) {
            TreeNode *tmp = root->left ? root->left : root->right;
            delete(root);
            return tmp;
        }
        if (root->left && root->right) {
            TreeNode *tmp = root->right;
            while (tmp->left) tmp = tmp->left;
            root->val = tmp->val;
            root->right = deleteNode(root->right, root->val);
        }
    }
    return root;
}`
    }
  },
  {
    id: 16,
    title: 'LCA in BST',
    category: 'BST',
    difficulty: 'Easy',
    tags: ['BST', 'LCA'],
    thought: 'Use BST property: if both nodes < root, go left; if both > root, go right.',
    solution: {
      language: 'cpp',
      code: `Node* LCA(Node *root, int n1, int n2)
{
    if(root->data == n1 || root->data == n2) return root;
    int rv = root->data;
    if(n1 < rv && n2 < rv)
        return LCA(root->left, n1, n2);
    else if(n1 > rv && n2 > rv)
        return LCA(root->right, n1, n2);
    else 
        return root;
}`
    }
  },
  {
    id: 17,
    title: 'Construct BST from Preorder',
    category: 'BST',
    difficulty: 'Medium',
    tags: ['BST', 'Construction'],
    thought: 'Use min/max bounds to determine valid placement of each element.',
    solution: {
      language: 'cpp',
      code: `node* constructTreeUtil(int pre[], int* preIndex, int key, int min, int max, int size)
{
    if (*preIndex >= size)
        return NULL;

    node* root = NULL;
    if (key > min && key < max) {
        root = newNode(key);
        *preIndex = *preIndex + 1;
        if (*preIndex < size)
            root->left = constructTreeUtil(pre, preIndex, pre[*preIndex], min, key, size);
        if (*preIndex < size)
            root->right = constructTreeUtil(pre, preIndex, pre[*preIndex], key, max, size);
    }
    return root;
}

node* constructTree(int pre[], int size)
{
    int preIndex = 0;
    return constructTreeUtil(pre, &preIndex, pre[0], INT_MIN, INT_MAX, size);
}`
    }
  },
  {
    id: 18,
    title: 'Balance a BST',
    category: 'BST',
    difficulty: 'Medium',
    tags: ['BST', 'Balance'],
    thought: 'Inorder traversal to sorted array, then build balanced tree from middle.',
    solution: {
      language: 'cpp',
      code: `void storeBSTNodes(Node *root, vector<Node *> &nodes)
{
    if (root == NULL) return;
    storeBSTNodes(root->left, nodes);
    nodes.push_back(root);
    storeBSTNodes(root->right, nodes);
}

Node *buildTreeUtil(vector<Node *> &nodes, int start, int end)
{
    if (start > end) return NULL;
    int mid = (start + end) / 2;
    Node *root = nodes[mid];
    root->left = buildTreeUtil(nodes, start, mid - 1);
    root->right = buildTreeUtil(nodes, mid + 1, end);
    return root;
}

Node *buildTree(Node *root)
{
    vector<Node *> nodes;
    storeBSTNodes(root, nodes);
    int n = nodes.size();
    return buildTreeUtil(nodes, 0, n - 1);
}`
    }
  },
  // Advanced Trees
  {
    id: 19,
    title: 'Segment Tree',
    category: 'Advanced',
    difficulty: 'Hard',
    tags: ['Segment Tree', 'Range Query'],
    thought: 'Binary tree where each node represents a range. Supports range queries in O(log n).',
    solution: {
      language: 'cpp',
      code: `class segmentTree
{
private:
    vector<int> sta;

    void build(int i, int sv, int ev, vector<int> nums)
    {
        if (sv == ev)
            sta[i] = nums[sv];
        else
        {
            int mid = (sv + ev) / 2;
            build(2 * i, sv, mid, nums);
            build(2 * i + 1, mid + 1, ev, nums);
            sta[i] = sta[2 * i] + sta[2 * i + 1];
        }
    }

public:
    segmentTree(vector<int> nums)
    {
        int n = nums.size();
        sta = vector<int>(4 * n, 0);
        build(1, 0, n - 1, nums);
    }

    int sum(int l, int r, int i, int sv, int ev)
    {
        if (l > r) return 0;
        if (l == sv && r == ev) return sta[i];
        int m = (sv + ev) / 2;
        int sumLeft = sum(l, min(r, m), 2 * i, sv, m);
        int sumRight = sum(max(l, m + 1), r, 2 * i + 1, m + 1, ev);
        return sumLeft + sumRight;
    }

    void update(int x, int val, int i, int sv, int ev)
    {
        if (sv == ev) {
            sta[i] = val;
        } else {
            int mid = (sv + ev) / 2;
            if (x <= mid)
                update(x, val, 2 * i, sv, mid);
            else
                update(x, val, 2 * i + 1, mid + 1, ev);
            sta[i] = sta[2 * i] + sta[2 * i + 1];
        }
    }
};`
    }
  },
  {
    id: 20,
    title: 'Fenwick Tree (BIT)',
    category: 'Advanced',
    difficulty: 'Hard',
    tags: ['Fenwick Tree', 'BIT', 'Range Query'],
    thought: 'Uses bit manipulation for efficient prefix sums. Update and query in O(log n).',
    solution: {
      language: 'cpp',
      code: `int BIT[1000], a[1000], n;

void update(int x, int delta)
{      
    while(x <= n){
        BIT[x] += delta;
        x += x & -x; // Add last set bit
    }
}

int query(int x)
{
    int sum = 0;
    while(x > 0){
        sum += BIT[x];
        x -= x & -x; // Remove last set bit
    }  
    return sum;
}

// Build BIT in O(N)
void build(vector<int>& nums) {
    n = nums.size();
    for(int i = 1; i <= n; i++) 
        BIT[i] = nums[i-1];
    for(int i = 1; i <= n; i++){
        int p = i + (i & -i);
        if(p <= n) BIT[p] += BIT[i];
    }
}`
    }
  }
];
