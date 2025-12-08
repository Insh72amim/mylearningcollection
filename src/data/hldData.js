export const hldTopics = {
  'scalability': {
    id: 'scalability',
    title: 'Scalability & Availability',
    description: 'Understanding how to scale systems and maintain high availability',
    sections: [
      {
        title: 'Types of Scaling',
        content: `
**Vertical Scaling (Scale Up)**
- Add more power (CPU, RAM, Storage) to existing server
- Simpler implementation, no code changes
- Limited by hardware constraints
- Single point of failure remains

**Horizontal Scaling (Scale Out)**
- Add more servers to the pool
- Theoretically unlimited scaling
- Requires distributed architecture
- More complex but more resilient
        `,
        keyPoints: [
          'Vertical scaling has hardware limits',
          'Horizontal scaling requires stateless design',
          'Most systems use a combination of both'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│                    VERTICAL SCALING                          │
│                                                              │
│    ┌──────────┐           ┌──────────────────┐              │
│    │  Server  │   ──→     │   Bigger Server  │              │
│    │  4 CPU   │           │   16 CPU         │              │
│    │  8GB RAM │           │   64GB RAM       │              │
│    └──────────┘           └──────────────────┘              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   HORIZONTAL SCALING                         │
│                                                              │
│    ┌──────────┐           ┌──────────┐ ┌──────────┐         │
│    │  Server  │   ──→     │ Server 1 │ │ Server 2 │  ...    │
│    │          │           │          │ │          │         │
│    └──────────┘           └──────────┘ └──────────┘         │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'High Availability (HA)',
        content: `
**Availability Metrics**
- 99% (Two 9s) = 3.65 days downtime/year
- 99.9% (Three 9s) = 8.76 hours downtime/year
- 99.99% (Four 9s) = 52.6 minutes downtime/year
- 99.999% (Five 9s) = 5.26 minutes downtime/year

**Key Patterns**
- **Redundancy**: Multiple instances of critical components
- **Replication**: Data copied across multiple nodes
- **Failover**: Automatic switch to backup when primary fails
- **Health Checks**: Continuous monitoring of system health
        `,
        keyPoints: [
          'Availability = Uptime / (Uptime + Downtime)',
          'Eliminate single points of failure',
          'Use multiple availability zones/regions'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│                    ACTIVE-PASSIVE FAILOVER                   │
│                                                              │
│         ┌────────────┐         ┌────────────┐               │
│         │   Active   │ ──────→ │  Passive   │               │
│         │  (Primary) │  Sync   │ (Standby)  │               │
│         └────────────┘         └────────────┘               │
│              │                       │                       │
│              ▼                       ▼                       │
│         ┌────────────────────────────────┐                  │
│         │      Shared Storage / DB       │                  │
│         └────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ACTIVE-ACTIVE FAILOVER                    │
│                                                              │
│         ┌────────────┐         ┌────────────┐               │
│         │  Active 1  │ ◀─────▶ │  Active 2  │               │
│         └────────────┘  Sync   └────────────┘               │
│              │                       │                       │
│              ▼                       ▼                       │
│         ┌────────────┐         ┌────────────┐               │
│         │    DB 1    │ ◀─────▶ │    DB 2    │               │
│         └────────────┘         └────────────┘               │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'Real-World Examples',
        content: `
**Netflix**
- Uses multiple AWS regions for redundancy
- Chaos Monkey randomly terminates instances to test resilience
- Microservices architecture with independent scaling

**Google**
- Custom hardware designed for failure tolerance
- Data replicated across multiple data centers
- Spanner database provides global consistency

**Amazon**
- Each service operates independently
- "Two-pizza teams" own their services end-to-end
- Blast radius isolation to contain failures
        `,
        keyPoints: [
          'Design for failure - assume components will fail',
          'Use circuit breakers to prevent cascade failures',
          'Test failures regularly (Chaos Engineering)'
        ]
      }
    ]
  },

  'load-balancing': {
    id: 'load-balancing',
    title: 'Load Balancing',
    description: 'Distributing traffic across multiple servers for optimal performance',
    sections: [
      {
        title: 'Load Balancing Algorithms',
        content: `
**Round Robin**
- Requests distributed sequentially to each server
- Simple but doesn't consider server load or capacity

**Weighted Round Robin**
- Servers assigned weights based on capacity
- Higher-weight servers receive more requests

**Least Connections**
- Routes to server with fewest active connections
- Good for long-lived connections

**IP Hash**
- Client IP determines server assignment
- Ensures session persistence (sticky sessions)

**Least Response Time**
- Routes to server with fastest response + fewest connections
- Most intelligent but requires monitoring overhead
        `,
        keyPoints: [
          'Round Robin is simplest but may overload weak servers',
          'Least Connections is best for varied request durations',
          'IP Hash provides session affinity'
        ],
        code: {
          language: 'cpp',
          content: `// Round Robin Implementation
class RoundRobinLB {
    vector<Server> servers;
    atomic<int> currentIndex{0};
    
public:
    Server getNextServer() {
        int idx = currentIndex.fetch_add(1) % servers.size();
        return servers[idx];
    }
};

// Weighted Round Robin
class WeightedRoundRobinLB {
    vector<pair<Server, int>> weightedServers; // {server, weight}
    int currentWeight = 0;
    int currentIndex = 0;
    
public:
    Server getNextServer() {
        while (true) {
            currentIndex = (currentIndex + 1) % weightedServers.size();
            if (currentIndex == 0) {
                currentWeight--;
                if (currentWeight <= 0) {
                    currentWeight = getMaxWeight();
                }
            }
            if (weightedServers[currentIndex].second >= currentWeight) {
                return weightedServers[currentIndex].first;
            }
        }
    }
};

// Consistent Hashing for IP Hash
class ConsistentHashLB {
    map<size_t, Server> ring;
    hash<string> hasher;
    
public:
    void addServer(Server s) {
        for (int i = 0; i < VIRTUAL_NODES; i++) {
            size_t hash = hasher(s.id + to_string(i));
            ring[hash] = s;
        }
    }
    
    Server getServer(string clientIP) {
        size_t hash = hasher(clientIP);
        auto it = ring.lower_bound(hash);
        if (it == ring.end()) it = ring.begin();
        return it->second;
    }
};`
        }
      },
      {
        title: 'L4 vs L7 Load Balancing',
        content: `
**Layer 4 (Transport Layer)**
- Operates at TCP/UDP level
- Makes decisions based on IP and port
- Faster - less processing overhead
- Cannot inspect application data
- Examples: AWS NLB, HAProxy (TCP mode)

**Layer 7 (Application Layer)**
- Operates at HTTP level
- Can inspect headers, cookies, URLs
- Enables content-based routing
- More flexible but higher latency
- Examples: AWS ALB, NGINX, HAProxy (HTTP mode)
        `,
        keyPoints: [
          'L4 is faster, L7 is smarter',
          'L7 can route based on: URL path, headers, cookies',
          'Use L7 for microservices, L4 for raw performance'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│                    L4 LOAD BALANCER                          │
│                                                              │
│   Client ──┬── TCP/IP ──→ LB ──→ Backend 1                  │
│            │                  ──→ Backend 2                  │
│            │                  ──→ Backend 3                  │
│            │                                                 │
│   Decisions based on: Source IP, Dest Port                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    L7 LOAD BALANCER                          │
│                                                              │
│   /api/*   ──→ API Servers                                  │
│   /static/* ──→ CDN/Static Servers                          │
│   /ws/*    ──→ WebSocket Servers                            │
│                                                              │
│   Can inspect: Headers, Cookies, URL, Body                  │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'Health Checks & Circuit Breakers',
        content: `
**Health Check Types**
- **Active**: LB periodically pings servers
- **Passive**: LB monitors response failures
- **Hybrid**: Combination of both

**Circuit Breaker Pattern**
1. **Closed**: Normal operation, requests flow through
2. **Open**: Failures exceed threshold, requests fail fast
3. **Half-Open**: After timeout, allow test requests

**Graceful Degradation**
- Return cached data when backend fails
- Serve reduced functionality
- Queue requests for later processing
        `,
        keyPoints: [
          'Health checks detect failures quickly',
          'Circuit breakers prevent cascade failures',
          'Always have fallback responses'
        ],
        code: {
          language: 'cpp',
          content: `// Circuit Breaker Implementation
enum State { CLOSED, OPEN, HALF_OPEN };

class CircuitBreaker {
    State state = CLOSED;
    int failureCount = 0;
    int successCount = 0;
    time_t lastFailureTime;
    
    const int FAILURE_THRESHOLD = 5;
    const int SUCCESS_THRESHOLD = 3;
    const int TIMEOUT_SECONDS = 30;
    
public:
    bool allowRequest() {
        if (state == CLOSED) return true;
        
        if (state == OPEN) {
            if (time(nullptr) - lastFailureTime > TIMEOUT_SECONDS) {
                state = HALF_OPEN;
                return true;
            }
            return false; // Fail fast
        }
        
        return true; // HALF_OPEN: allow test request
    }
    
    void recordSuccess() {
        if (state == HALF_OPEN) {
            successCount++;
            if (successCount >= SUCCESS_THRESHOLD) {
                state = CLOSED;
                failureCount = 0;
            }
        }
    }
    
    void recordFailure() {
        failureCount++;
        lastFailureTime = time(nullptr);
        
        if (failureCount >= FAILURE_THRESHOLD) {
            state = OPEN;
        }
    }
};`
        }
      }
    ]
  },

  'caching-patterns': {
    id: 'caching-patterns',
    title: 'Caching Patterns',
    description: 'Strategies for caching data to improve performance and reduce load',
    sections: [
      {
        title: 'Caching Strategies',
        content: `
**Cache-Aside (Lazy Loading)**
- Application checks cache first
- On miss: fetch from DB, update cache
- Simple and commonly used
- Risk of stale data

**Read-Through**
- Cache sits between app and DB
- Cache handles data fetching on miss
- Simpler application logic
- Cache library must support

**Write-Through**
- Data written to cache and DB synchronously
- Strong consistency
- Higher write latency

**Write-Behind (Write-Back)**
- Data written to cache, async write to DB
- Lower write latency
- Risk of data loss if cache fails

**Write-Around**
- Write directly to DB, bypass cache
- Good for write-heavy, rarely-read data
- Avoids cache pollution
        `,
        keyPoints: [
          'Cache-Aside is most common for reads',
          'Write-Through for strong consistency',
          'Write-Behind for performance (with risk)'
        ],
        code: {
          language: 'cpp',
          content: `// Cache-Aside Pattern
class CacheAsideService {
    Cache& cache;
    Database& db;
    
public:
    Data get(string key) {
        // 1. Check cache first
        Data data = cache.get(key);
        if (data.exists()) {
            return data;
        }
        
        // 2. On miss, fetch from DB
        data = db.query(key);
        
        // 3. Update cache for next time
        cache.set(key, data, TTL);
        
        return data;
    }
    
    void update(string key, Data data) {
        // Update DB first
        db.update(key, data);
        
        // Invalidate cache (or update it)
        cache.delete(key);
    }
};

// Write-Through Pattern
class WriteThroughService {
    Cache& cache;
    Database& db;
    
public:
    void write(string key, Data data) {
        // Write to both synchronously
        db.update(key, data);
        cache.set(key, data);
    }
};

// Write-Behind Pattern
class WriteBehindService {
    Cache& cache;
    AsyncQueue& writeQueue;
    
public:
    void write(string key, Data data) {
        // Write to cache immediately
        cache.set(key, data);
        
        // Queue DB write for later
        writeQueue.push({key, data});
    }
    
    // Background worker
    void processQueue() {
        while (auto item = writeQueue.pop()) {
            db.update(item.key, item.data);
        }
    }
};`
        }
      },
      {
        title: 'Cache Invalidation',
        content: `
**Time-Based (TTL)**
- Data expires after fixed time
- Simple but can serve stale data

**Event-Based**
- Invalidate on write/update events
- More accurate but complex

**Version-Based**
- Each cache entry has version number
- Compare versions to detect staleness

**Common Problems**
- **Cache Stampede**: Many requests hit DB when cache expires
- **Hot Keys**: Single key gets excessive traffic
- **Cold Start**: Empty cache after restart
        `,
        keyPoints: [
          'TTL is simplest but allows staleness',
          'Event-based gives strongest consistency',
          'Always handle cache failures gracefully'
        ],
        code: {
          language: 'cpp',
          content: `// Preventing Cache Stampede
class StampedeProtectedCache {
    Cache& cache;
    Database& db;
    mutex locks[1024];
    
    mutex& getLock(string key) {
        return locks[hash<string>{}(key) % 1024];
    }
    
public:
    Data get(string key) {
        Data data = cache.get(key);
        if (data.exists()) return data;
        
        // Use lock to prevent stampede
        lock_guard<mutex> guard(getLock(key));
        
        // Double-check after getting lock
        data = cache.get(key);
        if (data.exists()) return data;
        
        // Only one thread fetches from DB
        data = db.query(key);
        cache.set(key, data, TTL);
        return data;
    }
};

// Probabilistic Early Expiration
Data getWithEarlyExpire(string key) {
    auto [data, ttl] = cache.getWithTTL(key);
    
    if (data.exists()) {
        // Probabilistically refresh before expiry
        double random = (double)rand() / RAND_MAX;
        double beta = 1.0;
        
        if (time(nullptr) - beta * log(random) >= ttl) {
            // Proactively refresh in background
            async([&]() { refreshCache(key); });
        }
        return data;
    }
    
    return fetchFromDB(key);
}`
        }
      },
      {
        title: 'CDN and Multi-Level Caching',
        content: `
**Content Delivery Network (CDN)**
- Edge servers close to users
- Caches static content (images, CSS, JS)
- Reduces latency and origin server load
- Examples: CloudFront, Cloudflare, Akamai

**Multi-Level Cache Architecture**
1. **Browser Cache**: Closest to user
2. **CDN**: Edge locations worldwide
3. **Application Cache**: In-process (memory)
4. **Distributed Cache**: Redis, Memcached
5. **Database Cache**: Query result cache

**When to Use Each Level**
- Browser: Static assets, user preferences
- CDN: Public static content
- App Cache: Frequently accessed, small data
- Distributed: Shared data across instances
- DB: Complex query results
        `,
        keyPoints: [
          'CDN for static content, reduces latency globally',
          'Use multiple cache levels strategically',
          'Closer to user = faster but less fresh'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│                  MULTI-LEVEL CACHE                           │
│                                                              │
│   User ──→ Browser Cache (L1)                               │
│              │                                               │
│              ▼                                               │
│          CDN Edge (L2)                                       │
│              │                                               │
│              ▼                                               │
│      ┌──────────────────┐                                   │
│      │  Load Balancer   │                                   │
│      └──────────────────┘                                   │
│              │                                               │
│              ▼                                               │
│      ┌──────────────────┐                                   │
│      │   App Server     │ ← In-Memory Cache (L3)            │
│      └──────────────────┘                                   │
│              │                                               │
│              ▼                                               │
│      ┌──────────────────┐                                   │
│      │  Redis/Memcached │ ← Distributed Cache (L4)          │
│      └──────────────────┘                                   │
│              │                                               │
│              ▼                                               │
│      ┌──────────────────┐                                   │
│      │    Database      │ ← Query Cache (L5)                │
│      └──────────────────┘                                   │
└─────────────────────────────────────────────────────────────┘
          `
        }
      }
    ]
  },

  'sharding': {
    id: 'sharding',
    title: 'Database Sharding',
    description: 'Horizontal partitioning of data across multiple databases',
    sections: [
      {
        title: 'Sharding Strategies',
        content: `
**Range-Based Sharding**
- Data split by key ranges (e.g., A-M, N-Z)
- Simple to implement and understand
- Risk of hotspots if data not evenly distributed

**Hash-Based Sharding**
- Hash function determines shard
- More even distribution
- Difficult to do range queries

**Directory-Based Sharding**
- Lookup table maps keys to shards
- Most flexible
- Lookup service can be bottleneck

**Geo-Based Sharding**
- Data sharded by geographic region
- Reduces latency for local users
- Compliance with data residency laws
        `,
        keyPoints: [
          'Choose shard key that distributes data evenly',
          'Avoid joins across shards',
          'Plan for resharding from the start'
        ],
        code: {
          language: 'cpp',
          content: `// Hash-Based Sharding
class HashShardRouter {
    vector<DatabaseShard> shards;
    
public:
    DatabaseShard& getShard(string key) {
        size_t hash = std::hash<string>{}(key);
        return shards[hash % shards.size()];
    }
};

// Consistent Hashing for Dynamic Shards
class ConsistentHashRouter {
    map<size_t, DatabaseShard*> ring;
    hash<string> hasher;
    int virtualNodes = 150;
    
public:
    void addShard(DatabaseShard* shard) {
        for (int i = 0; i < virtualNodes; i++) {
            size_t hash = hasher(shard->id + to_string(i));
            ring[hash] = shard;
        }
    }
    
    void removeShard(DatabaseShard* shard) {
        for (int i = 0; i < virtualNodes; i++) {
            size_t hash = hasher(shard->id + to_string(i));
            ring.erase(hash);
        }
    }
    
    DatabaseShard* getShard(string key) {
        if (ring.empty()) return nullptr;
        
        size_t hash = hasher(key);
        auto it = ring.lower_bound(hash);
        if (it == ring.end()) it = ring.begin();
        return it->second;
    }
};`
        }
      },
      {
        title: 'Consistent Hashing',
        content: `
**Problem with Modulo Hashing**
- Adding/removing servers reshuffles most keys
- Example: 4 servers → 5 servers = 80% of keys move

**Consistent Hashing Solution**
- Keys and servers mapped to a ring (0 to 2^32)
- Each key assigned to next server clockwise
- Adding/removing server only affects neighbors

**Virtual Nodes**
- Each physical server has many virtual nodes on ring
- Provides more even distribution
- Enables weighted distribution
        `,
        keyPoints: [
          'Consistent hashing minimizes data movement',
          'Virtual nodes improve distribution',
          'Essential for distributed caches and databases'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│           CONSISTENT HASHING RING                            │
│                                                              │
│                        0                                     │
│                    ┌───────┐                                │
│                 ╱             ╲                              │
│               ╱     Server A    ╲                            │
│             ╱         ●           ╲                          │
│           ╱                         ╲                        │
│         ╱    ○ key1                   ╲                      │
│        │                               │                     │
│   270° │     ○ key2      ● Server B    │  90°               │
│        │                               │                     │
│         ╲                             ╱                      │
│           ╲         ● Server C      ╱                        │
│             ╲     ○ key3          ╱                          │
│               ╲                 ╱                            │
│                 ╲             ╱                              │
│                    └───────┘                                │
│                       180°                                   │
│                                                              │
│   Keys assigned to NEXT server clockwise                    │
│   key1 → Server A, key2 → Server B, key3 → Server C         │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'Resharding & Rebalancing',
        content: `
**When to Reshard**
- Uneven data distribution (hotspots)
- Adding/removing capacity
- Performance requirements change

**Challenges**
- Data migration while system is live
- Maintaining consistency during transition
- Handling requests during migration

**Strategies**
- **Double-Write**: Write to old and new shard
- **Background Migration**: Gradual data transfer
- **Read Repair**: Migrate on read
        `,
        keyPoints: [
          'Plan resharding strategy upfront',
          'Use consistent hashing to minimize movement',
          'Test thoroughly before production resharding'
        ],
        code: {
          language: 'cpp',
          content: `// Online Resharding with Double-Write
class ReshardingRouter {
    ShardMap oldShards;
    ShardMap newShards;
    bool migrating = false;
    set<string> migratedKeys;
    
public:
    void write(string key, Data data) {
        if (migrating) {
            // Write to both during migration
            oldShards.get(key)->write(key, data);
            newShards.get(key)->write(key, data);
            migratedKeys.insert(key);
        } else {
            getCurrentShards().get(key)->write(key, data);
        }
    }
    
    Data read(string key) {
        if (migrating && migratedKeys.count(key)) {
            return newShards.get(key)->read(key);
        }
        
        auto data = getCurrentShards().get(key)->read(key);
        
        // Read-repair: migrate on read
        if (migrating && !migratedKeys.count(key)) {
            newShards.get(key)->write(key, data);
            migratedKeys.insert(key);
        }
        
        return data;
    }
};`
        }
      }
    ]
  },

  'cap-theorem': {
    id: 'cap-theorem',
    title: 'CAP Theorem',
    description: 'Understanding the tradeoffs in distributed systems',
    sections: [
      {
        title: 'CAP Theorem Explained',
        content: `
**The Three Properties**

**Consistency (C)**
- All nodes see the same data at the same time
- Every read receives the most recent write
- Linearizable/sequential consistency

**Availability (A)**
- Every request receives a response
- No guarantee it's the most recent data
- System remains operational

**Partition Tolerance (P)**
- System continues despite network failures
- Messages between nodes may be lost/delayed
- Required for any distributed system
        `,
        keyPoints: [
          'You can only have 2 of 3 properties',
          'Network partitions WILL happen (P is required)',
          'Real choice is between C and A during partitions'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│                    CAP THEOREM                               │
│                                                              │
│                         C                                    │
│                    (Consistency)                             │
│                        /╲                                    │
│                       /  ╲                                   │
│                      /    ╲                                  │
│                     / CA   ╲                                 │
│                    / (RDBMS)╲                                │
│                   /          ╲                               │
│                  /            ╲                              │
│                 /      CP      ╲      <-- Pick 2             │
│                /   (MongoDB,    ╲                            │
│               /     HBase)       ╲                           │
│              /                    ╲                          │
│             ╱────────────────────────╲                       │
│            A ─────────  AP  ───────── P                      │
│       (Availability)  (Cassandra, (Partition                 │
│                        DynamoDB)   Tolerance)                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'PACELC Extension',
        content: `
**Beyond CAP**
- CAP only describes behavior DURING partitions
- PACELC adds behavior when system is NORMAL

**PACELC Formula**
- **P**artition: Choose **A**vailability or **C**onsistency
- **E**lse (normal): Choose **L**atency or **C**onsistency

**Examples**
- **PA/EL (Dynamo, Cassandra)**: 
  - During partition: Choose Availability
  - Normal: Choose low Latency

- **PC/EC (BigTable, HBase)**:
  - During partition: Choose Consistency
  - Normal: Still prefer Consistency over Latency

- **PA/EC (MongoDB)**:
  - During partition: Choose Availability  
  - Normal: Choose Consistency
        `,
        keyPoints: [
          'PACELC extends CAP to normal operation',
          'Latency vs Consistency is the everyday tradeoff',
          'Different use cases need different tradeoffs'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│                    PACELC CLASSIFICATION                     │
│                                                              │
│  System          During Partition    Else (Normal)          │
│  ─────────────────────────────────────────────────          │
│  Dynamo              A (Available)      L (Latency)         │
│  Cassandra           A                  L                    │
│  Riak                A                  L                    │
│                                                              │
│  BigTable            C (Consistent)     C                    │
│  HBase               C                  C                    │
│  VoltDB              C                  C                    │
│                                                              │
│  MongoDB             A                  C                    │
│  PNUTS               A                  C                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
          `
        }
      },
      {
        title: 'Consistency Models',
        content: `
**Strong Consistency**
- All reads see latest write
- Simple to reason about
- Higher latency, lower availability

**Eventual Consistency**
- Replicas converge over time
- Temporary inconsistencies allowed
- Better availability and latency

**Causal Consistency**
- Preserves cause-effect relationships
- Writes that are causally related appear in order
- Concurrent writes may appear in any order

**Read-Your-Writes**
- User always sees their own writes
- Common in user-facing applications
- Can be implemented with session affinity
        `,
        keyPoints: [
          'Strong consistency is expensive',
          'Eventual consistency scales better',
          'Choose based on business requirements'
        ],
        code: {
          language: 'cpp',
          content: `// Quorum-based Consistency
// N = total replicas, W = write quorum, R = read quorum

// Strong Consistency: W + R > N
// Example: N=3, W=2, R=2 (majority quorum)

class QuorumDB {
    vector<Node> replicas;
    int N, W, R;
    
public:
    QuorumDB(int n, int w, int r) : N(n), W(w), R(r) {
        assert(W + R > N); // Strong consistency
    }
    
    bool write(string key, Data data, int version) {
        int acks = 0;
        for (auto& node : replicas) {
            if (node.write(key, data, version)) {
                acks++;
            }
        }
        return acks >= W;
    }
    
    Data read(string key) {
        vector<pair<Data, int>> responses;
        for (auto& node : replicas) {
            auto [data, version] = node.read(key);
            responses.push_back({data, version});
            if (responses.size() >= R) break;
        }
        
        // Return data with highest version
        return max_element(responses.begin(), responses.end(),
            [](auto& a, auto& b) { return a.second < b.second; }
        )->first;
    }
};`
        }
      }
    ]
  },

  'distributed-consensus': {
    id: 'distributed-consensus',
    title: 'Distributed Consensus',
    description: 'Algorithms for agreement in distributed systems',
    sections: [
      {
        title: 'The Consensus Problem',
        content: `
**Why Consensus Matters**
- Leader election: Who is the primary?
- Distributed transactions: Commit or abort?
- Configuration: Agree on cluster membership
- Ordering: Total order of events

**Requirements**
- **Agreement**: All correct nodes decide same value
- **Validity**: Decided value was proposed by some node
- **Termination**: All correct nodes eventually decide
- **Integrity**: Each node decides at most once

**Challenges**
- Nodes can fail
- Network can partition
- Messages can be delayed/lost
- Clocks are not synchronized
        `,
        keyPoints: [
          'FLP Impossibility: No perfect consensus in async systems',
          'Practical algorithms use timeouts and leader election',
          'Trade availability for safety during partitions'
        ]
      },
      {
        title: 'Raft Protocol',
        content: `
**Raft Overview**
- Designed for understandability
- Used in etcd, Consul, CockroachDB

**Three Roles**
- **Leader**: Handles all client requests
- **Follower**: Passive, responds to leader
- **Candidate**: Seeking to become leader

**Key Mechanisms**
1. **Leader Election**: Candidates request votes
2. **Log Replication**: Leader replicates entries to followers
3. **Safety**: Only nodes with complete logs can be leader
        `,
        keyPoints: [
          'Raft is easier to understand than Paxos',
          'Strong leader model simplifies replication',
          'Majority quorum for leader election'
        ],
        code: {
          language: 'cpp',
          content: `// Simplified Raft Node
enum Role { FOLLOWER, CANDIDATE, LEADER };

class RaftNode {
    Role role = FOLLOWER;
    int currentTerm = 0;
    int votedFor = -1;
    vector<LogEntry> log;
    int commitIndex = 0;
    
    // Timing
    time_t lastHeartbeat;
    int electionTimeout; // Random 150-300ms
    
public:
    // Follower: Receive heartbeat from leader
    void onHeartbeat(int term, int leaderId) {
        if (term >= currentTerm) {
            currentTerm = term;
            role = FOLLOWER;
            lastHeartbeat = now();
        }
    }
    
    // Timeout: Start election
    void onElectionTimeout() {
        if (role != LEADER) {
            role = CANDIDATE;
            currentTerm++;
            votedFor = myId;
            requestVotes();
        }
    }
    
    // Candidate: Request votes from all nodes
    void requestVotes() {
        int votes = 1; // Vote for self
        for (auto& node : cluster) {
            if (node.requestVote(currentTerm, myId, log.size())) {
                votes++;
            }
        }
        
        if (votes > cluster.size() / 2) {
            becomeLeader();
        }
    }
    
    // Leader: Replicate log entry
    void appendEntry(Command cmd) {
        log.push_back({currentTerm, cmd});
        
        int acks = 1;
        for (auto& node : cluster) {
            if (node.appendEntries(currentTerm, log)) {
                acks++;
            }
        }
        
        if (acks > cluster.size() / 2) {
            commitIndex = log.size() - 1;
            applyToStateMachine(cmd);
        }
    }
};`
        }
      },
      {
        title: 'Paxos & Other Algorithms',
        content: `
**Paxos (Original)**
- Proposed by Leslie Lamport
- Mathematically proven correct
- Complex and hard to implement

**Multi-Paxos**
- Optimization for sequence of values
- Stable leader amortizes election cost

**Zab (ZooKeeper)**
- Primary-backup with total order
- Optimized for configuration management

**PBFT (Practical Byzantine Fault Tolerance)**
- Tolerates malicious nodes (f failures need 3f+1 nodes)
- Used in blockchain systems
        `,
        keyPoints: [
          'Paxos is the foundation of consensus theory',
          'Raft is Paxos made understandable',
          'Choose based on failure model (crash vs byzantine)'
        ],
        code: {
          language: 'text',
          content: `
┌─────────────────────────────────────────────────────────────┐
│                    RAFT STATE MACHINE                        │
│                                                              │
│   ┌───────────┐    timeout    ┌───────────────┐             │
│   │           │  ───────────▶ │               │             │
│   │  Follower │               │   Candidate   │             │
│   │           │ ◀───────────  │               │             │
│   └───────────┘    loses      └───────────────┘             │
│        │          election           │                       │
│        │                             │ wins election         │
│        │   discovers                 │ (majority votes)      │
│        │   current leader            ▼                       │
│        │             ┌───────────────────────┐              │
│        └───────────▶ │                       │              │
│                      │        Leader         │              │
│                      │                       │              │
│                      └───────────────────────┘              │
│                               │                              │
│                               │ discovers server             │
│                               │ with higher term             │
│                               ▼                              │
│                        (becomes Follower)                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
          `
        }
      }
    ]
  }
};
