# IOTA Tryte Compress JavaScript

> This repository is now deprecated as it can only be used with the legacy IOTA network.

IOTA Trytes compression/decompression provides a mechanism by which trytes can be more efficiently stored or transmitted.

By considering the data domain and the specific way in which tryte data is used we created an algorithm that works extremely efficiently in the most common use cases. The algorithm is also implemented in such a way as to make it lightweight enough to be used by embedded devices.

The algorithm uses a combination of run-length-encoding and huffman encoding based on a static huffman tree. The static huffman tree was generated by analyzing 10000s of actual transactions.

## Installing

Install this package using the following commands:

```shell
npm install iotaledger/tryte-compress-js
```

or

```shell
yarn add iotaledger/tryte-compress-js
```

## Example Usage

```js
const iotaCompress = require('@iota/tryte-compress');

let trytes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
console.log('trytes', trytes);
console.log('trytes length', trytes.length);

let compressedBytes = iotaCompress.compressTrytes(trytes);
console.log('compressed', compressedBytes);
console.log('compressed length', compressedBytes.length);

let decompressed = iotaCompress.decompressTrytes(compressedBytes);
console.log('decompressed', decompressed, decompressed.length);
console.log('matches', decompressed === trytes);

trytes = '9'.repeat(2673);
console.log('trytes', trytes);
console.log('trytes length', trytes.length);

compressedBytes = iotaCompress.compressTrytes(trytes);
console.log('compressed', compressedBytes);
console.log('compressed length', compressedBytes.length);

decompressed = iotaCompress.decompressTrytes(compressedBytes);
console.log('decompressed', decompressed, decompressed.length);
console.log('matches', decompressed === trytes);
```

Will output:

```shell
trytes ABCDEFGHIJKLMNOPQRSTUVWXYZ9
trytes length 27
compressed <Buffer f2 f0 df 93 46 0f 31 c3 59 b7 5a 54 b4 6f d6 38 06 00>
compressed length 18
decompressed ABCDEFGHIJKLMNOPQRSTUVWXYZ9 27
matches true
trytes 9999999999999...9999999999999
trytes length 2673
compressed <Buffer 80 bc 90 01 00>
compressed length 5
decompressed 9999999999999...9999999999999 2673
matches true
```

## API Reference

See the API reference for the Javascript implementation [here](./docs/api.md).

## Examples

To see the code in use there are some samples in the examples folder.

* [simple](./examples/simple/) - The example code show above.
* [huffmanTrainer](./examples/huffmanTrainer/) - The code which creates the static huffman tables by analyzing zmq stream.
* [random](./examples/random/) - Example processing random generated packets.
* [zmq](./examples/zmq/) - Example which monitors zmq stream and shows the potential compression ratios achieved with different algorithms.

## Results

The results of the current algorithm compared with some industry standard algorithms are shown below.

They were generated using the zmq example processing 10,000 transactions, these are the averages.

```shell
brotli - Compressed Size: 669 bytes, Saving Size: 75.0 %, Time: 4ms, Max: 1602 bytes, Min: 167 bytes
deflate - Compressed Size: 694 bytes, Saving Size: 74.0 %, Time: 1ms, Max: 1646 bytes, Min: 180 bytes
huffman - Compressed Size: 919 bytes, Saving Size: 65.6 %, Time: 1ms, Max: 1654 bytes, Min: 525 bytes
lz - Compressed Size: 764 bytes, Saving Size: 71.4 %, Time: 1ms, Max: 1631 bytes, Min: 294 bytes
lz4 - Compressed Size: 1089 bytes, Saving Size: 59.3 %, Time: 1ms, Max: 2653 bytes, Min: 241 bytes
bzip2 - Compressed Size: 749 bytes, Saving Size: 72.0 %, Time: 4ms, Max: 1719 bytes, Min: 249 bytes
trytes - Compressed Size: 662 bytes, Saving Size: 75.2 %, Time: 1ms, Max: 1593 bytes, Min: 183 bytes
```

## License

MIT License - Copyright (c) 2019 IOTA Stiftung
