// Calculate the mean values for the columns of a matrix.
function columnMean(m) {
    const width = m[0].length;
    const height = m.length;

    const sums = m.reduce(
        (totals, row) => row.map((x, i) => totals[i] + x),
        new Array(width).fill(0),
    );

    return sums.map(sum => sum / height);
}

// Subtract the mean from the matrix columns. This should normalize the
// matrix, unless I wrote a bug or three.
function subtractMean(m) {
    const means = columnMean(m);

    return m.map(row => row.map((x, i) => x - means[i]));
}

// Calculate the covariance matrix for an input matrix m.
function covarianceMatrix(m) {
    const width = m[0].length;
    const height = m.length;

    const covM = [];

    for (let j = 0; j < width; j += 1) {
        const row = [];
        for (let i = 0; i < width; i += 1) {
            let c = 0;
            for (let k = 0; k < height; k += 1) {
                c += m[k][i] * m[k][j];
            }
            row.push(c / (height - 1));
        }
        covM.push(row);
    }

    return covM;
}

// Oh no! I have two dot product functions. :( Rather than build a nice math
// library, this code is going for working PCA. Sorry for the gross duplication!
// Hopefully you're using a math library in production. :)
function dot(v, w) {
    let x = 0;

    for (let i = 0; i < v.length; i += 1) {
        x += v[i] * w[i];
    }

    return x;
}

function dotProduct(m, v) {
    const result = [];

    for (let j = 0; j < m.length; j += 1) {
        let x = 0;
        for (let i = 0; i < m[0].length; i += 1) {
            x += m[j][i] * v[i];
        }
        result.push(x);
    }

    return result;
}

// Get the L1 (Euclidean) norm for a vector.
function vectorNorm(v) {
    return Math.sqrt(v.reduce((acc, cur) => acc + cur * cur, 0));
}

// Return the eigenvalue associated with a matrix and eigenvector
function eigenvalue(m, v) {
    mv = dotProduct(m, v);
    return dot(v, mv);
}

// Calculate the covatiance matrix and use power iteration to find the
// eigenvalues and eigenvectors. This code makes some really huge assumptions
// about the input data and will need to be rewritten to handle matrices of
// different sizes!
function getEigenStuff(m) {
    const covX = covarianceMatrix(m);
    const eigenvalues = [];
    const eigenvectors = [];

    // Try to find the eigenvalues and eigenvectors using power iteration
    let A = covX;

    for (let n = 0; n < 2; n += 1) {
        let v = [Math.random(), Math.random()];
        let ev = eigenvalue(A, v);

        // The number of loops here corresponds to the accuracy of our
        // eigenstuff. I don't think that's the right way to refer to
        // eigenvalues and eigenvectors, but I really like it. :)
        for (let i = 0; i < 5; i += 1) {
            vn = dotProduct(A, v);
            vnNorm = vectorNorm(vn);
            for (let j = 0; j < v.length; j += 1) {
                v[j] = vn[j] / vnNorm;
            }
            ev = eigenvalue(A, v);
        }

        // We got the most significant one! Save it.
        eigenvalues.push(ev);
        eigenvectors.push(v);

        // Now that we've found the principal component for the matrix A, we
        // subtract the product of the eigenvalue, the eigenvector, and the
        // transpose of the eigenvector, and get a matrix with the old
        // principal component removed. Now we can repeat the power iteration
        // to find the next principal component.
        let sub = [];
        for (let i = 0; i < v.length; i += 1) {
            let row = [];
            for (let j = 0; j < v.length; j += 1) {
                row.push(v[i] * v[j] * ev);
            }
            sub.push(row);
        }

        for (let j = 0; j < A.length; j += 1) {
            for (let i = 0; i < A.length; i += 1) {
                A[j][i] -= sub[j][i];
            }
        }
    }

    return { covX, eigenvectors, eigenvalues };
}

// Use principal component analysis to transform a set of input data.
function pca(m) {
    const norM = subtractMean(m);
    const { eigenvectors, eigenvalues } = getEigenStuff(norM);

    // We can reduce the width to reduce dimensionality
    const featureVectors = eigenvectors;

    // Transform the data using its principal components
    const finalData = norM.map(row => {
        let result = [];
        featureVectors.forEach(v => {
            let x = 0;
            for (let i = 0; i < v.length; i += 1) {
                x += v[i] * row[i];
            }
            result.push(x);
        });

        return result;
    });

    return { eigenvectors, eigenvalues, featureVectors, finalData };
}

// This dataset was borrowed from:
// http://www.iro.umontreal.ca/~pift6080/H09/documents/papers/pca_tutorial.pdf
const m = [
    [2.5, 2.4],
    [0.5, 0.7],
    [2.2, 2.9],
    [1.9, 2.2],
    [3.1, 3.0],
    [2.3, 2.7],
    [2, 1.6],
    [1, 1.1],
    [1.5, 1.6],
    [1.1, 0.9],
];

console.log(pca(m));

module.exports = {
    dot,
    dotProduct,
    pca,
};
