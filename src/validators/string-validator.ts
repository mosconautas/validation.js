import { IValidator, InvalidValue } from "./validator";

export class IsStringValidator implements IValidator {
    constructor(public readonly name: string) {}

    public validate(value: any): InvalidIsNotString | null {
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
        } else if (!IsStringValidator.check(value)) {
            return new InvalidIsNotString(value, this.name);
        }

        return null;
    }

    public static check(value: any): value is string {
        return typeof value === "string";
    }
}

export class InvalidIsNotString extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string) {
        super(value, `The field "${name}" must be a string`);
    }
}
