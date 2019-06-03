const iotaCompress = require('../../dist/iota-compress');

let trytes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
console.log('trytes', trytes);
console.log('trytes length', trytes.length);

let compressedBytes = iotaCompress.compress(trytes);
console.log('compressed', compressedBytes);
console.log('compressed length', compressedBytes.length);

let decompressed = iotaCompress.decompress(compressedBytes);
console.log('decompressed', decompressed);
console.log('matches', decompressed === trytes);

trytes = '9'.repeat(2673);
console.log('trytes', trytes);
console.log('trytes length', trytes.length);

compressedBytes = iotaCompress.compress(trytes);
console.log('compressed', compressedBytes);
console.log('compressed length', compressedBytes.length);

decompressed = iotaCompress.decompress(compressedBytes);
console.log('decompressed', decompressed);
console.log('matches', decompressed === trytes);

