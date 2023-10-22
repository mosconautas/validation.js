import { InvalidValue } from "./validators";

export interface IValidation {
    validate(name: string, value: any): Promise<InvalidValue | null>;
    validate(values: Record<string, any>): Promise<InvalidValue | null>;
}
