const app = require("./app");
const request = require("supertest");

describe("Testes para o endpont de exemplo", () => {
    test("Teste de Requisição GET", async () => {
        const response = await request(app)
                                .get("/api/comandaList")
                                .accept("Accept", "text/plain");
        expect(response.statusCode).toBe(200);
    });

    test("Teste de Requisição GET JSON", async () => {
        const response = await request(app)
                           .get("/api/comandaList")
                           .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });

    test("Teste de Requisição POST", async () => {
        const dataToSend = "Dado enviado!";
        const response = await request(app)
            .post("/api/comandaList")
            .set('Accept', 'text/plain')
            .set('Content-Type', 'text/plain')
            .send(dataToSend); //envia dados para o servidor
        expect(response.statusCode).toBe(200);
    });

    test("Teste de Requisição PUT", async () => {
        const dataToSend = "Dado enviado!";
        const response = await request(app)
                                .put("/api/comandaList")
                                .set('Accept', 'text/plain')
                                .set('Content-Type', 'text/plain')
                                .send(dataToSend); //envia dados para o servidor
        expect(response.statusCode).toBe(200);
    });

    test("Teste de Requisição DELETE", async () => {
        const response = await request(app)
            .delete("/api/comandaList")
            .set('Accept', 'text/plain')
        expect(response.statusCode).toBe(200);
    });
})

