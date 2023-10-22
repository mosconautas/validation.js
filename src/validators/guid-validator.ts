import { InvalidIsNotString } from "./string-validator";
import { IValidator, InvalidValue } from "./validator";

export class IsGuidValidator implements IValidator {
    public static readonly PatternUid = /^([0-9a-zA-Z]{20,28})$/i;
    public static readonly PatternUuid = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

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
                return new InvalidIsNotString(value, this.name);
            }

            if (this.isNotGuid(value)) {
                return new InvalidIsNotGuid(value, this.name);
            }
        }

        return null;
    }

    private isNotGuid(value: string): value is string {
        return !IsGuidValidator.PatternUid.test(value) && !IsGuidValidator.PatternUuid.test(value);
    }
}

export class InvalidIsNotGuid extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string) {
        super(value, `The field "${name}" must be a guid`);
    }
}
