export const complexAnalysisChapters = [
  {
    id: "chap-1",
    title: "Complex Numbers",
    summary:
      "Fundamental properties of complex numbers, including algebraic operations, geometric representation, and polar form.",
    sections: [
      {
        title: "The Complex Number System",
        content:
          "A complex number z is of the form x + iy, where x and y are real numbers and i is the imaginary unit satisfying i^2 = -1.",
        definitions: [
            {
                term: "Real Part",
                def: "Re(z) = x"
            },
            {
                term: "Imaginary Part",
                def: "Im(z) = y"
            },
             {
                term: "Complex Conjugate",
                def: "\\bar{z} = x - iy"
            }
        ],
        match: "z_1 z_2 = (x_1 x_2 - y_1 y_2) + i(x_1 y_2 + x_2 y_1)",
      },
      {
        title: "Polar Form and Euler's Formula",
        content:
          "Complex numbers can be represented in polar coordinates (r, θ). Euler's formula connects complex exponentials to trigonometric functions.",
        match: "z = r(\\cos \\theta + i \\sin \\theta) = re^{i\\theta}",
        points: [
            "De Moivre's Theorem for powers of complex numbers.",
            "Roots of unity form regular polygons in the complex plane.",
        ]
      },
       {
        title: "Stereographic Projection",
        content:
          "Mapping points on the complex plane to points on a sphere (Riemann Sphere). This includes the point at infinity.",
        points: [
          "The north pole corresponds to infinity.",
          "Circles on the sphere map to circles or lines in the plane.",
        ],
      },
    ],
    keyPoints: [
      "Complex numbers extend the real number system to solve x^2 + 1 = 0.",
      "Geometric interpretation is crucial for understanding complex analysis.",
      "The triangle inequality |z1 + z2| <= |z1| + |z2| is fundamental.",
    ],
  },
  {
    id: "chap-2",
    title: "Functions, Limits, and Continuity",
    summary:
      "Extending calculus concepts to functions of a complex variable.",
    sections: [
      {
        title: "Functions of a Complex Variable",
        content:
          "A function w = f(z) maps a set of complex numbers (domain) to another set (range). We often visualize this as a mapping between two planes (z-plane and w-plane).",
      },
      {
        title: "Limits and Continuity",
        content:
          "The limit of f(z) as z approaches z0 exists if the value is independent of the path taken. This is a much stronger condition than in 1D real calculus.",
        match: "\\lim_{z \\to z_0} f(z) = w_0",
      },
       {
        title: "The Derivative",
        content:
          "The derivative is defined similarly to the real case. However, for the limit to exist, the Cauchy-Riemann equations must be satisfied.",
        match: "f'(z) = \\lim_{\\Delta z \\to 0} \\frac{f(z + \\Delta z) - f(z)}{\\Delta z}",
      },
    ],
  },
  {
    id: "chap-3",
    title: "Complex Differentiation and Cauchy-Riemann",
    summary:
      "The heart of the subject. Holomorphic (analytic) functions and their rigid structural properties.",
    sections: [
      {
        title: "Analytic Functions",
        content:
          "A function is analytic (or holomorphic) in a region if it is differentiable at every point in that region.",
        points: [
            "Entire functions are analytic everywhere.",
            "Polynomials, exp(z), sin(z), cos(z) are entire.",
        ]
      },
      {
        title: "Cauchy-Riemann Equations",
        content:
          "Necessary (and under certain conditions sufficient) conditions for differentiability. They link the partial derivatives of the real and imaginary parts u(x,y) and v(x,y).",
        match: "\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}, \\quad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}",
      },
      {
        title: "Harmonic Functions",
        content:
          "Real and imaginary parts of an analytic function satisfy Laplace's equation. They are harmonic functions.",
        match: "\\nabla^2 u = \\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2} = 0",
      },
    ],
    deepDive: {
        title: "Conformal Mapping",
        content: "Analytic functions preserve angles (are conformal) at points where the derivative is non-zero. This property is incredibly useful in physics and engineering for solving fluid flow and electrostatics problems by transforming complicated geometries into simpler ones.",
    },
     keyPoints: [
      "Differentiability in complex analysis is much stronger than in real analysis.",
      "Cauchy-Riemann equations bridge complex analysis and partial differential equations.",
      "Harmonic functions appear naturally in physics (potentials).",
    ],
  },
  {
    id: "chap-4",
    title: "Complex Integration",
    summary:
      "Line integrals in the complex plane and the powerful Cauchy Integral Theorem.",
    sections: [
      {
        title: "Line Integrals",
        content:
          "Integration of f(z) along a curve C in the complex plane. Can be evaluated by parameterizing the curve.",
        match: "\\int_C f(z) dz = \\int_a^b f(z(t)) z'(t) dt",
      },
      {
        title: "Cauchy-Goursat Theorem",
        content:
          "If f is analytic inside and on a simple closed contour C, then the integral of f around C is zero. This is a central result.",
        match: "\\oint_C f(z) dz = 0",
      },
      {
        title: "Cauchy's Integral Formula",
        content:
          "The value of an analytic function inside a closed contour is completely determined by its values on the boundary.",
        match: "f(z_0) = \\frac{1}{2\\pi i} \\oint_C \\frac{f(z)}{z - z_0} dz",
      }
    ],
    deepDive: {
        title: "Infinite Differentiability",
        content: "A stunning consequence of Cauchy's Integral Formula is that if a function is analytic once, it is infinitely differentiable. This is vastly different from real functions (where you can have a function differentiable once but not twice).",
    },
    keyPoints: [
      "Path independence of integrals for analytic functions.",
      "Deformation of contours principle.",
      "Analytic functions are incredibly smooth/rigid.",
    ]
  },
  {
    id: "chap-5",
    title: "Series Representations",
    summary: "Taylor and Laurent series expansions for complex functions.",
    sections: [
        {
            title: "Taylor Series",
            content: "Just like real functions, analytic functions have power series representations inside their disk of convergence.",
            match: "f(z) = \\sum_{n=0}^\\infty a_n (z - z_0)^n"
        },
        {
            title: "Laurent Series",
            content: "A generalization of Taylor series including negative powers. Used for functions with singularities.",
            match: "f(z) = \\sum_{n=-\\infty}^\\infty c_n (z - z_0)^n",
             points: [
                "Valid in an annulus (ring-shaped region).",
                "Essential for classifying singularities.",
            ]
        }
    ]
  },
  {
      id: "chap-6",
      title: "Residue Theory",
      summary: "A powerful method for evaluating difficult real integrals.",
      sections: [
          {
              title: "Singularities",
              content: "Points where a function ceases to be analytic. Classifed as removable, poles, or essential.",
          },
          {
              title: "The Residue Theorem",
              content: "The integral around a closed curve is 2*pi*i times the sum of residues of singularities inside.",
              match: "\\oint_C f(z) dz = 2\\pi i \\sum \\text{Res}(f, z_k)"
          },
          {
              title: "Applications to Real Integrals",
              content: "We can evaluate real definite integrals (e.g., from -inf to +inf) by closing the contour in the complex plane and summing residues.",
          }
      ],
      keyPoints: [
          "Residues capture the 'local behavior' of singularities.",
          "Turns integration problems into algebra problems.",
      ]
  }
];
