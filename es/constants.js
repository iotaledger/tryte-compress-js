"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Current version of compression algorithm.
 * @private
 */
exports.END_OF_DATA = 95;
// tslint:disable:object-literal-key-quotes
exports.HUFFMAN_TABLE = {
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
exports.HUFFMAN_TABLE_REVERSE_4 = {
    0b0010: 65,
    0b1000: 67,
    0b0100: 83,
    0b1100: 57
};
exports.HUFFMAN_TABLE_REVERSE_5 = {
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
exports.HUFFMAN_TABLE_REVERSE_6 = {
    0b100000: 49
};
exports.HUFFMAN_TABLE_REVERSE_7 = {
    0b1000000: 50
};
exports.HUFFMAN_TABLE_REVERSE_8 = {
    0b10000000: 51,
    0b00000000: 95
};
exports.HUFFMAN_TABLE_REVERSE = [
    {},
    {},
    {},
    {},
    exports.HUFFMAN_TABLE_REVERSE_4,
    exports.HUFFMAN_TABLE_REVERSE_5,
    exports.HUFFMAN_TABLE_REVERSE_6,
    exports.HUFFMAN_TABLE_REVERSE_7,
    exports.HUFFMAN_TABLE_REVERSE_8
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7R0FHRztBQUNVLFFBQUEsV0FBVyxHQUFXLEVBQUUsQ0FBQztBQUV0QywyQ0FBMkM7QUFDOUIsUUFBQSxhQUFhLEdBV3RCO0lBQ0EsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQy9CLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtJQUNoQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7SUFDL0IsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQ2hDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtJQUNoQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7SUFDaEMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQ2hDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtJQUNoQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7SUFDaEMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQ2hDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtJQUNoQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7SUFDaEMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQ2hDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtJQUNoQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7SUFDaEMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQ2hDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtJQUNoQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7SUFDaEMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQy9CLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtJQUNoQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7SUFDaEMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQ2hDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtJQUNoQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7SUFDaEMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQ2hDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtJQUNoQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7SUFDL0IsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQ2pDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtJQUNsQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7SUFDbkMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0NBQ3RDLENBQUM7QUFFVyxRQUFBLHVCQUF1QixHQUVoQztJQUNBLE1BQU0sRUFBRSxFQUFFO0lBQ1YsTUFBTSxFQUFFLEVBQUU7SUFDVixNQUFNLEVBQUUsRUFBRTtJQUNWLE1BQU0sRUFBRSxFQUFFO0NBQ2IsQ0FBQztBQUVXLFFBQUEsdUJBQXVCLEdBRWhDO0lBQ0EsT0FBTyxFQUFFLEVBQUU7SUFDWCxPQUFPLEVBQUUsRUFBRTtJQUNYLE9BQU8sRUFBRSxFQUFFO0lBQ1gsT0FBTyxFQUFFLEVBQUU7SUFDWCxPQUFPLEVBQUUsRUFBRTtJQUNYLE9BQU8sRUFBRSxFQUFFO0lBQ1gsT0FBTyxFQUFFLEVBQUU7SUFDWCxPQUFPLEVBQUUsRUFBRTtJQUNYLE9BQU8sRUFBRSxFQUFFO0lBQ1gsT0FBTyxFQUFFLEVBQUU7SUFDWCxPQUFPLEVBQUUsRUFBRTtJQUNYLE9BQU8sRUFBRSxFQUFFO0lBQ1gsT0FBTyxFQUFFLEVBQUU7SUFDWCxPQUFPLEVBQUUsRUFBRTtJQUNYLE9BQU8sRUFBRSxFQUFFO0lBQ1gsT0FBTyxFQUFFLEVBQUU7SUFDWCxPQUFPLEVBQUUsRUFBRTtJQUNYLE9BQU8sRUFBRSxFQUFFO0lBQ1gsT0FBTyxFQUFFLEVBQUU7SUFDWCxPQUFPLEVBQUUsRUFBRTtJQUNYLE9BQU8sRUFBRSxFQUFFO0lBQ1gsT0FBTyxFQUFFLEVBQUU7SUFDWCxPQUFPLEVBQUUsRUFBRTtDQUNkLENBQUM7QUFFVyxRQUFBLHVCQUF1QixHQUVoQztJQUNBLFFBQVEsRUFBRSxFQUFFO0NBQ2YsQ0FBQztBQUVXLFFBQUEsdUJBQXVCLEdBRWhDO0lBQ0EsU0FBUyxFQUFFLEVBQUU7Q0FDaEIsQ0FBQztBQUVXLFFBQUEsdUJBQXVCLEdBRWhDO0lBQ0EsVUFBVSxFQUFFLEVBQUU7SUFDZCxVQUFVLEVBQUUsRUFBRTtDQUNqQixDQUFDO0FBRVcsUUFBQSxxQkFBcUIsR0FHeEI7SUFDRixFQUFFO0lBQ0YsRUFBRTtJQUNGLEVBQUU7SUFDRixFQUFFO0lBQ0YsK0JBQXVCO0lBQ3ZCLCtCQUF1QjtJQUN2QiwrQkFBdUI7SUFDdkIsK0JBQXVCO0lBQ3ZCLCtCQUF1QjtDQUMxQixDQUFDIn0=