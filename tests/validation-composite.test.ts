import assert from "node:assert";
import { ValidatorMock } from "../mocks";
import { InvalidValue, ValidationComposite } from "../src";

describe(ValidationComposite.name, () => {
    let validatorMock: ValidatorMock;
    let sut: ValidationComposite;

    beforeAll(() => {
        validatorMock = new ValidatorMock();

        sut = new ValidationComposite(validatorMock);
    });

    beforeEach(() => {
        validatorMock.reset();
    });

    it("should return `null` if value is `null`", async () => {
        validatorMock.mockValidateOnce(null);

        const output = await sut.validate("name", "");

        assert.strictEqual(output, null);
    });

    it("should call `validate` with the correct value", async () => {
        validatorMock.mockName("name")
        validatorMock.mockValidateOnce(null);

        const output = await sut.validate("name", "any");

        assert.strictEqual(output, null);
        validatorMock.assertValidateCalledWith("any");
    });

    it("should return the error if validation fails", async () => {
        validatorMock.mockName("name")
        validatorMock.mockValidateOnce(new InvalidValue("name", "error"));

        const output = await sut.validate("name", "any");

        assert(output instanceof InvalidValue);
    });

    it("should call `validate` with the correct value (multiple validators)", async () => {
        const validatorMock2 = new ValidatorMock();

        const sut = new ValidationComposite([validatorMock, validatorMock2]);

        validatorMock.mockName("name")
        validatorMock.mockValidateOnce(null);

        validatorMock2.mockName("name")
        validatorMock2.mockValidateOnce(null);

        const output = await sut.validate("name", "any");

        assert.strictEqual(output, null);
        validatorMock.assertValidateCalledWith("any");
        validatorMock2.assertValidateCalledWith("any");
    });

    it("should call `validate` with the correct value when passing an object", async () => {
        validatorMock.mockName("name")
        validatorMock.mockValidateOnce(null);

        const output = await sut.validate({ name: "any" });

        assert.strictEqual(output, null);
        validatorMock.assertValidateCalledWith("any");
    });
});
