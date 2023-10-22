export interface IValidator {
    readonly name: string;

    validate(value: any): Promise<InvalidValue | null> | InvalidValue | null;
}

export class InvalidValue<T = any> {
    constructor(public readonly value: T, public readonly message: string) {}

    public toJSON(): Record<string, any> {
        return {
            name: this.constructor.name,
            value: this.value,
            message: this.message,
        };
    }
}
