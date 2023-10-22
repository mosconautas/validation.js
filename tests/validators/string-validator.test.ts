import assert from "node:assert";
import { before, describe, it } from "node:test";
import { InvalidIsNotString, IsStringValidator } from "../../src";

describe(IsStringValidator.name, () => {
    let sut: IsStringValidator;

    before(() => {
        sut = new IsStringValidator("any");
    });

    it("should return `null` if value is `null`", async () => {
        assert.strictEqual(sut.validate(null), null);
    });

    it("should return `null` if value is `undefined`", async () => {
        assert.strictEqual(sut.validate(undefined), null);
    });

    it("should return `null` if value is `''`", async () => {
        assert.strictEqual(sut.validate(""), null);
    });

    it("should return `null` if value is `'any'`", async () => {
        assert.strictEqual(sut.validate("any"), null);
    });

    it("should return `InvalidIsNotString` if value is `[]`", async () => {
        assert.strictEqual(sut.validate([]), null);
    });

    it("should return `InvalidIsNotString` if value is `[1]`", async () => {
        assert(sut.validate([1]) instanceof InvalidIsNotString);
    });

    it("should return `InvalidIsNotString` if value is `[true]`", async () => {
        assert(sut.validate([true]) instanceof InvalidIsNotString);
    });

    it("should return `InvalidIsNotString` if value is `[Object]`", async () => {
        assert(sut.validate([new Object()]) instanceof InvalidIsNotString);
    });

    it("should return `null` if value is `['any']`", async () => {
        assert(sut.validate(["any"]) === null);
    });

    it("should return `InvalidIsNotString` if value is `1`", async () => {
        assert(sut.validate(1) instanceof InvalidIsNotString);
    });

    it("should return `InvalidIsNotString` if value is `true`", async () => {
        assert(sut.validate(true) instanceof InvalidIsNotString);
    });

    it("should return `InvalidIsNotString` if value is `Object`", async () => {
        assert(sut.validate(new Object()) instanceof InvalidIsNotString);
    });
});
