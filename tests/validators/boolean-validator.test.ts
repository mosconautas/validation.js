import assert from "node:assert";
import { InvalidIsNotBoolean, IsBooleanValidator } from "../../src";

describe(IsBooleanValidator.name, () => {
    let sut: IsBooleanValidator;

    beforeAll(() => {
        sut = new IsBooleanValidator("name");
    });

    it("should return `null` if value is `null`", () => {
        assert.strictEqual(sut.validate(null), null);
    });

    it("should return `null` if value is `undefined`", () => {
        assert.strictEqual(sut.validate(undefined), null);
    });

    it("should return `null` if value is a boolean", () => {
        assert.strictEqual(sut.validate(true), null);
    });

    it("should return `null` if value is a boolean in an array", () => {
        assert.strictEqual(sut.validate([true]), null);
    });

    it("should return `null` if value is an empty array", () => {
        assert.strictEqual(sut.validate([]), null);
    });

    it("should return `InvalidIsNotBoolean` if value is not a boolean", () => {
        assert(sut.validate(1) instanceof InvalidIsNotBoolean);
    });

    it("should return `InvalidIsNotBoolean` if value is not a boolean in an array", () => {
        assert(sut.validate([1, true]) instanceof InvalidIsNotBoolean);
    });

    it("should return `InvalidIsNotBoolean` if value is not a boolean in an array (string)", () => {
        assert(sut.validate([1, "true"]) instanceof InvalidIsNotBoolean);
    });
});
