/// <reference types="node" />
/**
 * Run length encode the tryte string.
 * @param trytes The trytes to run length encode.
 * @param rleEncoded The rle encoded data.
 * @returns The run length encoded length.
 * @private
 */
export declare function runLengthEncode(trytes: Buffer, rleEncoded: Buffer): number;
/**
 * Decode the run length encoded trytes,
 * @param encoded The run length encoded data.
 * @returns The plain trytes.
 * @private
 */
export declare function runLengthDecode(encoded: number[]): Buffer;
