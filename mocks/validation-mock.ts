import assert from "node:assert";
import { mock } from "node:test";
import { IValidation, InvalidValue } from "../src";

export class ValidationMock {
    private _object = {
        validate: mock.fn(),
    };

    public get object(): IValidation {
        return this._object as any;
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

    public assertValidateCalledWith(name: string, value: any, nth?: number): void;
    public assertValidateCalledWith(values: Record<string, any>, nth?: number): void;
    public assertValidateCalledWith(): void {
        const isSingle = typeof arguments[0] === "string";
        const nth = isSingle ? arguments[2] : arguments[1];

        const calls = this._object.validate.mock.calls;

        if (nth === undefined) {
            const exist = calls.some((args) => {
                if (isSingle) {
                    return args.arguments[0] === arguments[0] && args.arguments[1] === arguments[1];
                }

                return args.arguments[0] === arguments[0];
            });

            assert(exist, `validate(${arguments[0]}) is not called`);
        } else {
            const args = calls[nth].arguments;

            if (isSingle) {
                assert.strictEqual(args[0], arguments[0]);
                assert.strictEqual(args[1], arguments[1]);
            } else {
                assert.strictEqual(args[0], arguments[0]);
            }
        }
    }

    public reset(): void {
        this._object.validate.mock.restore();
        this._object.validate.mock.resetCalls();
    }
}
