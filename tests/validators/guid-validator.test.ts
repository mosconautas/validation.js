import assert from "node:assert";
import { InvalidIsNotGuid, InvalidIsNotString, IsGuidValidator } from "../../src";

describe(IsGuidValidator.name, () => {
    let sut: IsGuidValidator;

    beforeAll(() => {
        sut = new IsGuidValidator("test");
    });

    it("should return `null` if the value is `null`", () => {
        assert.strictEqual(sut.validate(null), null);
    });

    it("should return `null` if the value is `undefined`", () => {
        assert.strictEqual(sut.validate(undefined), null);
    });

    it("should return `null` if the value is a valid guid", () => {
        assert.strictEqual(sut.validate("00000000-0000-0000-0000-000000000000"), null);
    });

    it("should return `null` if the value is a valid uid", () => {
        assert.strictEqual(sut.validate("00000000000000000000000000"), null);
    });

    it("should return `null` if the value is an array with a valid guid", () => {
        assert.strictEqual(sut.validate(["00000000-0000-0000-0000-000000000000"]), null);
    });

    it("should return `InvalidIsNotGuid` if the value is a string with a length of 0", () => {
        assert(sut.validate("") instanceof InvalidIsNotGuid);
    });

    it("should return `InvalidIsNotGuid` if the value is an array with a length of 0", () => {
        assert.strictEqual(sut.validate([]), null);
    });

    it("should return `InvalidIsNotGuid` if the value is a string with a length of 4", () => {
        assert(sut.validate("abcd") instanceof InvalidIsNotGuid);
    });

    it("should return `InvalidIsNotGuid` if the value is an array with a length of 4", () => {
        assert(sut.validate([1, 2, 3, 4]) instanceof InvalidIsNotString);
    });

    it("should return `InvalidIsNotGuid` if the value is a string with a length of 4", () => {
        assert(sut.validate("abcd") instanceof InvalidIsNotGuid);
    });
});
