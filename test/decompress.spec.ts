import { decompress } from "../src/decompress";

test("decompress() can fail on invalid value", () => {
    expect(decompress(<any>undefined)).toBe("");
    expect(decompress(<any>null)).toBe("");
    expect(decompress(Buffer.from(""))).toBe("");
});
