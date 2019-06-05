/**
 * Current version of compression algorithm.
 * @private
 */
export const END_OF_DATA: number = 95;

// tslint:disable:object-literal-key-quotes
export const HUFFMAN_TABLE: {
    [id: number]: {
        /**
         * The encoded bits
         */
        bits: number;
        /**
         * The number of bits
         */
        length: number;
    }
} = {
    65: { bits: 0b0100, length: 4 },
    66: { bits: 0b11110, length: 5 },
    67: { bits: 0b0001, length: 4 },
    68: { bits: 0b11111, length: 5 },
    69: { bits: 0b11101, length: 5 },
    70: { bits: 0b11100, length: 5 },
    71: { bits: 0b10010, length: 5 },
    72: { bits: 0b11000, length: 5 },
    73: { bits: 0b10111, length: 5 },
    74: { bits: 0b10000, length: 5 },
    75: { bits: 0b10001, length: 5 },
    76: { bits: 0b10011, length: 5 },
    77: { bits: 0b00001, length: 5 },
    78: { bits: 0b11001, length: 5 },
    79: { bits: 0b10101, length: 5 },
    80: { bits: 0b11011, length: 5 },
    81: { bits: 0b01010, length: 5 },
    82: { bits: 0b11010, length: 5 },
    83: { bits: 0b0010, length: 4 },
    84: { bits: 0b10100, length: 5 },
    85: { bits: 0b01011, length: 5 },
    86: { bits: 0b01111, length: 5 },
    87: { bits: 0b10110, length: 5 },
    88: { bits: 0b01101, length: 5 },
    89: { bits: 0b01100, length: 5 },
    90: { bits: 0b01110, length: 5 },
    57: { bits: 0b0011, length: 4 },
    49: { bits: 0b000001, length: 6 },
    50: { bits: 0b0000001, length: 7 },
    51: { bits: 0b00000001, length: 8 },
    95: { bits: 0b00000000, length: 8 }
};

export const HUFFMAN_TABLE_REVERSE_4: {
    [id: number]: number;
} = {
    0b0010: 65,
    0b1000: 67,
    0b0100: 83,
    0b1100: 57
};

export const HUFFMAN_TABLE_REVERSE_5: {
    [id: number]: number;
} = {
    0b01111: 66,
    0b11111: 68,
    0b10111: 69,
    0b00111: 70,
    0b01001: 71,
    0b00011: 72,
    0b11101: 73,
    0b00001: 74,
    0b10001: 75,
    0b11001: 76,
    0b10000: 77,
    0b10011: 78,
    0b10101: 79,
    0b11011: 80,
    0b01010: 81,
    0b01011: 82,
    0b00101: 84,
    0b11010: 85,
    0b11110: 86,
    0b01101: 87,
    0b10110: 88,
    0b00110: 89,
    0b01110: 90
};

export const HUFFMAN_TABLE_REVERSE_6: {
    [id: number]: number;
} = {
    0b100000: 49
};

export const HUFFMAN_TABLE_REVERSE_7: {
    [id: number]: number;
} = {
    0b1000000: 50
};

export const HUFFMAN_TABLE_REVERSE_8: {
    [id: number]: number;
} = {
    0b10000000: 51,
    0b00000000: 95
};

export const HUFFMAN_TABLE_REVERSE:
    {
        [id: number]: number;
    }[] = [
        {},
        {},
        {},
        {},
        HUFFMAN_TABLE_REVERSE_4,
        HUFFMAN_TABLE_REVERSE_5,
        HUFFMAN_TABLE_REVERSE_6,
        HUFFMAN_TABLE_REVERSE_7,
        HUFFMAN_TABLE_REVERSE_8
    ];
