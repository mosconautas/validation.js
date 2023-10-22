import assert from "node:assert";
import { InvalidRequired, RequiredValidator } from "../../src";

describe(RequiredValidator.name, () => {
    let sut: RequiredValidator;

    beforeAll(() => {
        sut = new RequiredValidator("any");
    });

    it("should return `true` if value is not `null` or `undefined`", () => {
        assert.strictEqual(sut.validate("any"), null);
    });

    it("should return `true` if value is not an empty string", () => {
        assert.strictEqual(sut.validate("any"), null);
    });

    it("should return `true` if value is not an empty array", () => {
        assert.strictEqual(sut.validate(["any"]), null);
    });

    it("should return `true` if value is not `false`", () => {
        assert.strictEqual(sut.validate(true), null);
    });

    it("should return `InvalidRequired` if value is `null`", () => {
        assert(sut.validate(null) instanceof InvalidRequired);
    });

    it("should return `InvalidRequired` if value is `undefined`", () => {
        assert(sut.validate(undefined) instanceof InvalidRequired);
    });

    it("should return `InvalidRequired` if value is an empty string", () => {
        assert(sut.validate("") instanceof InvalidRequired);
    });

    it("should return `InvalidRequired` if value is an empty array", () => {
        assert(sut.validate([]) instanceof InvalidRequired);
    });

    it("should return `InvalidRequired` if value is `false`", () => {
        assert(sut.validate(false) instanceof InvalidRequired);
    });
});
