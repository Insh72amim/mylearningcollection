# LearnWithAI 🚀

**Master Backend Engineering, Distributed Systems, and Financial Engineering.**

LearnWithAI is a comprehensive, interactive learning platform designed for engineers and students. It combines detailed technical documentation, interactive visualizations, and practical code examples to demystify complex topics ranging from distributed systems to quantitative finance.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.3.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/vite-5.4.1-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/tailwind-3.4.1-38B2AC?logo=tailwindcss)

---

## 🌟 Key Features

### 🏗️ Data Engineering & Systems
- **Apache Kafka**: Interactive architecture visualizer (Producers, Brokers, Consumers, Zookeeper).
- **Apache Spark**: Detailed documentation on RDDs, DataFrames, and Streaming.
- **Distributed Systems**: In-depth coverage of CAP Theorem, Consensus (Paxos/Raft), and Sharding.

### 📚 Interactive Books
Experience technical books like never before with chapter-wise summaries, diagrams, and code snippets:
- **Designing Data-Intensive Applications (DDIA)**: Full 12-chapter enhancement with interactive diagrams.
- **Database Internals**: Deep dive into B-Trees, LSM-Trees, WAL, and ARIES recovery (14 chapters).
- **Options, Futures, and Other Derivatives**: Interactive guide to J.C. Hull's classic (20 chapters).

### 📐 Low Level Design (LLD)
- **Design Patterns**: Visual explorer for Creational, Structural, and Behavioral patterns (Singleton, Factory, Observer, etc.).
- **LLD Examples**: Solved object-oriented design problems like Elevator System, Parking Lot, and Chess.

### 📈 Quantitative Finance & Math
- **Finance**: Topics on Black-Scholes, Monte Carlo methods, and Risk Management.
- **Mathematics**: Resources for Complex Analysis, Linear Algebra, and Topology.
- **Machine Learning**: Structured learning paths for Deep Learning and MLOps.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Diagrams**: Mermaid.js (via customized interactive components)
- **State Management**: React Hooks (useState, useEffect, Suspense)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:Insh72amim/mylearningcollection.git
   cd learnwithai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── books/          # Interactive book components (Hull, DDIA, DB Internals)
│   ├── common/         # Reusable UI components (Layout, CodeBlock, Diagrams)
│   ├── kafka/          # Kafka visualizer and docs
│   ├── lld/            # Low Level Design components
│   └── ...             # Other technology-specific components
├── config/
│   └── technologies.js # Central registry for all categories and routes
├── data/
│   ├── categoryData.js # Data for Finance, Math, ML books/topics
│   └── lldData.js      # Data for Design Patterns and LLD examples
├── pages/
│   └── TechnologyPage.jsx # Dynamic page renderer
└── App.jsx             # Main routing configuration
```

---

## 🔮 Roadmap

- [ ] **AI Engineering**: Modules for LLMs, RAG, and Vector Databases.
- [ ] **Cloud Native**: Interactive Kubernetes and Docker tutorials.
- [ ] **More LLD Problems**: Expanding the library with Rate Limiter, Cache, etc.
- [ ] **User Progress**: Local storage-based progress tracking for chapters.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
