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
export function runLengthEncode(trytes: Buffer, rleEncoded: Buffer): number {
    let writePos = 0;
    let prev = trytes[0];
    let count = 1;

    for (let i = 1; i < trytes.length; i++) {
        if (trytes[i] !== prev) {
            writePos = appendRun(rleEncoded, writePos, count, prev);
            count = 1;
            prev = trytes[i];
        } else {
            count++;
        }
    }

    writePos = appendRun(rleEncoded, writePos, count, prev);

    return writePos;
}

/**
 * Decode the run length encoded trytes,
 * @param encoded The run length encoded data.
 * @returns The plain trytes.
 * @private
 */
export function runLengthDecode(encoded: number[]): Buffer {
    const decoded: number[] = [];

    for (let i = 0; i < encoded.length; i++) {
        if (encoded[i] === 49) {
            rleToNumber(decoded, encoded[i + 2], encoded[i + 1]);
            i += 2;
        } else if (encoded[i] === 50) {
            rleToNumber(decoded, encoded[i + 3], encoded[i + 1], encoded[i + 2]);
            i += 3;
        } else if (encoded[i] === 51) {
            rleToNumber(decoded, encoded[i + 4], encoded[i + 1], encoded[i + 2], encoded[i + 3]);
            i += 4;
        } else {
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
function appendRun(encoded: Buffer, writePos: number, count: number, prev: number): number {
    let localWritePos = writePos;

    if (count === 1) {
        encoded.writeUInt8(prev, localWritePos++);
    } else {
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
function numberToRle(encoded: Buffer, writePos: number, charCode: number, val: number): number {
    let localWritePos = writePos;
    if (val <= ONE_TRYTE_MAX) {
        encoded.writeUInt8(49, localWritePos++);
        encoded.writeUInt8(val === 0 ? 57 : val + 64, localWritePos++);
    } else if (val <= TWO_TRYTE_MAX) {
        const val1 = val % 27;
        const val2 = (val - val1) / 27;
        encoded.writeUInt8(50, localWritePos++);
        encoded.writeUInt8(val1 === 0 ? 57 : val1 + 64, localWritePos++);
        encoded.writeUInt8(val2 === 0 ? 57 : val2 + 64, localWritePos++);
    } else {
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
function rleToNumber(decoded: number[], charCode: number, t1: number, t2?: number, t3?: number): void {
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
