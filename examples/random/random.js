const { compress, decompress } = require('../../dist/iota-compress');
const brotli = require('brotli');
const compressjs = require('compressjs');
const lz = require('lzjs');
const lz4 = require('lz4');
const pako = require('pako');
const crypto = require('crypto');

let summaryCount = 0;
const summary = {
    brotli: [0, 0, 0, 2673],
    deflate: [0, 0, 0, 2673],
    huffman: [0, 0, 0, 2673],
    lz: [0, 0, 0, 2673],
    lz4: [0, 0, 0, 2673],
    bzip2: [0, 0, 0, 2673],
    trytes: [0, 0, 0, 2673]
};

for (let i = 0; i < 1000; i++) {
    const trytes = generateRandom(2673);
    const trytesBuffer = Buffer.from(trytes);

    console.log();
    console.log(trytes);

    let st = Date.now();
    const brotliOutput = brotli.compress(trytesBuffer);
    let end = Date.now();
    console.log(`Brotli - Compressed Size: ${brotliOutput.length} bytes, Time: ${end - st}ms`);
    summary.brotli[0] += brotliOutput.length;
    summary.brotli[1] += end - st;
    summary.brotli[2] = Math.max(summary.brotli[2], brotliOutput.length);
    summary.brotli[3] = Math.min(summary.brotli[3], brotliOutput.length);

    st = Date.now();
    const deflateOutput = pako.deflateRaw(trytesBuffer);
    end = Date.now();
    console.log(`Deflate - Compressed Size: ${deflateOutput.length} bytes, Time: ${end - st}ms`);
    summary.deflate[0] += deflateOutput.length;
    summary.deflate[1] += end - st;
    summary.deflate[2] = Math.max(summary.deflate[2], deflateOutput.length);
    summary.deflate[3] = Math.min(summary.deflate[3], deflateOutput.length);

    st = Date.now();
    const huffmanOutput = compressjs.Huffman.compressFile(trytesBuffer);
    end = Date.now();
    console.log(`Huffman - Compressed Size: ${huffmanOutput.length} bytes, Time: ${end - st}ms`);
    summary.huffman[0] += huffmanOutput.length;
    summary.huffman[1] += end - st;
    summary.huffman[2] = Math.max(summary.huffman[2], huffmanOutput.length);
    summary.huffman[3] = Math.min(summary.huffman[3], huffmanOutput.length);

    st = Date.now();
    const lzOutput = lz.compress(trytesBuffer);
    end = Date.now();
    console.log(`Lz - Compressed Size: ${lzOutput.length} bytes, Time: ${end - st}ms`);
    summary.lz[0] += lzOutput.length;
    summary.lz[1] += end - st;
    summary.lz[2] = Math.max(summary.lz[2], lzOutput.length);
    summary.lz[3] = Math.min(summary.lz[3], lzOutput.length);

    st = Date.now();
    let lz4Output = new Buffer(lz4.encodeBound(trytes.length));
    const compressedSize = lz4.encodeBlock(trytesBuffer, lz4Output);
    lz4Output = lz4Output.slice(0, compressedSize);
    end = Date.now();
    console.log(`Lz4 - Compressed Size: ${lz4Output.length} bytes, Time: ${end - st}ms`);
    summary.lz4[0] += lz4Output.length;
    summary.lz4[1] += end - st;
    summary.lz4[2] = Math.max(summary.lz4[2], lz4Output.length);
    summary.lz4[3] = Math.min(summary.lz4[3], lz4Output.length);

    st = Date.now();
    const bzip2Output = compressjs.Bzip2.compressFile(trytesBuffer);
    end = Date.now();
    console.log(`Bzip2 - Compressed Size: ${bzip2Output.length} bytes, Time: ${end - st}ms`);
    summary.bzip2[0] += bzip2Output.length;
    summary.bzip2[1] += end - st;
    summary.bzip2[2] = Math.max(summary.bzip2[2], bzip2Output.length);
    summary.bzip2[3] = Math.min(summary.bzip2[3], bzip2Output.length);

    st = Date.now();
    const trytesOutput = compress(trytes);
    end = Date.now();
    console.log(`Trytes - Compressed Size: ${trytesOutput.length} bytes, Time: ${end - st}ms`);
    summary.trytes[0] += trytesOutput.length;
    summary.trytes[1] += end - st;
    summary.trytes[2] = Math.max(summary.trytes[2], trytesOutput.length);
    summary.trytes[3] = Math.min(summary.trytes[3], trytesOutput.length);

    const decompressed = decompress(trytesOutput);
    if (decompressed !== trytes) {
        throw "Aaarrrggghhhh compress/decompress failed";
    }

    summaryCount++;
    console.log(`\nMessages ${summaryCount}`)
}

process.on('SIGINT', function () {
    if (summaryCount > 0) {
        console.log();
        console.log('Summary');
        console.log(`Averages over ${summaryCount} messages processed `);
        console.log();
        for(const key in summary) {
            const avSize = Math.ceil(summary[key][0] / summaryCount);
            const avSaving = (100 - (avSize / 2673 * 100)).toFixed(1);
            const avTime = Math.ceil(summary[key][1] / summaryCount);
            console.log(`${key} - Compressed Size: ${avSize} bytes, Saving Size: ${avSaving} %, Time: ${avTime}ms, Max: ${summary[key][2]} bytes, Min: ${summary[key][3]} bytes`);
        }
    }

    console.log();
    console.log('Exiting...');
    process.exit(2);
});

function generateRandom(length) {
    let hash = "";

    const randomValues = new Uint32Array(crypto.randomBytes(length));

    for (let i = 0; i < length; i++) {
        hash += "9ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(randomValues[i] % 27);
    }

    return hash;
}