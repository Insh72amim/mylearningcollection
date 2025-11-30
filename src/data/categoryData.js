// Category data for Finance, Mathematics, and Machine Learning
export const categoryData = {
  'finance': {
    name: 'Finance',
    description: 'Quantitative finance, derivatives pricing, risk management, and financial engineering',
    color: 'green',
    books: [
      {
        id: 'options-futures-derivatives',
        title: 'Options, Futures, and Other Derivatives',
        author: 'John C. Hull',
        year: '2017',
        edition: '10th Edition',
        component: 'HullBook',
        description: 'The definitive guide to derivatives markets. Covers options, futures, swaps, and risk management.',
        topics: ['Black-Scholes Model', 'Greeks', 'Hedging Strategies', 'Interest Rate Derivatives']
      },
      {
        id: 'stochastic-calculus-finance',
        title: 'Stochastic Calculus for Finance',
        author: 'Steven Shreve',
        year: '2004',
        description: 'Mathematical foundations of financial engineering using stochastic calculus.',
        topics: ['Brownian Motion', 'Ito Calculus', 'Martingales', 'Black-Scholes Theory']
      },
      {
        id: 'quantitative-risk-management',
        title: 'Quantitative Risk Management',
        author: 'McNeil, Frey, and Embrechts',
        year: '2015',
        description: 'Comprehensive treatment of modern risk management techniques.',
        topics: ['VaR', 'Expected Shortfall', 'Copulas', 'Extreme Value Theory']
      }
    ],
    topics: [
      {
        id: 'black-scholes',
        title: 'Black-Scholes Model',
        description: 'Option pricing using stochastic differential equations'
      },
      {
        id: 'monte-carlo-methods',
        title: 'Monte Carlo Methods in Finance',
        description: 'Simulating asset prices and derivative valuation'
      },
      {
        id: 'portfolio-optimization',
        title: 'Portfolio Optimization',
        description: 'Mean-variance optimization, efficient frontier, Sharpe ratio'
      },
      {
        id: 'risk-measures',
        title: 'Risk Measures',
        description: 'Value at Risk (VaR), CVaR, Expected Shortfall'
      }
    ]
  },
  'mathematics': {
    name: 'Mathematics',
    description: 'Advanced mathematical concepts: complex analysis, linear algebra, real analysis, and topology',
    color: 'indigo',
    books: [
      {
        id: 'complex-analysis-spiegel',
        title: 'Complex Analysis',
        author: 'Murray R. Spiegel',
        year: '2009',
        edition: "Schaum's Outline",
        description: 'Comprehensive introduction to complex variables and their applications.',
        topics: ['Complex Numbers', 'Analytic Functions', 'Contour Integration', 'Residue Theorem']
      },
      {
        id: 'linear-algebra-lipschutz',
        title: 'Linear Algebra',
        author: 'Seymour Lipschutz',
        year: '2017',
        edition: "Schaum's Outline",
        description: 'Complete coverage of linear algebra with solved problems.',
        topics: ['Vector Spaces', 'Eigenvalues', 'Jordan Form', 'Inner Product Spaces']
      },
      {
        id: 'real-analysis-rudin',
        title: 'Principles of Mathematical Analysis',
        author: 'Walter Rudin',
        year: '1976',
        description: 'Classic text on real analysis, known as "Baby Rudin".',
        topics: ['Sequences', 'Continuity', 'Differentiation', 'Riemann Integration']
      },
      {
        id: 'topology-munkres',
        title: 'Topology',
        author: 'James Munkres',
        year: '2000',
        description: 'Standard introduction to general and algebraic topology.',
        topics: ['Topological Spaces', 'Connectedness', 'Compactness', 'Fundamental Group']
      }
    ],
    topics: [
      {
        id: 'fourier-analysis',
        title: 'Fourier Analysis',
        description: 'Fourier series, Fourier transforms, and applications'
      },
      {
        id: 'differential-equations',
        title: 'Differential Equations',
        description: 'ODEs, PDEs, Laplace transforms, boundary value problems'
      },
      {
        id: 'abstract-algebra',
        title: 'Abstract Algebra',
        description: 'Groups, rings, fields, Galois theory'
      },
      {
        id: 'measure-theory',
        title: 'Measure Theory',
        description: 'Lebesgue integration, probability spaces, ergodic theory'
      },
      {
        id: 'numerical-methods',
        title: 'Numerical Methods',
        description: 'Approximation algorithms, numerical integration, linear solvers'
      }
    ]
  },
  'machine-learning': {
    name: 'Machine Learning',
    description: 'Machine learning algorithms, deep learning, neural networks, and AI systems',
    color: 'fuchsia',
    books: [
      {
        id: 'deep-learning-goodfellow',
        title: 'Deep Learning',
        author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
        year: '2016',
        description: 'Comprehensive textbook on deep learning theory and practice.',
        topics: ['Neural Networks', 'CNNs', 'RNNs', 'Optimization', 'Regularization']
      },
      {
        id: 'pattern-recognition-bishop',
        title: 'Pattern Recognition and Machine Learning',
        author: 'Christopher Bishop',
        year: '2006',
        description: 'Bayesian approach to machine learning and pattern recognition.',
        topics: ['Probabilistic Models', 'Graphical Models', 'EM Algorithm', 'Sampling Methods']
      },
      {
        id: 'hands-on-ml',
        title: 'Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow',
        author: 'Aurélien Géron',
        year: '2019',
        edition: '2nd Edition',
        description: 'Practical guide to building ML systems with popular frameworks.',
        topics: ['Supervised Learning', 'Deep Learning', 'Ensemble Methods', 'Deployment']
      },
      {
        id: 'reinforcement-learning-sutton',
        title: 'Reinforcement Learning: An Introduction',
        author: 'Richard S. Sutton and Andrew G. Barto',
        year: '2018',
        edition: '2nd Edition',
        description: 'The standard text on reinforcement learning.',
        topics: ['MDPs', 'Q-Learning', 'Policy Gradients', 'Actor-Critic']
      }
    ],
    topics: [
      {
        id: 'transformers-attention',
        title: 'Transformers and Attention Mechanisms',
        description: 'Self-attention, multi-head attention, BERT, GPT architectures'
      },
      {
        id: 'gradient-descent-optimization',
        title: 'Optimization Algorithms',
        description: 'SGD, Adam, RMSprop, learning rate schedules'
      },
      {
        id: 'cnn-architectures',
        title: 'CNN Architectures',
        description: 'ResNet, VGG, Inception, EfficientNet, Vision Transformers'
      },
      {
        id: 'generative-models',
        title: 'Generative Models',
        description: 'GANs, VAEs, Diffusion Models, Normalizing Flows'
      },
      {
        id: 'mlops-deployment',
        title: 'MLOps and Model Deployment',
        description: 'Model serving, monitoring, A/B testing, continuous training'
      }
    ]
  }
};
