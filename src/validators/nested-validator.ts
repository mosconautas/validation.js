import { IValidator, InvalidValue } from "./validator";

export class NestedValidator implements IValidator {
    constructor(public readonly name: string, public readonly validators: IValidator[]) {}

    public async validate(value: any): Promise<InvalidValue | null> {
        if (value === null || value === undefined) {
            return null;
        }

        const errors: InvalidValue[] = [];

        if (Array.isArray(value)) {
            for (const val of value) {
                for (const validator of this.validators) {
                    const error = await validator.validate(val[validator.name]);

                    if (error) {
                        errors.push(error);
                    }
                }
            }
        } else {
            for (const validator of this.validators) {
                const error = await validator.validate(value[validator.name]);

                if (error) {
                    errors.push(error);
                }
            }
        }

        if (errors.length > 0) {
            return new InvalidNested(this.name, errors);
        }

        return null;
    }
}

export class InvalidNested extends InvalidValue {
    constructor(public readonly name: string, public readonly errors: InvalidValue[]) {
        super(errors, `The field "${name}" is invalid`);
    }

    public toJSON(): Record<string, any> {
        return {
            name: this.constructor.name,
            errors: this.value,
            message: this.message,
        };
    }
}
