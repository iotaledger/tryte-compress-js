"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const rle_1 = require("./rle");
/**
 * Compress a trytes string and return a buffer of data.
 * @param trytes The trytes to compress.
 * @returns A buffer of the compressed data.
 */
function compress(trytes) {
    if (trytes === undefined || trytes === null || trytes.length === 0) {
        return undefined;
    }
    if (!/^[ABCDEFGHIJKLMNOPQRSTUVWXYZ9]*$/.test(trytes)) {
        throw new Error("You can only compress trytes with the algorithm.");
    }
    // First run length encode the data to reduce the content
    let rle = rle_1.runLengthEncode(trytes);
    // Add the end of data marker so the decompress knows
    // when to finish processing the data
    rle += constants_1.END_OF_DATA;
    // Convert the rle encoded trytes to their huffman form
    const bytes = [];
    let encoded = "";
    for (let i = 0; i < rle.length; i++) {
        encoded += constants_1.HUFFMAN_TABLE[rle[i]];
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
exports.compress = compress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tcHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBeUQ7QUFDekQsK0JBQXdDO0FBRXhDOzs7O0dBSUc7QUFDSCxTQUFnQixRQUFRLENBQUMsTUFBYztJQUNuQyxJQUFJLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNoRSxPQUFPLFNBQVMsQ0FBQztLQUNwQjtJQUVELElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDbEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0tBQ3ZFO0lBRUQseURBQXlEO0lBQ3pELElBQUksR0FBRyxHQUFHLHFCQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFbEMscURBQXFEO0lBQ3JELHFDQUFxQztJQUNyQyxHQUFHLElBQUksdUJBQVcsQ0FBQztJQUVuQix1REFBdUQ7SUFDdkQsTUFBTSxLQUFLLEdBQWEsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxPQUFPLElBQUkseUJBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEM7S0FDSjtJQUVELCtEQUErRDtJQUMvRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3BCLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDMUU7SUFFRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQWxDRCw0QkFrQ0MifQ==