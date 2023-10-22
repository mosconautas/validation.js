import { InvalidIsNotString } from "./string-validator";
import { IValidator, InvalidValue } from "./validator";

export class IsEmailValidator implements IValidator {
    public static readonly MaxLength = 256;
    public static readonly MaxLengthAccount = 64;
    public static readonly MaxLengthDomain = 63;
    public static readonly Pattern =
        /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    constructor(public readonly name: string) {}

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
            if (typeof value !== "string") {
                return new InvalidIsNotString(value, this.name);
            }

            if (value.length > IsEmailValidator.MaxLength) {
                return new InvalidEmailLength(value, this.name, IsEmailValidator.MaxLength);
            }

            if (!IsEmailValidator.Pattern.test(value)) {
                return new InvalidEmail(value, this.name);
            }

            const [account, address] = value.split("@");

            if (account.length > IsEmailValidator.MaxLengthAccount) {
                return new InvalidEmailAccountLength(value, this.name, IsEmailValidator.MaxLengthAccount);
            }

            const domainParts = address.split(".");
            if (domainParts.some((part) => part.length > IsEmailValidator.MaxLengthDomain)) {
                return new InvalidEmailDomainLength(value, this.name, IsEmailValidator.MaxLengthDomain);
            }
        }

        return null;
    }
}

export class InvalidEmail extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string) {
        super(value, `The field "${name}" must be a valid email`);
    }
}

export class InvalidEmailLength extends InvalidEmail {
    constructor(public readonly value: any, public readonly name: string, public readonly maxLength: number) {
        super(value, `The field "${name}" must have a maximum of ${maxLength} characters`);
    }

    public toJSON(): Record<string, any> {
        return Object.assign(super.toJSON(), {
            maxLength: this.maxLength,
        });
    }
}

export class InvalidEmailAccountLength extends InvalidEmail {
    constructor(public readonly value: any, public readonly name: string, public readonly maxLength: number) {
        super(value, `The field "${name}" must have a maximum of ${maxLength} characters`);
    }

    public toJSON(): Record<string, any> {
        return Object.assign(super.toJSON(), {
            maxLength: this.maxLength,
        });
    }
}

export class InvalidEmailDomainLength extends InvalidEmail {
    constructor(public readonly value: any, public readonly name: string, public readonly maxLength: number) {
        super(value, `The field "${name}" must have a maximum of ${maxLength} characters`);
    }

    public toJSON(): Record<string, any> {
        return Object.assign(super.toJSON(), {
            maxLength: this.maxLength,
        });
    }
}
