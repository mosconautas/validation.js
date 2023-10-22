import { InvalidIsNotNumber, IsNumberValidator } from "./number-validator";
import { IValidator, InvalidValue } from "./validator";

export class MaxValidator implements IValidator {
    constructor(public readonly name: string, public readonly max: number) {}

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
            if (!IsNumberValidator.check(value, true)) {
                return new InvalidIsNotNumber(value, this.name);
            }

            if (value > this.max) {
                return new InvalidMax(value, this.name, this.max);
            }
        }

        return null;
    }
}

export class InvalidMax extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string, public readonly max: number) {
        super(value, `The field "${name}" must have a maximum of ${max}`);
    }
}
