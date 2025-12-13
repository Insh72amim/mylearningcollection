export const hldTopics = {
  'scalability': {
    id: 'scalability',
    title: 'Scalability & Performance Optimization',
    description: 'Deep dive into scaling systems, performance metrics, bottleneck analysis, and horizontal partitioning',
    sections: [
      {
        title: 'Scaling Fundamentals & Performance Metrics',
        content: `
**Vertical Scaling (Scale Up)**
- Increase resources on single machine: CPU cores ↑, RAM ↑, Storage ↑, Network bandwidth ↑
- **Advantages**:
  - Simple implementation - no code changes needed
  - Strong consistency - single source of truth
  - Lower network latency - no inter-server communication
- **Limitations**:
  - Hardware ceiling: ~1TB RAM, ~96 cores typical max
  - Exponential cost curve: 4x RAM = 8x cost
  - Single Point of Failure (SPOF)
- **Use Cases**: Monolithic applications, RDBMS, early-stage startups

**Horizontal Scaling (Scale Out)**
- Add more commodity servers to distribute workload
- **Advantages**:
  - Unlimited theoretical scaling
  - Linear cost growth
  - Built-in redundancy and fault tolerance
- **Challenges**:
  - Complex distributed architecture
  - Eventual consistency trade-offs
  - Network overhead and latency
- **Use Cases**: Stateless web apps, microservices, big data processing

**Key Performance Metrics**
- **Throughput**: Requests/sec (RPS), Transactions/sec (TPS), Queries/sec (QPS)
- **Latency Percentiles**:
  - p50 (median): 50% of requests below this
  - p95: 95% below (1 in 20 slower)
  - p99: 99% below (1 in 100 slower) - SLA target
  - p999: 99.9% below - tail latencies matter!
- **Availability**:
  - 99% (Two 9s) = 3.65 days downtime/year
  - 99.9% (Three 9s) = 8.76 hours/year
  - 99.99% (Four 9s) = 52.6 minutes/year
  - 99.999% (Five 9s) = 5.26 minutes/year
- **Error Rates**: 4xx (client errors), 5xx (server errors)

**Amdahl's Law**
- Speedup = 1 / ((1-P) + P/S)
- P = portion parallelizable, S = speedup of parallel part
- Example: If 50% parallelizable, max 2x speedup
        `,
        keyPoints: [
          'Vertical scaling is simple but hits physical/cost ceiling',
          'Horizontal scaling requires stateless architecture',
          'Monitor p99 latency, not just average - tail latencies kill UX',
          'Each "9" of availability = 10x engineering cost'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│           VERTICAL VS HORIZONTAL SCALING                     │
│                                                              │
│  VERTICAL (Scale Up):                                        │
│    ┌──────────┐        ┌───────────────┐                    │
│    │ 4 cores  │  ═══▶  │  32 cores     │  Cost: $$$$        │
│    │ 16 GB    │        │  256 GB       │  Latency: Low      │
│    │ 1 Gbps   │        │  10 Gbps      │  Complexity: Low   │
│    └──────────┘        └───────────────┘                    │
│         ↑                                                    │
│    Single Point of Failure (SPOF)                            │
│                                                              │
│  ─────────────────────────────────────────────────────       │
│                                                              │
│  HORIZONTAL (Scale Out):                                     │
│                                                              │
│         ┌─────────────────────┐                             │
│         │   Load Balancer     │                             │
│         └─────────────────────┘                             │
│          ▼        ▼        ▼        ▼                        │
│       ┌────┐  ┌────┐  ┌────┐  ┌────┐                       │
│       │ S1 │  │ S2 │  │ S3 │  │... │  Cost: $               │
│       └────┘  └────┘  └────┘  └────┘  Complexity: High      │
│                                                              │
│   Benefits: Redundancy, No SPOF, Linear Cost                │
│   Challenges: Consistency, State Management                  │
│                                                              │
│  ─────────────────────────────────────────────────────       │
│                                                              │
│  Performance Bottleneck Analysis:                            │
│                                                              │
│  CPU Bound (100% util)    → Add cores / horizontal scale    │
│  Memory Bound (OOM)       → Increase RAM / partition data   │
│  Disk I/O Bound (wait)    → SSD / caching / sharding        │
│  Network Bound (bw limit) → CDN / compression / sharding    │
│  Lock Contention          → Sharding / lock-free structs    │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'Bot leneck Analysis - Little\'s Law & Capacity Planning',
        content: `
**Little's Law: L = λ × W**
- **L**: Average number of requests in system (concurrency)
- **λ**: Arrival rate (requests per second)
- **W**: Average time request spends in system (latency)

**Example Calculation**:
- System receives 1000 RPS
- Average request takes 200ms (0.2s)
- L = 1000 ×0.2 = 200 concurrent requests
- Need thread pool of size ≥ 200

**Identifying Bottlenecks**

**1. CPU-Bound Systems**
- Symptom: 100% CPU utilization
- Causes: Heavy computation (encryption, compression, ML inference)
- Solutions:
  - More cores (vertical scaling)
  - More instances (horizontal scaling)
  - Async processing / job queues
  - GPU acceleration for parallel workloads

**2. Memory-Bound Systems**
- Symptoms: High swap usage, OOM kills, GC pauses
- Causes: Large in-memory datasets, session state, caching
- Solutions:
  - Increase RAM
  - Data pagination / streaming
  - Offload to Redis/Memcached
  - Implement LRU eviction

**3. I/O-Bound Systems**
- Symptoms: High iowait, slow DB queries
- Causes: Disk reads/writes, network calls
- Solutions:
  - SSD instead of HDD
  - Read/write caching
  - Async I/O (non-blocking)
  - Connection pooling
  - Database indexing

**4. Lock Contention**
- Symptoms: High CPU but low throughput
- Causes: Thread synchronization overhead
- Solutions:
  - Lock-free data structures (CAS operations)
  - Sharding to reduce contention
  - Read-write locks (multiple readers)
  - Optimistic locking

**Capacity Planning Formula**
- **Peak Load** = Normal Load × Spike Factor (typically 2-10x)
- **Required Capacity** = Peak Load × (1 + Headroom %)
- **Headroom**: 20-30% buffer for safety
- **Auto-Scaling Thresholds**:
  - Scale UP at 70% resource utilization
  - Scale DOWN at 30% resource utilization

**Interview Question: Calculate Capacity**
- Expected: 10,000 RPS normal, 50,000 RPS Black Friday
- Latency target: p99 < 200ms
- Each server handles 500 RPS at 150ms latency
- How many servers?
  
Answer:
- Peak load = 50,000 RPS
- Servers needed = 50,000 / 500 = 100
- With 30% headroom = 100 × 1.3 = 130 servers
        `,
        keyPoints: [
          'Use Little\'s Law to calculate required concurrency',
          'Profile before optimizing - measure, don\'t guess',
          'Monitor the 4 Golden Signals: Latency, Traffic, Errors, Saturation',
          'Plan for 2-10x spike during peak events'
        ],
        code: {
          language: 'cpp',
          content: `// Thread Pool for I/O-bound tasks
class ThreadPool {
    vector<thread> workers;
    queue<function<void()>> tasks;
    mutex queueMutex;
    condition_variable condition;
    atomic<bool> stop{false};
    
public:
    ThreadPool(size_t numThreads) {
        for (size_t i = 0; i < numThreads; ++i) {
            workers.emplace_back([this] {
                while (true) {
                    function<void()> task;
                    {
                        unique_lock<mutex> lock(queueMutex);
                        condition.wait(lock, [this] {
                            return stop || !tasks.empty();
                        });
                        if (stop && tasks.empty()) return;
                        task = move(tasks.front());
                        tasks.pop();
                    }
                    task(); // Execute outside lock
                }
            });
        }
    }
    
    template<class F>
    void enqueue(F&& f) {
        {
            unique_lock<mutex> lock(queueMutex);
            tasks.emplace(forward<F>(f));
        }
        condition.notify_one();
    }
    
    ~ThreadPool() {
        stop = true;
        condition.notify_all();
        for (thread& worker : workers) {
            worker.join();
        }
    }
};

// Connection Pool Pattern
class DatabaseConnectionPool {
    queue<Connection*> available;
    vector<Connection*> all;
    mutex poolMutex;
    condition_variable cv;
    int maxSize;
    atomic<int> totalCreated{0};
    
public:
    Connection* acquire() {
        unique_lock<mutex> lock(poolMutex);
        
        // Wait if no connections available
        cv.wait(lock, [this] {
            return !available.empty() || totalCreated < maxSize;
        });
        
        if (!available.empty()) {
            auto conn = available.front();
            available.pop();
            return conn;
        }
        
        // Create new connection
        auto newConn = createConnection();
        all.push_back(newConn);
        totalCreated++;
        return newConn;
    }
    
    void release(Connection* conn) {
        unique_lock<mutex> lock(poolMutex);
        available.push(conn);
        cv.notify_one();
    }
    
    ~DatabaseConnectionPool() {
        for (auto conn : all) {
            conn->close();
            delete conn;
        }
    }
};`
        }
      },
      {
        title: 'Horizontal Partitioning & Data Distribution Strategies',
        content: `
**Why Partition Data?**
- Single server cannot hold all data (e.g., 100TB database)
- Parallel query processing across shards
- Isolate hot datasets to dedicated hardware

**Partitioning Strategies**

**1. Range-Based Partitioning**
- Split by key ranges: [A-M], [N-Z] or timestamps
- **Pros**:
  - Range queries efficient (SELECT * WHERE key BETWEEN 'A' AND 'D')
  - Simple to understand and implement
- **Cons**:
  - Hotspots if data skewed (e.g., names starting with 'S')
  - Manual rebalancing when ranges grow
- **Use Case**: Time-series data, archival systems

**2. Hash-Based Partitioning**
- Partition = hash(key) mod N
- **Pros**:
  - Uniform distribution (no hotspots)
  - Automatic load balancing
- **Cons**:
  - Reshuffling nightmare when N changes (add/remove server)
  - Cannot do range queries efficiently
- **Use Case**: Key-value stores, session data

**3. Consistent Hashing** (Interview Favorite!)
- Map both keys AND servers to a ring [0, 2^32-1]
- Key assigned to first server encountered clockwise
- Adding server only steals from immediate neighbors
- **Pros**:
  - Minimal data movement: Only K/N keys affected
  - Elastic scaling without downtime
- **Cons**:
  - More complex implementation
  - Need virtual nodes for even distribution
- **Use Case**: Distributed caches (Memcached), CDNs

**4. Directory-Based Partitioning**
- Lookup table: key → partition ID
- **Pros**:
  - Maximum flexibility
  - Can implement complex routing rules
- **Cons**:
  - Lookup service is a bottleneck/SPOF
  - Extra network hop
- **Use Case**: Multi-tenant systems, geo-routing

**5. Geographic Partitioning**
- Partition by region: US-East, EU-West, Asia-Pacific
- **Pros**:
  - Data locality → low latency
  - Compliance (GDPR, data residency laws)
- **Cons**:
  - Uneven load distribution
  - Cross-region queries expensive
- **Use Case**: Global SaaS applications

**Virtual Nodes (VNodes)**
- Each physical server maps to 100-150 virtual nodes on ring
- Prevents uneven distribution
- Enables weighted distribution (powerful server = more vnodes)

**Interview Question**: Design URL shortener for 100B URLs
Answer:
- Partition by hash(short_url) % N_shards
- Use consistent hashing for elastic scaling
- Replicate each shard 3x for HA
- Cache popular URLs in Redis
        `,
        keyPoints: [
          'Hash partitioning for even load distribution',
          'Consistent hashing is gold standard for dynamic scaling',
          'Range partitioning only when range queries critical',
          'Always use virtual nodes (vnodes) with consistent hashing'
        ],
        code: {
          language: 'cpp',
          content: `// Consistent Hashing with Virtual Nodes
class ConsistentHashing {
    map<uint32_t, Server*> ring; // Hash → Server
    int virtualNodesPerServer = 150;
    hash<string> hasher;
    
public:
    void addServer(Server* server) {
        for (int i = 0; i < virtualNodesPerServer; i++) {
            string vnodeKey = server->id + "#vnode" + to_string(i);
            uint32_t hashval = hasher(vnodeKey);
            ring[hashval] = server;
        }
    }
    
    void removeServer(Server* server) {
        for (int i = 0; i < virtualNodesPerServer; i++) {
            string vnodeKey = server->id + "#vnode" + to_string(i);
            uint32_t hashval = hasher(vnodeKey);
            ring.erase(hashval);
        }
    }
    
    Server* getServer(string key) {
        if (ring.empty()) return nullptr;
        
        uint32_t keyHash = hasher(key);
        
        // Find first server clockwise (>= keyHash)
        auto it = ring.lower_bound(keyHash);
        
        // Wrap around if at end
        if (it == ring.end()) {
            it = ring.begin();
        }
        
        return it->second;
    }
    
    // Migration helper
    vector<string> getKeysToMigrate(Server* newServer, 
                                     vector<string>& allKeys) {
        vector<string> toMigrate;
        
        for (const string& key : allKeys) {
            Server* assignedServer = getServer(key);
            if (assignedServer == newServer) {
                toMigrate.push_back(key);
            }
        }
        
        return toMigrate; // Only ~K/N keys
    }
};

// Range-Based Partitioning
class RangePartitioner {
    struct Range {
        string start, end;
        Server* server;
    };
    vector<Range> ranges;
    
public:
    Server* getServer(string key) {
        // Binary search for efficiency
        for (const auto& range : ranges) {
            if (key >= range.start && key < range.end) {
                return range.server;
            }
        }
        return nullptr;
    }
    
    void rebalanceRange(string newSplit, Server* newServer) {
        // Split existing range at newSplit point
        // Requires data migration
    }
};`
        }
      }
    ]
  },

  'load-balancing': {
    id: 'load-balancing',
    title: 'Load Balancing Deep Dive',
    description: 'Comprehensive guide to load balancing algorithms, L4 vs L7, health checks, sticky sessions, and circuit breakers',
    sections: [
      {
        title: 'Load Balancing Algorithms - Interview Focus',
        content: `
**1. Round Robin**
- Distribute sequentially: Req1 → S1, Req2 → S2, Req3 → S3, Req4 → S1...
- **Implementation**: counter++ % num_servers
- **Pros**: Dead simple, fair distribution
- **Cons**: Ignores server capacity and current load
- **When**: Homogeneous servers, stateless requests, equal request cost

**2. Weighted Round Robin**
- Assign weights based on capacity: S1(weight=3), S2(weight=1)
- S1 gets 75% of traffic, S2 gets 25%
- **Pros**: Handles heterogeneous hardware (c5.large + c5.xlarge mix)
- **Cons**: Still ignores real-time load
- **When**: Mixed instance types in fleet

**3. Least Connections**
- Route to server with fewest active connections
- **Implementation**: Track active_connections per server
- **Pros**: Adapts to long-lived connections (WebSockets, streaming)
- **Cons**: Tracking overhead, ignores request complexity
- **When**: HTTP/2, WebSocket servers, connection pools

**4. Least Response Time (Weighted Least Connections)**
- Factor = fastest_recent_response × fewest_connections
- **Pros**: Most intelligent, load-aware, adapts to backend performance
- **Cons**: High overhead (constant health checks)
- **When**: Heterogeneous backends, varying request complexity

**5. IP Hash (Source IP Affinity)**
- Partition = hash(client_IP) % N → consistent server assignment
- **Pros**: Session persistence without shared state storage
- **Cons**: Uneven distribution if clients NAT'd (corporate proxy)
- **When**: Stateful apps, shopping carts, session cookies

**6. Least Bandwidth**
- Route to server consuming least Mbps
- **When**: Video streaming, file downloads, CDN origin

**7. Random with Two Choices (Power of 2)**
- Pick 2 random servers, choose the one with fewer connections
- **Proven**: Almost as good as global minimum (research-backed)
- **Pros**: No global state needed, O(1) selection
- **When**: Massive scale (1000+ servers)

**Sticky Sessions (Session Affinity)**
- Same client always routed to same server
- **Methods**:
  1. IP Hash
  2. Cookie-based (inject session cookie)
  3. HTTP header (X-Forwarded-For)
- **Trade-off**: Session locality vs uneven load

**Interview Question**: Which algorithm for:
- Stateless API? → Round Robin
- WebSocket server? → Least Connections
- Shopping cart? → IP Hash (sticky)
- Video CDN? → Least Bandwidth
        `,
        keyPoints: [
          'Round Robin: Simple, stateless, homogeneous servers',
          'Least Connections: Long-lived connections',
          'IP Hash: Session affinity without shared state',
          '"Power of 2 Random Choices" scales to thousands of servers'
        ],
        code: {
          language: 'cpp',
          content: `// Weighted Round Robin Implementation
class WeightedRoundRobinLB {
    struct WeightedServer {
        Server* server;
        int weight;
        int currentWeight;
    };
    vector<WeightedServer> servers;
    int totalWeight = 0;
    
public:
    WeightedRoundRobinLB(vector<pair<Server*, int>> weighted) {
        for (auto [server, weight] : weighted) {
            servers.push_back({server, weight, 0});
            totalWeight += weight;
        }
    }
    
    Server* getNext() {
        WeightedServer* selected = nullptr;
        int maxCurrentWeight = -1;
        
        for (auto& ws : servers) {
            ws.currentWeight += ws.weight;
            if (ws.currentWeight > maxCurrentWeight) {
                maxCurrentWeight = ws.currentWeight;
                selected = &ws;
            }
        }
        
        selected->currentWeight -= totalWeight;
        return selected->server;
    }
};

// Least Connections LB
class LeastConnectionsLB {
    struct ServerState {
        Server* server;
        atomic<int> activeConnections{0};
    };
    vector<ServerState> servers;
    
public:
    Server* getServer() {
        auto it = min_element(servers.begin(), servers.end(),
            [](const ServerState& a, const ServerState& b) {
                return a.activeConnections < b.activeConnections;
            });
        it->activeConnections++;
        return it->server;
    }
    
    void releaseConnection(Server* s) {
        for (auto& state : servers) {
            if (state.server == s) {
                state.activeConnections--;
                break;
            }
        }
    }
};

// IP Hash LB (Consistent Session Affinity)
class IPHashLB {
    vector<Server*> servers;
    hash<string> hasher;
    
public:
    Server* getServer(string clientIP) {
        size_t hashval = hasher(clientIP);
        return servers[hashval % servers.size()];
    }
};

// Power of 2 Random Choices
class PowerOfTwoLB {
    vector<ServerState> servers;
    
public:
    Server* getServer() {
        // Pick 2 random servers
        int idx1 = rand() % servers.size();
        int idx2 = rand() % servers.size();
        
        // Return one with fewer connections
        if (servers[idx1].activeConnections <= 
            servers[idx2].activeConnections) {
            servers[idx1].activeConnections++;
            return servers[idx1].server;
        } else {
            servers[idx2].activeConnections++;
            return servers[idx2].server;
        }
    }
};`
        }
      },
      {
        title: 'L4 vs L7 Load Balancing - Deep Dive',
        content: `
**Layer 4 (Transport/Network Layer)**
- Operates at TCP/UDP level
- Routing decision based on:
  - Source IP address
  - Destination IP address
  - Source port
  - Destination port
- **Cannot see**: HTTP headers, URL paths, cookies, payload
- **Performance**: 10M+ requests/sec
- **Latency**: Sub-millisecond
- **Examples**: AWS NLB, HAProxy (TCP mode), IPVS, LVS

**Layer 7 (Application Layer)**
- Operates at HTTP/HTTPS level
- Routing decision based on:
  - URL path (/api/* vs /static/*)
  - HTTP headers (Host, User-Agent, X-Version)
  - Cookies (session_id)
  - Query parameters (?region=us)
- **Can perform**:
  - SSL/TLS termination
  - HTTP compression
  - Request/response modification
  - Web Application Firewall (WAF) filtering
- **Performance**: 1M requests/sec
- **Latency**: Few milliseconds
- **Examples**: AWS ALB, NGINX, HAProxy (HTTP mode), Envoy

**When to Use Each**

**Use L4 when**:
- Pure performance required (database clusters)
- Non-HTTP protocols (MySQL, Postgres, Redis, gRPC)
- Need to preserve client IP without X-Forwarded-For
- Minimal latency critical (gaming, real-time systems)

**Use L7 when**:
- Microservices architecture (content-based routing)
- SSL offloading needed
- Need WAF / DDoS protection
- Canary deployments / A/B testing
- Rate limiting per endpoint

**L7 Routing Patterns**

**URL Path Routing**:
- /api/* → API Server Pool
- /static/* → Static Content CDN
- /ws/* → WebSocket Server Pool

**Header-Based Routing**:
- X-API-Version: v2 → New API servers (Canary)
- X-Device: mobile → Mobile-optimized backend

**Cookie-Based Routing**:
- beta_user=true → Beta feature servers
- session_id=xyz → Sticky session to same server

**Geographic Routing**:
- X-Region: us-east → US data center
- X-Region: eu-west → EU data center

**SSL/TLS Termination**
- LB decrypts SSL, forwards HTTP to backends
- **Pros**:
  - Centralized certificate management
  - Reduces backend CPU (no decryption)
  - Enables HTTP inspection for routing
- **Cons**:
  - Internal traffic unencrypted (need mTLS if sensitive)
  - LB becomes crypto bottleneck
        `,
        keyPoints: [
          'L4: Fast but dumb packet forwarding',
          'L7: Slower but intelligent content routing',
          'L7 enables blue-green deployments and canary releases',
          'SSL termination reduces backend CPU by 20-40%'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│         L4 (TRANSPORT LAYER) vs L7 (APPLICATION)             │
│                                                              │
│  L4 LOAD BALANCER (TCP/UDP):                                 │
│                                                              │
│    Client ──TCP SYN──▶ LB ──TCP──▶ Backend                  │
│                                                              │
│    Decision: IP:Port tuple                                   │
│    Visibility: NONE (just forwards packets)                  │
│    Performance: 10M+ RPS                                     │
│    Latency: < 1ms                                            │
│                                                              │
│    Use: Database clusters, Redis, Game servers               │
│                                                              │
│  ─────────────────────────────────────────────────────       │
│                                                              │
│  L7 LOAD BALANCER (HTTP/HTTPS):                              │
│                                                              │
│    Client ──HTTPS──▶ LB (SSL terminate) ──HTTP──▶ Backend   │
│                                                              │
│    Decision:                                                 │
│      • URL: /api/* → API pool                                │
│      • Header: X-Version: v2 → Canary                        │
│      • Cookie: premium=1 → Premium tier                      │
│                                                              │
│    Visibility: FULL (can inspect & modify HTTP)              │
│    Performance: ~1M RPS                                      │
│    Latency: ~5ms                                             │
│                                                              │
│    Use: Microservices, API Gateway, CDN origin               │
│                                                              │
│  ─────────────────────────────────────────────────────       │
│                                                              │
│  L7 ADVANCED ROUTING EXAMPLE:                                │
│                                                              │
│    Incoming Request: GET /api/users/123                      │
│       ├─ Header "X-Version: v2" → Canary Pool (5%)           │
│       ├─ Cookie "beta=true" → Beta Pool                      │
│       ├─ IP in [EU range] → EU Data Center                   │
│       └─ Default → Production Pool                           │
│                                                              │
│    Enables: Blue-Green, Canary, A/B Testing                  │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'Health Checks & Circuit Breakers',
        content: `
**Active Health Checks**
- Load balancer proactively probes backends at regular intervals
- **HTTP Health Check**:
  - GET /health → 200 OK (healthy) or 5xx (unhealthy)
  - Check interval: 5-30 seconds
  - Timeout: 2-10 seconds
  - Threshold: Mark unhealthy after N consecutive failures (typically 2-3)
- **TCP Health Check**:
  - Attempt TCP connection to port
  - Success = healthy, timeout/refused = unhealthy
- **Custom Health Checks**:
  - Check DB connectivity
  - Check dependent service availability
  - Check disk space / memory

**Passive Health Checks**
- Monitor actual production traffic for errors
- After N consecutive 5xx responses → mark unhealthy
- After M successful responses → mark healthy again
- **Pros**: No extra health check traffic
- **Cons**: Slower failure detection

**Hybrid Approach** (Best Practice)
- Active checks for continuous monitoring
- Passive checks for quick failure detection
- Combine both signals for reliability

**Circuit Breaker Pattern** (Critical for Microservices!)

**Three States**:
1. **CLOSED** (Normal operation)
   - Requests flow through normally
   - Track failure rate
   
2. **OPEN** (Failing)
   - After failure threshold exceeded
   - All requests fail fast (no backend call)
   - Prevents cascade failure
   - Set timeout (e.g., 60 seconds)
   
3. **HALF-OPEN** (Testing recovery)
   - After timeout expires
   - Allow limited test requests
   - If succeed → transition to CLOSED
   - If fail → back to OPEN

**Configuration**:
- Failure threshold: 50% errors or 5 consecutive failures
- Timeout: 30-120 seconds
- Success threshold in half-open: 2-3 successful requests

**Graceful Shutdown**
1. Stop accepting new connections (drain mode)
2. Wait for in-flight requests to complete (30-60s timeout)
3. Signal orchestrator (Kubernetes) that shutdown is complete
4. Terminate process

**Interview Question**: How does health check prevent cascading failure?
Answer:
- Unhealthy backend removed from pool
- Traffic redirected to healthy backends
- Circuit breaker prevents retry storms
- Exponential backoff for retries
        `,
        keyPoints: [
          'Active checks: Continuous monitoring, slower',
          'Passive checks: Fast detection from real traffic',
          'Circuit breaker prevents cascading failures (critical!)',
          'Fail fast better than slow failure (timeouts)'
        ],
        code: {
          language: 'cpp',
          content: `// Circuit Breaker Implementation
enum class CircuitState { CLOSED, OPEN, HALF_OPEN };

class CircuitBreaker {
    CircuitState state = CircuitState::CLOSED;
    atomic<int> failureCount{0};
    atomic<int> successCount{0};
    time_t lastFailureTime = 0;
    
    // Configuration
    const int FAILURE_THRESHOLD = 5;
    const int SUCCESS_THRESHOLD = 3;
    const int TIMEOUT_SECONDS = 60;
    const double FAILURE_RATE_THRESHOLD = 0.5; // 50%
    
    atomic<int> totalRequests{0};
    atomic<int> failedRequests{0};
    
public:
    bool allowRequest() {
        if (state == CircuitState::CLOSED) {
            return true;
        }
        
        if (state == CircuitState::OPEN) {
            // Check if timeout elapsed
            if (time(nullptr) - lastFailureTime > TIMEOUT_SECONDS) {
                state = CircuitState::HALF_OPEN;
                successCount = 0;
                failureCount = 0;
                return true;
            }
            // Fail fast - don't even try
            return false;
        }
        
        // HALF_OPEN: Allow limited test requests
        return true;
    }
    
    void recordSuccess() {
        totalRequests++;
        
        if (state == CircuitState::HALF_OPEN) {
            successCount++;
            if (successCount >= SUCCESS_THRESHOLD) {
                state = CircuitState::CLOSED;
                failureCount = 0;
                // Reset metrics
                totalRequests = 0;
                failedRequests = 0;
            }
        } else if (state == CircuitState::CLOSED) {
            failureCount = 0; // Reset on success
        }
    }
    
    void recordFailure() {
        totalRequests++;
        failedRequests++;
        failureCount++;
        lastFailureTime = time(nullptr);
        
        if (state == CircuitState::HALF_OPEN) {
            // Immediate transition back to OPEN
            state = CircuitState::OPEN;
            return;
        }
        
        if (state == CircuitState::CLOSED) {
            // Check thresholds
            if (failureCount >= FAILURE_THRESHOLD) {
                state = CircuitState::OPEN;
                return;
            }
            
            // Check failure rate
            if (totalRequests >= 10) {
                double failureRate = (double)failedRequests / totalRequests;
                if (failureRate >= FAILURE_RATE_THRESHOLD) {
                    state = CircuitState::OPEN;
                }
            }
        }
    }
    
    CircuitState getState() const { return state; }
};

// Health Check Manager
class HealthCheckManager {
    struct BackendHealth {
        Server* server;
        atomic<int> consecutiveFailures{0};
        atomic<int> consecutiveSuccesses{0};
        atomic<bool> healthy{true};
        time_t lastCheckedTime = 0;
    };
    
    vector<BackendHealth> backends;
    const int CHECK_INTERVAL_SEC = 5;
    const int FAILURE_THRESHOLD = 3;
    const int SUCCESS_THRESHOLD = 2;
    
public:
    void runHealthChecks() {
        while (true) {
            auto now = time(nullptr);
            
            for (auto& bh : backends) {
                if (now - bh.lastCheckedTime < CHECK_INTERVAL_SEC) {
                    continue;
                }
                
                bool ok = performHealthCheck(bh.server);
                bh.lastCheckTime = now;
                
                if (ok) {
                    bh.consecutiveFailures = 0;
                    bh.consecutiveSuccesses++;
                    
                    if (!bh.healthy && 
                        bh.consecutiveSuccesses >= SUCCESS_THRESHOLD) {
                        bh.healthy = true;
                        // Notify: Backend recovered
                        addToLoadBalancerPool(bh.server);
                    }
                } else {
                    bh.consecutiveSuccesses = 0;
                    bh.consecutiveFailures++;
                    
                    if (bh.healthy && 
                        bh.consecutiveFailures >= FAILURE_THRESHOLD) {
                        bh.healthy = false;
                        // Alert & remove from pool
                        removeFromLoadBalancerPool(bh.server);
                        alert("Backend unhealthy: " + bh.server->id);
                    }
                }
            }
            
            sleep(1); // Check loop every second
        }
    }
    
private:
    bool performHealthCheck(Server* server) {
        try {
            HttpResponse resp = server->httpGet("/health", 2000 /*timeout*/);
            return resp.statusCode == 200;
        } catch (...) {
            return false;
        }
    }
};`
        }
      }
    ]
  },

  'caching': {
    id: 'caching',
    title: 'Caching Strategies & Distributed Caches',
    description: 'Comprehensive guide to caching patterns, eviction policies, cache coherence, and distributed caching systems',
    sections: [
      {
        title: 'Caching Strategies & Patterns',
        content: `
**Why Cache?**
- Reduce latency: RAM (ns) vs Disk (ms) vs Network (ms-s)
- Reduce load: Avoid expensive DB queries, API calls
- Improve throughput: Serve more requests with same backend capacity

**1. Cache-Aside (Lazy Loading)** - Most Common
- Application code manages cache
- Flow:
  1. Check cache
  2. If HIT → return cached data
  3. If MISS → query DB → populate cache → return data
- **Pros**: Only cache what's needed, simple to implement
- **Cons**: Cache miss penalty (3 steps), potential stale data
- **Use Case**: Read-heavy workloads (product catalog, user profiles)

**2. Read-Through Cache**
- Cache sits between app and DB
- Cache automatically fetches from DB on miss
- **Pros**: Transparent to application, cleaner code
- **Cons**: Requires cache library support, cold start problem
- **Use Case**: When cache library supports it (e.g., some ORMs)

**3. Write-Through Cache**
- Write to cache AND database synchronously
- **Pros**: Strong consistency, no data loss, cache always fresh
- **Cons**: Write latency (2× writes), cache pollution (write-once data)
- **Use Case**: Financial systems, inventory management

**4. Write-Behind (Write-Back) Cache**
- Write to cache immediately, async batch write to DB
- **Pros**: Low write latency, batching improves DB throughput
- **Cons**: Data loss risk if cache fails before DB write, eventual consistency
- **Use Case**: High write throughput (analytics, logging, metrics)

**5. Write-Around Cache**
- Write directly to DB, invalidate/bypass cache
- **Pros**: No cache pollution for write-once-read-never data
- **Cons**: Next read will be cache miss
- **Use Case**: Write-heavy append-only logs

**Cache Invalidation Strategies** (Hardest Problem in CS!)

**TTL (Time interval To Live)**
- Data expires after N seconds
- **Pros**: Simple, automatic cleanup
- **Cons**: Stale data before expiry, arbitrary timeout value

**Event-Based Invalidation**
- Invalidate on write/update events
- **Pros**: Fresher data, no arbitrary timeouts
- **Cons**: Complex pub-sub infrastructure, cache stampede risk

**Version-Based (Versioned Caching)**
- Include version number in cache key: user:123:v5
- Increment version on update
- **Pros**: Precise invalidation, no stale reads
- **Cons**: Version number management overhead

**Interview Question: Cache Stampede Problem**
- Cache expires for popular key
- 10,000 concurrent requests hit DB simultaneously
- Solutions:
  1. **Mutex Lock**: Only first request fetches, others wait
  2. **Probabilistic Early Expiration**: Refresh before expiry
  3. **Background Refresh**: Async pre-fetch before expiry
        `,
        keyPoints: [
          'Cache-Aside is most common pattern for reads',
          'Write-Through for consistency, Write-Behind for performance',
          'TTL is simple but allows staleness',
          'Cache stampede protection is critical for hot keys'
        ],
        code: {
          language: 'cpp',
          content: `// Cache-Aside Pattern with Stampede Protection
class CacheAsideService {
    Cache& cache;
    Database& db;
    mutex keyLocks[1024]; // Per-key mutexes (hash to bucket)
    
    mutex& getLockForKey(string key) {
        size_t bucket = hash<string>{}(key) % 1024;
        return keyLocks[bucket];
    }
    
public:
    Data get(string key) {
        // 1. Try cache first
        optional<Data> cached = cache.get(key);
        if (cached.has_value()) {
            return cached.value(); // Cache HIT
        }
        
        // 2. Cache MISS: Prevent stampede with lock
        lock_guard<mutex> lock(getLockForKey(key));
        
        // 3. Double-check after acquiring lock
        cached = cache.get(key);
        if (cached.has_value()) {
            return cached.value(); // Another thread populated it
        }
        
        // 4. Fetch from database
        Data data = db.query(key);
        
        // 5. Populate cache for next time
        cache.set(key, data, TTL_SECONDS);
        
        return data;
    }
    
    void update(string key, Data newData) {
        // Write-Through: Update both
        db.update(key, newData);
        cache.set(key, newData, TTL_SECONDS);
        
        // OR Write-Around: Invalidate cache
        // db.update(key, newData);
        // cache.delete(key);
    }
};

// Probabilistic Early Expiration (XFetch Algorithm)
Data getWithEarlyExpiration(string key) {
    auto [data, expiryTime] = cache.getWithExpiry(key);
    
    if (data.has_value()) {
        time_t now = time(nullptr);
        time_t ttl = expiryTime - now;
        
        // Probabilistic refresh formula
        double delta = 60.0; // refresh window (seconds)
        double beta = 1.0;   // tuning parameter
        double random = (double)rand() / RAND_MAX;
        
        // XFetch: refresh when delta * beta * log(rand) >= ttl
        if (delta * beta * log(random) >= ttl) {
            // Async background refresh
            async([&]() {
                Data fresh = db.query(key);
                cache.set(key, fresh, TTL_SECONDS);
            });
        }
        
        return data.value();
    }
    
    // Cache miss: fetch synchronously
    return fetchAndCache(key);
}

// Write-Behind Pattern
class WriteBehindCache {
    Cache& cache;
    Database& db;
    queue<pair<string, Data>> writeQueue;
    mutex queueMutex;
    condition_variable cv;
    thread backgroundWriter;
    
public:
    void write(string key, Data data) {
        // 1. Write to cache immediately (fast!)
        cache.set(key, data);
        
        // 2. Queue for async DB write
        {
            lock_guard<mutex> lock(queueMutex);
            writeQueue.push({key, data});
        }
        cv.notify_one();
    }
    
    void startBackgroundWriter() {
        backgroundWriter = thread([this]() {
            vector<pair<string, Data>> batch;
            
            while (true) {
                {
                    unique_lock<mutex> lock(queueMutex);
                    cv.wait_for(lock, chrono::seconds(1),
                        [this] { return !writeQueue.empty(); });
                    
                    // Batch up to 100 writes
                    while (!writeQueue.empty() && batch.size() < 100) {
                        batch.push_back(writeQueue.front());
                        writeQueue.pop();
                    }
                }
                
                if (!batch.empty()) {
                    db.batchWrite(batch); // Single DB transaction
                    batch.clear();
                }
            }
        });
    }
};`
        }
      },
      {
        title: 'Cache Eviction Policies',
        content: `
**Cache Eviction**: When cache is full, which item to remove?

**1. LRU (Least Recently Used)** - Industry Standard
- Evict item not accessed for longest time
- **Assumption**: Recently accessed data likely to be accessed again
- **Pros**: Good for most workloads, respects temporal locality
- **Cons**: Doesn't consider access frequency, scan-resistant issues
- **Implementation**: HashMap + Doubly Linked List (O(1) get/put)
- **Used by**: Redis (default), Memcached, CPU caches

**2. LFU (Least Frequently Used)**
- Evict item with lowest access count
- **Assumption**: Popular items should stay
- **Pros**: Retains truly popular data
- **Cons**: Old popular items linger, hard to implement efficiently
- **Implementation**: HashMap + Min Heap (O(log n) evict) or Count-Min Sketch
- **Used by**: Redis (optional mode)

**3. FIFO (First-In-First-Out)**
- Evict oldest item (queue-based)
- **Pros**: Simplest implementation
- **Cons**: Completely ignores access patterns
- **Use Case**: Circular buffers, simple scenarios

**4. Random Replacement**
- Evict random item
- **Pros**: No overhead, no state tracking
- **Cons**: Might evict hot data
- **Surprising**: Often performs reasonably well for large caches

**5. ARC (Adaptive Replacement Cache)**
- Balances recency (LRU) and frequency (LFU) dynamically
- Maintains two lists: recent + frequent
- Auto-tunes weights based on workload
- **Pros**: Adapts to changing access patterns
- **Cons**: Complex, patented (IBM)
- **Used by**: ZFS file system

**6. CLOCK (Second Chance)**
- Approximates LRU using reference bit
- Circular list with "hand" pointer
- **Pros**: Simple, efficient, approximates LRU
- **Used by**: OS page replacement

**Cache Hit Rate Optimization**
- **80/20 Rule (Pareto)**: 20% of data accounts for 80% of accesses
- **Target**: >80% hit rate for read-heavy workloads
- **Calculation**: hit_rate = cache_hits / total_requests
- **Monitoring**: Track hit rate per cache level

**Interview Question**: Compare LRU vs LFU
- **LRU**: Better for temporal locality (recent spike)
- **LFU**: Better for skewed distribution (power law)
- **Real-world**: LRU is safer default, LFU for proven skew
        `,
        keyPoints: [
          'LRU is industry standard (good enough for most cases)',
          'LFU for power-law distributions (e.g., Zipf)',
          'Target >80% hit rate for effective caching',
          'ARC adapts dynamically but complex'
        ],
        code: {
          language: 'cpp',
          content: `// LRU Cache - Interview Classic!
class LRUCache {
    struct Node {
        int key, value;
        Node *prev, *next;
    };
    
    unordered_map<int, Node*> cache;
    Node *head, *tail;
    int capacity;
    
    void removeNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    
    void addToFront(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }
    
    void moveToFront(Node* node) {
        removeNode(node);
        addToFront(node);
    }
    
public:
    LRUCache(int cap) : capacity(cap) {
        head = new Node{0, 0, nullptr, nullptr};
        tail = new Node{0, 0, nullptr, nullptr};
        head->next = tail;
        tail->prev = head;
    }
    
    int get(int key) {
        if (!cache.count(key)) {
            return -1; // Cache miss
        }
        Node* node = cache[key];
        moveToFront(node); // Mark as recently used
        return node->value;
    }
    
    void put(int key, int value) {
        if (cache.count(key)) {
            // Update existing
            Node* node = cache[key];
            node->value = value;
            moveToFront(node);
            return;
        }
        
        if (cache.size() == capacity) {
            // Evict LRU (tail)
            Node* lru = tail->prev;
            cache.erase(lru->key);
            removeNode(lru);
            delete lru;
        }
        
        // Insert new node at front (most recently used)
        Node* newNode = new Node{key, value, nullptr, nullptr};
        cache[key] = newNode;
        addToFront(newNode);
    }
    
    ~LRUCache() {
        Node* curr = head;
        while (curr) {
            Node* next = curr->next;
            delete curr;
            curr = next;
        }
    }
};

// LFU Cache Implementation
class LFUCache {
    struct Node {
        int key, value, freq;
    };
    
    unordered_map<int, Node> cache; // key -> node
    unordered_map<int, list<int>> freqList; // freq -> keys with that freq
    unordered_map<int, list<int>::iterator> keyPos; // key -> position in freqList
    int capacity, minFreq;
    
public:
    LFUCache(int cap) : capacity(cap), minFreq(0) {}
    
    int get(int key) {
        if (!cache.count(key)) return -1;
        
        Node& node = cache[key];
        updateFrequency(key, node.freq);
        return node.value;
    }
    
    void put(int key, int value) {
        if (capacity == 0) return;
        
        if (cache.count(key)) {
            cache[key].value = value;
            updateFrequency(key, cache[key].freq);
            return;
        }
        
        if (cache.size() == capacity) {
            // Evict LFU (break ties with LRU)
            int evictKey = freqList[minFreq].back();
            freqList[minFreq].pop_back();
            cache.erase(evictKey);
            keyPos.erase(evictKey);
        }
        
        cache[key] = {key, value, 1};
        freqList[1].push_front(key);
        keyPos[key] = freqList[1].begin();
        minFreq = 1;
    }
    
private:
    void updateFrequency(int key, int oldFreq) {
        // Remove from old frequency list
        freqList[oldFreq].erase(keyPos[key]);
        if (freqList[oldFreq].empty() && oldFreq == minFreq) {
            minFreq++;
        }
        
        // Add to new frequency list
        int newFreq = oldFreq + 1;
        freqList[newFreq].push_front(key);
        keyPos[key] = freqList[newFreq].begin();
        cache[key].freq = newFreq;
    }
};`
        }
      },
      {
        title: 'Distributed Caching & Multi-Level Architecture',
        content: `
**Distributed Cache Systems**

**1. Redis** - In-Memory Data Structure Server
- **Data Structures**: Strings, Lists, Sets, Sorted Sets, Hashes, HyperLogLog, Bitmaps
- **Persistence**: RDB (snapshots) + AOF (append-only file)
- **Replication**: Master-slave, automatic failover with Sentinel
- **Sharding**: Redis Cluster (16384 hash slots)
- **Use Cases**: Session store, leaderboard, rate limiting, pub-sub
- **Performance**: 100K+ ops/sec per instance

**2. Memcached** - Pure In-Memory Cache
- **Design**: Simple key-value store
- **Threading**: Multithreaded (better CPU utilization than Redis)
- **Persistence**: None (pure cache)
- **Sharding**: Client-side consistent hashing
- **Use Cases**: Pure caching (HTML fragments, DB query results)
- **Performance**: 1M+ ops/sec per instance

**Redis vs Memcached**:
- **Redis**: Richer data structures, persistence, replication
- **Memcached**: Simpler, multi-threaded, pure caching
- **Choose Redis** when: Need persistence, complex data types, pub-sub
- **Choose Memcached** when: Pure key-value cache, multi-core servers

**Multi-Level Caching Architecture**

**Level 1: Browser/Client Cache**
- HTTP Cache-Control, ETags
- Latency: 0ms (local)
- Hit rate: 30-40%

**Level 2: CDN (Content Delivery Network)**
- Edge caches (CloudFront, Cloudflare, Akamai)
- Latency: 10-50ms
- Hit rate: 30-40%
- **Best for**: Static assets (images, CSS, JS, videos)

**Level 3: Application In-Memory Cache**
- caffeine Local HashMap, Guava Cache (Java), Caffeine
- Latency: <1ms
- Hit rate: 10-20%
- **Trade-off**: No sharing across instances

**Level 4: Distributed Cache (Redis/Memcached)**
- Shared across all app instances
- Latency: 1-5ms (network call)
- Hit rate: 5-10%
- **Critical for**: Sessions, rate limits

**Level 5: Database Query Cache**
- DB internal cache (query results)
- Latency: 10-50ms
- Only helps repeated identical queries

**Cache Coherence Problem**
- Challenge: Keeping L3 (app cache) and L4 (Redis) in sync
- **Solution 1**: Event-driven invalidation (pub-sub)
- **Solution 2**: Short TTL on L3 (e.g., 5 seconds)
- **Solution 3**: Version numbers in cache keys

**CDN Pull vs Push**
- **Pull (Origin Pull)**: CDN fetches from origin on first request
  - Pros: Automatic cache population
  - Cons: First request slow (cache miss)
- **Push**: Pre-populate CDN with content
  - Pros: Immediate warm cache
  - Cons: Manual upload process

**Interview Question**: Design multi-level cache for e-commerce site
Answer:
- Browser: Product images (1 day TTL)
- CDN: Static assets, product images (1 week TTL)
- App Cache: HOT product data (30s TTL)
- Redis: Session data, cart data, product metadata (1 hour TTL)
- DB: Source of truth

Total expected hit rate: 95%+ (only 5% hit DB)
        `,
        keyPoints: [
          'Redis for rich data structures & persistence',
          'Memcached for pure high-performance caching',
          'Multi-level caching achieves 95%+ hit rates',
          'CDN essential for global static content delivery'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│           MULTI-LEVEL CACHING ARCHITECTURE                   │
│                                                              │
│   Client Request → Product Page                              │
│                                                              │
│   1. Browser Cache (L1):                                     │
│      • HTML: No cache                                        │
│      • CSS/JS: Cache 1 week                                  │
│      • Images: Cache 1 day                                   │
│      Hit: ~40%, Latency: 0ms                                 │
│         ↓ (miss)                                             │
│                                                              │
│   2. CDN Edge Server (L2):                                   │
│      • Static assets: CSS, JS, images                        │
│      • Geographic proximity                                  │
│      Hit: ~30%, Latency: 10-50ms                             │
│         ↓ (miss)                                             │
│                                                              │
│   3. Load Balancer                                           │
│         ↓                                                    │
│                                                              │
│   4. App Server + In-Memory Cache (L3):                      │
│      • Hot product data (HashMap)                            │
│      • TTL: 30 seconds                                       │
│      Hit: ~15%, Latency: <1ms                                │
│         ↓ (miss)                                             │
│                                                              │
│   5. Redis Cluster (L4):                                     │
│      ┌────────┬────────┬────────┐                           │
│      │ Shard1 │ Shard2 │ Shard3 │                           │
│      │(0-5460)│(5461-  │(10923-)│                           │
│      └────────┴─10922)─┴────────┘                           │
│      • Product metadata, pricing                             │
│      • Session data, shopping cart                           │
│      Hit: ~10%, Latency: 1-5ms                               │
│         ↓ (miss)                                             │
│                                                              │
│   6. Database (L5):                                          │
│      ┌──────────────┐    ┌──────────────┐                   │
│      │ Primary (W)  │───▶│ Replica (R)  │                   │
│      └──────────────┘    └──────────────┘                   │
│      Hit: ~5%, Latency: 50-200ms                             │
│                                                              │
│   ─────────────────────────────────────────────────          │
│                                                              │
│   Cumulative Hit Rate:                                       │
│   L1: 40% + L2: 18% + L3: 6.3% + L4: 3.2% + DB: 32.5%       │
│   = 67.5% cached, 32.5% DB queries                           │
│                                                              │
│   With tuning: Achieve 95%+ cache hit rate                   │
└─────────────────────────────────────────────────────────────┘
          `
        }
      }
    ]
  },

  'sharding': {
    id: 'sharding',
    title: 'Database Sharding & Partitioning',
    description: 'Horizontal data partitioning strategies, consistent hashing, rebalancing, and handling hotspots',
    sections: [
      {
        title: 'Sharding Strategies & Trade-offs',
        content: `
**What is Sharding?**
- Horizontal partitioning of data across multiple databases
- Each shard holds subset of total data
- Goal: Distribute load, overcome single-server limits

**Why Shard?**
- **Storage limits**: Single MySQL has ~10TB practical limit
- **Performance**: Parallel queries across shards
- **High availability**: Shard failure affects only subset
- **Geographic distribution**: Keep data close to users

**Sharding Strategies**

**1. Range-Based Sharding**
- Split by key ranges: Shard1=[A-M], Shard2=[N-Z]
- Or by timestamp: Shard1=[2020-2021], Shard2=[2022-2023]
- **Pros**:
  - Range queries are efficient (SELECT ... WHERE key BETWEEN 'A' AND 'D')
  - Simple conceptual model
  - Easy to archive old shards
- **Cons**:
  - Hotspots if data distribution skewed (e.g., surnames starting with 'S' or 'J')
  - Manual rebalancing as ranges grow unevenly
  - Sequential writes hit same shard (monotonic IDs)
- **Use Cases**: Time-series data, archival systems logs

**2. Hash-Based Sharding**
- Shard ID = hash(key) mod N
- **Pros**:
  - Uniform distribution (no hotspots)
  - Automatic load balancing
- **Cons**:
  - Adding/removing shard reshuffles most data (K × (N-1)/N keys move)
  - Cannot do range queries efficiently
  - Rehashing downtime
- **Use Cases**: Key-value stores, session management

**3. Consistent Hashing** - Gold Standard!
- Both keys and shards map to ring [0, 2^32-1]
- Key assigned to first shard encountered clockwise
- Adding shard only affects immediate neighbors
- **Pros**:
  - Minimal reshuffling: Only K/N keys affected when adding shard
  - Elastic scaling without downtime
  - Self-balancing with virtual nodes
- **Cons**:
  - More complex implementation
  - Need virtual nodes (vnodes) for even distribution
- **Use Cases**: Distributed caches (Memcached, Redis Cluster), CDNs, Cassandra

**4. Directory-Based (Lookup Table)**
- Central directory: key → shard_id mapping
- **Pros**:
  - Ultimate flexibility
  - Can implement any routing logic (geo, tenant, feature flags)
- **Cons**:
  - Directory service is SPOF and bottleneck
  - Extra network hop per query
  - Directory must be highly available
- **Use Cases**: Multi-tenant SaaS, complex routing rules

**5. Geographic / Geo-Sharding**
- Partition by region: US-East, EU-West, Asia-Pacific
- **Pros**:
  - Data locality → low latency (users in EU hit EU shard)
  - Compliance with data residency laws (GDPR)
  - Disaster recovery (region isolation)
- **Cons**:
  - Uneven load (more US users than Greenland)
  - Cross-region queries expensive and slow
  - Complex routing logic
- **Use Cases**: Global SaaS apps, social networks

**Virtual Nodes (VNodes)**
- Each physical shard maps to 100-150 points on the ring
- **Why**: Prevents uneven distribution when using consistent hashing
- **Bonus**: Enables weighted sharding (powerful shard = more vnodes)
- **Example**: Cassandra uses 256 vnodes per node by default

**Interview Question**: Design sharding for URL shortener with 100B URLs
Answer:
- Use **hash-based** partitioning: shard = hash(short_url) % N
- Or **consistent hashing** for elastic scaling
- Each shard: Replicated 3x for HA (leader + 2 replicas)
- Shard key must be in WHERE clause to route to single shard
- Cannot do range queries on short_url (trade-off)
        `,
        keyPoints: [
         'Hash sharding for uniform distribution',
          'Consistent hashing minimizes data movement during scaling',
          'Range sharding only when range queries critical',
          'Always use virtual nodes with consistent hashing'
        ],
        code: {
          language: 'cpp',
          content: `// Consistent Hashing with Virtual Nodes
#include <map>
#include <vector>
#include <string>
#include <functional>

class ConsistentHashing {
    std::map<uint32_t, Server*> ring;
    int virtualNodesPerServer = 150;
    std::hash<std::string> hasher;
    
public:
    void addServer(Server* server) {
        for (int i = 0; i < virtualNodesPerServer; i++) {
            string vnodeKey = server->id + "#vnode" + to_string(i);
            uint32_t hash = hasher(vnodeKey);
            ring[hash] = server;
        }
        // Log: Added virtual nodes spread across ring
    }
    
    void removeServer(Server* server) {
        for (int i = 0; i < virtualNodesPerServer; i++) {
            string vnodeKey = server->id + "#vnode" + to_string(i);
            uint32_t hash = hasher(vnodeKey);
            ring.erase(hash);
        }
    }
    
    Server* getServer(const string& key) {
        if (ring.empty()) return nullptr;
        
        uint32_t hash = hasher(key);
        
        // Find first server clockwise (>= hash)
        auto it = ring.lower_bound(hash);
        
        // Wrap around if at end of ring
        if (it == ring.end()) {
            it = ring.begin();
        }
        
        return it->second;
    }
    
    // Calculate which keys need migration when adding server
    vector<string> getKeysToMigrate(Server* newServer, 
                                     const vector<string>& allKeys) {
        vector<string> keysToMigrate;
        
        for (const auto& key : allKeys) {
            Server* assignedServer = getServer(key);
            if (assignedServer == newServer) {
                keysToMigrate.push_back(key);
            }
        }
        
        // Approximately K/N keys will migrate
        return keysToMigrate;
    }
};

// Range-Based Sharding
class RangeBasedSharding {
    struct Range {
        string startKey, endKey;
        Server* server;
    };
    vector<Range> ranges;
    
public:
    Server* getServer(const string& key) {
        // Binary search for efficiency
        for (const auto& range : ranges) {
            if (key >= range.startKey && key < range.endKey) {
                return range.server;
            }
        }
        return nullptr; // Key out of range
    }
    
    void splitRange(const string& splitPoint, Server* newServer) {
        // Find range containing splitPoint
        for (auto& range : ranges) {
            if (splitPoint > range.startKey && splitPoint < range.endKey) {
                // Create new range
                Range newRange = {splitPoint, range.endKey, newServer};
                range.endKey = splitPoint;
                ranges.push_back(newRange);
                // Trigger data migration from old to new shard
                break;
            }
        }
    }
};`
        }
      },
      {
        title: 'Resharding & Rebalancing',
        content: `
**When to Reshard?**
- **Hotspots detected**: One shard receiving disproportionate traffic
- **Storage imbalance**: One shard growing much faster than others
- **Adding capacity**: Need more shards to scale
- **Removing capacity**: Consolidating shards to save costs

**Challenges of Resharding**
1. **Data migration** while system is live
2. **Maintaining consistency** during transition
3. **Avoiding downtime**
4. **Handling in-flight requests** during migration

**Resharding Strategies**

**1. Stop-The-World Resharding** (Simplest but Downtime)
- Take system offline
- Migrate all data
- Restart with new shard topology
- **Downtime**: Hours to days for large datasets
- **Use when**: Can tolerate maintenance window

**2. Double-Write Pattern**
- Write to both old and new shards during migration
- Read from old shard
- Background process copies data old → new
- Switch reads to new shard once complete
- **Downtime**: Zero
- **Complexity**: Medium
- **Used by**: Stripe, GitHub

**3. Read-Repair / Lazy Migration**
- Queries check new shard first
- If miss, fall back to old shard
- Copy data to new shard on read
- Eventually all data migrates
- **Downtime**: Zero
- **Complexity**: Low
- **Trade-off**: Slower reads during migration

**4. Dual-Read & Compare**
- Read from both old and new shards
- Compare results (validation)
- Gradually increase traffic to new shard
- **Downtime**: Zero
- **Complexity**: High
- **Best for**: Mission-critical systems

**Consistent Hashing Advantage**
- Adding 1 new shard only requires migrating K/N keys
- Example: 100M keys, 10 shards → add 11th shard → migrate 9M keys (9%)
- vs Normal hash: rehash ALL 100M keys

**Hotspot Mitigation**

**Hotspot**: Single shard receiving disproportionate load

**Causes**:
- Celebrity user (Taylor Swift's tweets)
- Popular product (iPhone launch)
- Sequential ID allocation (all new writes to one shard)

**Solutions**:
1. **Split the hot shard**: Divide range into smaller sub-ranges
2. **Add jitter to shard key**: hash(key + random_suffix)
3. **Cache hot data**: Offload reads to cache layer
4. **Dedicated shard**: Isolate celebrity data to separate infrastructure
5. **Rate limiting**: Throttle requests to prevent overload

**Interview Question**: How to reshard live production database?
Answer:
1. **Phase 1**: Set up new shards with replication from old shards
2. **Phase 2**: Enable double-write (write to both old & new)
3. **Phase 3**: Background migration of historical data
4. **Phase 4**: Gradually shift read traffic new (10% → 50% → 100%)
5. **Phase 5**: Disable old shards once fully migrated
6. **Rollback**: Keep old shards running for 1 week for safety
        `,
        keyPoints: [
          'Consistent hashing minimizes data movement (K/N keys)',
          'Double-write enables zero-downtime resharding',
          'Hotspot mitigation: split shard, cache, rate limit',
          'Always plan rollback strategy before resharding'
        ],
        code: {
          language: 'cpp',
          content: `// Resharding with Double-Write Pattern
class ReshardingCoordinator {
    ShardMap oldShards;
    ShardMap newShards;
    bool migrationInProgress = false;
    set<string> migratedKeys; // Track what's migrated
    
public:
    void startMigration() {
        migrationInProgress = true;
        // Start background migration worker
        thread(&ReshardingCoordinator::backgroundMigration, this).detach();
    }
    
    void write(const string& key, const Data& data) {
        if (migrationInProgress) {
            // DOUBLE-WRITE: Write to both old and new
            oldShards.getShard(key)->write(key, data);
            newShards.getShard(key)->write(key, data);
            migratedKeys.insert(key);
        } else {
            // Normal write
            getCurrentShards().getShard(key)->write(key, data);
        }
    }
    
    Data read(const string& key) {
        if (migrationInProgress) {
            // Check if already migrated
            if (migratedKeys.count(key)) {
                return newShards.getShard(key)->read(key);
            }
            
            // Read from old, migrate on read (read-repair)
            Data data = oldShards.getShard(key)->read(key);
            
            // Async migration
            async([=]() {
                newShards.getShard(key)->write(key, data);
                migratedKeys.insert(key);
            });
            
            return data;
        }
        
        return getCurrentShards().getShard(key)->read(key);
    }
    
private:
    void backgroundMigration() {
        // Migrate historical data in batches
        for (auto& [shardId, shard] : oldShards.getAll()) {
            auto keys = shard->getAllKeys();
            
            for (const auto& key : keys) {
                if (!migratedKeys.count(key)) {
                    Data data = shard->read(key);
                    newShards.getShard(key)->write(key, data);
                    migratedKeys.insert(key);
                }
                
                // Rate limit: Don't overwhelm system
                this_thread::sleep_for(chrono::microseconds(100));
            }
        }
        
        cout << "Migration complete!" << endl;
        // Can now switch traffic 100% to newShards
    }
    
    void completeMigration() {
        migrationInProgress = false;
        oldShards = newShards; // Swap
        migratedKeys.clear();
    }
};

// Hotspot Detection
class HotspotDetector {
    map<string, atomic<int>> shardRequestCounts;
    int totalRequests = 0;
    
public:
    void recordRequest(string shardId) {
        shardRequestCounts[shardId]++;
        totalRequests++;
    }
    
    vector<string> detectHotspots(double threshold = 0.3) {
        vector<string> hotShards;
        int avgPerShard = totalRequests / shardRequestCounts.size();
        
        for (const auto& [shardId, count] : shardRequestCounts) {
            double ratio = (double)count / totalRequests;
            
            // If shard handles > 30% of traffic → hotspot
            if (ratio > threshold) {
                hotShards.push_back(shardId);
                // Alert: "Shard {shardId} is handling {ratio*100}% of traffic"
            }
        }
        
        return hotShards;
    }
};`
        }
      }
    ]
  },

  'cap-theorem': {
    id: 'cap-theorem',
    title: 'CAP Theorem & Consistency Models',
    description: 'Understanding trade-offs in distributed systems: CAP theorem, PACELC, quorum consensus, consistency levels',
    sections: [
      {
        title: 'CAP Theorem Fundamentals',
        content: `
**The CAP Theorem** (Eric Brewer, 2000)
In a distributed system, you can have at most 2 of 3 properties:

**C - Consistency**
- All nodes see the same data at the same time
- Every read receives the most recent write
- Strong consistency / Linearizability

**A - Availability**
- Every request receives a (non-error) response
- System remains operational even if some nodes fail
- No guarantee response contains most recent write

**P - Partition Tolerance**
- System continues operating despite network partitions
- Messages between nodes may be lost or delayed
- **PARTITION TOLERANCE IS NOT OPTIONAL** in distributed systems!

**The Real Choice: CP vs AP**
Since network partitions WILL happen, the real choice during partition is:
- **CP**: Sacrifice availability for consistency (reject requests)
- **AP**: Sacrifice consistency for availability (serve stale data)

**CP Systems** (Consistency + Partition Tolerance)
- Reject writes during partition to prevent inconsistency
- Examples: HBase, MongoDB, Redis (single master), ZooKeeper, etcd
- Use cases: Financial systems, inventory management

**AP Systems** (Availability + Partition Tolerance)
- Accept writes during partition, resolve conflicts later
- Examples: Cassandra, DynamoDB, Riak, CouchDB
- Use cases: Social media, analytics, IoT data

**CA Systems** (Consistency + Availability)
- **MYTH**: Not possible in distributed systems
- Only viable in single-node systems (traditional RDBMS)
- Network partitions WILL happen at scale

**Interview Question**: What happens during network partition?
- **CP**: System detects partition → minority partition rejects writes → returns errors
- **AP**: Both partitions accept writes → divergent state → conflict resolution needed
        `,
        keyPoints: [
          'Network partitions are inevitable → P is required',
          'Real choice is CP vs AP during partitions',
          'CP: Reject requests to maintain consistency',
          'AP: Serve all requests, resolve conflicts later'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│                      CAP THEOREM                             │
│                                                              │
│                          C                                   │
│                    (Consistency)                             │
│                         /╲                                   │
│                        /  ╲                                  │
│                       /    ╲                                 │
│                      / CA   ╲  ← NOT possible in             │
│                     /(Single )╲   distributed systems!       │
│                    /   Node   ╲                              │
│                   /            ╲                             │
│                  /              ╲                            │
│                 /       CP       ╲                           │
│                /    (MongoDB,     ╲                          │
│               /      HBase,        ╲                         │
│              /      ZooKeeper)      ╲                        │
│             ╱────────────────────────╲                       │
│            A ──────────  AP  ──────── P                      │
│       (Availability)  (Cassandra) (Partition                 │
│                      (DynamoDB)   Tolerance)                 │
│                        (Riak)                                │
│                                                              │
│  Network Partition Scenario:                                 │
│                                                              │
│  Before Partition:                                           │
│    ┌────┐ ◀────▶ ┌────┐ ◀────▶ ┌────┐                       │
│    │ N1 │        │ N2 │        │ N3 │                       │
│    └────┘        └────┘        └────┘                       │
│                                                              │
│  During Partition:                                           │
│    ┌────┐ ◀────▶ ┌────┐   ╳╳╳╳╳   ┌────┐                   │
│    │ N1 │        │ N2 │            │ N3 │                   │
│    └────┘        └────┘            └────┘                   │
│      ↓              ↓                 ↓                      │
│                                                              │
│  CP: N3 rejects writes (no quorum)                          │
│  AP: N3 accepts writes (resolve conflict later)             │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'PACELC Theorem - Beyond CAP',
        content: `
**PACELC Extension** (Daniel Abadi, 2012)
CAP only describes behavior DURING partitions. What about normal operation?

**PACELC Formula**:
- **IF Partition**: Choose **A**vailability or **C**onsistency
- **ELSE** (normal operation): Choose **L**atency or **C**onsistency

**The Latency-Consistency Trade-off**
In normal operation (no partition):
- **Low Latency**: Return immediately (might be stale) - Choose L
- **Strong Consistency**: Wait for all replicas to agree - Choose C

**PACELC Classifications**

**PA/EL** - Prioritize Availability & Latency
- Dynamo, Cassandra, Riak
- During partition: Choose Availability
- Normal operation: Choose Low Latency (eventual consistency)
- **Best for**: High availability, read-heavy, tolerate staleness

**PC/EC** - Prioritize Consistency Always
- HBase, MongoDB (strong), BigTable, VoltDB
- During partition: Choose Consistency (reject requests)
- Normal operation: Choose Consistency (wait for replication)
- **Best for**: Financial data, strong consistency requirements

**PA/EC** - Availability During Partition, Consistency in Normal
- MongoDB (tunable), PNUTS
- During partition: Choose Availability
- Normal operation: Choose Consistency
- **Best for**: Balance between availability and consistency

**PC/EL** - Rare (Doesn't make much sense)
- Choose consistency during partition but not during normal operation

**Tunable Consistency**
Some systems (Cassandra, DynamoDB, MongoDB) allow per-query consistency levels:
- EVENTUAL: Lowest latency, may return stale data
- QUORUM: Balanced (R + W > N)
- ALL: Strongest consistency, highest latency

**Interview Question**: Why does Cassandra choose PA/EL?
Answer:
- Designed for "always-on" availability (PA)
- Optimized for low-latency reads/writes (EL)
- Uses eventual consistency with tunable levels
- Trade-off: May read stale data temporarily
- Good for: User profiles, product catalogs, metrics
        `,
        keyPoints: [
          'PACELC adds normal-operation trade-off (Latency vs Consistency)',
          'PA/EL systems: High availability + low latency (Cassandra)',
          'PC/EC systems: Strong consistency always (MongoDB)',
          'Tunable consistency allows per-query flexibility'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│                   PACELC CLASSIFICATION                      │
│                                                              │
│  System          Partition        Else (Normal)             │
│  ──────────────────────────────────────────────              │
│  DynamoDB          PA            EL (Latency)                │
│  Cassandra         PA            EL                          │
│  Riak              PA            EL                          │
│                                                              │
│  HBase             PC            EC (Consistency)            │
│  MongoDB           PC            EC                          │
│  (strong mode)                                               │
│  BigTable          PC            EC                          │
│  VoltDB            PC            EC                          │
│                                                              │
│  MongoDB           PA            EC                          │
│  (eventual mode)                                             │
│  PNUTS             PA            EC                          │
│                                                              │
│  ─────────────────────────────────────────────────           │
│                                                              │
│  Latency vs Consistency in Normal Operation:                │
│                                                              │
│  Strong Consistency (EC):                                    │
│    Client ─write─▶ Leader ────▶ Replica 1                   │
│                      │ ─────▶ Replica 2                   │
│                      └─Wait for acks from all replicas       │
│                      └─ACK to client (slower)                │
│    Latency: 50-100ms                                         │
│                                                              │
│  Eventual Consistency (EL):                                  │
│    Client ─write─▶ Leader ─ACK immediately                   │
│                      │ ─async─▶ Replica 1                    │
│                      └─async─▶ Replica 2                     │
│    Latency: 1-5ms                                            │
│    Trade-off: May read stale data                            │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'Quorum Consensus & Consistency Levels',
        content: `
**Quorum-Based Replication**
- Fundamental technique for achieving consistency in distributed systems
- Variables:
  - **N**: Total number of replicas
  - **W**: Write quorum (how many replicas must acknowledge write)
  - **R**: Read quorum (how many replicas to read from)

**Consistency Guarantees**:
- **Strong Consistency**: W + R > N (guaranteed to read latest write)
- **Eventual Consistency**: W + R ≤ N (might read stale data)

**Common Configurations**:

**1. Majority Quorum (W=2, R=2, N=3)**
- Most common for strong consistency
- Tolerates 1 replica failure
- 2 out of 3 agree → proceed

**2. Read-Optimized (W=N, R=1)**
- All replicas must acknowledge write
- Read from any single replica (fast reads)
- Use case: Read-heavy workload

**3. Write-Optimized (W=1, R=N)**
- Write to single replica (fast writes)
- Read from all replicas (slow but consistent)
- Use case: Write-heavy workload, rarely read

**4. Eventual Consistency (W=1, R=1)**
- Fastest reads and writes
- No consistency guarantee
- Background anti-entropy repairs divergence

**Sloppy Quorum & Hinted Handoff**
- If required replicas unavailable, write to alternate nodes
- **Hinted Handoff**: Temporary node stores hint to deliver later
- Trade-off: Availability over strict consistency
- Used by: Cassandra, Dynamo

**Read Repair**
- During read, if replicas disagree, pick latest version
- Asynchronously update stale replicas
- Eventually all replicas converge

**Vector Clocks / Version Vectors**
- Track causality of updates
- Detect concurrent writes (conflicts)
- Application must resolve conflicts (e.g., last-write-wins, merge)

**Interview Question**: Why is W+R>N required for strong consistency?
Answer:
- Guarantees read and write quorums overlap
- Example: N=5, W=3, R=3
  - Write quorum: {A, B, C}
  - Read quorum: {B, C, D}
  - Overlap: {B, C} → At least one replica has latest write
- If W+R ≤ N, quorums might not overlap → stale read possible
        `,
        keyPoints: [
          'W + R > N guarantees strong consistency',
          'Majority quorum (N=3, W=2, R=2) is most common',
          'Sloppy quorum trades consistency for availability',
          'Read repair ensures eventual convergence'
        ],
        code: {
          language: 'cpp',
          content: `// Quorum-Based Replication
class QuorumReplicator {
    vector<Replica*> replicas;
    int N, W, R;
    
public:
    QuorumReplicator(vector<Replica*> reps, int w, int r) 
        : replicas(reps), N(reps.size()), W(w), R(r) {
        // Ensure strong consistency if needed
        if (W + R > N) {
            cout << "Strong consistency mode" << endl;
        }
    }
    
    bool write(const string& key, const Data& value, int version) {
        vector<future<bool>> futures;
        
        // Send write to all replicas
        for (auto* replica : replicas) {
            futures.push_back(async([=]() {
                return replica->write(key, value, version);
            }));
        }
        
        // Wait for W acknowledgments
        int acks = 0;
        for (auto& fut : futures) {
            try {
                if (fut.wait_for(chrono::milliseconds(100)) == 
                    future_status::ready && fut.get()) {
                    acks++;
                }
            } catch (...) {
                // Replica failed
            }
        }
        
        return acks >= W; // Write succeeds if W replicas ack
    }
    
    Data read(const string& key) {
        vector<future<pair<Data, int>>> futures;
        
        // Read from all replicas
        for (auto* replica : replicas) {
            futures.push_back(async([=]() {
                return replica->read(key); // Returns {data, version}
            }));
        }
        
        // Collect R successful responses
        vector<pair<Data, int>> responses;
        for (auto& fut : futures) {
            try {
                if (fut.wait_for(chrono::milliseconds(100)) == 
                    future_status::ready) {
                    responses.push_back(fut.get());
                }
            } catch (...) {}
            
            if (responses.size() >= R) break;
        }
        
        if (responses.size() < R) {
            throw runtime_error("Failed to achieve read quorum");
        }
        
        // Return data with highest version (latest write)
        auto latest = max_element(responses.begin(), responses.end(),
            [](const auto& a, const auto& b) {
                return a.second < b.second;
            });
        
        // Read repair: update stale replicas asynchronously
        async([=]() { this->readRepair(key, latest->first, latest->second); });
        
        return latest->first;
    }
    
private:
    void readRepair(const string& key, const Data& latestData, int latestVersion) {
        for (auto* replica : replicas) {
            auto [data, version] = replica->read(key);
            if (version < latestVersion) {
                replica->write(key, latestData, latestVersion);
            }
        }
    }
};`
        }
      }
    ]
  },

  'distributed-consensus': {
    id: 'distributed-consensus',
    title: 'Distributed Consensus: Paxos & Raft',
    description: 'How distributed systems agree on truth: Paxos, Raft, Zab, and Leader Election',
    sections: [
      {
        title: 'The Consensus Problem & Paxos',
        content: `
**The Problem**: How to get multiple nodes to agree on a value (or log of values) when:
- Nodes may crash
- Network messages may be lost/delayed
- No Byzantine failures (nodes don't lie, just fail)

**Paxos (The "Impossible" Standard)**
- Proposed by Leslie Lamport (1989/1998)
- **Roles**:
  - **Proposers**: Suggest a value
  - **Acceptors**: Vote on value
  - **Learners**: Learn the agreed value
- **Phases**:
  1. **Prepare**: Proposer choses ID 'n', asks acceptors "Promised to ignore < n?"
  2. **Accept**: If promise received from majority, Proposer sends "Accept(n, value)"
  3. **Learn**: If Acceptor accepts, notify Learners
- **Pros**: Mathematically proven, extremely robust
- **Cons**: Extremely difficult to understand and implement correctly
- **Used by**: Google Chubby, Spanner (Paxos derivative)

**Why Consensus is Hard**
- **FLP Impossibility Result**: In an async system with 1 faulty process, consensus is impossible (cannot distinguish crash from slow network).
- **Solution**: Use timeouts (assume synchrony) to unblock, sacrificing liveness for safety.

**Multi-Paxos**
- Optimization for stream of values (log)
- Elect a stable leader to skip Phase 1 for subsequent proposals
- Approximates Raft
        `,
        keyPoints: [
          'Consensus ensures all non-faulty nodes agree',
          'Paxos is the theoretical foundation but hard to implement',
          'Majority quorum (N/2 + 1) required for progress'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│                   PAXOS ALGORITHM FLOW                       │
│                                                              │
│  Phase 1: Prepare (Leader Election / Locking)                │
│    Proposer            Acceptor 1         Acceptor 2         │
│       │                    │                  │              │
│       │── Prepare(N) ─────▶│                  │              │
│       │                    │── Prepare(N) ───▶│              │
│       │                    │                  │              │
│       │◀── Promise(N) ─────│                  │              │
│       │                    │◀── Promise(N) ───│              │
│       │   (Got Majority!)  │                  │              │
│                                                              │
│  Phase 2: Accept (Replication)                               │
│       │                    │                  │              │
│       │── Accept(N, val) ─▶│                  │              │
│       │                    │── Accept(N, val)▶│              │
│       │                    │                  │              │
│       │◀── Accepted(N, v) ─│                  │              │
│       │                    │◀── Accepted(N, v)│              │
│       │                    │                  │              │
│    (Consensus Reached!)    ↓                  ↓              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'Raft: Consensus for Humans',
        content: `
**Raft** (Ongaro & Ousterhout, 2014)
- Designed specifically to be *understandable*
- Decomposes problem into:
  1. **Leader Election**
  2. **Log Replication**
  3. **Safety**

**1. Leader Election**
- Nodes are: **Follower**, **Candidate**, or **Leader**
- Everyone starts as Follower
- If no heartbeat from Leader → become Candidate, increment Term, vote for self, request votes
- If majority votes → become Leader
- Send periodic heartbeats (AppendEntries empty) to maintain authority

**2. Log Replication**
- Client sends command to Leader
- Leader appends to local log
- Leader sends **AppendEntries** to Followers
- When majority acknowledge → Leader **commits** entry & executes
- Leader tells Followers to commit

**3. Safety Properties**
- **Election Safety**: At most one leader per term
- **Leader Append-Only**: Leader never overwrites/deletes own log
- **Log Matching**: If logs matched at index X, they match at all X-1
- **Leader Completeness**: Leader implies all committed entries

**Raft vs Paxos**
- **Raft**: Strong leadership, simpler log replication, easy to verify
- **Paxos**: Peer-to-peer (conceptually), complex intersection rules
- **Industry Trend**: Raft is now standard (etcd, Consul, TiKV, CockroachDB)

**Zab (ZooKeeper Atomic Broadcast)**
- Similar to Raft/Paxos but predates Raft
- Used exclusively by ZooKeeper
- Focuses on total ordering of updates (FIFO channel assumption)

**Interview Question**: What happens in Raft during a network partition?
Answer:
- **Old Leader** (minority partition): Cannot commit writes (no quorum).
- **New Leader** (majority partition): Elected, accepts/commits new writes.
- **Heal**: Partition ends. Old leader sees higher Term from New Leader, steps down, rolls back uncommitted logs, syncs with New Leader.
        `,
        keyPoints: [
          'Raft relies on Strong Leader (bottleneck but simple)',
          'Log Replication = Consistency',
          'Term numbers act as logical clock',
          'Safety guaranteed by "Leader Completeness" property'
        ],
        code: {
          language: 'cpp',
          content: `// Simplified Raft Node State
enum State { FOLLOWER, CANDIDATE, LEADER };

class RaftNode {
    State state = FOLLOWER;
    int currentTerm = 0;
    int votedFor = -1;
    vector<LogEntry> log;
    int commitIndex = 0;
    
    // Volatile Leader State
    map<int, int> nextIndex;
    map<int, int> matchIndex;
    
public:
    void onHeartbeatTimeout() {
        if (state == LEADER) return;
        
        // Start Election
        state = CANDIDATE;
        currentTerm++;
        votedFor = myId;
        int votes = 1;
        
        // Request votes from peers
        for (auto peer : peers) {
             asyncRequestVote(peer);
        }
    }
    
    void onRequestVote(int term, int candidateId, int lastLogIdx, int lastLogTerm) {
        if (term > currentTerm) {
            stepDown(term);
        }
        
        // Vote if term valid AND log is up-to-date
        bool logUpToDate = (lastLogTerm > getLastLogTerm()) ||
                           (lastLogTerm == getLastLogTerm() && lastLogIdx >= getLastLogIdx());
                           
        if (term == currentTerm && (votedFor == -1 || votedFor == candidateId) && logUpToDate) {
            votedFor = candidateId;
            sendVote(candidateId, true);
        } else {
            sendVote(candidateId, false);
        }
    }
    
    void onAppendEntries(int term, int leaderId, int prevLogIdx, int prevLogTerm, vector<Entry> entries, int leaderCommit) {
        if (term >= currentTerm) {
            stepDown(term); // Recognize valid leader
            state = FOLLOWER;
            resetElectionTimer();
        }
        
        if (term < currentTerm) {
            sendResponse(false); // Stale leader
            return;
        }
        
        // Verify log consistency (prevLogIdx must match)
        if (!matchLog(prevLogIdx, prevLogTerm)) {
             sendResponse(false); // Log mismatch -> Leader decrements nextIndex
             return;
        }
        
        // Append new entries (resolving conflicts)
        appendEntries(entries);
        
        // Update commit index
        if (leaderCommit > commitIndex) {
            commitIndex = min(leaderCommit, getLastLogIdx());
            applyToStateMachine();
        }
        
        sendResponse(true);
    }
};`
        }
      }
    ]
  },

  'microservices': {
    id: 'microservices',
    title: 'Microservices Architecture',
    description: 'Decomposing monoliths, service discovery, API gateways, and inter-service communication patterns',
    sections: [
      {
        title: 'Microservices vs Monolith',
        content: `
**Monolith**
- Single codebase, single executable, single DB (usually)
- **Pros**: Simple deploy, easy testing, local function calls (fast), ACID transactions easy
- **Cons**: Tight coupling, single tech stack, scales entirely or not at all, large "blast radius" of bugs

**Microservices**
- Small, autonomous services modeled around business domains
- Independently deployable, scalable, and testable
- **Pros**: 
  - Independent scaling (scale only the "Search" service)
  - Tech stcak flexibility (Python for ML, Go for high-concurrency)
  - Fault isolation
  - Organizational alignment (Conway's Law)
- **Cons**:
  - Distributed complexity (network fallacies)
  - Eventual consistency
  - Operational overhead (observability, CI/CD)
  - Harder debugging/testing

**Design Principles**
1. **Single Responsibility**: Do one thing well
2. **Database per Service**: Anti-pattern to share DB (coupling)
3. **Smart Endpoints, Dumb Pipes**: Logic in services, not middleware
4. **API First Design**: Define interface (Contract) first

**Decomposition Strategies**
- **By Business Capability**: Order, Inventory, Shipping
- **By Subdomain (DDD)**: Core (unique value), Generic (auth, logging), Supporting
        `,
        keyPoints: [
          'Choose Microservices for organizational scale, not technical fun',
          'Database sharing violates microservice autonomy',
          'Conway\'s Law: Architecture mirrors communication structure'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│                 MONOLITH vs MICROSERVICES                    │
│                                                              │
│  MONOLITH:                                                   │
│    ┌───────────────────────────────────────────────┐        │
│    │  [UI] [Auth] [Orders] [Inventory] [Payment]   │        │
│    │               Shared Memory                   │        │
│    └───────────────────────────────────────────────┘        │
│                            │                                 │
│                     ┌─────────────┐                          │
│                     │ BIG SQL DB  │                          │
│                     └─────────────┘                          │
│                                                              │
│  MICROSERVICES:                                              │
│                                                              │
│         ┌─────────┐      ┌─────────┐      ┌─────────┐        │
│         │ Service A      │ Service B      │ Service C        │
│         │ (Auth)  │      │ (Order) │      │(Inventory)       │
│         └────┬────┘      └────┬────┘      └────┬────┘        │
│              │                │                │             │
│          ┌───┴───┐        ┌───┴───┐        ┌───┴───┐         │
│          │Redis  │        │MySQL  │        │Postgres         │
│          └───────┘        └───────┘        └───────┘         │
│                                                              │
│  Communication: REST / gRPC / Metadata via Events            │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'Service Discovery & API Gateway',
        content: `
**Service Discovery**
- Problem: In dynamic cloud (k8s), IP addresses change constantly. How does Service A call Service B?
- **Client-Side Discovery**: Patient (Client) queries Registry (consul/eureka) → gets IP → calls Service
  - Examples: Netflix Eureka (older)
- **Server-Side Discovery**: Client calls LB (DNS) → LB queries Registry → forwards to Service
  - Examples: AWS ALB, Kubernetes Service (CoreDNS + Kube-Proxy)

**The Service Registry**
- Database of available service instances
- Heartbeat mechanism removes unhealthy instances
- Tools: Consul, Etcd, ZooKeeper, Eureka

**API Gateway** ( The Front Door)
- Single entry point for all clients (Web, Mobile, IoT)
- **Functions**:
  1. **Routing**: /orders → OrderService
  2. **Aggregation**: Call Order+User+Item → Return composite JSON (Backend for Frontend pattern)
  3. **AuthN/AuthZ**: Verify JWT, scopes
  4. **Rate Limiting**: Protect backend
  5. **Protocol Translation**: HTTP/JSON → gRPC/Protobuf
  6. **SSL Termination**
- **Examples**: Zuul, Kong, AWS API Gateway, NGINX

**Inter-Service Communication**
- **Synchronous**: REST (HTTP/1.1) or gRPC (HTTP/2)
  - Simple but creates temporal coupling (if B is down, A fails)
- **Asynchronous**: Message Queues (Kafka, RabbitMQ)
  - Decoupled but harder to trace logic

**BFF Pattern (Backend For Frontend)**
- Dedicated API Gateways for valid client types
- DesktopBFF, MobileBFF, PublicAPI-BFF
- Tailor response size (Mobile needs less data)
        `,
        keyPoints: [
          'Kubernetes handles service discovery internally (DNS)',
          'API Gateway offloads cross-cutting concerns (Auth, Rate Limit)',
          'Avoid "Distributed Monolith" by minimizing synchronous calls'
        ],
        code: {
          language: 'cpp',
          content: `// Service Discovery Simulation
class ServiceRegistry {
    map<string, vector<string>> registry; // ServiceName -> [IP:Port]
    mutex mtx;
    
public:
    void registerInstance(string service, string address) {
        lock_guard<mutex> lock(mtx);
        registry[service].push_back(address);
    }
    
    string discover(string service) {
        lock_guard<mutex> lock(mtx);
        if (registry[service].empty()) throw runtime_error("No instances");
        
        // Client-side Load Balancing (Round Robin)
        static int counter = 0;
        return registry[service][counter++ % registry[service].size()];
    }
};

class APIGateway {
    ServiceRegistry& discovery;
    
public:
    HttpResponse handleRequest(HttpRequest req) {
        // 1. Authentication
        if (!verifyToken(req.header("Authorization"))) {
            return HttpResponse(401, "Unauthorized");
        }
        
        // 2. Rate Limiting
        if (isRateLimited(req.ip)) {
            return HttpResponse(429, "Too Many Requests");
        }
        
        // 3. Routing
        if (req.path.startsWith("/orders")) {
            string instance = discovery.discover("order-service");
            return forwardRequest(instance, req);
        } else if (req.path.startsWith("/users")) {
            string instance = discovery.discover("user-service");
            return forwardRequest(instance, req);
        }
        
        return HttpResponse(404, "Not Found");
    }
};`
        }
      }
    ]
  },

  'message-queues': {
    id: 'message-queues',
    title: 'Message Queues & Event Streaming',
    description: 'Asynchronous communication, Kafka architecture, RabbitMQ, and event-driven patterns',
    sections: [
      {
        title: 'Message Queues vs Event Streams',
        content: `
**Message Queue (RabbitMQ, SQS)**
- **Point-to-Point**: Producer sends message → Queue → Consumer
- **Smart Broker, Dumb Consumer**: Broker manages state, retries, ACKs
- **Destructive Read**: Message deleted after acknowledgment
- **Use Case**: Task processing, job queues, decoupling services

**Event Stream (Kafka, Kinesis, Pulsar)**
- **Pub-Sub**: Producer appends to log → Multiple Consumers read
- **Dumb Broker, Smart Consumer**: Consumer tracks its own offset
- **Retention**: Events stored for days/weeks (Log)
- **Use Case**: Analytics, Event Sourcing, Change Data Capture (CDC)

**RabbitMQ (AMQP)**
- **Exchange Types**:
  - **Direct**: Exact match routing key
  - **Fanout**: Broadcast to all queues
  - **Topic**: Wildcard matching (log.*.error)
- **Guarantees**: At-least-once delivery
- **Performance**: ~50K msgs/sec

**Apache Kafka**
- **Architecture**:
  - **Topic**: Stream of records
  - **Partition**: Shard of a topic (unit of parallelism)
  - **Broker**: Server holding partitions
  - **Consumer Group**: Set of consumers reading partitions
- **Performance**: millions of msgs/sec
- **Persistence**: Writes to disk (sequential I/O is fast!)

**Backpressure Handling**
- Problem: Producer sends faster than Consumer can process
- **Solutions**:
  1. **Buffer**: Queue absorbs spikes (temporary)
  2. **Drop**: Discard oldest or low-priority messages
  3. **Flow Control**: Broker tells Producer to slow down (TCP window)

**Interview Question**: RabbitMQ vs Kafka?
Answer:
- **RabbitMQ**: Complex routing required, messages are transient, lower scale.
- **Kafka**: Massive scale / replay capability needed, simple routing, persistent log.
        `,
        keyPoints: [
          'Queues = State managed by Broker, deleted on read',
          'Streams = State managed by Consumer, retained on read',
          'Kafka partitions enable massive parallelism'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│                    KAFKA ARCHITECTURE                        │
│                                                              │
│  Topic: "UserClicks" (Partitioned)                           │
│                                                              │
│  ┌──────────────┐      ┌──────────────┐     ┌─────────────┐  │
│  │ Partition 0  │      │ Partition 1  │     │ Partition 2 │  │
│  │ [0][1][2]... │      │ [0][1][2]... │     │ [0][1]...   │  │
│  └──────┬───────┘      └──────┬───────┘     └──────┬──────┘  │
│         │                     │                    │         │
│         ▼                     ▼                    ▼         │
│  ┌──────────────┐      ┌──────────────┐     ┌─────────────┐  │
│  │ Consumer A   │      │ Consumer B   │     │ Consumer C  │  │
│  │ (Offset: 2)  │      │ (Offset: 2)  │     │ (Offset: 1) │  │
│  └──────────────┘      └──────────────┘     └─────────────┘  │
│    Consumer Group 1 (Analytics Engine)                       │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Consumer D (Reads P0, P1, P2) - Offset varies          │  │
│  └────────────────────────────────────────────────────────┘  │
│    Consumer Group 2 (Backup Service)                         │
│                                                              │
│  Design Rule: Max 1 consumer per partition per group         │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'Event Sourcing & CQRS',
        content: `
**Event Sourcing**
- Store *events* (state changes), not current state
- **State** = Sum of all events
- **Example**: Bank Account
  - Event 1: Created ($0)
  - Event 2: Deposit ($100)
  - Event 3: Withdrawal ($20)
  - Current State: $80 (calculated on fly or snapshotted)
- **Pros**: Audit trail, time travel debugging, easy rollback
- **Cons**: Complexity, huge storage, evolving schema

**CQRS (Command Query Responsibility Segregation)**
- Separate Write Model (Command) from Read Model (Query)
- **Write Side**: Optimized for updates, consistency, validation
- **Read Side**: Optimized for queries, join-precalculation
- **Sync**: Events from Write DB → process → update Read DB
- **Trade-off**: Eventual consistency between write and read

**Saga Pattern** (Distributed Transactions)
- How to do "transaction" across microservices?
- sequence of local transactions
- **Choreography**: Service A emits event → Service B listens → Service C listens
- **Orchestration**: Central coordinator tells A, B, C what to do
- **Rollback**: Every step must have "Compensating Transaction" (Undo)
  - e.g., BookFlight() → Fail → CancelFlight()

**Interview Question**: Design a system that cannot lose messages?
Answer:
- **Producer**: enable 'acks=all' (wait for replicas)
- **Kafka**: Replication Factor >= 3, min.insync.replicas >= 2
- **Consumer**: Disable auto-commit, commit offset manually AFTER processing
        `,
        keyPoints: [
          'Event Sourcing: Database as a log of changes',
          'CQRS: Scale reads/writes independently',
          'Sagas: Long-running transactions with compensation logic'
        ],
        code: {
          language: 'cpp',
          content: `// Kafka Producer with Reliability
void produceMessage(Producer producer, string topic, string key, string value) {
    Message msg(topic, key, value);
    
    // Config: acks=all, retries=MAX, idempotence=true
    producer.send(msg, [](Error err, Metadata metadata) {
        if (err) {
            log.error("Failed to send: " + err);
            // Retry handled by library or Dead Letter Queue
        } else {
            log.info("Persisted at offset: " + metadata.offset);
        }
    });
}

// Saga Pattern: Order Creation (Orchestration)
class OrderSagaOrchestrator {
    void createOrder(Order order) {
        try {
            // Step 1: Reserve Inventory
            inventoryService.reserve(order.items);
            
            try {
                // Step 2: Process Payment
                paymentService.charge(order.user, order.amount);
                
                try {
                    // Step 3: Ship
                    shippingService.schedule(order);
                    
                    orderService.setStatus(order.id, "COMPLETED");
                    
                } catch (Exception e) {
                    // Compensation 2
                    paymentService.refund(order.user, order.amount);
                    throw e;
                }
                
            } catch (Exception e) {
                // Compensation 1
                inventoryService.release(order.items);
                orderService.setStatus(order.id, "FAILED");
            }
            
        } catch (Exception e) {
            log.error("Order failed: " + e.message);
        }
    }
};`
        }
      }
    ]
  },

  'replication': {
    id: 'replication',
    title: 'Replication Strategies',
    description: 'Master-Slave, Multi-Master, and Leaderless replication with conflict resolution',
    sections: [
      {
        title: 'Master-Slave (Single Leader) Replication',
        content: `
**Architecture**
- **Master (Leader)**: Handles ALL writes + reads
- **Slaves (Followers)**: Handle reads ONLY. Replicates log from Master.
- **Data Flow**: Client → Master → Replication Log → Slaves

**Sync vs Async Replication**
- **Synchronous**: Master waits for Slave ACK
  - **Pros**: Strong consistency, zero data loss
  - **Cons**: Write latency = slowest slave, system halts if slave down
- **Asynchronous**: Master confirms immediately, replicates in background
  - **Pros**: Fast writes, tolerates slave failure
  - **Cons**: Replication lag, data loss on Master failover
- **Semi-Sync**: Sync with 1 slave, async with others (Best of both)

**Handling Failures**
- **Slave Failure**: Catch-up recovery (request missing logs from Master)
- **Master Failure**: 
  1. Detection (heartbeat timeout)
  2. Election (slaves pick new leader)
  3. Reconfiguration (point clients to new master)
- **Split Brain**: Two nodes think they are master. Use "Fencing Token" to kill old master.

**Use Case**: MySQL, Postgres, MongoDB (default), Redis
        `,
        keyPoints: [
          'Writes go to Master, Reads can go to Slaves',
          'Async replication risks data loss but boosts performance',
          'Split Brain is the biggest risk in auto-failover'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│               MASTER-SLAVE REPLICATION                       │
│                                                              │
│      Write (Values)                                          │
│         │                                                    │
│         ▼                                                    │
│    ┌────────────┐                                            │
│    │   MASTER   │  Replication Stream (Binlog/WAL)           │
│    │ (Read/Write)──────────────────┬─────────────────┐      │
│    └────────────┘                  │                 │      │
│         ▲                          ▼                 ▼      │
│         │ (Reads?)           ┌────────────┐   ┌────────────┐│
│    ┌────────────┐            │   SLAVE 1  │   │   SLAVE 2  ││
│    │   CLIENT   │◀───────────│ (Read Only)│   │ (Read Only)││
│    └────────────┘            └────────────┘   └────────────┘│
│                                                              │
│  Pros: Simple, Read Scaling, Backups                         │
│  Cons: Master is Write Bottleneck, Failover Complexity       │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'Multi-Master & Leaderless',
        content: `
**Multi-Master (Master-Master)**
- Multiple nodes accept writes
- Nodes replicate to each other
- **Pros**: Write scaling, region fault tolerance (one DC fails, other DC works)
- **Cons**: Write conflicts! (User A updates 'Title' in US, User B updates 'Title' in EU)
- **Conflict Resolution**:
  - Last Write Wins (LWW) based on timestamp (clock skew danger)
  - Application logic (merge)
  - Conflict-free Replicated Data Types (CRDTs)
- **Use Case**: Collaborative editing (Google Docs), Global apps

**Leaderless (Dynamo-style)**
- No master. Client sends request to *multiple* nodes.
- **Quorum**: Write to W nodes, Read from R nodes
- **Problem**: Concurrent writes
- **Solution**: Version Vectors / Vector Clocks
  - Client reads "Version A" and "Version B" (conflict)
  - Client merges and writes "Version C"
- **Use Case**: Cassandra, DynamoDB, Riak

**Distributed Locks** (To enforce single access)
- Problem: How to ensure only 1 worker processes a job?
- **Redis (Redlock)**: Acquire lock on N/2 + 1 instances
- **ZooKeeper/Etcd**: Ephemeral nodes (create node, if exists → wait)
- **Fencing Token**: Token increments. DB rejects writes with old token.

**Interview Question**: How to handle conflict in Multi-Master?
Answer:
- Avoid it: Route user to specific DC (sticky session)
- LWW: Simple but loses data
- CRDTs (Conflict-free Replicated Data Types): Mathematical guarantee of convergence (e.g., G-Counter, PN-Counter)
        `,
        keyPoints: [
          'Multi-Master allows write scaling but introduces conflicts',
          'Leaderless relies on Quorums and Read Repair',
          'CRDTs allow concurrent edits without conflicts'
        ],
        code: {
          language: 'cpp',
          content: `// Simple Vector Clock Implementation
class VectorClock {
    map<string, int> clock; // NodeID -> Counter
    
public:
    void increment(string nodeId) {
        clock[nodeId]++;
    }
    
    // Updates local clock with remote info
    void merge(const VectorClock& other) {
        for (auto const& [node, count] : other.clock) {
            clock[node] = max(clock[node], count);
        }
    }
    
    // Compare causality
    // -1: this < other (caused by)
    //  1: this > other (caused)
    //  0: Concurrent (Conflict!)
    int compare(const VectorClock& other) {
        bool greater = false;
        bool smaller = false;
        
        // Union of keys
        set<string> keys;
        for(auto const& [k,v] : clock) keys.insert(k);
        for(auto const& [k,v] : other.clock) keys.insert(k);
        
        for (const string& k : keys) {
            int c1 = clock.count(k) ? clock.at(k) : 0;
            int c2 = other.clock.count(k) ? other.clock.at(k) : 0;
            
            if (c1 > c2) greater = true;
            if (c1 < c2) smaller = true;
        }
        
        if (greater && smaller) return 0; // Concurrent
        if (greater) return 1;
        if (smaller) return -1;
        return 0; // Same
    }
};`
        }
      }
    ]
  },

  'rate-limiting': {
    id: 'rate-limiting',
    title: 'Rate Limiting Algorithms',
    description: 'Protecting services with Token Bucket, Leaky Bucket, and Sliding Windows',
    sections: [
      {
        title: 'Throttling Algorithms',
        content: `
**Why Rate Limit?**
- Prevent DDoS
- Fairness (prevent heavy user form hogging resources)
- Cost control (API billing)

**1. Token Bucket** (Most Common)
- Bucket holds N tokens
- Tokens refilled at rate R
- Request costs 1 token. If empty → drop.
- **Pros**: Allows bursts (up to bucket size)
- **Use Case**: API limits (Amazon: 1000 req/sec with burst)

**2. Leaky Bucket**
- Requests enter queue (bucket)
- Processed at constant rate (leak)
- If queue full → drop
- **Pros**: Smoothes out traffic (constant outflow)
- **Cons**: No bursts allowed
- **Use Case**: Packet switches, NGINX

**3. Fixed Window Counter**
- Counter per minute (12:01, 12:02)
- Increment counter on request. If > Limit → drop.
- **Cons**: **Edge Case**: 100 reqs at 12:01:59 and 100 at 12:02:01 = 200 reqs in 2 sec (Doubled limit!)

**4. Sliding Window Log**
- Keep timestamp of EVERY request in Redis Sorted Set
- Remove timestamps older than 1 min
- Count size of set
- **Pros**: Extremely accurate
- **Cons**: High memory usage (stores logs)

**5. Sliding Window Counter** (Best of both)
- Weighted average of previous window and current window
- Count = PrevWindow * (1 - %time) + CurrWindow
- **Pros**: Accurate, low memory

**Distributed Rate Limiting**
- **Race Condition**: Two servers read counter=99, both increment to 100. Actual=101.
- **Solution 1**: Sticky sessions (handle limit locally)
- **Solution 2**: Redis Lua script (atomic check-and-set)
        `,
        keyPoints: [
          'Token Bucket allows bursts, Leaky Bucket ensures smooth rate',
          'Sliding Window solves the "boundary double limit" problem',
          'Use Redis Lua scripts for atomic distributed counting'
        ],
        code: {
          language: 'cpp',
          content: `// Token Bucket Implementation
class TokenBucket {
    long capacity;
    double refillRate; // tokens per second
    double tokens;
    long lastRefillTimestamp;
    mutex mtx;
    
public:
    TokenBucket(long cap, double rate) : capacity(cap), refillRate(rate) {
        tokens = cap;
        lastRefillTimestamp = time(nullptr);
    }
    
    bool allowRequest(int tokensNeeded = 1) {
        lock_guard<mutex> lock(mtx);
        refill();
        
        if (tokens >= tokensNeeded) {
            tokens -= tokensNeeded;
            return true;
        }
        return false;
    }
    
private:
    void refill() {
        long now = time(nullptr);
        double delta = now - lastRefillTimestamp;
        double tokensToAdd = delta * refillRate;
        
        tokens = min((double)capacity, tokens + tokensToAdd);
        lastRefillTimestamp = now;
    }
};

// Redis Lua Script for Atomic Rate Limiting (Fixed Window)
/*
  KEYS[1] = "rate_limit:user:123"
  ARGV[1] = Limit (e.g., 10)
  ARGV[2] = Window Seconds (e.g., 60)
*/
string luaScript = R"(
    local current = redis.call('INCR', KEYS[1])
    if current == 1 then
        redis.call('EXPIRE', KEYS[1], ARGV[2])
    end
    
    if current > tonumber(ARGV[1]) then
        return 0 -- Rejected
    else
        return 1 -- Allowed
    end
)";`
        }
      }
    ]
  },

  'database-internals': {
    id: 'database-internals',
    title: 'Database Internals & Indexes',
    description: 'How databases work: B-Trees, LSM Trees, and Indexing strategies',
    sections: [
      {
        title: 'B-Trees vs LSM Trees',
        content: `
**B-Tree / B+ Tree** (MySQL, Postgres, Oracle)
- Balanced Tree structure optimized for disk reads
- **Structure**:
  - **Internal Nodes**: Pivot keys acting as signs
  - **Leaf Nodes**: Hold actual data (or pointers), linked list for scans
- **Pros**:
  - Fast Reads: O(log N)
  - Range Scans: Very fast (follow leaf pointers)
- **Cons**:
  - Slow Writes: Random I/O (updating tree structure, page splits)
  - Space amplification (fragmentation)

**LSM Tree (Log-Structured Merge Tree)** (Cassandra, RocksDB, LevelDB)
- Optimized for heavy write workloads
- **Structure**:
  1. **MemTable**: In-memory balanced tree (writes go here first - Fast!)
  2. **SSTable**: Immutable on-disk file (flushed from MemTable)
  3. **Compaction**: Background process merges SSTables
- **Pros**:
  - Fast Writes: Sequential I/O (append-only)
  - High compression
- **Cons**:
  - Slower Reads: Need to check MemTable + multiple SSTables
  - Write Stalls: If compaction can't keep up

**Bloom Filters** (Optimization for LSM)
- Probabilistic data structure to check if key exists in SSTable
- "Definitely No" or "Maybe Yes"
- Prevents disk seek for non-existent keys

**Indexing Strategies**
- **Clustered Index**: Data stored physically with index (Primary Key). Only 1 per table.
- **Secondary Index**: Points to Primary Key. Can have many.
- **Covering Index**: Index includes all columns needed for query (no need to lookup data row)
- **Composite Index**: Index on (A, B). Order matters! Supports query on A, or (A,B), but NOT B alone.

**Interview Question**: Why is LSM better for write-heavy systems?
Answer:
- B-Trees require random I/O to update pages in place.
- LSM converts all writes to Sequential I/O (append to log/MemTable).
- HDDs/SSDs are much faster at sequential writes than random writes.
        `,
        keyPoints: [
          'B-Trees = Read Optimized (RDBMS)',
          'LSM Trees = Write Optimized (NoSQL)',
          'Bloom Filters save disk reads in LSM trees',
          'Understand Clustered vs Secondary Indexes'
        ],
        code: {
          language: 'cpp',
          content: `// Simplified Bloom Filter
class BloomFilter {
    vector<bool> bitset;
    int size;
    int numHashes;
    
public:
    BloomFilter(int n, int k) : size(n), numHashes(k) {
        bitset.resize(size, false);
    }
    
    void add(string key) {
        for (int i = 0; i < numHashes; i++) {
            int hash = murmurHash(key, i) % size;
            bitset[hash] = true;
        }
    }
    
    bool limitCheck(string key) {
        for (int i = 0; i < numHashes; i++) {
            int hash = murmurHash(key, i) % size;
            if (!bitset[hash]) return false; // Definitely No
        }
        return true; // Maybe Yes
    }
};`
        }
      }
    ]
  }
};
