const { runLengthEncode } = require('../../dist/iota-compress');
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
const globalFreq = { };
const huffman = new HuffmanEncoding();

for (let i = 0; i < allChars.length; i++) {
    globalFreq[allChars[i]] = 1;
}

sock.on('message', async msg => {
    const data = msg.toString().split(' ');

    let trytes = data[1];

    let rle = runLengthEncode(trytes);

    huffman.generateFrequency(rle, globalFreq)

    count++;
    console.log(count);
});

process.on('SIGINT', function () {
    console.log(globalFreq);
    huffman.generateTree(globalFreq);
    console.log("export const HUFFMAN_TABLE: { [id: string]: string } = {");
    for (let i = 0; i < allChars.length; i++) {
        console.log(`   "${allChars[i]}": "${huffman.encoding[allChars[i]]}",`);
    }
    console.log("};");
    console.log();
    console.log("export const HUFFMAN_TABLE_REVERSE: { [id: string]: string } = {")
    for (let i = 0; i < allChars.length; i++) {
        console.log(`   "${huffman.encoding[allChars[i]]}": "${allChars[i]}",`);
    }
    console.log("};");
    console.log('Exiting...');
    process.exit(2);
});

