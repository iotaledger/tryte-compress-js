const HuffmanEncoding = require("./huffmanEncoding");

let zmq = require('zeromq');
let sock = zmq.socket('sub');

// Connect to the devnet node's ZMQ port
console.log('Connecting to ZMQ');
sock.connect('tcp://db.iota.partners:5556');
//sock.connect('tcp://zmq.devnet.iota.org:5556');

console.log('Press Ctrl-C to exit and see summary');
console.log();
console.log('Waiting for messages...');

// Subscribe to tx_trytes messages
sock.subscribe('tx_trytes');

let count = 0;

// Handle the tx_trytes message
const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9123_";
const globalFreq = { 1: 1, 2: 1, 3: 1, _: 1 };
const huffman = new HuffmanEncoding();

// for (let i = 0; i < allChars.length; i++) {
//     globalFreq[allChars[i]] = 1;
// }

sock.on('message', async msg => {
    const data = msg.toString().split(' ');

    huffman.generateFrequency(data[1], globalFreq);

    count++;
    console.log(count);
});

process.on('SIGINT', function () {
    console.log(globalFreq);
    huffman.generateTree(globalFreq);
    console.log("HUFFMAN_TABLE for TypeScript");
    for (let i = 0; i < allChars.length; i++) {
        const comma = i < allChars.length - 1 ? ',' : '';
        console.log(`   ${allChars[i].charCodeAt(0)}: { bits: 0b${huffman.encoding[allChars[i]]}, length: ${huffman.encoding[allChars[i]].length} }${comma}`);
    }
    console.log();
    console.log("HUFFMAN_TABLE_REVERSE_4 for TypeScript");
    for (let i = 0; i < allChars.length; i++) {
        if (huffman.encoding[allChars[i]].length === 4) {
            console.log(`   0b${huffman.encoding[allChars[i]]}: ${allChars[i].charCodeAt(0)},`);
        }
    }
    console.log();
    console.log("HUFFMAN_TABLE_REVERSE_5 for TypeScript");
    for (let i = 0; i < allChars.length; i++) {
        if (huffman.encoding[allChars[i]].length === 5) {
            console.log(`   0b${huffman.encoding[allChars[i]]}: ${allChars[i].charCodeAt(0)},`);
        }
    }
    console.log();
    console.log("HUFFMAN_TABLE_REVERSE_6 for TypeScript");
    for (let i = 0; i < allChars.length; i++) {
        if (huffman.encoding[allChars[i]].length === 6) {
            console.log(`   0b${huffman.encoding[allChars[i]]}: ${allChars[i].charCodeAt(0)},`);
        }
    }
    console.log();
    console.log("HUFFMAN_TABLE_REVERSE_7 for TypeScript");
    for (let i = 0; i < allChars.length; i++) {
        if (huffman.encoding[allChars[i]].length === 7) {
            console.log(`   0b${huffman.encoding[allChars[i]]}: ${allChars[i].charCodeAt(0)},`);
        }
    }
    console.log();
    console.log("HUFFMAN_TABLE_REVERSE_8 for TypeScript");
    for (let i = 0; i < allChars.length; i++) {
        if (huffman.encoding[allChars[i]].length === 8) {
            console.log(`   0b${huffman.encoding[allChars[i]]}: ${allChars[i].charCodeAt(0)},`);
        }
    }
    console.log('Exiting...');
    process.exit(2);
});

