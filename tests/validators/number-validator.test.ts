import assert from "node:assert";
import { InvalidIsNotNumber, IsNumberValidator } from "../../src";

describe(IsNumberValidator.name, () => {
    let sut: IsNumberValidator;

    beforeAll(() => {
        sut = new IsNumberValidator("any", true);
    });

    it("should return `null` if value is `null`", async () => {
        assert.strictEqual(sut.validate(null), null);
    });

    it("should return `null` if value is `undefined`", async () => {
        assert.strictEqual(sut.validate(undefined), null);
    });

    it("should return `null` if value is `1`", async () => {
        assert.strictEqual(sut.validate(1), null);
    });

    it("should return `null` if value is `1.1`", async () => {
        assert.strictEqual(sut.validate(1.1), null);
    });

    it("should return `null` if value is `0`", async () => {
        assert.strictEqual(sut.validate(0), null);
    });

    it("should return `null` if value is `0.0`", async () => {
        assert.strictEqual(sut.validate(0.0), null);
    });

    it("should return `InvalidIsNotNumber` if value is `''`", async () => {
        assert(sut.validate("") instanceof InvalidIsNotNumber);
    });

    it("should return `InvalidIsNotNumber` if value is `'any'`", async () => {
        assert(sut.validate("any") instanceof InvalidIsNotNumber);
    });

    it("should return `null` if value is `[]`", async () => {
        assert.strictEqual(sut.validate([]), null);
    });

    it("should return `null` if value is `[1]`", async () => {
        assert.strictEqual(sut.validate([1]), null);
    });

    it("should return `InvalidIsNotNumber` if value is `['any']`", async () => {
        assert(sut.validate(["any"]) instanceof InvalidIsNotNumber);
    });
    it("should return `InvalidIsNotNumber` if value is `true`", async () => {
        assert(sut.validate(true) instanceof InvalidIsNotNumber);
    });

    it("should return `InvalidIsNotNumber` if value is `false`", async () => {
        assert(sut.validate(false) instanceof InvalidIsNotNumber);
    });

    it("should return `InvalidIsNotNumber` if value is `Object`", async () => {
        assert(sut.validate(new Object()) instanceof InvalidIsNotNumber);
    });

    it("should return `InvalidIsNotNumber` if value is `Date`", async () => {
        assert(sut.validate(new Date()) instanceof InvalidIsNotNumber);
    });

    it("should return `null` if value is `'1'` if `checkIfIsTypeOfNumber` is `false`", async () => {
        sut = new IsNumberValidator("any", false);

        assert.strictEqual(sut.validate("1"), null);
    });

    it("should return `null` if value is `['1']` if `checkIfIsTypeOfNumber` is `false`", async () => {
        sut = new IsNumberValidator("any", false);

        assert.strictEqual(sut.validate(["1"]), null);
    });
});
