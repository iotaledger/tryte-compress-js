import * as crypto from "crypto";
import { compressTrytes } from "../src/compress";
import { decompressTrytes } from "../src/decompress";

test("compress and decompress 81 trytes x1000", () => {
    for (let i = 0; i < 1000; i++) {
        const trytes = generateHash(81);
        const compressed = compressTrytes(trytes);
        if (compressed) {
            const decompressed = decompressTrytes(compressed);
            expect(decompressed).toBe(trytes);
        }
    }
});

test("compress and decompress 2673 trytes x1000", () => {
    for (let i = 0; i < 1000; i++) {
        const trytes = generateHash(2673);
        const compressed = compressTrytes(trytes);
        if (compressed) {
            const decompressed = decompressTrytes(compressed);
            expect(decompressed).toBe(trytes);
        }
    }
});

/**
 * Generate a random hash.
 * @param length The length to generate.
 * @returns The random hash.
 */
function generateHash(length: number): string {
    let hash = "";

    const randomValues = new Uint32Array(crypto.randomBytes(length));

    for (let i = 0; i < length; i++) {
        hash += "ABCDEFGHIJKLMNOPQRSTUVWXYZ9".charAt(randomValues[i] % 27);
    }

    return hash;
}
