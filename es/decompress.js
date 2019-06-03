"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const rle_1 = require("./rle");
/**
 * Decompress the buffer back to a tryte string.
 * @param buffer The buffer to decompress.
 * @returns The tryte string.
 */
function decompress(buffer) {
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
        while (!(key in constants_1.HUFFMAN_TABLE_REVERSE)) {
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
        const val = constants_1.HUFFMAN_TABLE_REVERSE[key];
        if (val === constants_1.END_OF_DATA) {
            foundEnd = true;
        }
        else {
            decoded += val;
        }
    }
    // Run length decode the data
    return rle_1.runLengthDecode(decoded);
}
exports.decompress = decompress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb21wcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWNvbXByZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQWlFO0FBQ2pFLCtCQUF3QztBQUV4Qzs7OztHQUlHO0FBQ0gsU0FBZ0IsVUFBVSxDQUFDLE1BQWM7SUFDckMsSUFBSSxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDOUQsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUVELHdEQUF3RDtJQUN4RCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNyQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDakIsT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUNkLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLG9EQUFvRDtRQUNwRCxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksaUNBQXFCLENBQUMsRUFBRTtZQUNwQyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7YUFDOUQ7WUFFRCx5REFBeUQ7WUFDekQsdUJBQXVCO1lBQ3ZCLElBQUksUUFBUSxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNqQixTQUFTLEVBQUUsQ0FBQztnQkFDWixRQUFRLEdBQUcsQ0FBQyxDQUFDO2FBQ2hCO1lBRUQsOENBQThDO1lBQzlDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQzFELFFBQVEsRUFBRSxDQUFDO1NBQ2Q7UUFFRCw4Q0FBOEM7UUFDOUMsaURBQWlEO1FBQ2pELDJCQUEyQjtRQUMzQixNQUFNLEdBQUcsR0FBRyxpQ0FBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxJQUFJLEdBQUcsS0FBSyx1QkFBVyxFQUFFO1lBQ3JCLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDbkI7YUFBTTtZQUNILE9BQU8sSUFBSSxHQUFHLENBQUM7U0FDbEI7S0FDSjtJQUVELDZCQUE2QjtJQUM3QixPQUFPLHFCQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQTVDRCxnQ0E0Q0MifQ==