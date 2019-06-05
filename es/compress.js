"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const rle_1 = require("./rle");
/**
 * Compress a trytes string and return a buffer of data.
 * @param trytes The trytes to compress as uint 8 array.
 * @returns A buffer of the compressed data.
 */
function compressTrytes(trytes) {
    if (!/^[ABCDEFGHIJKLMNOPQRSTUVWXYZ9]*$/.test(trytes)) {
        throw new Error("You can only compress trytes with the algorithm.");
    }
    const arr = Buffer.alloc(trytes.length);
    for (let i = 0; i < trytes.length; i++) {
        arr[i] = trytes.charCodeAt(i);
    }
    return compress(arr);
}
exports.compressTrytes = compressTrytes;
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
    const rleEncoded = Buffer.alloc(trytes.length + 1);
    let rleWritePos = rle_1.runLengthEncode(trytes, rleEncoded);
    // Add the end of data marker so the decompress knows
    // when to finish processing the data
    rleEncoded[rleWritePos++] = constants_1.END_OF_DATA;
    // Convert the rle encoded trytes to their huffman form
    const huffmanEncoded = Buffer.alloc(rleWritePos);
    let huffmanEncodedWritePos = 0;
    let encodedBits = 0;
    let encodedBitsLength = 0;
    for (let i = 0; i < rleWritePos; i++) {
        const hBits = constants_1.HUFFMAN_TABLE[rleEncoded[i]];
        for (let j = hBits.length - 1; j >= 0; j--) {
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
exports.compress = compress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tcHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBeUQ7QUFDekQsK0JBQXdDO0FBRXhDOzs7O0dBSUc7QUFDSCxTQUFnQixjQUFjLENBQUMsTUFBYztJQUN6QyxJQUFJLENBQUMsa0NBQWtDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xELE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztLQUN2RTtJQUVELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pDO0lBRUQsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQVhELHdDQVdDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxNQUFjO0lBQ25DLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2hFLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztLQUNuRDtJQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQztLQUNqRjtJQUVELHlEQUF5RDtJQUN6RCx3RUFBd0U7SUFDeEUsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25ELElBQUksV0FBVyxHQUFHLHFCQUFlLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRXRELHFEQUFxRDtJQUNyRCxxQ0FBcUM7SUFDckMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsdUJBQVcsQ0FBQztJQUV4Qyx1REFBdUQ7SUFDdkQsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqRCxJQUFJLHNCQUFzQixHQUFHLENBQUMsQ0FBQztJQUMvQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDcEIsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFFMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxNQUFNLEtBQUssR0FBRyx5QkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxXQUFXLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUM7WUFDL0QsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQixJQUFJLGlCQUFpQixLQUFLLENBQUMsRUFBRTtnQkFDekIsY0FBYyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLFdBQVcsR0FBRyxDQUFDLENBQUM7YUFDbkI7U0FDSjtLQUNKO0lBRUQsK0RBQStEO0lBQy9ELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZCLGNBQWMsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLHNCQUFzQixFQUFFLENBQUMsQ0FBQztLQUNwRTtJQUVELE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBMUNELDRCQTBDQyJ9