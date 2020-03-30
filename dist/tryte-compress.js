(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.IotaCompress = {}));
}(this, (function (exports) { 'use strict';

    /**
     * Current version of compression algorithm.
     * @private
     */
    var END_OF_DATA = 95;
    // tslint:disable:object-literal-key-quotes
    var HUFFMAN_TABLE = {
        65: { bits: 4, length: 4 },
        66: { bits: 30, length: 5 },
        67: { bits: 1, length: 4 },
        68: { bits: 31, length: 5 },
        69: { bits: 29, length: 5 },
        70: { bits: 28, length: 5 },
        71: { bits: 18, length: 5 },
        72: { bits: 24, length: 5 },
        73: { bits: 23, length: 5 },
        74: { bits: 16, length: 5 },
        75: { bits: 17, length: 5 },
        76: { bits: 19, length: 5 },
        77: { bits: 1, length: 5 },
        78: { bits: 25, length: 5 },
        79: { bits: 21, length: 5 },
        80: { bits: 27, length: 5 },
        81: { bits: 10, length: 5 },
        82: { bits: 26, length: 5 },
        83: { bits: 2, length: 4 },
        84: { bits: 20, length: 5 },
        85: { bits: 11, length: 5 },
        86: { bits: 15, length: 5 },
        87: { bits: 22, length: 5 },
        88: { bits: 13, length: 5 },
        89: { bits: 12, length: 5 },
        90: { bits: 14, length: 5 },
        57: { bits: 3, length: 4 },
        49: { bits: 1, length: 6 },
        50: { bits: 1, length: 7 },
        51: { bits: 1, length: 8 },
        95: { bits: 0, length: 8 }
    };
    var HUFFMAN_TABLE_REVERSE_4 = {
        2: 65,
        8: 67,
        4: 83,
        12: 57
    };
    var HUFFMAN_TABLE_REVERSE_5 = {
        15: 66,
        31: 68,
        23: 69,
        7: 70,
        9: 71,
        3: 72,
        29: 73,
        1: 74,
        17: 75,
        25: 76,
        16: 77,
        19: 78,
        21: 79,
        27: 80,
        10: 81,
        11: 82,
        5: 84,
        26: 85,
        30: 86,
        13: 87,
        22: 88,
        6: 89,
        14: 90
    };
    var HUFFMAN_TABLE_REVERSE_6 = {
        32: 49
    };
    var HUFFMAN_TABLE_REVERSE_7 = {
        64: 50
    };
    var HUFFMAN_TABLE_REVERSE_8 = {
        128: 51,
        0: 95
    };
    var HUFFMAN_TABLE_REVERSE = [
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

    var RUN_MIN_LENGTH = 3;
    var ONE_TRYTE_MAX = 26;
    var TWO_TRYTE_MAX = 728;
    var THREE_TRYTE_MAX = 19682;
    /**
     * Run length encode the tryte string.
     * @param trytes The trytes to run length encode.
     * @param rleEncoded The rle encoded data.
     * @returns The run length encoded length.
     * @private
     */
    function runLengthEncode(trytes, rleEncoded) {
        var writePos = 0;
        var prev = trytes[0];
        var count = 1;
        for (var i = 1; i < trytes.length; i++) {
            if (trytes[i] !== prev) {
                writePos = appendRun(rleEncoded, writePos, count, prev);
                count = 1;
                prev = trytes[i];
            }
            else {
                count++;
            }
        }
        return appendRun(rleEncoded, writePos, count, prev);
    }
    /**
     * Decode the run length encoded trytes,
     * @param encoded The run length encoded data.
     * @returns The plain trytes.
     * @private
     */
    function runLengthDecode(encoded) {
        var decoded = [];
        for (var i = 0; i < encoded.length; i++) {
            if (encoded[i] === 49) {
                rleToNumber(decoded, encoded[i + 2], encoded[i + 1]);
                i += 2;
            }
            else if (encoded[i] === 50) {
                rleToNumber(decoded, encoded[i + 3], encoded[i + 1], encoded[i + 2]);
                i += 3;
            }
            else if (encoded[i] === 51) {
                rleToNumber(decoded, encoded[i + 4], encoded[i + 1], encoded[i + 2], encoded[i + 3]);
                i += 4;
            }
            else {
                decoded.push(encoded[i]);
            }
        }
        return Buffer.from(decoded);
    }
    /**
     * Append a run of characters to the output.
     * @param encoded The rle encoded data.
     * @param writePos The current position to write into the buffer.
     * @param count The number of chars.
     * @param prev The character to add.
     * @returns The updated write position.
     * @private
     */
    function appendRun(encoded, writePos, count, prev) {
        var localWritePos = writePos;
        if (count === 1) {
            encoded.writeUInt8(prev, localWritePos++);
        }
        else {
            var remaining = count;
            while (remaining >= RUN_MIN_LENGTH) {
                var currentRunLength = Math.min(THREE_TRYTE_MAX, remaining);
                localWritePos = numberToRle(encoded, localWritePos, prev, currentRunLength);
                remaining -= currentRunLength;
            }
            if (remaining > 0) {
                for (var i = 0; i < remaining; i++) {
                    encoded.writeUInt8(prev, localWritePos++);
                }
            }
        }
        return localWritePos;
    }
    /**
     * Convert the number to its run length encoded format.
     * @param encoded The rle encoded data.
     * @param writePos The current position to write into the buffer.
     * @param charCode The char code of the number being repeated.
     * @param val The value to convert.
     * @returns The updated writepos.
     * @private
     */
    function numberToRle(encoded, writePos, charCode, val) {
        var localWritePos = writePos;
        if (val <= ONE_TRYTE_MAX) {
            encoded.writeUInt8(49, localWritePos++);
            encoded.writeUInt8(val === 0 ? 57 : val + 64, localWritePos++);
        }
        else if (val <= TWO_TRYTE_MAX) {
            var val1 = val % 27;
            var val2 = (val - val1) / 27;
            encoded.writeUInt8(50, localWritePos++);
            encoded.writeUInt8(val1 === 0 ? 57 : val1 + 64, localWritePos++);
            encoded.writeUInt8(val2 === 0 ? 57 : val2 + 64, localWritePos++);
        }
        else {
            var val1 = val % 27;
            var val2 = ((val - val1) / 27) % 27;
            var val3 = (val - (val2 * 27) - val1) / (27 * 27);
            encoded.writeUInt8(51, localWritePos++);
            encoded.writeUInt8(val1 === 0 ? 57 : val1 + 64, localWritePos++);
            encoded.writeUInt8(val2 === 0 ? 57 : val2 + 64, localWritePos++);
            encoded.writeUInt8(val3 === 0 ? 57 : val3 + 64, localWritePos++);
        }
        encoded.writeUInt8(charCode, localWritePos++);
        return localWritePos;
    }
    /**
     * Convert rle encoded number back to number,
     * @param decoded The rle encoded data.
     * @param charCode The char code of the number to repeat.
     * @param t1 The first tryte.
     * @param t2 The second tryte.
     * @param t3 The third tryte.
     * @private
     */
    function rleToNumber(decoded, charCode, t1, t2, t3) {
        var val = t1 === 57 ? 0 : t1 - 64;
        if (t2 !== undefined) {
            val += (t2 === 57 ? 0 : t2 - 64) * 27;
        }
        if (t3 !== undefined) {
            val += (t3 === 57 ? 0 : t3 - 64) * 27 * 27;
        }
        for (var i = 0; i < val; i++) {
            decoded.push(charCode);
        }
    }

    /**
     * Compress a trytes string and return a buffer of data.
     * @param trytes The trytes to compress as uint 8 array.
     * @returns A buffer of the compressed data.
     */
    function compressTrytes(trytes) {
        if (!/^[ABCDEFGHIJKLMNOPQRSTUVWXYZ9]*$/.test(trytes)) {
            throw new Error("You can only compress trytes with the algorithm.");
        }
        var arr = Buffer.alloc(trytes.length);
        for (var i = 0; i < trytes.length; i++) {
            arr[i] = trytes.charCodeAt(i);
        }
        return compress(arr);
    }
    /**
     * Compress a trytes array and return a buffer of data.
     * @param trytes The trytes to compress as binary data.
     * @returns A buffer of the compressed data.
     */
    function compress(trytes) {
        if (trytes === undefined || trytes === null || trytes.length === 0) {
            throw new Error("There is no data to compress");
        }
        if (!Buffer.isBuffer(trytes)) {
            throw new Error("The trytes must be a Buffer, use compressTrytes for string");
        }
        // First run length encode the data to reduce the content
        // + 1 on the length to make space for the end of data if no rle occured
        var rleEncoded = Buffer.alloc(trytes.length + 1);
        var rleWritePos = runLengthEncode(trytes, rleEncoded);
        // Add the end of data marker so the decompress knows
        // when to finish processing the data
        rleEncoded[rleWritePos++] = END_OF_DATA;
        // Convert the rle encoded trytes to their huffman form
        var huffmanEncoded = Buffer.alloc(rleWritePos);
        var huffmanEncodedWritePos = 0;
        var encodedBits = 0;
        var encodedBitsLength = 0;
        for (var i = 0; i < rleWritePos; i++) {
            var hBits = HUFFMAN_TABLE[rleEncoded[i]];
            for (var j = hBits.length - 1; j >= 0; j--) {
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

    /**
     * Decompress a binary buffer back to trytes string.
     * @param bytes The trytes to compress as uint 8 array.
     * @returns The trytes as a string.
     */
    function decompressTrytes(bytes) {
        var decompressed = decompress(bytes);
        var trytes = "";
        for (var i = 0; i < decompressed.length; i++) {
            trytes += String.fromCharCode(decompressed[i]);
        }
        return trytes;
    }
    /**
     * Decompress a binary buffer back to binary trytes buffer.
     * @param bytes The buffer to decompress.
     * @returns The tryte string.
     */
    function decompress(bytes) {
        if (bytes === undefined || bytes === null || bytes.length === 0) {
            throw new Error("There is no data to decompress");
        }
        if (!Buffer.isBuffer(bytes)) {
            throw new Error("The bytes must be a Buffer");
        }
        // Convert the huffman encoded data back to the full rle
        var decoded = [];
        var readPos = 0;
        var foundEnd = false;
        var bitIndex = 0;
        while (!foundEnd) {
            var key = 0;
            var keyBitCount = 0;
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
            var val = HUFFMAN_TABLE_REVERSE[keyBitCount][key];
            if (val === END_OF_DATA) {
                foundEnd = true;
            }
            else {
                decoded.push(val);
            }
        }
        // Run length decode the data
        return runLengthDecode(decoded);
    }

    exports.compress = compress;
    exports.compressTrytes = compressTrytes;
    exports.decompress = decompress;
    exports.decompressTrytes = decompressTrytes;
    exports.runLengthDecode = runLengthDecode;
    exports.runLengthEncode = runLengthEncode;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
