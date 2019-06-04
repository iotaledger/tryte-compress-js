"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const RUN_MIN_LENGTH = 3;
const ONE_TRYTE_MAX = 26;
const TWO_TRYTE_MAX = 728;
const THREE_TRYTE_MAX = 19682;
/**
 * Run length encode the tryte string.
 * @param trytes The trytes to run length encode.
 * @returns The run length encoded trytes.
 */
function runLengthEncode(trytes) {
    if (trytes === undefined || trytes === null || trytes.length === 0) {
        return "";
    }
    if (!/^[ABCDEFGHIJKLMNOPQRSTUVWXYZ9]*$/.test(trytes)) {
        throw new Error("You can only run length encode trytes with the algorithm.");
    }
    let encoded = "";
    let prev = trytes[0];
    let count = 1;
    for (let i = 1; i < trytes.length; i++) {
        if (trytes[i] !== prev) {
            encoded += appendRun(count, prev);
            count = 1;
            prev = trytes[i];
        }
        else {
            count++;
        }
    }
    encoded += appendRun(count, prev);
    return encoded;
}
exports.runLengthEncode = runLengthEncode;
/**
 * Decode the run length encoded trytes,
 * @param encoded The run length encoded data.
 * @returns The plain trytes.
 */
function runLengthDecode(encoded) {
    if (encoded === undefined || encoded === null || encoded.length === 0) {
        return "";
    }
    if (!/^[ABCDEFGHIJKLMNOPQRSTUVWXYZ9123]*$/.test(encoded)) {
        throw new Error("You can only decompress run length encoded trytes with the algorithm.");
    }
    let output = "";
    for (let i = 0; i < encoded.length; i++) {
        if (encoded[i] === "1") {
            const length = rleToNumber(encoded[i + 1]);
            output += encoded[i + 2].repeat(length);
            i += 2;
        }
        else if (encoded[i] === "2") {
            const length = rleToNumber(encoded[i + 1], encoded[i + 2]);
            output += encoded[i + 3].repeat(length);
            i += 3;
        }
        else if (encoded[i] === "3") {
            const length = rleToNumber(encoded[i + 1], encoded[i + 2], encoded[i + 3]);
            output += encoded[i + 4].repeat(length);
            i += 4;
        }
        else {
            output += encoded[i];
        }
    }
    return output;
}
exports.runLengthDecode = runLengthDecode;
/**
 * Append a run of characters to the output.
 * @param count The number of chars.
 * @param prev The character to add.
 * @returns The encoded run.
 * @private
 */
function appendRun(count, prev) {
    let encoded = "";
    while (count >= RUN_MIN_LENGTH) {
        const currentRunLength = Math.min(THREE_TRYTE_MAX, count);
        encoded += numberToRle(currentRunLength);
        encoded += prev;
        count -= currentRunLength;
    }
    if (count > 0) {
        encoded += prev.repeat(count);
    }
    return encoded;
}
/**
 * Convert the number to its run length encoded format.
 * @param val The value to convert.
 * @returns The run length encoded number.
 * @private
 */
function numberToRle(val) {
    if (val <= ONE_TRYTE_MAX) {
        return `1${constants_1.RLE_ALPHABET[val]}`;
    }
    else if (val <= TWO_TRYTE_MAX) {
        const val1 = val % 27;
        const val2 = (val - val1) / 27;
        return `2${constants_1.RLE_ALPHABET[val1]}${constants_1.RLE_ALPHABET[val2]}`;
    }
    else {
        const val1 = val % 27;
        const val2 = ((val - val1) / 27) % 27;
        const val3 = (val - (val2 * 27) - val1) / (27 * 27);
        return `3${constants_1.RLE_ALPHABET[val1]}${constants_1.RLE_ALPHABET[val2]}${constants_1.RLE_ALPHABET[val3]}`;
    }
}
/**
 * Convert rle encoded number back to number,
 * @param t1 The first tryte.
 * @param t2 The second tryte.
 * @param t3 The third tryte.
 * @returns The number,
 * @private
 */
function rleToNumber(t1, t2, t3) {
    let val = constants_1.RLE_ALPHABET.indexOf(t1);
    if (t2 !== undefined) {
        val += constants_1.RLE_ALPHABET.indexOf(t2) * 27;
    }
    if (t3 !== undefined) {
        val += constants_1.RLE_ALPHABET.indexOf(t3) * 27 * 27;
    }
    return val;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUEyQztBQUUzQyxNQUFNLGNBQWMsR0FBRyxDQUFDLENBQUM7QUFDekIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUMxQixNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUM7QUFFOUI7Ozs7R0FJRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxNQUFjO0lBQzFDLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2hFLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFFRCxJQUFJLENBQUMsa0NBQWtDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xELE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQztLQUNoRjtJQUVELElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRWQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3BCLE9BQU8sSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDVixJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BCO2FBQU07WUFDSCxLQUFLLEVBQUcsQ0FBQztTQUNaO0tBQ0o7SUFFRCxPQUFPLElBQUksU0FBUyxDQUFDLEtB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