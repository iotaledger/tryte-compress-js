import { END_OF_DATA, HUFFMAN_TABLE } from "./constants";
import { runLengthEncode } from "./rle";

/**
 * Compress a trytes string and return a buffer of data.
 * @param trytes The trytes to compress as uint 8 array.
 * @returns A buffer of the compressed data.
 */
export function compressTrytes(trytes: string): Buffer | undefined {
    if (!/^[ABCDEFGHIJKLMNOPQRSTUVWXYZ9]*$/.test(trytes)) {
        throw new Error("You can only compress trytes with the algorithm.");
    }

    const arr = Buffer.alloc(trytes.length);
    for (let i = 0; i < trytes.length; i++) {
        arr[i] = trytes.charCodeAt(i);
    }

    return compress(arr);
}

/**
 * Compress a trytes array and return a buffer of data.
 * @param trytes The trytes to compress as binary data.
 * @returns A buffer of the compressed data.
 */
export function compress(trytes: Buffer): Buffer | undefined {
    if (trytes === undefined || trytes === null || trytes.length === 0) {
        throw new Error("There is no data to compress");
    }
    if (!Buffer.isBuffer(trytes)) {
        throw new Error("The trytes must be a Buffer, use compressTrytes for string");
    }

    // First run length encode the data to reduce the content
    // + 1 on the length to make space for the end of data if no rle occured
    const rleEncoded = Buffer.alloc(trytes.length + 1);
    let rleWritePos = runLengthEncode(trytes, rleEncoded);

    // Add the end of data marker so the decompress knows
    // when to finish processing the data
    rleEncoded[rleWritePos++] = END_OF_DATA;

    // Convert the rle encoded trytes to their huffman form
    const huffmanEncoded = Buffer.alloc(rleWritePos);
    let huffmanEncodedWritePos = 0;
    let encodedBits = 0;
    let encodedBitsLength = 0;

    for (let i = 0; i < rleWritePos; i++) {
        const hBits = HUFFMAN_TABLE[rleEncoded[i]];
        for (let j = hBits.length - 1; j >= 0; j--) {
            encodedBits |= ((hBits.bits >> j) & 0x01) << encodedBitsLength;
            encodedBitsLength++;
            if (encodedBitsLength === 8) {
                huffmanEncoded.writeUInt8(encodedBits, huffmanEncodedWritePos++);
                encodedBitsLength = 0;
                encodedBits = 0;
            }
        }
    }

    // If there are any remaining bits make sure we don't miss them
    if (encodedBitsLength > 0) {
        huffmanEncoded.writeUInt8(encodedBits, huffmanEncodedWritePos++);
    }

    return huffmanEncoded.slice(0, huffmanEncodedWritePos);
}
