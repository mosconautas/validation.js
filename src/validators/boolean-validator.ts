import { IValidator, InvalidValue } from "./validator";

export class IsBooleanValidator implements IValidator {
    constructor(public readonly name: string) {}

    public validate(value: any): InvalidValue | null {
        if (value === null || value === undefined) {
            return null;
        }

        if (Array.isArray(value)) {
            for (const val of value) {
                const invalid = this.validate(val);

                if (invalid) {
                    return invalid;
                }
            }
        } else if (this.isNotBoolean(value)) {
            return new InvalidIsNotBoolean(value, this.name);
        }

        return null;
    }

    private isNotBoolean(value: any): value is boolean {
        return typeof value !== "boolean";
    }
}

export class InvalidIsNotBoolean extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string) {
        super(value, `The field "${name}" must be a boolean`);
    }
}
