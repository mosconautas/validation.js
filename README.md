# Plugin de validação (in progress)

Este plugin é uma biblioteca de validação para formulários, inputs, requisições HTTP e qualquer outra coisa que precise de validação. Ele foi desenvolvido com TypeScript e inclui testes unitários que utilizam jest.

## Instalação

Para instalar o plugin, basta executar o seguinte comando:

```bash
npm config set @mosconautas:registry https://npm.pkg.github.com/mosconautas
npm install @mosconautas/validation
```

## Utilização

```typescript
// Controller.ts
import { IValidation, InvalidValue } from "@mosconautas/validation";

class Controller {
    constructor(private readonly validation: IValidation) {}

    public async handle(request: Request, response: Response): Promise<Response> {
        const { body } = request;

        const validation = this.validation.validate(body);

        if (validation instanceof InvalidValue) {
            return response.status(400).json(validation.toJSON());
        }

        return response.status(204);
    }
}
```

```typescript
// routes.ts
import { ValidationBuilder, ValidationComposite } from "@mosconautas/validation";

function main() {
    const validation = new ValidationComposite([
        ValidationBuilder.of("name").required().build(),
        ValidationBuilder.of("email").required().email().build(),
        ValidationBuilder.of("password").required().length({ min: 8 }).build(),
    ]);

    const controller = new Controller(validation);
}
```

## Adicionar validadores customizados

```typescript
// CustomValidator.ts
export class CustomValidator implements IValidator {
    constructor(private readonly name: any) {}

    public validate(value: any): InvalidValue | null {
        if (value === this.name) {
            return null;
        }

        return new InvalidValue(value, "CustomValidator");
    }
}

ValidationBuilder.of("name")
    .required()
    .custom((name) => new CustomValidator(name))
    .build();
```

## Testes

O plugin disponibiliza umas classes de mocks para testes unitários. Para utilizá-las, basta importá-las e passá-las como parâmetro para o construtor da classe que você quer testar.

### Mocks

-   `ValidatorMock` - Mock de validador
-   `ValidationMock` - Mock de validação

```typescript
// Example.test.ts
describe("Controller", () => {
    it("should return 400 if validation fails", async () => {
        const validationMock = new ValidationMock();

        const controller = new Controller(validationMock);

        const response = await controller.handle({ body: { name: "any" } }, {});

        expect(response.status).toBe(400);
        validationMock.assertCalledWith({ name: "any" });
    });
});
```

## Funções de validação

-   `nested` - Validação de objetos aninhados
-   `max` - Validação de valor máximo
-   `min` - Validação de valor mínimo
-   `length` - Validação de tamanho
    -   `min` - Parâmetro opcional para definir o tamanho mínimo
    -   `max` - Parâmetro opcional para definir o tamanho máximo
    -   `exact` - Parâmetro opcional para definir o tamanho exato
-   `string` - Valida se é uma string. Se for uma lista, valida se todos os itens são strings
-   `number` - Valida se é um número. Se for uma lista, valida se todos os itens são números
-   `boolean` - Valida se é um booleano. Se for uma lista, valida se todos os itens são booleanos
-   `array` - Valida se é uma lista
-   `object` - Valida se é um objeto puro.
-   `email` - Validação de e-mail
-   `enum` - Validação de enum
-   `guid` - Validação de GUID
-   `phoneNumber` - Validação de número de telefone
-   `cpf` - Validação de CPF
-   `required` - Validação de campo obrigatório

## Contribuindo

Se você quiser contribuir com o projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request no GitHub.

## Licença GPL-3.0

Este projeto está licenciado sob a licença GPL-3.0. Para mais informações, leia o arquivo [LICENSE](LICENSE).
