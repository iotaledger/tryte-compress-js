import { RLE_ALPHABET } from "./constants";

const RUN_MIN_LENGTH = 3;
const ONE_TRYTE_MAX = 26;
const TWO_TRYTE_MAX = 728;
const THREE_TRYTE_MAX = 19682;

/**
 * Run length encode the tryte string.
 * @param trytes The trytes to run length encode.
 * @returns The run length encoded trytes.
 */
export function runLengthEncode(trytes: string): string {
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

/**
 * Decode the run length encoded trytes,
 * @param encoded The run length encoded data.
 * @returns The plain trytes.
 */
export function runLengthDecode(encoded: string): string {
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
        } else if (encoded[i] === "2") {
            const length = rleToNumber(encoded[i + 1], encoded[i + 2]);
            output += encoded[i + 3].repeat(length);
            i += 3;
        } else if (encoded[i] === "3") {
            const length = rleToNumber(encoded[i + 1], encoded[i + 2], encoded[i + 3]);
            output += encoded[i + 4].repeat(length);
            i += 4;
        } else {
            output += encoded[i];
        }
    }

    return output;
}

/**
 * Convert the number to its run length encoded format.
 * @param val The value to convert.
 * @returns The run length encoded number.
 * @private
 */
function numberToRle(val: number): string {
    if (val <= ONE_TRYTE_MAX) {
        return `1${RLE_ALPHABET[val]}`;
    } else if (val <= TWO_TRYTE_MAX) {
        const val1 = val % 27;
        const val2 = (val - val1) / 27;
        return `2${RLE_ALPHABET[val1]}${RLE_ALPHABET[val2]}`;
    } else {
        const val1 = val % 27;
        const val2 = ((val - val1) / 27) % 27;
        const val3 = (val - (val2 * 27) - val1) / (27 * 27);
        return `3${RLE_ALPHABET[val1]}${RLE_ALPHABET[val2]}${RLE_ALPHABET[val3]}`;
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
function rleToNumber(t1: string, t2?: string, t3?: string): number {
    let val = RLE_ALPHABET.indexOf(t1);
    if (t2 !== undefined) {
        val += RLE_ALPHABET.indexOf(t2) * 27;
    }
    if (t3 !== undefined) {
        val += RLE_ALPHABET.indexOf(t3) * 27 * 27;
    }
    return val;
}
