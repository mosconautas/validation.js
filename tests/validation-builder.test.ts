import assert from "node:assert";
import { describe, it } from "node:test";
import { ValidationBuilder } from "../src";

describe(ValidationBuilder.name, () => {
    it("should return `this`", () => {
        const sut = ValidationBuilder.of("name");

        const output = sut.boolean();

        assert.strictEqual(output, sut);
    });

    it("should a validator with the correct name", () => {
        const sut = ValidationBuilder.of("name");

        sut.boolean();

        assert.strictEqual(sut.validators.length, 1);
        assert.strictEqual(sut.validators[0].name, "name");
    });

    it("should a custom validator", () => {
        const sut = ValidationBuilder.of("name");

        sut.custom((name) => {
            assert.strictEqual(name, "name");

            return {
                name: name,
                validate: async () => null,
            };
        });

        assert.strictEqual(sut.validators.length, 1);
        assert.strictEqual(sut.validators[0].name, "name");
    });

    it("should build a validator", () => {
        const sut = ValidationBuilder.of("name");

        sut.boolean();

        const output = sut.build();

        assert.strictEqual(output.length, 1);
        assert.strictEqual(output[0].name, "name");
    });
});
