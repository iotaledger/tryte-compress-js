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
    let output = "";
    const matches = trytes.match(/(.)\1*/g);
    if (matches) {
        matches.forEach((fullRun) => {
            let run = fullRun;
            while (run.length >= RUN_MIN_LENGTH) {
                const currentRun = run.substr(0, Math.min(THREE_TRYTE_MAX, run.length));
                output += numberToRle(currentRun.length);
                output += currentRun[0];
                run = run.substr(currentRun.length);
            }
            output += run;
        });
    }
    return output;
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
 * Convert the number to its run length encoded format.
 * @param val The value to convert.
 * @returns The run length encoded number.
 * @private
 */
function numberToRle(val) {
    if (val <= ONE_TRYTE_MAX) {
        return `1${lookupBinary(val)}`;
    }
    else if (val <= TWO_TRYTE_MAX) {
        const val1 = val % 27;
        const val2 = (val - val1) / 27;
        return `2${lookupBinary(val1)}${lookupBinary(val2)}`;
    }
    else {
        const val1 = val % 27;
        const val2 = ((val - val1) / 27) % 27;
        const val3 = (val - (val2 * 27) - val1) / (27 * 27);
        return `3${lookupBinary(val1)}${lookupBinary(val2)}${lookupBinary(val3)}`;
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
    let val = lookupTryte(t1);
    if (t2 !== undefined) {
        val += lookupTryte(t2) * 27;
    }
    if (t3 !== undefined) {
        val += lookupTryte(t3) * 27 * 27;
    }
    return val;
}
/**
 * Lookup the tryte binary equivalent in the decompress table.
 * @param num The number to lookup.
 * @returns The trytes value.
 * @private
 */
function lookupBinary(num) {
    return constants_1.RLE_DECOMPRESS_LOOKUP_TABLE[num.toString(2).padStart(5, "0")];
}
/**
 * Lookup the value of the tryte from the compress table.
 * @param tryte The trytes to lookup.
 * @returns The value equivalent.
 * @private
 */
function lookupTryte(tryte) {
    return parseInt(constants_1.RLE_COMPRESS_LOOKUP_TABLE[tryte], 2);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFxRjtBQUVyRixNQUFNLGNBQWMsR0FBRyxDQUFDLENBQUM7QUFDekIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUMxQixNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUM7QUFFOUI7Ozs7R0FJRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxNQUFjO0lBQzFDLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2hFLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFFRCxJQUFJLENBQUMsa0NBQWtDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xELE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQztLQUNoRjtJQUVELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXhDLElBQUksT0FBTyxFQUFFO1FBQ1QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3hCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQztZQUNsQixPQUFPLEdBQUcsQ0FBQyxNQUFNLElBQUksY0FBYyxFQUFFO2dCQUNqQyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDeEUsTUFBTSxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sSUFBSSxVQUFVLENBQUMsQ0FB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