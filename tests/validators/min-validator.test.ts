import assert from "node:assert";
import { before, describe, it } from "node:test";
import { InvalidIsNotNumber, InvalidMin, MinValidator } from "../../src";

describe(MinValidator.name, () => {
    let sut: MinValidator;

    before(() => {
        sut = new MinValidator("any", 5);
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

    it("should return `null` if value is `6`", async () => {
        assert.strictEqual(sut.validate(6), null);
    });

    it("should return `null` if value is `6.0`", async () => {
        assert.strictEqual(sut.validate(6.0), null);
    });

    it("should return `null` if value is `[]`", async () => {
        assert.strictEqual(sut.validate([]), null);
    });

    it("should return `InvalidMin` if value is `4`", async () => {
        assert(sut.validate(4) instanceof InvalidMin);
    });

    it("should return `InvalidMin` if value is `4.0`", async () => {
        assert(sut.validate(4.0) instanceof InvalidMin);
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
