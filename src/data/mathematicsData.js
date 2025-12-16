const sections = {
  "mathematics-overview": {
    id: "mathematics-overview",
    title: "Mathematics",
    description: "Advanced mathematical concepts: complex analysis, linear algebra, real analysis, and topology",
    icon: "Sigma",
    color: "indigo",
    topics: [
      {
        id: "fourier-analysis",
        title: "Fourier Analysis",
        description: "Fourier series, Fourier transforms, and applications",
        content: `
# Fourier Analysis

Fourier analysis is the study of the way general functions may be represented or approximated by sums of simpler trigonometric functions. Fourier analysis grew from the study of Fourier series, and is named after Joseph Fourier, who showed that representing a function as a sum of trigonometric functions greatly simplifies the study of heat transfer.

### Fourier Series
A periodic function $f(x)$ with period $2L$ can be expanded in a Fourier series:

\`\`\`math
f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} \\left[ a_n \\cos\\left(\\frac{n\\pi x}{L}\\right) + b_n \\sin\\left(\\frac{n\\pi x}{L}\\right) \\right]
\`\`\`

Where the Fourier coefficients are given by:

\`\`\`math
a_n = \\frac{1}{L} \\int_{-L}^{L} f(x) \\cos\\left(\\frac{n\\pi x}{L}\\right) dx, \\quad n \\ge 0
\`\`\`

\`\`\`math
b_n = \\frac{1}{L} \\int_{-L}^{L} f(x) \\sin\\left(\\frac{n\\pi x}{L}\\right) dx, \\quad n \\ge 1
\`\`\`

### Fourier Transform
The Fourier transform is an extension of the Fourier series that applies to non-periodic functions. It transforms a function of time (a signal) into a function of frequency.

The Fourier transform $\\hat{f}(\\xi)$ of a function $f(x)$ is defined as:

\`\`\`math
\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x) e^{-2\\pi i x \\xi} dx
\`\`\`

And the inverse transform is:

\`\`\`math
f(x) = \\int_{-\\infty}^{\\infty} \\hat{f}(\\xi) e^{2\\pi i x \\xi} d\\xi
\`\`\`

### Applications
- **Signal Processing**: Filtering, noise reduction, compression (MP3, JPEG).
- **Quantum Mechanics**: Position and momentum wave functions are Fourier transforms of each other (Heisenberg Uncertainty Principle).
- **Solving PDEs**: Transforming differential equations into algebraic equations.
        `,
      },
      {
        id: "differential-equations",
        title: "Differential Equations",
        description: "ODEs, PDEs, Laplace transforms, boundary value problems",
        content: `
# Differential Equations

A differential equation is a mathematical equation that relates some function with its derivatives. In applications, the functions usually represent physical quantities, the derivatives represent their rates of change, and the differential equation defines a relationship between the two.

### Ordinary Differential Equations (ODEs)
An ODE contains functions of only one independent variable and their derivatives.
Example: First-order linear ODE:

\`\`\`math
\\frac{dy}{dx} + P(x)y = Q(x)
\`\`\`

Solution using Integrating Factor $I(x) = e^{\\int P(x) dx}$:

\`\`\`math
y(x) = \\frac{1}{I(x)} \\int Q(x)I(x) dx
\`\`\`

### Partial Differential Equations (PDEs)
A PDE contains unknown multivariable functions and their partial derivatives.

**1. Heat Equation (Parabolic):**
Describes the distribution of heat (variation in temperature) in a given region over time.
\`\`\`math
\\frac{\\partial u}{\\partial t} = \\alpha \\nabla^2 u
\`\`\`

**2. Wave Equation (Hyperbolic):**
Describes the propagation of various types of waves, such as sound or light waves.
\`\`\`math
\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\nabla^2 u
\`\`\`

**3. Laplace's Equation (Elliptic):**
Describes steady-state heat conduction, electrostatics, and fluid flow.
\`\`\`math
\\nabla^2 u = 0
\`\`\`

### Laplace Transform
A powerful technique for solving linear ODEs. It transforms a differential equation in the time domain into an algebraic equation in the $s$-domain (frequency domain).

\`\`\`math
\\mathcal{L}\\{f(t)\\} = F(s) = \\int_0^{\\infty} f(t) e^{-st} dt
\`\`\`
        `,
      },
      {
        id: "abstract-algebra",
        title: "Abstract Algebra",
        description: "Groups, rings, fields, Galois theory",
        content: `
# Abstract Algebra

Abstract algebra is the study of algebraic structures such as groups, rings, fields, modules, vector spaces, lattices, and algebras.

### Groups
A group $(G, \\cdot)$ is a set $G$ equipped with a binary operation $\\cdot$ satisfying:
1.  **Closure**: For all $a, b \\in G$, $a \\cdot b \\in G$.
2.  **Associativity**: $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$.
3.  **Identity**: There exists $e \\in G$ such that $e \\cdot a = a \\cdot e = a$.
4.  **Inverse**: For every $a \\in G$, there exists $a^{-1} \\in G$ such that $a \\cdot a^{-1} = a^{-1} \\cdot a = e$.

### Rings
A ring $(R, +, \\cdot)$ is a set equipped with two binary operations satisfying:
1.  $(R, +)$ is an abelian group.
2.  $(R, \\cdot)$ is a monoid (associative, has identity).
3.  Multiplication distributes over addition.

### Fields
A field is a ring where every non-zero element has a multiplicative inverse. Examples: $\\mathbb{Q}, \\mathbb{R}, \\mathbb{C}$.

### Fundamental Isomorphism Theorem
Let $\\phi: G \\to H$ be a group homomorphism. Then:
\`\`\`math
G / \\ker(\\phi) \\cong \\text{im}(\\phi)
\`\`\`
This relates the structure of the original group, the kernel of the homomorphism, and the image.
        `,
      },
      {
        id: "measure-theory",
        title: "Measure Theory",
        description: "Lebesgue integration, probability spaces, ergodic theory",
        content: `
# Measure Theory

Measure theory is the study of measures. It generalizes the intuitive notions of length, area, and volume. It is fundamental to modern probability theory and real analysis.

### Sigma-Algebra ($\\sigma$-algebra)
A collection $\\Sigma$ of subsets of a set $X$ is a $\\sigma$-algebra if:
1.  $X \\in \\Sigma$.
2.  Unless $A \\in \\Sigma$, then $A^c \\in \\Sigma$ (closed under complement).
3.  If $A_1, A_2, ... \\in \\Sigma$, then $\\bigcup_{i=1}^{\\infty} A_i \\in \\Sigma$ (closed under countable union).

### Measure
A measure $\\mu$ on $(X, \\Sigma)$ is a function $\\mu: \\Sigma \\to [0, \\infty]$ such that:
1.  $\\mu(\\emptyset) = 0$.
2.  **Countable Additivity**: For disjoint sets $A_1, A_2, ... \\in \\Sigma$:
    \`\`\`math
    \\mu\\left(\\bigcup_{i=1}^{\\infty} A_i\\right) = \\sum_{i=1}^{\\infty} \\mu(A_i)
    \`\`\`

### Lebesgue Integration
It extends the Riemann integral to a larger class of functions and domains.
For a non-negative simple function $s = \\sum_{i=1}^n a_i \\chi_{A_i}$:
\`\`\`math
\\int s d\\mu = \\sum_{i=1}^n a_i \\mu(A_i)
\`\`\`
For a general non-negative measurable function $f$:
\`\`\`math
\\int f d\\mu = \\sup \\left\\{ \\int s d\\mu : 0 \\le s \\le f, s \\text{ is simple} \\right\\}
\`\`\`
        `,
      },
      {
        id: "numerical-methods",
        title: "Numerical Methods",
        description: "Approximation algorithms, numerical integration, linear solvers",
        content: `
# Numerical Methods

Numerical analysis is the study of algorithms that use numerical approximation (as opposed to symbolic manipulations) for the problems of mathematical analysis.

### Root Finding: Newton's Method
An iterative method to find roots of a differentiable function $f(x)=0$:
\`\`\`math
x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}
\`\`\`
It has quadratic convergence near a simple root.

### Numerical Integration
**Trapezoidal Rule**:
Approximates the region under the graph of the function $f(x)$ as a trapezoid and calculating its area.
\`\`\`math
\\int_a^b f(x) dx \\approx (b-a) \\frac{f(a) + f(b)}{2}
\`\`\`

**Simpson's Rule**:
Uses a quadratic polynomial to approximate $f(x)$.
\`\`\`math
\\int_a^b f(x) dx \\approx \\frac{b-a}{6} \\left[ f(a) + 4f\\left(\\frac{a+b}{2}\\right) + f(b) \\right]
\`\`\`

### Solving Linear Systems
**Gaussian Elimination**: An algorithm for solving systems of linear equations. It transforms the system's augmented matrix into row-echelon form.
**LU Decomposition**: Factors a matrix as the product of a lower triangular matrix and an upper triangular matrix.
        `,
      },
    ],
  },
};

export const mathematicsData = {
  getSection: (sectionId) => sections[sectionId],
};
