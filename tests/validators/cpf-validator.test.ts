import assert from "node:assert";
import { before, describe, it } from "node:test";
import { InvalidIsNotCpf, InvalidMaxLength, InvalidMinLength, IsCpfValidator } from "../../src";

describe(IsCpfValidator.name, () => {
    let sut: IsCpfValidator;

    before(() => {
        sut = new IsCpfValidator("name");
    });

    it("should return `null` if value is `null`", () => {
        assert.strictEqual(sut.validate(null), null);
    });

    it("should return `null` if value is `undefined`", () => {
        assert.strictEqual(sut.validate(undefined), null);
    });

    it("should return `null` if value is a valid cpf", () => {
        assert.strictEqual(sut.validate("270.245.560-30"), null);
    });

    it("should return `null` if value is a valid cpf in an array", () => {
        assert.strictEqual(sut.validate(["270.245.560-30"]), null);
    });

    it("should return `null` if value is an empty array", () => {
        assert.strictEqual(sut.validate([]), null);
    });

    it("should return `InvalidIsNotCpf` if value is an invalid cpf", () => {
        assert(sut.validate("440.383.120-01") instanceof InvalidIsNotCpf);
    });

    it("should return `InvalidIsNotCpf` if value is an invalid cpf in an array", () => {
        assert(sut.validate(["440.383.120-01", "270.245.560-30"]) instanceof InvalidIsNotCpf);
    });

    it("should return `InvalidIsNotCpf` if value is not a string", () => {
        assert(sut.validate(1) instanceof InvalidMinLength);
    });

    it("should return `InvalidMaxLength` if value is too long", () => {
        assert(sut.validate("1".repeat(15)) instanceof InvalidMaxLength);
    });

    it("should return `InvalidMinLength` if value is too short", () => {
        assert(sut.validate("1".repeat(9)) instanceof InvalidMinLength);
    });
});
