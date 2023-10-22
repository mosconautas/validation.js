import { IValidator, InvalidValue } from "./validator";

export class RequiredValidator implements IValidator {
    constructor(public readonly name: string) {}

    public validate(value: any): InvalidValue | null {
        if (value === null || value === undefined) {
            return new InvalidRequired(value, this.name);
        }

        if (typeof value === "string" && value.trim() === "") {
            return new InvalidRequired(value, this.name);
        }

        if (Array.isArray(value) && value.length === 0) {
            return new InvalidRequired(value, this.name);
        }

        if (typeof value === "boolean" && !value) {
            return new InvalidRequired(value, this.name);
        }

        return null;
    }
}

export class InvalidRequired extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string) {
        super(value, `The field "${name}" is required`);
    }
}
