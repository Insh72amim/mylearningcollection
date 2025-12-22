export const aiEngineeringData = {
  sections: {
    "llm-engineering": {
      id: "llm-engineering",
      title: "LLM Engineering",
      description: "Foundations of Large Language Models: selection, prompting, and optimization.",
      content: `
# LLM Engineering Fundamentals

Mastering Large Language Models (LLMs) requires moving beyond simple chat interfaces to structured engineering practices.

### 1. Model Selection & Tokenization
LLMs don't read text; they process **tokens**. Understanding tokenization is crucial for cost and performance optimization.
- **Subword Tokenization (BPE)**: Most modern LLMs (GPT, Llama) use Byte-Pair Encoding.
- **Context Window**: The maximum number of tokens a model can process at once.

### 2. Prompt Engineering Patterns
Advanced techniques to improve model reliability and accuracy.
- **Zero-Shot / Few-Shot**: Providing no examples vs. a few examples in the prompt.
- **Chain of Thought (CoT)**: Encouraging the model to "think step-by-step".
- **Self-Consistency**: Generating multiple paths and taking the majority vote.

### 3. Fine-tuning vs. RAG
When to use each approach:
| Aspect | Fine-tuning | RAG |
| :--- | :--- | :--- |
| **New Knowledge** | Excellent for style/format | Excellent for dynamic facts |
| **Cost** | High (training) | Medium (infrastructure) |
| **Transparency** | Black box | Source attribution (Citations) |
| **Frequency** | Low (static) | High (real-time) |

\`\`\`python
# Simple Chain-of-Thought Prompt
prompt = """
Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. 
Each can has 3 tennis balls. How many tennis balls does he have now?
A: Let's think step by step.
"""
\`\`\`
`
    },
    "rag-pipeline": {
      id: "rag-pipeline",
      title: "RAG Pipeline",
      description: "Retrieval Augmented Generation: architectural patterns and implementation.",
      content: `
# Retrieval Augmented Generation (RAG)

RAG connects LLMs to your private, real-time data without the need for constant retraining.

### The RAG Workflow
1. **Ingestion**: 
   - **Load**: Extract text from PDFs, Docs, DBs.
   - **Chunk**: Split long text into smaller pieces (Fixed-size, Semantic).
   - **Embed**: Convert chunks into high-dimensional vectors.
2. **Retrieval**: 
   - User query is embedded.
   - Search the Vector DB for the top-k most similar chunks.
3. **Generation**: 
   - Prompt = Context (Retrieved Chunks) + User Query.
   - LLM generates answer based *only* on the context.

### Challenges in RAG
- **Lost in the Middle**: LLMs often ignore information in the middle of a large context.
- **Retrieval Quality**: If the retrieved chunks are irrelevant, the answer will be wrong.
- **Hallucination**: Even with RAG, models might invent facts if the threshold is low.

\`\`\`python
# Conceptual RAG Workflow
query = "What are the latest revenue numbers?"
relevant_docs = vector_db.search(query, k=3)
context = "\\n".join([doc.page_content for doc in relevant_docs])

prompt = f"Context: {context}\\nQuestion: {query}\\nAnswer:"
response = llm.generate(prompt)
\`\`\`
`
    },
    "vector-databases": {
      id: "vector-databases",
      title: "Vector Databases",
      description: "Managing high-dimensional data at scale.",
      content: `
# Vector Databases

Traditional DBs use exact matches (SQL) or keyword matches (NoSQL). Vector DBs use **Similarity Search**.

### How they work
Vector databases store **Embeddings** (arrays of floats representing meaning). They use Approximate Nearest Neighbor (ANN) algorithms to find similar vectors quickly.

### Key Concepts
- **Distance Metrics**:
  - **Cosine Similarity**: Measures the angle between vectors (good for text).
  - **Euclidean Distance (L2)**: Measures straight-line distance.
  - **Dot Product**: Measures both magnitude and direction.
- **Indexing Algorithms**:
  - **HNSW (Hierarchical Navigable Small World)**: Graph-based, very fast and accurate.
  - **IVF (Inverted File Index)**: Cluster-based, good for large datasets.

### Popular Vector DBs
- **Dedicated**: Pinecone, Milvus, Qdrant, Weaviate.
- **Extensions**: pgvector (PostgreSQL), Redis.
`
    },
    "agentic-frameworks": {
      id: "agentic-frameworks",
      title: "Agentic Frameworks",
      description: "Building autonomous AI agents with specialized tools.",
      content: `
# AI Agents & Frameworks

Agents are LLMs that can use **Tools** (search, calculators, APIs) to achieve complex goals.

### The Agent Loop (ReAct)
1. **Thought**: Reason about what to do next.
2. **Action**: Choose a tool and input.
3. **Observation**: Get the result from the tool.
4. **Repeat**: Until the final answer is reached.

### Modern Frameworks
- **LangChain**: The "Swiss Army Knife" for LLM apps. Modular and flexible.
- **LlamaIndex**: Specialized in data-centric agents and RAG.
- **AutoGPT / BabyAGI**: Autonomous agents that can self-reason.

\`\`\`python
# Simple LangChain Tool Usage
from langchain.agents import load_tools, initialize_agent

tools = load_tools(["serpapi", "llm-math"], llm=llm)
agent = initialize_agent(tools, llm, agent="zero-shot-react-description")
agent.run("Who is the current CEO of Tesla and what is their age raised to the power of 0.5?")
\`\`\`
`
    }
  },
  getSection: (id) => aiEngineeringData.sections[id],
  getAllSections: () => Object.values(aiEngineeringData.sections)
};
