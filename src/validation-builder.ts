import {
    IValidator,
    IsArrayValidator,
    IsBooleanValidator,
    IsEmailValidator,
    IsEnumValidator,
    IsGuidValidator,
    IsNumberValidator,
    IsObjectValidator,
    IsPhoneNumberValidator,
    IsStringValidator,
    MaxValidator,
    MinValidator,
    NestedValidator,
    RequiredValidator,
} from "./validators";
import { IsCpfValidator } from "./validators/cpf-validator";
import { LengthValidator } from "./validators/length-validator";

export class ValidationBuilder {
    public readonly validators: IValidator[] = [];

    private constructor(public readonly name: string) {}

    public build(): IValidator[] {
        return this.validators;
    }

    public nested(validators: IValidator[]): ValidationBuilder {
        this.validators.push(new NestedValidator(this.name, validators));

        return this;
    }

    public max(length: number): ValidationBuilder {
        this.validators.push(new MaxValidator(this.name, length));

        return this;
    }

    public min(length: number): ValidationBuilder {
        this.validators.push(new MinValidator(this.name, length));

        return this;
    }

    public length(options: LengthValidator.IOptions): ValidationBuilder {
        this.validators.push(new LengthValidator(this.name, options));

        return this;
    }

    public string(): ValidationBuilder {
        this.validators.push(new IsStringValidator(this.name));

        return this;
    }

    public number(checkIfIsTypeOfNumber?: boolean): ValidationBuilder {
        this.validators.push(new IsNumberValidator(this.name, checkIfIsTypeOfNumber));

        return this;
    }

    public boolean(): ValidationBuilder {
        this.validators.push(new IsBooleanValidator(this.name));

        return this;
    }

    public array(): ValidationBuilder {
        this.validators.push(new IsArrayValidator(this.name));

        return this;
    }

    public object(): ValidationBuilder {
        this.validators.push(new IsObjectValidator(this.name));

        return this;
    }

    public email(): ValidationBuilder {
        this.validators.push(new IsEmailValidator(this.name));

        return this;
    }

    public enum(enumerable: any): ValidationBuilder {
        this.validators.push(new IsEnumValidator(this.name, enumerable));

        return this;
    }

    public guid(): ValidationBuilder {
        this.validators.push(new IsGuidValidator(this.name));

        return this;
    }

    public phoneNumber(): ValidationBuilder {
        this.validators.push(new IsPhoneNumberValidator(this.name));

        return this;
    }

    public cpf(): ValidationBuilder {
        this.validators.push(new IsCpfValidator(this.name));

        return this;
    }

    public required(): ValidationBuilder {
        this.validators.push(new RequiredValidator(this.name));

        return this;
    }

    public optional(): ValidationBuilder {
        return this;
    }

    public custom(factory: (name: string) => IValidator): ValidationBuilder {
        this.validators.push(factory(this.name));

        return this;
    }

    public static of(name: string): ValidationBuilder {
        return new ValidationBuilder(name);
    }
}
