import assert from "node:assert";
import { before, describe, it } from "node:test";
import { InvalidLength, InvalidMaxLength, InvalidMinLength, LengthValidator } from "../../src";

describe(LengthValidator.name, () => {
    let sut: LengthValidator;

    before(() => {
        sut = new LengthValidator("test", { min: 1, max: 3 });
    });

    it("should return `null` if the value is `null`", () => {
        assert.strictEqual(sut.validate(null), null);
    });

    it("should return `null` if the value is `undefined`", () => {
        assert.strictEqual(sut.validate(undefined), null);
    });

    it("should return `null` if the value is a string with a length of 1", () => {
        assert.strictEqual(sut.validate("a"), null);
    });

    it("should return `null` if the value is a string with a length of 2", () => {
        assert.strictEqual(sut.validate("ab"), null);
    });

    it("should return `null` if the value is a string with a length of 3", () => {
        assert.strictEqual(sut.validate("abc"), null);
    });

    it("should return `null` if the value is an array with a length of 1", () => {
        assert.strictEqual(sut.validate([1]), null);
    });

    it("should return `null` if the value is an array with a length of 2", () => {
        assert.strictEqual(sut.validate([1, 2]), null);
    });

    it("should return `null` if the value is an array with a length of 3", () => {
        assert.strictEqual(sut.validate([1, 2, 3]), null);
    });

    it("should return `InvalidMinLength` if the value is a string with a length of 0", () => {
        assert(sut.validate("") instanceof InvalidMinLength);
    });

    it("should return `InvalidMinLength` if the value is an array with a length of 0", () => {
        assert(sut.validate([]) instanceof InvalidMinLength);
    });

    it("should return `InvalidMaxLength` if the value is a string with a length of 4", () => {
        assert(sut.validate("abcd") instanceof InvalidMaxLength);
    });

    it("should return `InvalidMaxLength` if the value is an array with a length of 4", () => {
        assert(sut.validate([1, 2, 3, 4]) instanceof InvalidMaxLength);
    });

    it("should return `InvalidLength` if the value is a string with a length of 4", () => {
        const sut = new LengthValidator("test", { exact: 3 });

        assert(sut.validate("abcd") instanceof InvalidLength);
    });

    it("should throw an error if the options are invalid", () => {
        new LengthValidator("test", {});
    });

    it("should throw an error if the options are invalid", () => {
        new LengthValidator("test", { exact: -1 });
    });
});
