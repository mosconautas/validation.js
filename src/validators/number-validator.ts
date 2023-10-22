import { IValidator, InvalidValue } from "./validator";

export class IsNumberValidator implements IValidator {
    constructor(public readonly name: string, public readonly checkIfIsTypeOfNumber?: boolean) {}

    public validate(value: any): InvalidIsNotNumber | null {
        if (value === null || value === undefined) {
            return null;
        }

        if (Array.isArray(value)) {
            for (const val of value) {
                const invalid = this.validate(val);

                if (invalid !== null) {
                    return invalid;
                }
            }
        } else if (!IsNumberValidator.check(value)) {
            return new InvalidIsNotNumber(value, this.name);
        }

        return null;
    }

    public static check(value: any, checkIfIsTypeOfNumber?: boolean): boolean {
        if (checkIfIsTypeOfNumber) {
            return typeof value === "number";
        }

        return !isNaN(parseFloat(value)) && isFinite(value);
    }
}

export class InvalidIsNotNumber extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string) {
        super(value, `The field "${name}" must be a number`);
    }
}
