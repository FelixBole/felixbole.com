import { expect } from "chai";
import request from "supertest";

import { startServer } from "../src/server";

const { app, server } = startServer();

describe("GET /", () => {
    it("Should respond with json and a value of 1", async () => {
        const response = await request(app).get("/");
        expect(response.status).equal(200, "Status should be 200");
        expect(response.body.value).equal(1, "Value is 1");
    });
});

server.close(); // Necessary otherwise mocha will not exit on its own
