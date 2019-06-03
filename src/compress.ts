import { END_OF_DATA, HUFFMAN_TABLE } from "./constants";
import { runLengthEncode } from "./rle";

/**
 * Compress a trytes string and return a buffer of data.
 * @param trytes The trytes to compress.
 * @returns A buffer of the compressed data.
 */
export function compress(trytes: string): Buffer | undefined {
    if (trytes === undefined || trytes === null || trytes.length === 0) {
        return undefined;
    }

    if (!/^[ABCDEFGHIJKLMNOPQRSTUVWXYZ9]*$/.test(trytes)) {
        throw new Error("You can only compress trytes with the algorithm.");
    }

    // First run length encode the data to reduce the content
    let rle = runLengthEncode(trytes);

    // Add the end of data marker so the decompress knows
    // when to finish processing the data
    rle += END_OF_DATA;

    // Convert the rle encoded trytes to their huffman form
    const bytes: number[] = [];
    let encoded = "";
    for (let i = 0; i < rle.length; i++) {
        encoded += HUFFMAN_TABLE[rle[i]];

        while (encoded.length >= 8) {
            bytes.push(parseInt(encoded.substring(0, 8), 2));
            encoded = encoded.substring(8);
        }
    }

    // If there are any remaining bits make sure we don't miss them
    if (encoded.length > 0) {
        bytes.push(parseInt(`${encoded}${"0".repeat(8 - encoded.length)}`, 2));
    }

    return Buffer.from(bytes);
}
