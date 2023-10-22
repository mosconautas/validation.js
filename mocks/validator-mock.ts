import assert from "node:assert";
import { mock } from "node:test";
import { IValidator, InvalidValue } from "../src";

export class ValidatorMock {
    private _object = {
        name: "any",
        validate: mock.fn(),
    };

    public get object(): IValidator {
        return this._object as any;
    }

    public mockName(name: string): void {
        this._object.name = name;
    }

    public mockValidate(returnValue: InvalidValue | null): void {
        this._object.validate.mock.mockImplementation(async () => returnValue);
    }

    public mockValidateOnce(returnValue: InvalidValue | null): void {
        this._object.validate.mock.mockImplementationOnce(async () => returnValue);
    }

    public mockValidateError(error: Error): void {
        this._object.validate.mock.mockImplementation(async () => {
            throw error;
        });
    }

    public mockValidateErrorOnce(error: Error): void {
        this._object.validate.mock.mockImplementationOnce(async () => {
            throw error;
        });
    }

    public assertValidateCalled(times: number): void {
        assert.strictEqual(this._object.validate.mock.calls.length, times);
    }

    public assertValidateCalledWith(value: any, nth?: number): void {
        const calls = this._object.validate.mock.calls;

        if (nth === undefined) {
            const exists = calls.some((args) => {
                return args.arguments[0] === value;
            });

            assert(exists, `validate(${value}) is not called`);
        } else {
            assert.strictEqual(calls[nth].arguments[0], value);
        }
    }

    public reset(): void {
        this._object.validate.mock.restore();
        this._object.validate.mock.resetCalls();
    }
}
