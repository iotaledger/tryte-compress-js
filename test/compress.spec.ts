import { compress } from "../src/compress";

test("compress() can fail on invalid value", () => {
    expect(compress(<any>undefined)).toBe(undefined);
    expect(compress(<any>null)).toBe(undefined);
    expect(compress("")).toBe(undefined);
});

test("compress() fail with not trytes", () => {
    const cases = [
        " ",
        "abc",
        "ABC1",
        " ABC "
    ];
    for (let i = 0; i < cases.length; i++) {
        expect(() => {
            compress(cases[i]);
        }).toThrowError(/compress trytes/);
    }
});
