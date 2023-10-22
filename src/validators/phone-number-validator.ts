import { IValidator, InvalidValue } from "./validator";

export class IsPhoneNumberValidator implements IValidator {
    public static readonly PatternPhoneNumber =
        /^([+]?1[\s]?)?((?:[(](?:[2-9]1[02-9]|[2-9][02-8][0-9])[)][\s]?)|(?:(?:[2-9]1[02-9]|[2-9][02-8][0-9])[\s.-]?)){1}([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2}[\s.-]?){1}([0-9]{4}){1}$/;

    constructor(public readonly name: string) {}

    public validate(value: any): InvalidValue | null {
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
        } else {
            if (typeof value !== "string") {
                return new InvalidIsNotPhoneNumber(value, this.name);
            }

            if (this.isNotPhoneNumber(value)) {
                return new InvalidIsNotPhoneNumber(value, this.name);
            }
        }

        return null;
    }

    private isNotPhoneNumber(value: string): value is string {
        return !IsPhoneNumberValidator.PatternPhoneNumber.test(value);
    }
}

export class InvalidIsNotPhoneNumber extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string) {
        super(value, `The field "${name}" must be a phone number`);
    }
}
