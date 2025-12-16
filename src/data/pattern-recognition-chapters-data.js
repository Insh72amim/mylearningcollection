export const patternRecognitionChapters = [
  {
    id: 1,
    title: "Introduction",
    summary:
      "Core concepts of pattern recognition, including curve fitting, probability theory, and decision theory.",
    sections: [
      {
        title: "Polynomial Curve Fitting",
        content:
          "A simple regression problem to illustrate key concepts. We try to fit a polynomial function to data generated from a sine wave with noise.",
        points: [
          "Minimizing sum-of-squares error.",
          "Overfitting occurs with high-order polynomials.",
          "Regularization discourages large weights.",
        ],
        chart: {
            type: "line",
            title: "Polynomial Fitting & Overfitting",
            xKey: "x",
            data: [
              { x: 0.1, true: 0.3, underfit: 0.5, overfit: 0.3 },
              { x: 0.3, true: 0.8, underfit: 0.6, overfit: 0.82 },
              { x: 0.5, true: 0.5, underfit: 0.7, overfit: 0.48 },
              { x: 0.7, true: -0.3, underfit: 0.8, overfit: -0.35 },
              { x: 0.9, true: -0.8, underfit: 0.9, overfit: -0.75 },
            ],
            lines: [
              { key: "true", color: "#82ca9d", name: "True Function" },
              { key: "underfit", color: "#ff7300", name: "Underfit (Linear)" },
              { key: "overfit", color: "#8884d8", name: "Good Fit (M=3)" },
            ],
        },
      },
      {
        title: "Probability Theory",
        content:
          "Pattern recognition is fundamentally about uncertainty. We use probability theory to express and manipulate uncertainty.",
        definitions: [
          {
            term: "Sum Rule",
            def: "P(X) = sum_Y P(X, Y)",
          },
          {
            term: "Product Rule",
            def: "P(X, Y) = P(Y|X)P(X)",
          },
          {
            term: "Bayes' Theorem",
            def: "P(Y|X) = (P(X|Y)P(Y)) / P(X)",
          },
        ],
        match: "P(\\mathbf{w}|\\mathcal{D}) = \\frac{P(\\mathcal{D}|\\mathbf{w})P(\\mathbf{w})}{P(\\mathcal{D})}",
      },
      {
        title: "Decision Theory",
        content:
          "Once we have probabilities (inference), we need to make optimal decisions (decision stage). For classification, we want to minimize the probability of misclassification.",
        points: [
          "Minimizing misclassification rate.",
          "Minimizing expected loss (risk).",
          "Reject option for ambiguous cases.",
        ],
        match: "\\text{expected loss} = \\sum_k \\sum_j \\int_{\\mathcal{R}_j} L_{kj} p(\\mathbf{x}, C_k) d\\mathbf{x}",
      },
    ],
    deepDive: {
        title: "Bayesian vs. Frequentist",
        content: "Frequentists view probability as the frequency of repeatable random events (fixed parameters, random data). Bayesians view probability as a degree of belief (random parameters, fixed data). Bishop's book heavily emphasizes the Bayesian viewpoint, where we treat model parameters as random variables with prior distributions.",
    },
    keyPoints: [
      "Generalization is the central goal of pattern recognition.",
      "Probability theory provides the framework for uncertainty.",
      "Decision theory tells us how to act on our predictions.",
    ],
  },
  {
    id: 2,
    title: "Probability Distributions",
    summary:
      "Detailed study of specific probability distributions used as building blocks for complex models.",
    sections: [
      {
        title: "Binary Variables",
        content:
          "The Bernoulli distribution models a single binary random variable. The Beta distribution is the conjugate prior for the Bernoulli parameters.",
        match: "\\text{Bern}(x|\\mu) = \\mu^x (1-\\mu)^{1-x}",
      },
      {
        title: "The Gaussian Distribution",
        content:
          "The most important continuous distribution. Governed by the Central Limit Theorem. We study its geometry, moments, and limitations.",
        match: "\\mathcal{N}(\\mathbf{x}|\\boldsymbol{\\mu}, \\boldsymbol{\\Sigma}) = \\frac{1}{(2\\pi)^{D/2} |\\boldsymbol{\\Sigma}|^{1/2}} \\exp\\left\\{-\\frac{1}{2} (\\mathbf{x} - \\boldsymbol{\\mu})^T \\boldsymbol{\\Sigma}^{-1} (\\mathbf{x} - \\boldsymbol{\\mu})\\right\\}",
        points: [
            "Unimodal bell shape.",
            "Maximum Likelihood estimation underestimates variance (bias).",
            "Conjugate prior for mean is Gaussian; for precision is Gamma/Wishart.",
        ]
      },
      {
        title: "The Exponential Family",
        content:
          "A broad class of distributions that includes Gaussian, Bernoulli, Poisson, Gamma, etc. They share important mathematical properties that simplify inference.",
        definitions: [
            {
                term: "Sufficient Statistics",
                def: "A function of the data that contains all the information needed to estimate the parameters."
            },
            {
                term: "Conjugate Prior",
                def: "A prior that leads to a posterior in the same functional family."
            }
        ],
         match: "p(\\mathbf{x}|\\boldsymbol{\\eta}) = h(\\mathbf{x}) g(\\boldsymbol{\\eta}) \\exp\\{\\boldsymbol{\\eta}^T \\mathbf{u}(\\mathbf{x})\\}",
      },
    ],
      keyPoints: [
      "Conjugate priors greatly simplify Bayesian inference.",
      "The Gaussian distribution is ubiquitous but has limitations (e.g., sensitivity to outliers).",
      "Exponential family distributions allow for a unified treatment of learning algorithms.",
    ],
  },
  {
    id: 3,
    title: "Linear Models for Regression",
    summary:
      "Predicting continuous target variables using linear combinations of basis functions.",
    sections: [
      {
        title: "Linear Basis Function Models",
        content:
          "We extend simple linear regression by using non-linear basis functions phi(x). The model is still linear in the parameters w.",
        match: "y(\\mathbf{x}, \\mathbf{w}) = \\sum_{j=0}^{M-1} w_j \\phi_j(\\mathbf{x}) = \\mathbf{w}^T \\boldsymbol{\\phi}(\\mathbf{x})",
        points: [
            "Polynomial basis functions.",
            "Gaussian basis functions.",
            "Sigmoidal basis functions.",
        ]
      },
      {
        title: "The Bias-Variance Decomposition",
        content:
            "A theoretical tool to analyze specific properties of a model. Expected squared error can be decomposed into bias (flexibility), variance (sensitivity to data), and noise.",
        points: [
            "High bias = Underfitting.",
            "High variance = Overfitting.",
            "Regularization controls the trade-off.",
        ]
      },
      {
        title: "Bayesian Linear Regression",
        content:
            "Instead of a point estimate for w, we compute the posterior distribution p(w|t). This allows us to quantify uncertainty in our predictions.",
        match: "p(\\mathbf{w}|\\mathbf{t}) = \\mathcal{N}(\\mathbf{w}|\\mathbf{m}_N, \\mathbf{S}_N)",
      }
    ],
      deepDive: {
        title: "Predictive Distribution",
        content: "In the Bayesian approach, we don't just predict with the 'best' weight vector. We integrate over ALL possible weight vectors, weighted by their posterior probability. This gives us a full probability distribution for the target value 't' given a new input 'x', naturally incorporating model uncertainty.",
    },
     keyPoints: [
      "Basis functions allow linear models to capture non-linear relationships.",
      "Least squares usually leads to overfitting unless regularized.",
      "Bayesian regression avoids overfitting automatically (to some extent) and provides error bars.",
    ],
  },
  {
    id: 4,
    title: "Linear Models for Classification",
    summary:
      "Assigning inputs to discrete classes. Covers discriminant functions, generative models, and discriminative models.",
    sections: [
        {
            title: "Discriminant Functions",
            content: "Functions that take an input vector x and assign it to a class. For two classes, y(x) = w^T x + w_0.",
            definitions: [
               {
                 term: "Decision Boundary",
                 def: "The surface where y(x) = 0, separating the classes."
               }
            ]
        },
        {
            title: "Probabilistic Generative Models",
            content: "We model the class-conditional densities p(x|C_k) and priors p(C_k), then use Bayes' theorem to find p(C_k|x).",
            points: [
                "For Gaussian class-conditionals with shared covariance, standard sigmoid (logistic) posterior arises.",
                "Equivalent to Linear Discriminant Analysis (LDA).",
            ]
        },
        {
            title: "Probabilistic Discriminative Models",
            content: "We model the posterior p(C_k|x) directly, typically using the logistic sigmoid function (for 2 classes) or softmax (for K classes).",
            match: "p(C_1|\\mathbf{x}) = \\sigma(\\mathbf{w}^T \\mathbf{x}) = \\frac{1}{1 + \\exp(-\\mathbf{w}^T \\mathbf{x})}",
            points: [
                "Logistic Regression.",
                "Iterative Reweighted Least Squares (IRLS) for training.",
            ]
        }
    ],
    keyPoints: [
        "Classification is dividing input space into decision regions.",
        "Generative models model the joint density p(x, C); Discriminative models model conditional p(C|x).",
        "Logistic regression is a linear classifier despite the non-linear sigmoid activation.",
    ]
  },
  {
    id: 5,
    title: "Neural Networks",
    summary:
      "Feed-forward neural networks, error backpropagation, and regularization techniques.",
    sections: [
      {
        title: "Feed-forward Network Functions",
        content:
          "A two-layer neural network is a linear combination of nonlinear basis functions (hidden units) where the basis functions are adaptive.",
        match:
          "y_k(\\mathbf{x}, \\mathbf{w}) = \\sigma\\left(\\sum_{j=1}^M w_{kj}^{(2)} h\\left(\\sum_{i=1}^D w_{ji}^{(1)} x_i + w_{j0}^{(1)}\\right) + w_{k0}^{(2)}\\right)",
        points: [
          "Universal approximation theorem.",
          "Hidden units act as feature detectors.",
        ],
      },
      {
        title: "Error Backpropagation",
        content:
          "An efficient method for evaluating the gradient of an error function minimizing a sum-of-squares error. It applies the chain rule of calculus recursively.",
        match: "\\delta_j = h'(a_j) \\sum_k w_{kj} \\delta_k",
        points: [
          "Forward pass to compute activations.",
          "Backward pass to compute errors (deltas).",
        ],
      },
      {
        title: "Regularization in Neural Networks",
        content:
          "Techniques to prevent overfitting in over-parameterized models, essential for training deep networks.",
        points: [
          "Weight decay (L2 regularization).",
          "Early stopping.",
          "Tangent propagation.",
        ],
      },
    ],
    keyPoints: [
      "Neural networks entail automatic feature extraction.",
      "Backpropagation is simply the chain rule of calculus applied efficiently.",
      "Non-convex error surfaces imply local minima.",
    ],
  },
  {
    id: 6,
    title: "Kernel Methods",
    summary:
      "Substituting inner products with kernel functions to work in high-dimensional feature spaces implicitly.",
    sections: [
      {
        title: "Dual Representations",
        content:
          "Many linear models can be reformulated so that the weight vector is a linear combination of the training data vectors.",
        match:
          "J(\\mathbf{a}) = \\frac{1}{2} \\mathbf{a}^T \\mathbf{K} \\mathbf{K} \\mathbf{a} - \\mathbf{a}^T \\mathbf{K} \\mathbf{t} + \\frac{\\lambda}{2} \\mathbf{a}^T \\mathbf{K} \\mathbf{a}",
      },
      {
        title: "Constructing Kernels",
        content:
          "A valid kernel must be a positive semi-definite function. Examples include polynomial, Gaussian, and sigmoid kernels.",
        match:
          "k(\\mathbf{x}, \\mathbf{x}') = \\exp\\left(-\\frac{||\\mathbf{x} - \\mathbf{x}'||^2}{2\\sigma^2}\\right)",
        points: ["Mercer's Theorem.", "Kernels measure similarity."],
      },
      {
        title: "Radial Basis Function Networks",
        content:
          "Linear models where the basis functions depend on the distance to a center.",
        points: [
            "Exact interpolation.",
            "Nadaraya-Watson regression.",
        ],
      },
    ],
    keyPoints: [
      "Kernel trick allows operating in infinite-dimensional spaces.",
      "Computational cost depends on the number of data points, not input dimension.",
    ],
  },
  {
    id: 7,
    title: "Sparse Kernel Machines",
    summary:
      "Kernel methods that result in sparse solutions, meaning they depend on only a subset of the training data (support vectors).",
    sections: [
      {
        title: "Maximum Margin Classifiers",
        content:
          "The SVM finds the separating hyperplane that maximizes the margin to the nearest data points.",
        match:
          "\\arg\\max_{\\mathbf{w}, b} \\frac{1}{||\\mathbf{w}||} \\min_n [t_n(\\mathbf{w}^T \\mathbf{\\phi}(\\mathbf{x}_n) + b)]",
      },
      {
        title: "Support Vector Machines (SVM)",
        content:
          "Using Lagrange multipliers, the optimization becomes a quadratic programming problem.",
        points: [
          "Support vectors lie on the margin boundary.",
          "Robust to outliers due to margin maximization.",
        ],
      },
      {
        title: "Relevance Vector Machines (RVM)",
        content:
          "A Bayesian sparse kernel technique that provides probabilistic outputs, unlike standard SVMs.",
        points: [
          "Sparsity often greater than SVM.",
          "Probabilistic predictions.",
        ],
      },
    ],
    keyPoints: [
      "SVMs rely on convex optimization (global optimum).",
      "Sparsity leads to efficient prediction times.",
    ],
  },
  {
    id: 8,
    title: "Graphical Models",
    summary:
      "Probabilistic models for which a graph denotes the conditional dependence structure between random variables.",
    sections: [
      {
        title: "Bayesian Networks",
        content:
          "Directed Acyclic Graphs (DAGs) representing causal relationships.",
        match: "p(\\mathbf{x}) = \\prod_{k=1}^K p(x_k | \\text{pa}_k)",
      },
      {
        title: "Markov Random Fields",
        content:
          "Undirected graphs representing soft constraints between variables.",
        match: "p(\\mathbf{x}) = \\frac{1}{Z} \\prod_C \\psi_C(\\mathbf{x}_C)",
      },
      {
        title: "Inference",
        content:
          "Computing posterior probabilities of latent variables given observed variables. Exact inference is NP-hard in general.",
        points: [
          "Sum-Product Algorithm (Belief Propagation) for trees.",
          "Junction Tree algorithm for general graphs.",
        ],
      },
    ],
    keyPoints: [
      "Visualizing complex dependencies.",
      "Separation properties in the graph imply conditional independence.",
    ],
  },
  {
    id: 9,
    title: "Mixture Models and EM",
    summary:
      "Modeling complex distributions as a combination of simpler distributions, trained via Expectation-Maximization.",
    sections: [
      {
        title: "K-Means Clustering",
        content:
          "Iteratively assigning points to nearest centroids and updating centroids.",
        match:
          "J = \\sum_{n=1}^N \\sum_{k=1}^K r_{nk} ||\\mathbf{x}_n - \\boldsymbol{\\mu}_k||^2",
      },
      {
        title: "Mixtures of Gaussians",
        content:
          "A linear superposition of Gaussians can approximate almost any continuous density.",
        match:
          "p(\\mathbf{x}) = \\sum_{k=1}^K \\pi_k \\mathcal{N}(\\mathbf{x} | \\boldsymbol{\\mu}_k, \\boldsymbol{\\Sigma}_k)",
      },
      {
        title: "The EM Algorithm",
        content:
          "A general iterative technique for maximum likelihood estimation in models with latent variables.",
        points: [
          "E-step: Evaluate responsibilities.",
          "M-step: Re-estimate parameters.",
          "Guaranteed to not decrease likelihood.",
        ],
      },
    ],
    keyPoints: [
      "Latent variables explain observed data clusters.",
      "EM is a powerful optimization strategy for missing data problems.",
    ],
  },
];
