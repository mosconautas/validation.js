import assert from "node:assert";
import { InvalidIsNotArray, IsArrayValidator } from "../../src";

describe(IsArrayValidator.name, () => {
    let sut: IsArrayValidator;

    beforeAll(() => {
        sut = new IsArrayValidator("name");
    });

    it("should return `null` if value is `null`", () => {
        assert.strictEqual(sut.validate(null), null);
    });

    it("should return `null` if value is `undefined`", () => {
        assert.strictEqual(sut.validate(undefined), null);
    });

    it("should return `null` if value is an array", () => {
        assert.strictEqual(sut.validate([]), null);
    });

    it("should return `null` if value is an array in an array", () => {
        assert.strictEqual(sut.validate([[]]), null);
    });

    it("should return `InvalidIsNotArray` if value is not an array", () => {
        assert(sut.validate(1) instanceof InvalidIsNotArray);
    });

    it("should return `InvalidIsNotArray` if value is boolean", () => {
        assert(sut.validate(false) instanceof InvalidIsNotArray);
    });
});
