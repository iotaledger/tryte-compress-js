"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const rle_1 = require("./rle");
/**
 * Decompress a binary buffer back to trytes string.
 * @param bytes The trytes to compress as uint 8 array.
 * @returns The trytes as a string.
 */
function decompressTrytes(bytes) {
    const decompressed = decompress(bytes);
    let trytes = "";
    for (let i = 0; i < decompressed.length; i++) {
        trytes += String.fromCharCode(decompressed[i]);
    }
    return trytes;
}
exports.decompressTrytes = decompressTrytes;
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
    const decoded = [];
    let readPos = 0;
    let foundEnd = false;
    let bitIndex = 0;
    while (!foundEnd) {
        let key = 0;
        let keyBitCount = 0;
        // Build a key until we find it in the huffman table
        while (!(constants_1.HUFFMAN_TABLE_REVERSE[keyBitCount][key])) {
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
        const val = constants_1.HUFFMAN_TABLE_REVERSE[keyBitCount][key];
        if (val === constants_1.END_OF_DATA) {
            foundEnd = true;
        }
        else {
            decoded.push(val);
        }
    }
    // Run length decode the data
    return rle_1.runLengthDecode(decoded);
}
exports.decompress = decompress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb21wcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWNvbXByZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQWlFO0FBQ2pFLCtCQUF3QztBQUV4Qzs7OztHQUlHO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsS0FBYTtJQUMxQyxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFdkMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFDLE1BQU0sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xEO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVRELDRDQVNDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFVBQVUsQ0FBQyxLQUFhO0lBQ3BDLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzdELE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztLQUNyRDtJQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztLQUNqRDtJQUVELHdEQUF3RDtJQUN4RCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbkIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNyQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFFakIsT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUNkLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUVwQixvREFBb0Q7UUFDcEQsT0FBTyxDQUFDLENBQUMsaUNBQXFCLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUMvQyxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxXQUFXLENBQUM7WUFDNUQsV0FBVyxFQUFFLENBQUM7WUFDZCxRQUFRLEVBQUUsQ0FBQztZQUVYLElBQUksUUFBUSxLQUFLLENBQUMsRUFBRTtnQkFDaEIsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsUUFBUSxHQUFHLENBQUMsQ0FBQzthQUNoQjtTQUNKO1FBRUQsOENBQThDO1FBQzlDLGlEQUFpRDtRQUNqRCwyQkFBMkI7UUFDM0IsTUFBTSxHQUFHLEdBQUcsaUNBQXFCLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsSUFBSSxHQUFHLEtBQUssdUJBQVcsRUFBRTtZQUNyQixRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ25CO2FBQU07WUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO0tBQ0o7SUFFRCw2QkFBNkI7SUFDN0IsT0FBTyxxQkFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUEzQ0QsZ0NBMkNDIn0=