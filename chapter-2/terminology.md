# Chapter 2: Linear Algebra

**Scalar**: A single number. When we introduce them, we specify what kind of number they are.

**Vector**: An array of numbers, arranged in order. We can think of vectors as identifying points in space, with each element giving the coordinate along a different axis.

**Matrix**: A 2-D array of numbers, so each element is identified by two indices instead of just one.

**Tensor**: An array of numbers arranged on a regular grid with a variable number of axes.

**Broadcasting**: The addition of a matrix and a vector, yielding another matrix: **C = A + _b_**. In other words, the vector **_b_** is added to each row of the matrix.

**Matrix inverse**: Denoted as **A^-1^** and defined as the matrix such that **A^-1^A = I**~n~.

**Linear independence**: A set of vectors is linearly independent if no vector in the set is a linear combination of the other vectors.

**Singular**: A square matrix with linearly dependent columns.

**Norm**: Functions mapping vectors to non-negative values. On an intuitive level, the norm of a vector **_x_** measures the distance from the origin to the point **_x_**.

**Euclidean norm**: The Euclidean distance from the origin to the point identified by **_x_**. The _L_^2^ norm is used so frequently in machine learning that it is often denoted simply as ||**_x_**||.

**Diagonal matrix**: Consists mostly of zeros and have nonzero entries only along the main diagonal. One example is the identity matrix, where all the diagonal entries are 1. We write diag(**_v_**) to denote a square diagonal matrix whose diagonal entries are given by the entries of the vector **_v_**.

**Symmetric matrix**: Any matrix that is equal to its own transpose. **A = A**^T^.

**Eigenvector**: An eigenvector of a square matrix **A** is a nonzero vector **_v_** such that multiplication by **A** alters only the scale of **_v_**. **A_v_** = λ**_v_**. The scalar λ is known as the eigenvalue corresponding to this eigenvector.

**Eigendecomposition**: When a matrix is decomposed into a set of eigenvectors and eigenvalues. Given by **A** = **V**diag(λ)**V**^-1^.
