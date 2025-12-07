// Category data for Finance, Mathematics, and Machine Learning
export const categoryData = {
  finance: {
    name: "Finance",
    description:
      "Quantitative finance, derivatives pricing, risk management, and financial engineering",
    color: "green",
    books: [
      {
        id: "options-futures-derivatives",
        title: "Options, Futures, and Other Derivatives",
        author: "John C. Hull",
        year: "2017",
        edition: "10th Edition",
        component: "HullBook",
        description:
          "The definitive guide to derivatives markets. Covers options, futures, swaps, and risk management.",
        topics: [
          "Black-Scholes Model",
          "Greeks",
          "Hedging Strategies",
          "Interest Rate Derivatives",
        ],
      },
      {
        id: "security-analysis",
        title: "Security Analysis",
        author: "Benjamin Graham & David Dodd",
        year: "1934",
        edition: "6th Edition",
        component: "SecurityAnalysisBook",
        description:
          "The bible of value investing. Teaches the fundamental principles of analyzing stocks and bonds.",
        topics: [
          "Value Investing",
          "Margin of Safety",
          "Fundamental Analysis",
          "Bond Analysis",
        ],
      },
      {
        id: "stochastic-calculus-finance",
        title: "Stochastic Calculus for Finance",
        author: "Steven Shreve",
        year: "2004",
        description:
          "Mathematical foundations of financial engineering using stochastic calculus.",
        topics: [
          "Brownian Motion",
          "Ito Calculus",
          "Martingales",
          "Black-Scholes Theory",
        ],
      },
      {
        id: "quantitative-risk-management",
        title: "Quantitative Risk Management",
        author: "McNeil, Frey, and Embrechts",
        year: "2015",
        description:
          "Comprehensive treatment of modern risk management techniques.",
        topics: [
          "VaR",
          "Expected Shortfall",
          "Copulas",
          "Extreme Value Theory",
        ],
      },
    ],
    topics: [
      {
        id: "black-scholes",
        title: "Black-Scholes Model",
        description: "Option pricing using stochastic differential equations",
      },
      {
        id: "monte-carlo-methods",
        title: "Monte Carlo Methods in Finance",
        description: "Simulating asset prices and derivative valuation",
      },
      {
        id: "portfolio-optimization",
        title: "Portfolio Optimization",
        description:
          "Mean-variance optimization, efficient frontier, Sharpe ratio",
      },
      {
        id: "risk-measures",
        title: "Risk Measures",
        description: "Value at Risk (VaR), CVaR, Expected Shortfall",
      },
    ],
  },
  mathematics: {
    name: "Mathematics",
    description:
      "Advanced mathematical concepts: complex analysis, linear algebra, real analysis, and topology",
    color: "indigo",
    books: [
      {
        id: "complex-analysis-spiegel",
        title: "Complex Analysis",
        author: "Murray R. Spiegel",
        year: "2009",
        edition: "Schaum's Outline",
        description:
          "Comprehensive introduction to complex variables and their applications.",
        topics: [
          "Complex Numbers",
          "Analytic Functions",
          "Contour Integration",
          "Residue Theorem",
        ],
      },
      {
        id: "linear-algebra-lipschutz",
        title: "Linear Algebra",
        author: "Seymour Lipschutz",
        year: "2017",
        edition: "Schaum's Outline",
        description:
          "Complete coverage of linear algebra with solved problems.",
        topics: [
          "Vector Spaces",
          "Eigenvalues",
          "Jordan Form",
          "Inner Product Spaces",
        ],
      },
      {
        id: "real-analysis-rudin",
        title: "Principles of Mathematical Analysis",
        author: "Walter Rudin",
        year: "1976",
        description: 'Classic text on real analysis, known as "Baby Rudin".',
        topics: [
          "Sequences",
          "Continuity",
          "Differentiation",
          "Riemann Integration",
        ],
      },
      {
        id: "topology-munkres",
        title: "Topology",
        author: "James Munkres",
        year: "2000",
        description: "Standard introduction to general and algebraic topology.",
        topics: [
          "Topological Spaces",
          "Connectedness",
          "Compactness",
          "Fundamental Group",
        ],
      },
    ],
    topics: [
      {
        id: "fourier-analysis",
        title: "Fourier Analysis",
        description: "Fourier series, Fourier transforms, and applications",
      },
      {
        id: "differential-equations",
        title: "Differential Equations",
        description: "ODEs, PDEs, Laplace transforms, boundary value problems",
      },
      {
        id: "abstract-algebra",
        title: "Abstract Algebra",
        description: "Groups, rings, fields, Galois theory",
      },
      {
        id: "measure-theory",
        title: "Measure Theory",
        description: "Lebesgue integration, probability spaces, ergodic theory",
      },
      {
        id: "numerical-methods",
        title: "Numerical Methods",
        description:
          "Approximation algorithms, numerical integration, linear solvers",
      },
    ],
  },
  "machine-learning": {
    name: "Machine Learning",
    description:
      "Machine learning algorithms, deep learning, neural networks, and AI systems",
    color: "fuchsia",
    books: [
      {
        id: "deep-learning-goodfellow",
        title: "Deep Learning",
        author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
        year: "2016",
        description:
          "Comprehensive textbook on deep learning theory and practice.",
        topics: [
          "Neural Networks",
          "CNNs",
          "RNNs",
          "Optimization",
          "Regularization",
        ],
      },
      {
        id: "pattern-recognition-bishop",
        title: "Pattern Recognition and Machine Learning",
        author: "Christopher Bishop",
        year: "2006",
        description:
          "Bayesian approach to machine learning and pattern recognition.",
        topics: [
          "Probabilistic Models",
          "Graphical Models",
          "EM Algorithm",
          "Sampling Methods",
        ],
      },
      {
        id: "hands-on-ml",
        title:
          "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow",
        author: "Aurélien Géron",
        year: "2019",
        edition: "2nd Edition",
        description:
          "Practical guide to building ML systems with popular frameworks.",
        topics: [
          "Supervised Learning",
          "Deep Learning",
          "Ensemble Methods",
          "Deployment",
        ],
      },
      {
        id: "reinforcement-learning-sutton",
        title: "Reinforcement Learning: An Introduction",
        author: "Richard S. Sutton and Andrew G. Barto",
        year: "2018",
        edition: "2nd Edition",
        description: "The standard text on reinforcement learning.",
        topics: ["MDPs", "Q-Learning", "Policy Gradients", "Actor-Critic"],
      },
    ],
    topics: [
      {
        id: "transformers-attention",
        title: "Transformers and Attention Mechanisms",
        description:
          "Self-attention, multi-head attention, BERT, GPT architectures",
      },
      {
        id: "gradient-descent-optimization",
        title: "Optimization Algorithms",
        description: "SGD, Adam, RMSprop, learning rate schedules",
      },
      {
        id: "cnn-architectures",
        title: "CNN Architectures",
        description:
          "ResNet, VGG, Inception, EfficientNet, Vision Transformers",
      },
      {
        id: "generative-models",
        title: "Generative Models",
        description: "GANs, VAEs, Diffusion Models, Normalizing Flows",
      },
      {
        id: "mlops-deployment",
        title: "MLOps and Model Deployment",
        description:
          "Model serving, monitoring, A/B testing, continuous training",
      },
    ],
  },
  philosophy: {
    name: "Philosophy",
    description:
      "Classic and contemporary philosophical works: ethics, metaphysics, epistemology, and logic",
    color: "violet",
    books: [
      {
        id: "meditations-aurelius",
        title: "Meditations",
        author: "Marcus Aurelius",
        year: "180 AD",
        description:
          "Personal writings of the Roman Emperor on Stoic philosophy and self-improvement.",
        topics: ["Stoicism", "Ethics", "Self-Discipline", "Rationality"],
      },
      {
        id: "republic-plato",
        title: "The Republic",
        author: "Plato",
        year: "380 BC",
        description:
          "Socratic dialogue on justice, the ideal state, and the nature of reality.",
        topics: [
          "Political Philosophy",
          "Theory of Forms",
          "Justice",
          "Education",
        ],
      },
      {
        id: "critique-pure-reason",
        title: "Critique of Pure Reason",
        author: "Immanuel Kant",
        year: "1781",
        description:
          "Foundational work in epistemology examining the limits of human knowledge.",
        topics: [
          "Epistemology",
          "Metaphysics",
          "A Priori Knowledge",
          "Transcendental Idealism",
        ],
      },
      {
        id: "being-and-time",
        title: "Being and Time",
        author: "Martin Heidegger",
        year: "1927",
        description:
          "Phenomenological analysis of human existence and the question of Being.",
        topics: ["Phenomenology", "Existentialism", "Dasein", "Ontology"],
      },
    ],
    topics: [
      {
        id: "epistemology",
        title: "Epistemology",
        description:
          "Theory of knowledge: what can we know and how do we know it?",
      },
      {
        id: "ethics-moral-philosophy",
        title: "Ethics and Moral Philosophy",
        description: "Utilitarianism, deontology, virtue ethics, moral realism",
      },
      {
        id: "metaphysics-ontology",
        title: "Metaphysics and Ontology",
        description: "Nature of reality, existence, causation, free will",
      },
      {
        id: "logic-argumentation",
        title: "Logic and Argumentation",
        description: "Formal logic, informal fallacies, valid reasoning",
      },
      {
        id: "existentialism-phenomenology",
        title: "Existentialism and Phenomenology",
        description: "Meaning, authenticity, consciousness, lived experience",
      },
    ],
  },
  psychology: {
    name: "Psychology",
    description: "Human behavior, cognition, development, and mental processes",
    color: "pink",
    books: [
      {
        id: "thinking-fast-slow",
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        year: "2011",
        description:
          "Nobel Prize winner's exploration of two systems of thinking and cognitive biases.",
        topics: [
          "Cognitive Biases",
          "Heuristics",
          "Behavioral Economics",
          "Decision Making",
        ],
      },
      {
        id: "influence-cialdini",
        title: "Influence: The Psychology of Persuasion",
        author: "Robert Cialdini",
        year: "1984",
        edition: "7th Edition",
        description:
          "Six principles of persuasion and how they shape our decisions.",
        topics: [
          "Persuasion",
          "Social Proof",
          "Authority",
          "Reciprocity",
          "Commitment",
        ],
      },
      {
        id: "mans-search-meaning",
        title: "Man's Search for Meaning",
        author: "Viktor Frankl",
        year: "1946",
        description:
          "Holocaust survivor's account and the therapy of finding meaning in life.",
        topics: [
          "Logotherapy",
          "Existential Psychology",
          "Resilience",
          "Purpose",
        ],
      },
      {
        id: "interpretation-dreams",
        title: "The Interpretation of Dreams",
        author: "Sigmund Freud",
        year: "1899",
        description:
          "Foundational text of psychoanalysis exploring the unconscious mind.",
        topics: [
          "Psychoanalysis",
          "Unconscious Mind",
          "Dream Analysis",
          "Id/Ego/Superego",
        ],
      },
    ],
    topics: [
      {
        id: "cognitive-biases",
        title: "Cognitive Biases",
        description:
          "Confirmation bias, anchoring, availability heuristic, dunning-kruger",
      },
      {
        id: "behavioral-economics",
        title: "Behavioral Economics",
        description:
          "Prospect theory, loss aversion, mental accounting, nudges",
      },
      {
        id: "developmental-psychology",
        title: "Developmental Psychology",
        description: "Piaget, Erikson, attachment theory, moral development",
      },
      {
        id: "clinical-psychology",
        title: "Clinical Psychology",
        description:
          "Cognitive behavioral therapy, psychotherapy approaches, mental disorders",
      },
      {
        id: "social-psychology",
        title: "Social Psychology",
        description:
          "Attribution theory, group dynamics, conformity, obedience",
      },
    ],
  },
  poetry: {
    name: "Poetry",
    description:
      "Classic and contemporary poetry: epic, lyric, narrative, and experimental forms",
    color: "rose",
    books: [
      {
        id: "odyssey-homer",
        title: "The Odyssey",
        author: "Homer",
        year: "8th Century BC",
        description:
          "Epic poem recounting Odysseus's ten-year journey home after the Trojan War.",
        topics: [
          "Epic Poetry",
          "Greek Mythology",
          "Heroic Journey",
          "Oral Tradition",
        ],
      },
      {
        id: "paradise-lost",
        title: "Paradise Lost",
        author: "John Milton",
        year: "1667",
        description:
          "Epic poem depicting the fall of man and Satan's rebellion against God.",
        topics: ["Epic Poetry", "Blank Verse", "Biblical Themes", "Theodicy"],
      },
      {
        id: "leaves-of-grass",
        title: "Leaves of Grass",
        author: "Walt Whitman",
        year: "1855",
        edition: "Deathbed Edition (1891-92)",
        description:
          "Revolutionary collection celebrating democracy, nature, and the self.",
        topics: [
          "Free Verse",
          "American Poetry",
          "Transcendentalism",
          "Democratic Spirit",
        ],
      },
      {
        id: "waste-land",
        title: "The Waste Land",
        author: "T.S. Eliot",
        year: "1922",
        description:
          "Modernist masterpiece depicting post-WWI disillusionment and cultural fragmentation.",
        topics: ["Modernism", "Literary Allusion", "Fragmentation", "Myth"],
      },
    ],
    topics: [
      {
        id: "meter-prosody",
        title: "Meter and Prosody",
        description: "Iambic pentameter, dactylic hexameter, rhythm, scansion",
      },
      {
        id: "poetic-forms",
        title: "Poetic Forms",
        description: "Sonnet, haiku, ghazal, villanelle, sestina, free verse",
      },
      {
        id: "literary-devices",
        title: "Literary Devices",
        description:
          "Metaphor, simile, imagery, enjambment, caesura, alliteration",
      },
      {
        id: "poetry-movements",
        title: "Major Poetry Movements",
        description:
          "Romanticism, Modernism, Confessionalism, Beat poetry, Language poetry",
      },
      {
        id: "contemporary-poetry",
        title: "Contemporary Poetry",
        description:
          "Spoken word, slam poetry, digital poetry, experimental forms",
      },
    ],
  },
  physics: {
    name: "Physics",
    description:
      "Classical mechanics, quantum physics, relativity, and modern physics",
    color: "cyan",
    books: [
      {
        id: "feynman-lectures",
        title: "The Feynman Lectures on Physics",
        author: "Richard Feynman, Robert Leighton, Matthew Sands",
        year: "1964",
        description:
          "Legendary series covering the entirety of undergraduate physics with clarity and insight.",
        topics: [
          "Mechanics",
          "Electromagnetism",
          "Quantum Mechanics",
          "Statistical Mechanics",
        ],
      },
      {
        id: "griffiths-quantum",
        title: "Introduction to Quantum Mechanics",
        author: "David J. Griffiths",
        year: "2017",
        edition: "3rd Edition",
        description:
          "The standard undergraduate text for quantum mechanics with clear explanations.",
        topics: [
          "Wave Functions",
          "Schrödinger Equation",
          "Quantum Harmonic Oscillator",
          "Angular Momentum",
        ],
      },
      {
        id: "spacetime-physics",
        title: "Spacetime Physics",
        author: "Edwin F. Taylor and John Archibald Wheeler",
        year: "1992",
        edition: "2nd Edition",
        description:
          "Introduction to special relativity emphasizing geometric approach to spacetime.",
        topics: [
          "Special Relativity",
          "Lorentz Transformations",
          "Spacetime Diagrams",
          "Energy-Momentum",
        ],
      },
      {
        id: "goldstein-mechanics",
        title: "Classical Mechanics",
        author: "Herbert Goldstein",
        year: "2001",
        edition: "3rd Edition",
        description:
          "Graduate-level classical mechanics covering advanced topics and mathematical methods.",
        topics: [
          "Lagrangian Mechanics",
          "Hamiltonian Mechanics",
          "Central Forces",
          "Rigid Body Dynamics",
        ],
      },
    ],
    topics: [
      {
        id: "classical-mechanics",
        title: "Classical Mechanics",
        description:
          "Newton's laws, Lagrangian/Hamiltonian formulations, conservation laws",
      },
      {
        id: "electromagnetism",
        title: "Electromagnetism",
        description: "Maxwell's equations, electromagnetic waves, gauge theory",
      },
      {
        id: "quantum-mechanics",
        title: "Quantum Mechanics",
        description:
          "Wave-particle duality, uncertainty principle, Schrödinger equation, quantum states",
      },
      {
        id: "relativity",
        title: "Relativity",
        description:
          "Special relativity, general relativity, spacetime curvature, black holes",
      },
      {
        id: "statistical-mechanics",
        title: "Statistical Mechanics",
        description:
          "Thermodynamics, partition functions, phase transitions, entropy",
      },
    ],
  },
  "programming-languages": {
    name: "Programming Languages",
    description:
      "Comprehensive programming language documentation covering syntax, concepts, and best practices",
    color: "cyan",
    topics: [
      {
        id: "cpp-syntax",
        title: "Syntax",
        description:
          "Variables, control structures, functions, pointers, and references",
      },
      {
        id: "cpp-oop",
        title: "OOP",
        description:
          "Classes, inheritance, polymorphism, encapsulation, and abstraction",
      },
      {
        id: "cpp-comparison",
        title: "Comparison",
        description: "Compare C++ with other languages and versions",
      },
      {
        id: "cpp-multithreading",
        title: "Multithreading",
        description: "Concurrency, threads, mutexes, and async operations",
      },
      {
        id: "cpp-stl",
        title: "STL",
        description: "Standard Template Library: Containers, Algorithms, and Iterators",
      },
    ],
  },

  java: {
    name: "Java Language",
    description: "Write once, run anywhere. Master the Java language and ecosystem.",
    color: "orange",
    topics: [
      {
        id: "java-syntax",
        title: "Syntax & Basics",
        description: "Variables, types, control structures, and basic syntax",
      },
      {
        id: "java-oop",
        title: "Object-Oriented Programming",
        description: "Classes, interfaces, inheritance, and polymorphism",
      },
      {
        id: "java-collections",
        title: "Collections Framework",
        description: "Lists, Sets, Maps, and Queue implementations",
      },
      {
        id: "java-multithreading",
        title: "Multithreading",
        description: "Concurrency, threads, and synchronization",
      },
    ],

  },
  python: {
    name: "Python Language",
    description: "Simple, versatile, and powerful. The language of AI and Data Science.",
    color: "yellow",
    topics: [
      {
        id: "python-syntax",
        title: "Syntax & Basics",
        description: "Variables, indentation, control flow, functions",
      },
      {
        id: "python-datastructures",
        title: "Data Structures",
        description: "Lists, dictionaries, sets, and tuples",
      },
      {
        id: "python-oop",
        title: "Object-Oriented Programming",
        description: "Classes, inheritance, and magic methods",
      },
      {
        id: "python-advanced",
        title: "Advanced Features",
        description: "List comprehensions, decorators, lambdas",
      },
    ],
  },
  go: {
    name: "Go Language",
    description: "Build simple, reliable, and efficient software.",
    color: "cyan",
    topics: [
      {
        id: "go-syntax",
        title: "Syntax & Basics",
        description: "Variables, imports, control flow, functions",
      },
      {
        id: "go-structs",
        title: "Structs & Interfaces",
        description: "Type system, structs, and implicit interfaces",
      },
      {
        id: "go-concurrency",
        title: "Concurrency",
        description: "Goroutines, channels, and select",
      },
      {
        id: "go-errorhandling",
        title: "Error Handling",
        description: "Defer, panic, recover, and error patterns",
      },
    ],
  },
  javascript: {
    name: "JavaScript Language",
    description: "The language of the web. Dynamic, flexible, and everywhere.",
    color: "yellow",
    topics: [
      {
        id: "javascript-syntax",
        title: "Syntax & Basics",
        description: "Variables, control flow, template literals",
      },
      {
        id: "javascript-functions",
        title: "Functions",
        description: "Arrow functions, callbacks, closures",
      },
      {
        id: "javascript-async",
        title: "Async JavaScript",
        description: "Promises, async/await, event loop",
      },
      {
        id: "javascript-dom",
        title: "DOM Manipulation",
        description: "Selecting, modifying, and handling events",
      },
    ],
  },
};
