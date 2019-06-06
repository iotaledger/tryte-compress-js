const { compress, decompress } = require('../../dist/tryte-compress');
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

    let st = process.hrtime();;
    const brotliOutput = brotli.compress(trytesBuffer);
    let end = process.hrtime();;
    console.log(`Brotli - Compressed Size: ${brotliOutput.length} bytes, Time: ${diffHrtime(st, end)}ms`);
    summary.brotli[0] += brotliOutput.length;
    summary.brotli[1] += diffHrtime(st, end);
    summary.brotli[2] = Math.max(summary.brotli[2], brotliOutput.length);
    summary.brotli[3] = Math.min(summary.brotli[3], brotliOutput.length);

    st = process.hrtime();;
    const deflateOutput = pako.deflateRaw(trytesBuffer);
    end = process.hrtime();;
    console.log(`Deflate - Compressed Size: ${deflateOutput.length} bytes, Time: ${diffHrtime(st, end)}ms`);
    summary.deflate[0] += deflateOutput.length;
    summary.deflate[1] += diffHrtime(st, end);
    summary.deflate[2] = Math.max(summary.deflate[2], deflateOutput.length);
    summary.deflate[3] = Math.min(summary.deflate[3], deflateOutput.length);

    st = process.hrtime();;
    const huffmanOutput = compressjs.Huffman.compressFile(trytesBuffer);
    end = process.hrtime();;
    console.log(`Huffman - Compressed Size: ${huffmanOutput.length} bytes, Time: ${diffHrtime(st, end)}ms`);
    summary.huffman[0] += huffmanOutput.length;
    summary.huffman[1] += diffHrtime(st, end);
    summary.huffman[2] = Math.max(summary.huffman[2], huffmanOutput.length);
    summary.huffman[3] = Math.min(summary.huffman[3], huffmanOutput.length);

    st = process.hrtime();;
    const lzOutput = lz.compress(trytesBuffer);
    end = process.hrtime();;
    console.log(`Lz - Compressed Size: ${lzOutput.length} bytes, Time: ${diffHrtime(st, end)}ms`);
    summary.lz[0] += lzOutput.length;
    summary.lz[1] += diffHrtime(st, end);
    summary.lz[2] = Math.max(summary.lz[2], lzOutput.length);
    summary.lz[3] = Math.min(summary.lz[3], lzOutput.length);

    st = process.hrtime();;
    let lz4Output = new Buffer(lz4.encodeBound(trytes.length));
    const compressedSize = lz4.encodeBlock(trytesBuffer, lz4Output);
    lz4Output = lz4Output.slice(0, compressedSize);
    end = process.hrtime();;
    console.log(`Lz4 - Compressed Size: ${lz4Output.length} bytes, Time: ${diffHrtime(st, end)}ms`);
    summary.lz4[0] += lz4Output.length;
    summary.lz4[1] += diffHrtime(st, end);
    summary.lz4[2] = Math.max(summary.lz4[2], lz4Output.length);
    summary.lz4[3] = Math.min(summary.lz4[3], lz4Output.length);

    st = process.hrtime();;
    const bzip2Output = compressjs.Bzip2.compressFile(trytesBuffer);
    end = process.hrtime();;
    console.log(`Bzip2 - Compressed Size: ${bzip2Output.length} bytes, Time: ${diffHrtime(st, end)}ms`);
    summary.bzip2[0] += bzip2Output.length;
    summary.bzip2[1] += diffHrtime(st, end);
    summary.bzip2[2] = Math.max(summary.bzip2[2], bzip2Output.length);
    summary.bzip2[3] = Math.min(summary.bzip2[3], bzip2Output.length);

    st = process.hrtime();;
    const trytesOutput = compress(trytes);
    end = process.hrtime();;
    console.log(`Trytes - Compressed Size: ${trytesOutput.length} bytes, Time: ${diffHrtime(st, end)}ms`);
    summary.trytes[0] += trytesOutput.length;
    summary.trytes[1] += diffHrtime(st, end);
    summary.trytes[2] = Math.max(summary.trytes[2], trytesOutput.length);
    summary.trytes[3] = Math.min(summary.trytes[3], trytesOutput.length);

    const decompressed = decompress(trytesOutput);
    if (decompressed !== trytes) {
        throw "Aaarrrggghhhh compress/decompress failed";
    }

    summaryCount++;
    console.log(`\nMessages ${summaryCount}`)
}

if (summaryCount > 0) {
    console.log();
    console.log('Summary');
    console.log(`Averages over ${summaryCount} messages processed `);
    console.log();
    for(const key in summary) {
        const avSize = Math.ceil(summary[key][0] / summaryCount);
        const avSaving = (100 - (avSize / 2673 * 100)).toFixed(1);
        const avTime = (summary[key][1] / summaryCount).toFixed(4);
        console.log(`${key} - Compressed Size: ${avSize} bytes, Saving Size: ${avSaving} %, Time: ${avTime}ms, Max: ${summary[key][2]} bytes, Min: ${summary[key][3]} bytes`);
    }
}

function generateRandom(length) {
    let hash = "";

    const randomValues = new Uint32Array(crypto.randomBytes(length));

    for (let i = 0; i < length; i++) {
        hash += "9ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(randomValues[i] % 27);
    }

    return hash;
}

function diffHrtime(b, a) {
    // desctructure/capture secs and nanosecs
    var as = a[0], ans = a[1],
        bs = b[0], bns = b[1],
        ns = ans - bns, // nanosecs delta, can overflow (will be negative)
        s = as - bs     // secs delta
    if (ns < 0) { // has overflowed
        s -= 1      // cut a second
        ns += 1e9   // add a billion nanosec (to neg number)
    }
    return s * 1000 + ns / 1000000
}