"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RUN_MIN_LENGTH = 3;
const ONE_TRYTE_MAX = 26;
const TWO_TRYTE_MAX = 728;
const THREE_TRYTE_MAX = 19682;
/**
 * Run length encode the tryte string.
 * @param trytes The trytes to run length encode.
 * @param rleEncoded The rle encoded data.
 * @returns The run length encoded length.
 * @private
 */
function runLengthEncode(trytes, rleEncoded) {
    let writePos = 0;
    let prev = trytes[0];
    let count = 1;
    for (let i = 1; i < trytes.length; i++) {
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
exports.runLengthEncode = runLengthEncode;
/**
 * Decode the run length encoded trytes,
 * @param encoded The run length encoded data.
 * @returns The plain trytes.
 * @private
 */
function runLengthDecode(encoded) {
    const decoded = [];
    for (let i = 0; i < encoded.length; i++) {
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
exports.runLengthDecode = runLengthDecode;
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
    let localWritePos = writePos;
    if (count === 1) {
        encoded.writeUInt8(prev, localWritePos++);
    }
    else {
        let remaining = count;
        while (remaining >= RUN_MIN_LENGTH) {
            const currentRunLength = Math.min(THREE_TRYTE_MAX, remaining);
            localWritePos = numberToRle(encoded, localWritePos, prev, currentRunLength);
            remaining -= currentRunLength;
        }
        if (remaining > 0) {
            for (let i = 0; i < remaining; i++) {
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
    let localWritePos = writePos;
    if (val <= ONE_TRYTE_MAX) {
        encoded.writeUInt8(49, localWritePos++);
        encoded.writeUInt8(val === 0 ? 57 : val + 64, localWritePos++);
    }
    else if (val <= TWO_TRYTE_MAX) {
        const val1 = val % 27;
        const val2 = (val - val1) / 27;
        encoded.writeUInt8(50, localWritePos++);
        encoded.writeUInt8(val1 === 0 ? 57 : val1 + 64, localWritePos++);
        encoded.writeUInt8(val2 === 0 ? 57 : val2 + 64, localWritePos++);
    }
    else {
        const val1 = val % 27;
        const val2 = ((val - val1) / 27) % 27;
        const val3 = (val - (val2 * 27) - val1) / (27 * 27);
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
    let val = t1 === 57 ? 0 : t1 - 64;
    if (t2 !== undefined) {
        val += (t2 === 57 ? 0 : t2 - 64) * 27;
    }
    if (t3 !== undefined) {
        val += (t3 === 57 ? 0 : t3 - 64) * 27 * 27;
    }
    for (let i = 0; i < val; i++) {
        decoded.push(charCode);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQztBQUN6QixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDekIsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDO0FBQzFCLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQztBQUU5Qjs7Ozs7O0dBTUc7QUFDSCxTQUFnQixlQUFlLENBQUMsTUFBYyxFQUFFLFVBQWtCO0lBQzlELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNqQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRWQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3BCLFFBQVEsR0FBRyxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEQsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNWLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7YUFBTTtZQUNILEtBQUssRUFBRSxDQUFDO1NBQ1g7S0FDSjtJQUVELE9BQU8sU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFoQkQsMENBZ0JDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixlQUFlLENBQUMsT0FBaUI7SUFDN0MsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO0lBRTdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENB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