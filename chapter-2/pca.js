function columnMean(m) {
    const width = m[0].length;
    const height = m.length;

    const sums = m.reduce(
        (totals, row) => row.map((x, i) => totals[i] + x),
        new Array(width).fill(0)
    );

    return sums.map(sum => sum / height);
}

function subtractMean(m) {
    const means = columnMean(m)

    return m.map(row => row.map((x, i) => x - means[i]));
}

function covarianceMatrix(m) {
    const norM = subtractMean(m);

    const width = m[0].length;
    const height = m.length;

    const covM = [];

    for (let j = 0; j < width; j += 1) {
        const row = [];
        for (let i = 0; i < width; i += 1) {
            let c = 0;
            for (let k = 0; k < height; k += 1) {
                c += norM[k][i] * norM[k][j];
            }
            row.push(c / (height - 1));
        }
        covM.push(row);
    }

    return covM;
}

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

function vectorNorm(v) {
    return Math.sqrt(v.reduce((acc, cur) => acc + cur * cur, 0));
}

function eigenvalue(m, v) {
    mv = dotProduct(m, v);
    return dot(v, mv);
}

function pca(m) {
    const covX = covarianceMatrix(m);
    const eigenvalues = [];
    const eigenvectors = [];

    let A = covX;
    // Try to find the eigenvalues and eigenvectors using power iteration
    for (let n = 0; n < 2; n += 1) {
        let v = [Math.random(), Math.random()];
        let ev = eigenvalue(A, v);

        for (let i = 0; i < 5; i += 1) {
            vn = dotProduct(A, v);
            vnNorm = vectorNorm(vn);
            for (let j = 0; j < v.length; j += 1) {
                v[j] = vn[j] / vnNorm;
            }
            ev = eigenvalue(A, v);
        }

        eigenvalues.push(ev);
        eigenvectors.push(v);

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

    return {covX, eigenvectors, eigenvalues};
}

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
    [1.1, 0.9]
];

console.log(pca(m));
