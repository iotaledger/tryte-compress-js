/// <reference types="node" />
/**
 * Compress a trytes string and return a buffer of data.
 * @param trytes The trytes to compress as uint 8 array.
 * @returns A buffer of the compressed data.
 */
export declare function compressTrytes(trytes: string): Buffer | undefined;
/**
 * Compress a trytes array and return a buffer of data.
 * @param trytes The trytes to compress as binary data.
 * @returns A buffer of the compressed data.
 */
export declare function compress(trytes: Buffer): Buffer | undefined;
