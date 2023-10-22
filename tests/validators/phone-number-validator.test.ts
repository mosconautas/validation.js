import assert from "node:assert";
import { InvalidIsNotPhoneNumber, IsPhoneNumberValidator } from "../../src";

describe(IsPhoneNumberValidator.name, () => {
    let sut: IsPhoneNumberValidator;

    beforeAll(() => {
        sut = new IsPhoneNumberValidator("any");
    });

    it("should return `null` if value is `null`", async () => {
        assert.strictEqual(sut.validate(null), null);
    });

    it("should return `null` if value is `undefined`", async () => {
        assert.strictEqual(sut.validate(undefined), null);
    });

    it("should return `null` if value is `[]`", async () => {
        assert.strictEqual(sut.validate([]), null);
    });

    it("should return `InvalidIsNotPhoneNumber` if value is `['any']`", async () => {
        assert(sut.validate(["any"]) instanceof InvalidIsNotPhoneNumber);
    });

    it("should return `InvalidIsNotPhoneNumber` if value is `''`", async () => {
        assert(sut.validate("") instanceof InvalidIsNotPhoneNumber);
    });

    it("should return `InvalidIsNotPhoneNumber` if value is `any`", async () => {
        assert(sut.validate("any") instanceof InvalidIsNotPhoneNumber);
    });

    it.skip("should return `null` if value is valid phone number", async () => {
        assert.strictEqual(sut.validate("5555555555"), null);
        assert.strictEqual(sut.validate("555-555-5555"), null);
        assert.strictEqual(sut.validate("555-555-5555"), null);
        assert.strictEqual(sut.validate("(555)555-5555"), null);
        assert.strictEqual(sut.validate("1(555)555-5555"), null);
        assert.strictEqual(sut.validate("1 555 555 5555"), null);
        assert.strictEqual(sut.validate("1 456 789 4444"), null);
        assert.strictEqual(sut.validate("1 555-555-5555"), null);
        assert.strictEqual(sut.validate("+5551995555555"), null);
        assert.strictEqual(sut.validate("(51) 99555-5555"), null);
        assert.strictEqual(sut.validate("1 (555) 555-5555"), null);
        assert.strictEqual(sut.validate("+55 (51) 99555-5555"), null);
    });

    it("should return `InvalidIsNotPhoneNumber` if value is invalid phone number", async () => {
        assert(sut.validate("5555555") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("55555555") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("555-5555") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("27576227382") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("(6054756961)") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("123**&!!asdf#") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("(275)76227382") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("555)-555-5555") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("(555-555-5555") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("2(757)6227382") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("2(757)622-7382") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("2 757 622-7382") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("55 55-55-555-5") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("1 555)555-5555") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("11 555-555-5555") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("2 (757) 622-7382") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("0 (757) 622-7382") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("(555)5(55?)-5555") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("-1 (757) 622-7382") instanceof InvalidIsNotPhoneNumber);
        assert(sut.validate("10 (757) 622-7382") instanceof InvalidIsNotPhoneNumber);
    });
});
