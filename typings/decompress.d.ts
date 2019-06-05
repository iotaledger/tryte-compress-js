/// <reference types="node" />
/**
 * Decompress a binary buffer back to trytes string.
 * @param bytes The trytes to compress as uint 8 array.
 * @returns The trytes as a string.
 */
export declare function decompressTrytes(bytes: Buffer): string;
/**
 * Decompress a binary buffer back to binary trytes buffer.
 * @param bytes The buffer to decompress.
 * @returns The tryte string.
 */
export declare function decompress(bytes: Buffer): Buffer;
