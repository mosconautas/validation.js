import assert from "node:assert";
import { before, describe, it } from "node:test";
import { InvalidIsNotNumber, InvalidMax, MaxValidator } from "../../src";

describe(MaxValidator.name, () => {
    let sut: MaxValidator;

    before(() => {
        sut = new MaxValidator("any", 5);
    });

    it("should return `null` if value is `null`", async () => {
        assert.strictEqual(sut.validate(null), null);
    });

    it("should return `null` if value is `undefined`", async () => {
        assert.strictEqual(sut.validate(undefined), null);
    });

    it("should return `null` if value is `5`", async () => {
        assert.strictEqual(sut.validate(5), null);
    });

    it("should return `null` if value is `5.0`", async () => {
        assert.strictEqual(sut.validate(5.0), null);
    });

    it("should return `null` if value is `4`", async () => {
        assert.strictEqual(sut.validate(4), null);
    });

    it("should return `null` if value is `4.0`", async () => {
        assert.strictEqual(sut.validate(4.0), null);
    });

    it("should return `null` if value is `[]`", async () => {
        assert.strictEqual(sut.validate([]), null);
    });

    it("should return `InvalidMax` if value is `6`", async () => {
        assert(sut.validate(6) instanceof InvalidMax);
    });

    it("should return `InvalidMax` if value is `6.0`", async () => {
        assert(sut.validate(6.0) instanceof InvalidMax);
    });

    it("should return `InvalidIsNotNumber` if value is `''`", async () => {
        assert(sut.validate("") instanceof InvalidIsNotNumber);
    });

    it("should return `InvalidIsNotNumber` if value is `'any'`", async () => {
        assert(sut.validate("any") instanceof InvalidIsNotNumber);
    });

    it("should return `InvalidIsNotNumber` if value is `'5'`", async () => {
        assert(sut.validate("5") instanceof InvalidIsNotNumber);
    });

    it("should return `InvalidIsNotNumber` if value is `{}`", async () => {
        assert(sut.validate({}) instanceof InvalidIsNotNumber);
    });
});
