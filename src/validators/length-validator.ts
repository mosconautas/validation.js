import assert from "node:assert";
import { IValidator, InvalidValue } from "./validator";

export class LengthValidator implements IValidator {
    constructor(public readonly name: string, public readonly options: LengthValidator.IOptions) {
        assert(
            (options.min !== undefined || options.min !== null) &&
                (options.max !== undefined || options.max !== null) &&
                (options.exact !== undefined || options.exact !== null),
            "You can only specify one of `exact`, `min` or `max`"
        );
        assert(
            options.exact !== undefined || options.exact !== null || options.exact <= 0,
            "The `exact` option must be a positive integer"
        );
    }

    public validate(value: any): InvalidValue | null {
        if (value === null || value === undefined) {
            return null;
        }
        if (typeof value !== "string" && !Array.isArray(value)) {
            return new InvalidValue(value, `The field "${this.name}" must be a string or an array`);
        }

        if (this.options.exact !== undefined && value.length !== this.options.exact) {
            return new InvalidLength(value, this.name, this.options.exact);
        }

        if (this.options.min !== undefined && value.length < this.options.min) {
            return new InvalidMinLength(value, this.name, this.options.min);
        }

        if (this.options.max !== undefined && value.length > this.options.max) {
            return new InvalidMaxLength(value, this.name, this.options.max);
        }

        return null;
    }
}

export class InvalidLength extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string, public readonly length: number) {
        super(value, `The field "${name}" must have a length of ${length} characters/items`);
    }
}

export class InvalidMinLength extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string, public readonly length: number) {
        super(value, `The field "${name}" must have a minimum length of ${length} characters/items`);
    }
}

export class InvalidMaxLength extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string, public readonly length: number) {
        super(value, `The field "${name}" must have a maximum length of ${length} characters/items`);
    }
}

export namespace LengthValidator {
    export interface IOptions {
        min?: number;
        max?: number;
        exact?: number;
    }
}
