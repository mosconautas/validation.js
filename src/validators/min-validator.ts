import { InvalidIsNotNumber, IsNumberValidator } from "./number-validator";
import { IValidator, InvalidValue } from "./validator";

export class MinValidator implements IValidator {
    constructor(public readonly name: string, public readonly min: number) {}

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

            if (value < this.min) {
                return new InvalidMin(value, this.name, this.min);
            }
        }

        return null;
    }
}

export class InvalidMin extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string, public readonly min: number) {
        super(value, `The field "${name}" must have a minimum of ${min}`);
    }
}
