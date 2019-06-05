import { compress, compressTrytes } from "../src/compress";

test("compress() can fail on invalid value", () => {
    expect(() => compress(<any>undefined)).toThrowError(/no data/);
    expect(() => compress(<any>null)).toThrowError(/no data/);
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
            compressTrytes(cases[i]);
        }).toThrowError(/compress trytes/);
    }
});
