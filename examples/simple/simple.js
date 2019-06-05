const iotaCompress = require('../../dist/iota-compress');

let trytes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
console.log('trytes', trytes);
console.log('trytes length', trytes.length);

let compressedBytes = iotaCompress.compressTrytes(trytes);
console.log('compressed', Array.from(compressedBytes).map(b => b.toString(10)));
console.log('compressed length', compressedBytes.length);

let decompressed = iotaCompress.decompressTrytes(compressedBytes);
console.log('decompressed', decompressed, decompressed.length);
console.log('matches', decompressed === trytes);

trytes = '9'.repeat(2673);
console.log('trytes', trytes);
console.log('trytes length', trytes.length);

compressedBytes = iotaCompress.compressTrytes(trytes);
console.log('compressed', Array.from(compressedBytes).map(b => b.toString(16)));
console.log('compressed length', compressedBytes.length);

decompressed = iotaCompress.decompressTrytes(compressedBytes);
console.log('decompressed', decompressed, decompressed.length);
console.log('matches', decompressed === trytes);

