/**
 * Current version of compression algorithm.
 * @private
 */
export declare const END_OF_DATA: number;
export declare const HUFFMAN_TABLE: {
    [id: number]: {
        /**
         * The encoded bits
         */
        bits: number;
        /**
         * The number of bits
         */
        length: number;
    };
};
export declare const HUFFMAN_TABLE_REVERSE_4: {
    [id: number]: number;
};
export declare const HUFFMAN_TABLE_REVERSE_5: {
    [id: number]: number;
};
export declare const HUFFMAN_TABLE_REVERSE_6: {
    [id: number]: number;
};
export declare const HUFFMAN_TABLE_REVERSE_7: {
    [id: number]: number;
};
export declare const HUFFMAN_TABLE_REVERSE_8: {
    [id: number]: number;
};
export declare const HUFFMAN_TABLE_REVERSE: {
    [id: number]: number;
}[];
