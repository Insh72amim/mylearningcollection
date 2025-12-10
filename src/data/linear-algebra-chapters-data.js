export const linearAlgebraChapters = [
  {
    id: 1,
    title: "Vectors in R^n",
    summary:
      "The building blocks of linear algebra. Vectors, dot products, length, and orthogonality.",
    sections: [
      {
        title: "Vectors in R^n",
        content:
          "An n-vector is an ordered list of n numbers. We can add valid vectors and multiply them by scalars.",
        points: [
          "Geometric representation as arrows.",
          "Parallelogram law for addition.",
        ],
      },
      {
        title: "Dot Product and Norm",
        content:
          "The dot product u.v is a scalar that relates to the angle between vectors. The norm ||v|| is the length of the vector.",
        match: "\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^n u_i v_i = ||\\mathbf{u}|| ||\\mathbf{v}|| \\cos \\theta",
        definitions: [
            {
                term: "Orthogonal",
                def: "Two vectors are orthogonal if their dot product is zero."
            },
            {
                term: "Unit Vector",
                def: "A vector with length (norm) equal to 1."
            }
        ]
      },
       {
        title: "Lines and Planes",
        content:
          "Lines and planes in R^n can be described using vectors. parametric equations and normal equations.",
      },
    ],
  },
  {
    id: 2,
    title: "Matrix Algebra",
    summary:
      "Operations on matrices, matrix multiplication, transpose, and special matrices.",
    sections: [
      {
        title: "Matrix Operations",
        content:
          "A matrix is a rectangular array of numbers. We define addition, scalar multiplication, and matrix multiplication.",
        match: "(AB)_{ij} = \\sum_k A_{ik} B_{kj}",
      },
      {
        title: "The Transpose",
        content:
           "The transpose of A, denoted A^T, is formed by swapping rows and columns. (AB)^T = B^T A^T.",
      },
      {
        title: "Special Matrices",
        content:
          "Square matrices, diagonal matrices, identity matrices, and symmetric matrices (A = A^T).",
      },
    ],
  },
  {
    id: 3,
    title: "Systems of Linear Equations",
    summary:
      "Solving Ax = b using Gaussian elimination. The fundamental computational tool.",
    sections: [
      {
        title: "Gaussian Elimination",
        content:
          "Using row operations to reduce a matrix to Row Echelon Form (REF) or Reduced Row Echelon Form (RREF).",
        points: [
            "Elementary row operations do not change the solution set.",
            "Back-substitution to find the solution.",
        ]
      },
      {
        title: "Existence and Uniqueness",
        content:
          "A system may have: no solution (inconsistent), exactly one solution, or infinitely many solutions.",
      },
       {
        title: "Matrix Inverses",
        content:
          "For a square matrix A, if there exists B such that AB = BA = I, then A is invertible. Ax = b has the unique solution x = A^-1 b.",
      },
    ],
    deepDive: {
        title: "LU Decomposition",
        content: "Gaussian elimination is computationally equivalent to factoring the matrix A into a lower triangular matrix L and an upper triangular matrix U (A = LU). This is how computers actually solve linear systems efficiently.",
    },
    keyPoints: [
      "Gaussian elimination is the most important algorithm in linear algebra.",
      "The rank of a matrix determines the number of solutions.",
    ],
  },
  {
    id: 4,
    title: "Vector Spaces",
    summary:
      "Abstracting the properties of R^n to general vector spaces. Subspaces, span, linear independence, basis, and dimension.",
    sections: [
      {
        title: "Vector Spaces and Subspaces",
        content:
          "A vector space is a set V with addition and scalar multiplication satisfying specific axioms. A subspace is a subset that is also a vector space.",
      },
      {
        title: "Linear Independence and Span",
        content:
          "A set of vectors is linearly independent if no vector is a linear combination of the others. The span is the set of all linear combinations.",
      },
      {
        title: "Basis and Dimension",
        content:
          "A basis is a linearly independent set that spans the space. The dimension is the number of vectors in a basis.",
        match: "\\text{dim}(V) = n",
      },
      {
        title: "Four Fundamental Subspaces",
        content:
          "For an m x n matrix A: Column Space, Row Space, Null Space, and Left Null Space.",
        points: [
            "Rank-Nullity Theorem: rank(A) + nullity(A) = n",
            "Row space and Null space are orthogonal complements.",
        ]
      }
    ],
    keyPoints: [
      "Basis is a minimal spanning set.",
      "Dimension is an invariant property of a vector space.",
    ]
  },
  {
    id: 5,
    title: "Determinants",
    summary: "A scalar value associated with a square matrix. Properties and geometric interpretation.",
    sections: [
        {
            title: "Properties of Determinants",
            content: "det(AB) = det(A)det(B). det(A) = 0 iff A is singular (not invertible).",
        },
        {
            title: "Geometric Interpretation",
            content: "The absolute value of the determinant represents the volume scaling factor of the linear transformation.",
        }
    ]
  },
  {
      id: 6,
      title: "Eigenvalues and Eigenvectors",
      summary: "Diagonalization and the characteristic equation.",
      sections: [
          {
              title: "Eigenvalues and Eigenvectors",
              content: "Ax = lambda x. lambda is the eigenvalue, x is the eigenvector.",
              match: "\\det(A - \\lambda I) = 0"
          },
          {
              title: "Diagonalization",
              content: "If A has n linearly independent eigenvectors, A = PDP^-1, where D is diagonal.",
          }
      ],
      deepDive: {
          title: "Google's PageRank",
          content: "The original Google search algorithm is essentially finding the eigenvector corresponding to the largest eigenvalue (which is 1) of the 'web graph' transition matrix. It ranks pages based on their importance in the network.",
      }
  }
];
