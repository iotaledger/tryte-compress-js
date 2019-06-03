import { runLengthDecode, runLengthEncode } from "../src/rle";

test("runLengthEncode() can fail on invalid value", () => {
    expect(runLengthEncode(<any>undefined)).toBe("");
    expect(runLengthEncode(<any>null)).toBe("");
    expect(runLengthEncode("")).toBe("");
});

test("runLengthEncode() fail with not trytes", () => {
    const cases = [
        " ",
        "abc",
        "ABC1",
        " ABC "
    ];
    for (let i = 0; i < cases.length; i++) {
        expect(() => {
            runLengthEncode(cases[i]);
        }).toThrowError(/run length encode trytes/);
    }
});

test("runLengthEncode() will encode with shortest run", () => {
    expect(runLengthEncode("AAAA")).toBe("1DA");
});

test("runLengthEncode() will encode one with max length < 27", () => {
    expect(runLengthEncode("A".repeat(26))).toBe("1ZA");
});

test("runLengthEncode() will encode two with min length = 27", () => {
    expect(runLengthEncode("A".repeat(27))).toBe("29AA");
});

test("runLengthDecode() can fail on invalid value", () => {
    expect(runLengthDecode(<any>undefined)).toBe("");
    expect(runLengthDecode(<any>null)).toBe("");
    expect(runLengthDecode("")).toBe("");
});

test("runLengthDecode() fail with not run length encoded trytes", () => {
    const cases = [
        " ",
        "abc",
        "ABC4",
        " ABC "
    ];
    for (let i = 0; i < cases.length; i++) {
        expect(() => {
            runLengthDecode(cases[i]);
        }).toThrowError(/run length encoded trytes/);
    }
});

test("runLengthDecode() will decode with no run too short", () => {
    expect(runLengthDecode("AAA")).toBe("AAA");
});

test("runLengthDecode() will decode with shortest run", () => {
    expect(runLengthDecode("1DA")).toBe("AAAA");
});

test("runLengthDecode() will decode one with max length < 27", () => {
    expect(runLengthDecode("1ZA")).toBe("A".repeat(26));
});

test("runLengthDecode() will decode two with min length = 27", () => {
    expect(runLengthDecode("29AA")).toBe("A".repeat(27));
});
