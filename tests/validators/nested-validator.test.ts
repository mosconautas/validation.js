import assert from "node:assert";
import { before, beforeEach, describe, it } from "node:test";
import { ValidatorMock } from "../../mocks";
import { InvalidNested, InvalidValue, NestedValidator } from "../../src";

describe(NestedValidator.name, () => {
    let sut: NestedValidator;
    let validatorMock: ValidatorMock;

    before(() => {
        validatorMock = new ValidatorMock();

        sut = new NestedValidator("name", [validatorMock.object]);
    });

    beforeEach(() => {
        validatorMock.reset();
    });

    it("should return `null` if value is `null`", async () => {
        assert((await sut.validate(null)) === null);
    });

    it("should return `null` if value is `undefined`", async () => {
        assert((await sut.validate(undefined)) === null);
    });

    it("should return `null` if all validators return `null`", async () => {
        validatorMock.mockValidateOnce(null);

        assert((await sut.validate({})) === null);
    });

    it("should return `InvalidNested` if any validator return `InvalidValue`", async () => {
        const invalidValue = new InvalidValue("any", "any");

        validatorMock.mockName("name");
        validatorMock.mockValidateOnce(invalidValue);

        const result = await sut.validate({ name: "any" });

        assert(result instanceof InvalidNested);
        assert.strictEqual(result.value.length, 1);
        assert.strictEqual(result.value[0], invalidValue);
    });

    it("should call validators as many times as the length of the value", async () => {
        validatorMock.mockName("name");
        validatorMock.mockValidate(null);

        await sut.validate([{ name: "any" }, { name: "any" }, { name: "any" }]);

        validatorMock.assertValidateCalled(3);
    });
});
