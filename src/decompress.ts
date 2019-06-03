import { END_OF_DATA, HUFFMAN_TABLE_REVERSE } from "./constants";
import { runLengthDecode } from "./rle";

/**
 * Decompress the buffer back to a tryte string.
 * @param buffer The buffer to decompress.
 * @returns The tryte string.
 */
export function decompress(buffer: Buffer): string {
    if (buffer === undefined || buffer === null || buffer.length < 1) {
        return "";
    }

    // Convert the huffman encoded data back to the full rle
    let decoded = "";
    let bufferPos = 0;
    let foundEnd = false;
    let bitIndex = 7;
    while (!foundEnd) {
        let key = "";

        // Build a key until we find it in the huffman table
        while (!(key in HUFFMAN_TABLE_REVERSE)) {
            if (bufferPos > buffer.length) {
                throw new Error("End of data reached while decompressing");
            }

            // If we have run out of bits in the current buffer value
            // move to the next one
            if (bitIndex === -1) {
                bufferPos++;
                bitIndex = 7;
            }

            // Add the next bit from the buffer to the key
            key += (buffer[bufferPos] >> bitIndex) & 0x01 ? "1" : "0";
            bitIndex--;
        }

        // A key was found, if it was end of data then
        // finished the decompress, otherwise just add it
        // to the decompressed data
        const val = HUFFMAN_TABLE_REVERSE[key];
        if (val === END_OF_DATA) {
            foundEnd = true;
        } else {
            decoded += val;
        }
    }

    // Run length decode the data
    return runLengthDecode(decoded);
}
