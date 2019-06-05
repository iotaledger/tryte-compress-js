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
    writePos = appendRun(rleEncoded, writePos, count, prev);
    return writePos;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQztBQUN6QixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDekIsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDO0FBQzFCLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQztBQUU5Qjs7Ozs7O0dBTUc7QUFDSCxTQUFnQixlQUFlLENBQUMsTUFBYyxFQUFFLFVBQWtCO0lBQzlELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNqQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRWQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3BCLFFBQVEsR0FBRyxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEQsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNWLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7YUFBTTtZQUNILEtBQUssRUFBRSxDQUFDO1NBQ1g7S0FDSjtJQUVELFFBQVEsR0FBRyxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFeEQsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQWxCRCwwQ0FrQkM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxPQUFpQjtJQUM3QyxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7SUFFN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxD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