import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';

const ElasticsearchDocs = () => {
  const clusterNodes = [
    { id: 'client', position: { x: 350, y: 0 }, data: { label: 'Client' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
    
    // Master Nodes
    { id: 'm1', position: { x: 250, y: 100 }, data: { label: 'Master Node' }, style: { background: '#6366f1', color: 'white', border: '1px solid #4f46e5', width: 140 } },
    { id: 'm2', position: { x: 450, y: 100 }, data: { label: 'Master Eligible' }, style: { background: '#4b5563', color: 'white', border: '1px solid #374151', width: 140 } },
    
    // Data Nodes
    { id: 'd1', position: { x: 50, y: 250 }, data: { label: 'Data Node 1' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 180, height: 200 } },
    { id: 'd2', position: { x: 300, y: 250 }, data: { label: 'Data Node 2' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 180, height: 200 } },
    { id: 'd3', position: { x: 550, y: 250 }, data: { label: 'Data Node 3' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 180, height: 200 } },

    // Shards (inside Data Nodes visually by positioning)
    { id: 's0p', position: { x: 80, y: 320 }, data: { label: 'Shard 0 (P)' }, style: { background: '#f59e0b', color: 'white', border: '1px solid #d97706', width: 120, zIndex: 10 } },
    { id: 's0r', position: { x: 330, y: 320 }, data: { label: 'Shard 0 (R)' }, style: { background: '#3b82f6', color: 'white', border: '1px solid #2563eb', width: 120, zIndex: 10 } },
    { id: 's1p', position: { x: 330, y: 380 }, data: { label: 'Shard 1 (P)' }, style: { background: '#f59e0b', color: 'white', border: '1px solid #d97706', width: 120, zIndex: 10 } },
    { id: 's1r', position: { x: 580, y: 320 }, data: { label: 'Shard 1 (R)' }, style: { background: '#3b82f6', color: 'white', border: '1px solid #2563eb', width: 120, zIndex: 10 } },
  ];

  const clusterEdges = [
    { id: 'e1', source: 'client', target: 'm1', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'e2', source: 'm1', target: 'd1', label: 'State', style: { stroke: '#6366f1', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3', source: 'm1', target: 'd2', style: { stroke: '#6366f1', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e4', source: 'm1', target: 'd3', style: { stroke: '#6366f1', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    
    // Replication logic (visualized)
    { id: 'r1', source: 's0p', target: 's0r', label: 'Replication', animated: true, style: { stroke: '#f59e0b' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r2', source: 's1p', target: 's1r', label: 'Replication', animated: true, style: { stroke: '#f59e0b' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Elasticsearch: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to the distributed search and analytics engine built on Apache Lucene.
        </p>
      </div>

      {/* Section 1: Architecture & Core Concepts */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">01</span>
          Architecture & Core Concepts
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Elasticsearch is a <strong>distributed, RESTful search and analytics engine</strong> built on Apache Lucene, designed for horizontal scalability and real-time search.
        </p>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Cluster Architecture</h3>
          <InteractiveDiagram 
            initialNodes={clusterNodes} 
            initialEdges={clusterEdges} 
            title="Elasticsearch Cluster Topology" 
          />
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
              <strong className="text-blue-400">Master Node</strong>
              <p className="text-sm mt-2">Manages cluster state, creates/deletes indexes, assigns shards. Only one active at a time.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-green-900/50">
              <strong className="text-green-400">Data Nodes</strong>
              <p className="text-sm mt-2">Store data and execute data-related operations (search, aggregations).</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-orange-900/50">
              <strong className="text-orange-400">Shards</strong>
              <p className="text-sm mt-2">Primary shards hold data. Replica shards provide redundancy and scale reads.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Inverted Index</h3>
          <CodeBlock language="text" code={`Document 1: "The quick brown fox"
Document 2: "The brown dog"
Document 3: "Quick fox jumps"

Inverted Index:
Term      | Document IDs
----------|-------------
brown     | [1, 2]
dog       | [2]
fox       | [1, 3]
jumps     | [3]
quick     | [1, 3]  # Lowercased
the       | [1, 2]

# Search for "quick fox":
# 1. Lookup "quick" → [1, 3]
# 2. Lookup "fox" → [1, 3]
# 3. Intersection → [1, 3]
# Result: Documents 1 and 3`} />
        </div>
      </section>

      {/* Section 2: Data Model & Storage */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">02</span>
          Data Model & Storage
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Documents and Mappings</h3>
            <CodeBlock language="python" code={`from elasticsearch import Elasticsearch

es = Elasticsearch(['http://localhost:9200'])

# Create index with explicit mapping
es.indices.create(index='products', body={
    'mappings': {
        'properties': {
            'name': {'type': 'text'},           # Full-text search
            'category': {'type': 'keyword'},    # Exact match, aggregations
            'price': {'type': 'float'},
            'description': {'type': 'text', 
                          'analyzer': 'english'},  # Custom analyzer
            'tags': {'type': 'keyword'},         # Array of keywords
            'created_at': {'type': 'date'},
            'location': {'type': 'geo_point'}    # Geospatial
        }
    }
})

# Index a document
doc = {
    'name': 'Laptop',
    'category': 'Electronics',
    'price': 999.99,
    'description': 'High-performance laptop for developers',
    'tags': ['computer', 'portable'],
    'created_at': '2024-01-15T10:00:00',
    'location': {'lat': 40.7128, 'lon': -74.0060}
}

es.index(index='products', id=1, document=doc)`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Field Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
                <strong className="text-blue-400 block mb-2">text vs keyword</strong>
                <CodeBlock language="json" code={`{
  "title": {
    "type": "text"     // Analyzed, searchable
  },
  "status": {
    "type": "keyword"  // Not analyzed, exact match
  }
}`} />
              </div>
              <div className="bg-gray-900 p-4 rounded border border-green-900/50">
                <strong className="text-green-400 block mb-2">Numeric & Date</strong>
                <CodeBlock language="json" code={`{
  "price": {"type": "float"},
  "quantity": {"type": "integer"},
  "timestamp": {
    "type": "date",
    "format": "yyyy-MM-dd HH:mm:ss"
  }
}`} />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Mapping Best Practices</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Use <strong>keyword</strong> for filtering, sorting, aggregations</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Use <strong>text</strong> for full-text search</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Define mapping explicitly (avoid dynamic mapping in production)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Enable <strong>doc_values</strong> for aggregations and sorting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Querying & Indexing */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">03</span>
          Querying & Indexing
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Query DSL</h3>
            <CodeBlock language="python" code={`# Match query (full-text search)
query = {
    'query': {
        'match': {
            'description': 'high performance laptop'
        }
    }
}
results = es.search(index='products', body=query)

# Bool query (combine conditions)
query = {
    'query': {
        'bool': {
            'must': [
                {'match': {'category': 'Electronics'}}
            ],
            'filter': [
                {'range': {'price': {'gte': 500, 'lte': 1500}}}
            ],
            'should': [
                {'match': {'tags': 'portable'}}
            ],
            'must_not': [
                {'term': {'status': 'discontinued'}}
            ]
        }
    }
}

# Term query (exact match)
query = {
    'query': {
        'term': {'category.keyword': 'Electronics'}
    }
}

# Multi-match (search across multiple fields)
query = {
    'query': {
        'multi_match': {
            'query': 'laptop',
            'fields': ['name^2', 'description']  # Boost name field
        }
    }
}`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Aggregations</h3>
            <CodeBlock language="python" code={`# Metrics aggregation (avg, sum, min, max)
query = {
    'aggs': {
        'avg_price': {
            'avg': {'field': 'price'}
        },
        'total_revenue': {
            'sum': {'field': 'price'}
        }
    }
}

# Bucket aggregation (group by)
query = {
    'aggs': {
        'categories': {
            'terms': {
                'field': 'category.keyword',
                'size': 10
            },
            'aggs': {
                'avg_price': {
                    'avg': {'field': 'price'}
                }
            }
        },
        'price_histogram': {
            'histogram': {
                'field': 'price',
                'interval': 100
            }
        }
    }
}

# Date histogram (time-series)
query = {
    'aggs': {
        'sales_over_time': {
            'date_histogram': {
                'field': 'created_at',
                'calendar_interval': '1d'
            }
        }
    }
}`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Analyzers</h3>
            <CodeBlock language="json" code={`// Custom analyzer
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["lowercase", "stop", "snowball"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "content": {
        "type": "text",
        "analyzer": "my_analyzer"
      }
    }
  }
}

// Analysis process:
// Input: "The Quick Brown Foxes"
// 1. Tokenizer: ["The", "Quick", "Brown", "Foxes"]
// 2. Lowercase: ["the", "quick", "brown", "foxes"]
// 3. Stop words: ["quick", "brown", "foxes"]
// 4. Snowball (stemming): ["quick", "brown", "fox"]`} />
          </div>
        </div>
      </section>

      {/* Section 4: Scaling & Distribution */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">04</span>
          Scaling & Distribution
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Shard Sizing</h3>
            <CodeBlock language="python" code={`# Create index with 5 primary shards, 1 replica
es.indices.create(index='logs', body={
    'settings': {
        'number_of_shards': 5,
        'number_of_replicas': 1
    }
})

# Shard sizing guidelines:
# - Aim for 20-50GB per shard
# - Total shards = primary_shards × (1 + replicas)
# - Example: 500GB data → 10-25 primary shards

# Cannot change primary shard count after creation
# Must reindex to change shard count

# Dynamic replica adjustment:
es.indices.put_settings(index='logs', body={
    'number_of_replicas': 2  # Increase replicas
})`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Index Lifecycle Management (ILM)</h3>
            <CodeBlock language="json" code={`// Define ILM policy
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_size": "50GB",
            "max_age": "1d"
          }
        }
      },
      "warm": {
        "min_age": "7d",
        "actions": {
          "shrink": {"number_of_shards": 1},
          "forcemerge": {"max_num_segments": 1}
        }
      },
      "cold": {
        "min_age": "30d",
        "actions": {
          "freeze": {}
        }
      },
      "delete": {
        "min_age": "90d",
        "actions": {
          "delete": {}
        }
      }
    }
  }
}`} />
          </div>
        </div>
      </section>

      {/* Section 5: Performance Optimization */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">05</span>
          Performance Optimization
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Bulk Indexing</h3>
            <CodeBlock language="python" code={`from elasticsearch.helpers import bulk

# Bulk indexing (much faster than individual inserts)
actions = [
    {
        '_index': 'products',
        '_id': i,
        '_source': {
            'name': f'Product {i}',
            'price': i * 10
        }
    }
    for i in range(10000)
]

bulk(es, actions, chunk_size=500, request_timeout=60)

# Bulk performance tips:
# ✓ Use chunk_size 500-1000
# ✓ Disable refresh during bulk: {'refresh_interval': '-1'}
# ✓ Increase bulk queue size
# ✓ Use multiple threads`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Search Optimization</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Use <strong>filter context</strong> instead of query context (cacheabled)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Limit <strong>size</strong> and use pagination</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Use <strong>_source filtering</strong> to return only needed fields</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Leverage <strong>query cache</strong> for repeated queries</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Use <strong>routing</strong> to target specific shards</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Use Cases & Comparisons */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">06</span>
          Use Cases & Comparisons
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-xl border border-green-900/50">
            <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 When to Use Elasticsearch</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-400 font-bold mb-2">Perfect For:</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Full-text search (e-commerce, docs)</li>
                  <li>✓ Log analytics (ELK stack)</li>
                  <li>✓ Application monitoring (APM)</li>
                  <li>✓ Security analytics (SIEM)</li>
                  <li>✓ Metrics and time-series data</li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-bold mb-2">Not Ideal For:</h4>
                <ul className="text-sm space-y-1">
                  <li>→ Primary data store (not durable)</li>
                  <li>→ ACID transactions</li>
                  <li>→ Frequent updates (expensive)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">ELK Stack</h3>
            <CodeBlock language="text" code={`Elasticsearch: Search and analytics engine
Logstash:      Data processing pipeline (collect, parse, enrich)
Kibana:        Visualization and UI

Flow:
Logs → Logstash → Elasticsearch → Kibana

Modern alternative (Elastic Stack):
Logs → Beats/Filebeat → Elasticsearch → Kibana`} />
          </div>
        </div>
      </section>

      <div className="pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-500">
          📚 Further Reading: <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html" className="text-blue-400 hover:underline">Official Elasticsearch Documentation</a>
        </p>
      </div>
    </div>
  );
};

export default ElasticsearchDocs;
