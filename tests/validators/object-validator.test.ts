import assert from "node:assert";
import { before, describe, it } from "node:test";
import { InvalidIsNotObject, IsObjectValidator } from "../../src";

describe(IsObjectValidator.name, () => {
    let sut: IsObjectValidator;

    before(() => {
        sut = new IsObjectValidator("any");
    });

    it("should return `null` if value is `null`", async () => {
        assert.strictEqual(sut.validate(null), null);
    });

    it("should return `null` if value is `undefined`", async () => {
        assert.strictEqual(sut.validate(undefined), null);
    });

    it("should return `null` if value is `{}`", async () => {
        assert.strictEqual(sut.validate({}), null);
    });

    it("should return `null` if value is `[]`", async () => {
        assert.strictEqual(sut.validate([]), null);
    });

    it("should return `InvalidIsNotObject` if value is `['any']`", async () => {
        assert(sut.validate(["any"]) instanceof InvalidIsNotObject);
    });

    it("should return `InvalidIsNotObject` if value is `''`", async () => {
        assert(sut.validate("") instanceof InvalidIsNotObject);
    });

    it("should return `InvalidIsNotObject` if value is `1`", async () => {
        assert(sut.validate(1) instanceof InvalidIsNotObject);
    });

    it("should return `InvalidIsNotObject` if value is `true`", async () => {
        assert(sut.validate(true) instanceof InvalidIsNotObject);
    });

    it("should return `null` if value is `Object`", async () => {
        assert.strictEqual(sut.validate(new Object()), null);
    });

    it("should return `InvalidIsNotObject` if value is `Date`", async () => {
        assert(sut.validate(new Date()) instanceof InvalidIsNotObject);
    });
});
