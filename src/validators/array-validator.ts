import { IValidator, InvalidValue } from "./validator";

export class IsArrayValidator implements IValidator {
    constructor(public readonly name: string) {}

    public validate(value: any): InvalidValue | null {
        if (value === null || value === undefined) {
            return null;
        }

        if (!Array.isArray(value)) {
            return new InvalidIsNotArray(value, this.name);
        }

        return null;
    }
}

export class InvalidIsNotArray extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string) {
        super(value, `The field "${name}" must be an array`);
    }
}
