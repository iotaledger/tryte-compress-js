const crypto = require('crypto');
const { TRYTE_ALPHABET } = require('@iota/converter');
const brotli = require('brotli');
const pako = require('pako');
const lz = require('lzjs');
const compressjs = require('compressjs');
const { compress, decompress } = require('@iota/tryte-compress');

const TRYTES_LENGTH = 2673;

let globalResults = {};

function run(mode, numIterations) {
    console.log(`${mode} x${numIterations}`);
    console.log();

    let results = {
        brotli: [0, 0],
        deflate: [0, 0],
        lz: [0, 0],
        huffman: [0, 0],
        bzip2: [0, 0],
        trytes: [0, 0]
    }

    for (let i = 0; i < numIterations; i++) {
        let trytesString;
        if (mode === 'random') {
            trytesString = generateHash(TRYTES_LENGTH);
        } else if (mode === 'random-and-plain-signature-message-fragment') {
            trytesString = generateHash(243) + '9'.repeat(2187) + generateHash(243);
        } else if (mode === 'random-and-mixed-signature-message-fragment') {
            trytesString = generateHash(243) + '9'.repeat(187) + '9'.repeat(600) + 'A'.repeat(400) + 'B'.repeat(1000) + generateHash(243);
        } else if (mode === 'single-continous-run') {
            trytesString = '9'.repeat(TRYTES_LENGTH);
        }

        if (i === 0) {
            if (numIterations > 1) {
                console.log(`Example Trytes (each iteration is different)`);
            } else {
                console.log(`Example Trytes`);
            }
            console.log(trytesString);
            console.log();
        }
        const trytes = Buffer.from(trytesString);

        let st = Date.now();
        const brotliOutput = brotli.compress(trytes);
        let end = Date.now();
        results.brotli[0] += brotliOutput.length;
        results.brotli[1] += end - st;

        st = Date.now();
        const deflateOutput = pako.deflate(trytes);
        end = Date.now();
        results.deflate[0] += deflateOutput.length;
        results.deflate[1] += end - st;

        st = Date.now();
        const lzOutput = lz.compress(trytes);
        end = Date.now();
        results.lz[0] += lzOutput.length;
        results.lz[1] += end - st;

        st = Date.now();
        const huffmanOutput = compressjs.Huffman.compressFile(trytes);
        end = Date.now();
        results.huffman[0] += huffmanOutput.length;
        results.huffman[1] += end - st;

        st = Date.now();
        const bzip2Output = compressjs.Bzip2.compressFile(trytes);
        end = Date.now();
        results.bzip2[0] += bzip2Output.length;
        results.bzip2[1] += end - st;

        st = Date.now();
        const trytesOutput = compress(trytes);
        end = Date.now();
        results.trytes[0] += trytesOutput.length;
        results.trytes[1] += end - st;

        if (decompress(trytesOutput).compare(trytes)) {
            console.error('!!!!!!!!!!! Compression/Decompress failed')
        }
    }

    showResults(results, numIterations);
}

function showResults(results, numIterations) {
    const ordered = [];
    for (let algo in results) {
        ordered.push({ algo, result: results[algo] });
    }
    ordered.sort((a, b) => a.result[0] - b.result[0]);

    ordered.forEach(o => {
        const average = Math.ceil(o.result[0] / numIterations);
        const reduction = ((1 - ((o.result[0] / numIterations) / TRYTES_LENGTH)) * 100);
        const avTime = o.result[1] / numIterations;
        console.log(`${o.algo}: Average ${average} Reduction ${reduction.toFixed(2)}% Time ${avTime}`);

        globalResults[o.algo] = globalResults[o.algo] || {
            average: 0,
            reduction: 0,
            time: 0
        };

        globalResults[o.algo].average += average;
        globalResults[o.algo].reduction += reduction;
        globalResults[o.algo].time += avTime;
    });

    console.log();
}

function generateHash(length) {
    let hash = '';

    const randomValues = new Uint32Array(crypto.randomBytes(length));

    for (let i = 0; i < length; i++) {
        hash += TRYTE_ALPHABET.charAt(randomValues[i] % TRYTE_ALPHABET.length);
    }

    return hash;
}

console.log(`Compression Tests`);
console.log(`Payload Size: ${TRYTES_LENGTH}`);
console.log();

const numVariants = 3;
const numIterations = 100;
run('random', numIterations);
run('random-and-plain-signature-message-fragment', numIterations);
run('random-and-mixed-signature-message-fragment', numIterations);
//run('single-continous-run', 1);

console.log();
console.log("Combined Results")
console.log();

const globalOrdered = [];
for (let algo in globalResults) {
    globalOrdered.push({
        algo,
        average: globalResults[algo].average / numVariants,
        reduction: globalResults[algo].reduction / numVariants,
        time: globalResults[algo].time / numVariants
    });
}
globalOrdered.sort((a, b) => a.average - b.average);

globalOrdered.forEach(o => {
    console.log(`${o.algo}: Average ${Math.ceil(o.average)} Reduction ${o.reduction.toFixed(2)}% Time ${o.time}`);
});
