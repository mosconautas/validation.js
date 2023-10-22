import { IValidation } from "./validation";
import { IValidator, InvalidValue } from "./validators";

export class ValidationComposite implements IValidation {
    private readonly validators: IValidator[];

    constructor(validator: IValidator);
    constructor(validators: IValidator[]);
    constructor(validators: IValidator | IValidator[]) {
        this.validators = Array.isArray(validators) ? validators : [validators];
    }

    public async validate(name: string, value: any): Promise<InvalidValue | null>;
    public async validate(values: Record<string, any>): Promise<Record<string, InvalidValue> | null>;
    public async validate(): Promise<InvalidValue | Record<string, InvalidValue> | null> {
        const isSingle = arguments.length === 1;

        if (isSingle) {
            const value: Record<string, any> = arguments[0];
            const errors: Map<string, InvalidValue> = new Map();

            for (const validator of this.validators) {
                const val = value[validator.name];
                const error = await validator.validate(val);

                if (error) {
                    errors.set(validator.name, error);
                }
            }

            if (errors.size) {
                return Object.fromEntries(errors);
            }
        } else {
            const name = arguments[0];
            const value = arguments[1];

            const validators = this.validators.filter((validator) => validator.name === name);

            if (!validators.length) {
                return null;
            }

            for (const validator of validators) {
                const error = await validator.validate(value);

                if (error) {
                    return error;
                }
            }
        }

        return null;
    }

    public static of(...validators: IValidator[]) {
        return new ValidationComposite(validators);
    }
}
