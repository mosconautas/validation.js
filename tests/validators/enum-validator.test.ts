import assert from "node:assert";
import { InvalidDoesNotMatchEnum, IsEnumValidator } from "../../src";

enum TestEnum {
    A = 1,
    B = 2,
    C = 3,
}

describe(IsEnumValidator.name, () => {
    let sut: IsEnumValidator;

    beforeAll(() => {
        sut = new IsEnumValidator("name", TestEnum);
    });

    it("should return `null` if value is `null`", () => {
        assert.strictEqual(sut.validate(null), null);
    });

    it("should return `null` if value is `undefined`", () => {
        assert.strictEqual(sut.validate(undefined), null);
    });

    it("should return `null` if value is a valid enum value", () => {
        assert.strictEqual(sut.validate(TestEnum.A), null);
    });

    it("should return `null` if value is a valid enum value (string)", () => {
        assert.strictEqual(sut.validate(1), null);
    });

    it("should return `null` if value is a valid enum in an array", () => {
        assert.strictEqual(sut.validate([TestEnum.A, TestEnum.B]), null);
    });

    it("should return `null` if value is a valid enum in an array (string)", () => {
        assert.strictEqual(sut.validate([1, 2]), null);
    });

    it("should return `null` if value is an empty array", () => {
        assert.strictEqual(sut.validate([]), null);
    });

    it("should return `InvalidDoesNotMatchEnum` if value is an invalid enum value", () => {
        assert(sut.validate(0) instanceof InvalidDoesNotMatchEnum);
    });

    it("should return `InvalidDoesNotMatchEnum` if value is an invalid enum value (string)", () => {
        assert(sut.validate("0") instanceof InvalidDoesNotMatchEnum);
    });

    it("should return `InvalidDoesNotMatchEnum` if value is an invalid enum in an array", () => {
        assert(sut.validate([TestEnum.A, TestEnum.B, 0]) instanceof InvalidDoesNotMatchEnum);
    });

    it("should return `InvalidDoesNotMatchEnum` if value is an invalid enum in an array (string)", () => {
        assert(sut.validate([1, 2, "0"]) instanceof InvalidDoesNotMatchEnum);
    });
});
