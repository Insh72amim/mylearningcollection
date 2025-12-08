export const deepLearningChapters = [
  {
    id: "chap-2",
    title: "Linear Algebra",
    summary:
      "Mathematical foundation for understanding deep learning, focusing on scalars, vectors, matrices, and tensors.",
    sections: [
      {
        title: "Scalars, Vectors, Matrices, and Tensors",
        content:
          "Deep learning relies heavily on linear algebra to manipulate data. valid **scalars** are single numbers, **vectors** are arrays of numbers, **matrices** are 2D arrays, and **tensors** are arrays with any number of dimensions.",
        definitions: [
          {
            term: "Scalar",
            def: "A single number, in contrast to most of the other objects studied in linear algebra.",
          },
          {
            term: "Vector",
            def: "An array of numbers. The numbers are arranged in order.",
          },
          {
            term: "Matrix",
            def: "A 2-D array of numbers, so each element is identified by two indices.",
          },
          {
            term: "Tensor",
            def: "An array of numbers arranged on a regular grid with a variable number of axes.",
          },
        ],
        equations: [
          {
            label: "Matrix Product",
            match: "C_{i,j} = \\sum_{k} A_{i,k} B_{k,j}",
          },
        ],
      },
      {
        title: "Multiplying Matrices and Vectors",
        content:
          "The matrix product of matrices A and B is a third matrix C. For this to be defined, A must have the same number of columns as B has rows.",
        match: "C = AB",
      },
      {
        title: "Identity and Inverse Matrices",
        content:
          "The identity matrix I_n does not change any vector when we multiply the vector by that matrix. The inverse of A, denoted A^-1, is the matrix such that A^-1 A = I_n.",
        match: "I_n x = x",
      },
      {
        title: "Eigendecomposition",
        content:
          "Decomposing a matrix into a set of eigenvectors and eigenvalues. An eigenvector of a square matrix A is a non-zero vector v such that multiplication by A alters only the scale of v.",
        match: "Av = \\lambda v",
        points: [
          "Every real symmetric matrix can be decomposed into an expression using only real-valued eigenvectors and eigenvalues.",
          "Useful for analyzing the properties of the matrix derived from data.",
        ],
      },
      {
        title: "Principal Component Analysis (PCA)",
        content:
          "Simple machine learning algorithm that can be derived using only knowledge of basic linear algebra.",
        points: [
          "Used to compress data.",
          "Finds lower dimensional representation that minimizes the reconstruction error.",
        ],
      },
    ],
    deepDive: {
      title: "Why Linear Algebra for DL?",
      content:
        "Linear algebra provides a concise way to represent and manipulate sets of linear equations. In Deep Learning, we represent data (inputs, weights, biases) as vectors and matrices. Operations like a neural network layer's forward pass essentially become matrix multiplications, which are highly parallelizable on GPUs.",
    },
    keyPoints: [
      "Broadcasting allows operations on tensors of different sizes.",
      "Matrix multiplication is the workhorse of Deep Learning.",
      "The L2 norm (Euclidean distance) is frequently used to measure error.",
      "Symmetric, positive definite matrices play a key role in optimization.",
    ],
  },
  {
    id: "chap-3",
    title: "Probability and Information Theory",
    summary:
      "Language for dealing with uncertainty in AI systems. Covers random variables, distributions, and information measures.",
    sections: [
      {
        title: "Random Variables",
        content:
          "A random variable x is a variable that can take on different values randomly. It is defined by a probability distribution.",
        definitions: [
          {
            term: "Probability Mass Function (PMF)",
            def: "Distribution for discrete random variables.",
          },
          {
            term: "Probability Density Function (PDF)",
            def: "Distribution for continuous random variables.",
          },
        ],
      },
      {
        title: "Marginal and Conditional Probability",
        content:
          "**Marginal Probability** is the probability distribution of a subset. **Conditional Probability** is the probability of some event, given that some other event has happened.",
        equations: [
          {
            label: "Conditional Probability",
            match: "P(y \\mid x) = \\frac{P(y, x)}{P(x)}",
          },
          {
            label: "Chain Rule",
            match: "P(a, b, c) = P(a)P(b \\mid a)P(c \\mid a, b)",
          },
        ],
      },
      {
        title: "Expectation, Variance, and Covariance",
        content:
          "Summary statistics for probability distributions. Expectation is the average, variance is the spread.",
        match: "\\mathbb{E}_{x \\sim P}[f(x)] = \\sum_x P(x)f(x)",
      },
      {
        title: "Common Probability Distributions",
        content:
          "Standard distributions used in ML include Bernoulli, Multinoulli, Gaussian (Normal), and Exponential.",
        definitions: [
          {
            term: "Gaussian Distribution",
            def: "Most common distribution over real numbers. Also known as the Normal distribution.",
          },
        ],
        match: "\\mathcal{N}(x; \\mu, \\sigma^2) = \\sqrt{\\frac{1}{2\\pi\\sigma^2}} \\exp\\left(-\\frac{1}{2\\sigma^2}(x-\\mu)^2\\right)",
      },
      {
        title: "Information Theory",
        content:
          "Quantifying how much 'information' is in a signal. The KL divergence is commonly used to measure the difference between two distributions.",
        equations: [
          {
            label: "Self-Information",
            match: "I(x) = -\\log P(x)",
          },
          {
            label: "Entropy",
            match: "H(x) = \\mathbb{E}_{x \\sim P}[I(x)] = -\\sum_x P(x) \\log P(x)",
          },
          {
            label: "KL Divergence",
            match: "D_{KL}(P || Q) = \\mathbb{E}_{x \\sim P} \\left[ \\log \\frac{P(x)}{Q(x)} \\right]",
          },
        ],
      },
    ],
    deepDive: {
      title: "The Cross-Entropy Loss",
      content:
        "In classification tasks, we often minimize the Cross-Entropy loss. This is mathematically equivalent to minimizing the KL divergence between the empirical distribution (the training labels) and the model's predicted distribution. It effectively forces the model's predictions to match the true labels.",
    },
    keyPoints: [
      "Probability deals with uncertainty and is essential for robust AI.",
      "Bayes' Rule allows us to update beliefs as we gather evidence.",
      "Entropy is a measure of disorder or uncertainty in a distribution.",
      "KL Divergence assesses how different two probability distributions are.",
    ],
  },
  {
    id: "chap-4",
    title: "Numerical Computation",
    summary:
      "Algorithms for solving mathematical problems by updating estimates. Crucial for training neural networks.",
    sections: [
      {
        title: "Overflow and Underflow",
        content:
          "Computer arithmetic is not perfectly precise. **Underflow** occurs when numbers near zero are rounded to zero. **Overflow** occurs when numbers become large and are approximated as infinity.",
        points: [
          "Softmax function is a common source of these issues.",
          "Numerical stabilization techniques are needed for robust implementation.",
        ],
      },
      {
        title: "Gradient-Based Optimization",
        content:
          "Most deep learning algorithms involve optimization minimizing an objective function J(theta). We use the derivative (gradient) to determine how to update the parameters.",
        definitions: [
          {
            term: "Gradient Descent",
            def: "Iterative optimization algorithm for finding a local minimum of a differentiable function.",
          },
          {
            term: "Learning Rate",
            def: "Step size determines how big of a step to take in the direction of the gradient.",
          },
        ],
        match: "x' = x - \\epsilon \\nabla_x f(x)",
      },
      {
        title: "Jacobian and Hessian Matrices",
        content:
          "For functions with multiple inputs and outputs, we use the Jacobian (first derivatives) and Hessian (second derivatives) matrices.",
        match: "H_{i,j} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}",
      },
    ],
    deepDive: {
      title: "Local Minima vs. Saddle Points",
      content:
        "In high-dimensional spaces (like deep neural nets), local minima are actually rare. The bigger problem is often saddle points, where the gradient is zero but it's a minimum in some directions and a maximum in others. Second-order methods (using the Hessian) can help identifying them, but are computationally expensive.",
    },
    keyPoints: [
      "Numerical stability is critical when implementing ML algorithms from scratch.",
      "Optimization is the engine of learning.",
      "Gradient descent is the primary tool for training neural networks.",
      "Regularization helps prevent overfitting during optimization.",
    ],
  },
  {
    id: "chap-5",
    title: "Machine Learning Basics",
    summary:
      "Core concepts of learning algorithms, capacity, overfitting, and hyperparameters.",
    sections: [
      {
        title: "Learning Algorithms",
        content:
          "An algorithm that is able to learn from data. A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P.",
        definitions: [
          {
            term: "Supervised Learning",
            def: "Learning to map inputs to targets given labeled examples.",
          },
          {
            term: "Unsupervised Learning",
            def: "Finding interesting structure in unlabeled data.",
          },
        ],
      },
      {
        title: "Capacity, Overfitting and Underfitting",
        content:
          "**Capacity** is the ability of a model to fit a wide variety of functions. **Underfitting** is high bias (model is too simple). **Overfitting** is high variance (model memorizes training data).",
        chart: {
          type: "line",
          title: "Generalization Error vs Capacity",
          xKey: "capacity",
          data: [
            { capacity: 1, trainingError: 0.8, testError: 0.8 },
            { capacity: 3, trainingError: 0.5, testError: 0.5 },
            { capacity: 5, trainingError: 0.3, testError: 0.25 }, // Optimal
            { capacity: 7, trainingError: 0.15, testError: 0.35 },
            { capacity: 9, trainingError: 0.05, testError: 0.6 },
          ],
          lines: [
            { key: "trainingError", color: "#8884d8", name: "Training Error" },
            { key: "testError", color: "#82ca9d", name: "Test (Generalization) Error" },
          ],
        },
      },
      {
        title: "Hyperparameters and Validation Sets",
        content:
          "Hyperparameters are settings not learned by the learning algorithm itself (e.g., polynomial degree, learning rate). We pick them using a validation set, separate from the training and test sets.",
      },
      {
        title: "Estimators, Bias and Variance",
        content:
          "Point estimation attempts to provide the single 'best' prediction. Properties like bias (expected deviation from true value) and variance (deviation from expected value) determine estimator quality.",
        match: "MSE = \\text{Bias}(\\hat{\\theta})^2 + \\text{Var}(\\hat{\\theta})",
      },
      {
        title: "Maximum Likelihood Estimation",
        content:
          "A principle for deriving specific functions that are good estimators. We choose parameters that maximize the probability of the observed data.",
        match: "\\theta_{ML} = \\arg\\max_{\\theta} P_{model}(\\mathbb{X}; \\theta)",
      },
    ],
    deepDive: {
      title: "The Bias-Variance Tradeoff",
      content:
        "The fundamental challenge in ML. Minimizing bias usually increases variance and vice-versa. We want a model with low enough bias to capture underlying patterns, but low enough variance to generalize to new data. Regularization is a technique used to trade increased bias for reduced variance.",
    },
    keyPoints: [
      "Machine learning approximates a function from examples.",
      "Generalization (performance on new data) is the ultimate goal.",
      "The No Free Lunch theorem states that no algorithm is best for all problems.",
      "Maximum Likelihood is the preferred method for conditional probability estimation.",
    ],
  },
];
