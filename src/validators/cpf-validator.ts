import { InvalidMaxLength, InvalidMinLength } from "./length-validator";
import { IValidator, InvalidValue } from "./validator";

export class IsCpfValidator implements IValidator {
    public static readonly MaxLength = 11;
    public static readonly MinLength = 11;
    public static readonly InvalidCpf = [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
    ];

    constructor(public readonly name: string) {}

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
            const cpfNumbersOnly = value.toString().replace(/\D/g, "");

            if (cpfNumbersOnly.length > IsCpfValidator.MaxLength) {
                return new InvalidMaxLength(cpfNumbersOnly, this.name, IsCpfValidator.MaxLength);
            }

            if (cpfNumbersOnly.length < IsCpfValidator.MinLength) {
                return new InvalidMinLength(cpfNumbersOnly, this.name, IsCpfValidator.MinLength);
            }

            if (IsCpfValidator.InvalidCpf.includes(cpfNumbersOnly)) {
                return new InvalidIsNotCpf(cpfNumbersOnly, this.name);
            }

            const firstDigit = cpfNumbersOnly.charAt(9);
            const firstDigitGenerated = this._calculateDigit(cpfNumbersOnly, 10);
            if (firstDigit != firstDigitGenerated) {
                return new InvalidIsNotCpf(cpfNumbersOnly, this.name);
            }

            const secondDigit = cpfNumbersOnly.charAt(10);
            const secondDigitGenerated = this._calculateDigit(cpfNumbersOnly, 11);
            if (secondDigit != secondDigitGenerated) {
                return new InvalidIsNotCpf(cpfNumbersOnly, this.name);
            }
        }

        return null;
    }

    private _calculateDigit(digit: string, multi: number): string {
        let sum = 0;
        for (let i = 0; i < multi - 1; i++) {
            sum += Number.parseInt(digit[i]) * (multi - i);
        }

        sum = 11 - (sum % 11);

        if (sum > 9) {
            return "0";
        }

        return sum.toString();
    }
}

export class InvalidIsNotCpf extends InvalidValue {
    constructor(public readonly value: any, public readonly name: string) {
        super(value, `The field "${name}" must be a cpf`);
    }
}
