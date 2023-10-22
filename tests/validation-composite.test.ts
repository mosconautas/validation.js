import assert from "node:assert";
import { before, beforeEach, describe, it } from "node:test";
import { ValidatorMock } from "../mocks";
import { InvalidValue, ValidationComposite } from "../src";

describe(ValidationComposite.name, () => {
    let validatorMock: ValidatorMock;
    let sut: ValidationComposite;

    before(() => {
        validatorMock = new ValidatorMock();

        sut = new ValidationComposite(validatorMock.object);
    });

    beforeEach(() => {
        validatorMock.reset();
    });

    it("should return `null` if value is `null`", async () => {
        validatorMock.mockValidateOnce(null);

        const output = await sut.validate("name", "");

        assert.strictEqual(output, null);
    });

    it.skip("should call `validate` with the correct value", async () => {
        validatorMock.mockValidateOnce(null);

        const output = await sut.validate("name", "any");

        assert.strictEqual(output, null);
        validatorMock.assertValidateCalledWith("any");
    });

    it.skip("should return the error if validation fails", async () => {
        validatorMock.mockValidateOnce(new InvalidValue("name", "error"));

        const output = await sut.validate("name", "any");

        assert(output instanceof InvalidValue);
    });

    it.skip("should call `validate` with the correct value (multiple validators)", async () => {
        const validatorMock2 = new ValidatorMock();

        const sut = new ValidationComposite([validatorMock.object, validatorMock2.object]);

        validatorMock.mockValidateOnce(null);
        validatorMock2.mockValidateOnce(null);

        const output = await sut.validate("name", "any");

        assert.strictEqual(output, null);
        validatorMock.assertValidateCalledWith("any");
        validatorMock2.assertValidateCalledWith("any");
    });

    it.skip("should call `validate` with the correct value when passing an object", async () => {
        validatorMock.mockValidateOnce(null);

        const output = await sut.validate({ name: "any" });

        assert.strictEqual(output, null);
        validatorMock.assertValidateCalledWith("any");
    });
});
