import { END_OF_DATA, HUFFMAN_TABLE_REVERSE } from "./constants";
import { runLengthDecode } from "./rle";

/**
 * Decompress a binary buffer back to trytes string.
 * @param bytes The trytes to compress as uint 8 array.
 * @returns The trytes as a string.
 */
export function decompressTrytes(bytes: Buffer): string {
    const decompressed = decompress(bytes);

    let trytes = "";
    for (let i = 0; i < decompressed.length; i++) {
        trytes += String.fromCharCode(decompressed[i]);
    }

    return trytes;
}

/**
 * Decompress a binary buffer back to binary trytes buffer.
 * @param bytes The buffer to decompress.
 * @returns The tryte string.
 */
export function decompress(bytes: Buffer): Buffer {
    if (bytes === undefined || bytes === null || bytes.length === 0) {
        throw new Error("There is no data to decompress");
    }
    if (!Buffer.isBuffer(bytes)) {
        throw new Error("The bytes must be a Buffer");
    }

    // Convert the huffman encoded data back to the full rle
    const decoded = [];
    let readPos = 0;
    let foundEnd = false;
    let bitIndex = 0;

    while (!foundEnd) {
        let key = 0;
        let keyBitCount = 0;

        // Build a key until we find it in the huffman table
        while (!(HUFFMAN_TABLE_REVERSE[keyBitCount][key])) {
            key |= ((bytes[readPos] >> bitIndex) & 0x01) << keyBitCount;
            keyBitCount++;
            bitIndex++;

            if (bitIndex === 8) {
                readPos++;
                bitIndex = 0;
            }
        }

        // A key was found, if it was end of data then
        // finished the decompress, otherwise just add it
        // to the decompressed data
        const val = HUFFMAN_TABLE_REVERSE[keyBitCount][key];
        if (val === END_OF_DATA) {
            foundEnd = true;
        } else {
            decoded.push(val);
        }
    }

    // Run length decode the data
    return runLengthDecode(decoded);
}
