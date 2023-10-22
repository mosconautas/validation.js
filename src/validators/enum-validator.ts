import { IValidator, InvalidValue } from "./validator";

export class IsEnumValidator implements IValidator {
    private readonly _enumValues: any[];

    constructor(public readonly name: string, enumerable: any) {
        this._enumValues = Object.values(enumerable);
    }

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
        } else {
            if (!this._enumValues.includes(value)) {
                return new InvalidDoesNotMatchEnum(value, this.name, this._enumValues);
            }
        }

        return null;
    }
}

export class InvalidDoesNotMatchEnum extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string, public readonly enumValues: any[]) {
        super(value, `The field "${name}" does not match any enum values`);
    }

    public toJSON(): Record<string, any> {
        return Object.assign(super.toJSON(), {
            enumValues: this.enumValues,
        });
    }
}
