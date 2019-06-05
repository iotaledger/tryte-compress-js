import { decompress } from "../src/decompress";

test("decompress() can fail on invalid value", () => {
    expect(() => decompress(<any>undefined)).toThrowError(/no data/);
    expect(() => decompress(<any>null)).toThrowError(/no data/);
    expect(() => decompress(Buffer.from(""))).toThrowError(/no data/);
});
