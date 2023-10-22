import { IValidation } from "../validation";
import { IValidator, InvalidValue } from "./validator";

export class IsObjectValidator implements IValidator {
    constructor(public readonly name: string, public readonly validation?: IValidation) {}

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
        } else if (this.isNotPlainObject(value) || this.isNotObject(value)) {
            return new InvalidIsNotObject(value, this.name);
        }

        return null;
    }

    private isNotPlainObject(value: any): boolean {
        return value.constructor !== Object;
    }

    private isNotObject(value: any): boolean {
        return typeof value !== "object";
    }
}

export class InvalidIsNotObject extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string) {
        super(value, `The field "${name}" must be an object`);
    }
}
