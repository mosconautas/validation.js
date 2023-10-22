import { IValidator, InvalidValue } from "../src";

export class ValidatorMock implements IValidator {
    public name = "any";
    public validate = jest.fn();

    public mockName(name: string): void {
        this.name = name;
    }

    public mockValidate(returnValue: InvalidValue | null): void {
        this.validate.mockResolvedValue(returnValue);
    }

    public mockValidateOnce(returnValue: InvalidValue | null): void {
        this.validate.mockResolvedValueOnce(returnValue);
    }

    public mockValidateError(error: Error): void {
        this.validate.mockRejectedValue(error);
    }

    public mockValidateErrorOnce(error: Error): void {
        this.validate.mockRejectedValueOnce(error)
    }

    public assertValidateCalled(times: number): void {
        expect(this.validate).toHaveBeenCalledTimes(times);
    }

    public assertValidateCalledWith(value: any, nth?: number): void {
        if (nth === undefined) {
            expect(this.validate).toHaveBeenCalledWith(value);
        } else {
            expect(this.validate).toHaveBeenNthCalledWith(nth, value);
        }
    }

    public reset() {
        this.validate.mockReset();
        this.name = "any"
    }
}
