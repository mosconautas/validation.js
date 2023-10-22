import assert from "node:assert";
import { before, describe, it } from "node:test";
import { InvalidEmail, InvalidIsNotString, IsEmailValidator } from "../../src";

describe(IsEmailValidator.name, () => {
    let sut: IsEmailValidator;

    before(() => {
        sut = new IsEmailValidator("name");
    });

    it("should return `null` if value is `null`", () => {
        assert.strictEqual(sut.validate(null), null);
    });

    it("should return `null` if value is `undefined`", () => {
        assert.strictEqual(sut.validate(undefined), null);
    });

    it("should return `null` if value is a valid email", () => {
        assert.strictEqual(sut.validate("any@gmail.com"), null);
    });

    it("should return `null` if value is a valid email in an array", () => {
        assert.strictEqual(sut.validate(["any@gmail.com"]), null);
    });

    it("should return `null` if value is an empty array", () => {
        assert.strictEqual(sut.validate([]), null);
    });

    it("should return `InvalidEmail` if value is an invalid email", () => {
        assert(sut.validate("any") instanceof InvalidEmail);
    });

    it("should return `InvalidEmail` if value is an invalid email in an array", () => {
        assert(sut.validate(["any", "any@gmail.com"]) instanceof InvalidEmail);
    });

    it("should return `InvalidIsNotString` if value is not a string", () => {
        assert(sut.validate(1) instanceof InvalidIsNotString);
    });

    it("should return `InvalidEmailLength` if value is too long", () => {
        assert(sut.validate("a".repeat(256)) instanceof InvalidEmail);
    });

    it("should return `InvalidEmailAccountLength` if account is too long", () => {
        assert(sut.validate("a".repeat(65) + "@gmail.com") instanceof InvalidEmail);
    });

    it("should return `InvalidEmailDomainLength` if domain is too long", () => {
        assert(sut.validate("any@" + "a".repeat(256) + ".com") instanceof InvalidEmail);
    });

    it("should return `InvalidEmailDomainLength` if domain part is too long", () => {
        assert(sut.validate("any@any." + "a".repeat(256)) instanceof InvalidEmail);
    });
});
