const request = require("supertest");
const app = require("../app");

jest.mock("../logic/userLogic", () => ({
    createUserLogic: jest.fn(),
    getUserByIdLogic: jest.fn(),
}));

const { createUserLogic, getUserByIdLogic } = require("../logic/userLogic");

describe("User Routes Tests", () => {
    it("should create a user via POST /users", async () => {
        const mockUser = { id: 1, name: "Brayn", email: "brayn@example.com" };
        createUserLogic.mockResolvedValue(mockUser);

        const response = await request(app)
            .post("/users")
            .send({ name: "Brayn", email: "brayn@example.com", password: "Password@123" });

        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockUser);
    });

    it("should get user by ID via GET /users/:id", async () => {
        const mockUser = { name: "Brayn", email: "brayn@example.com" };
        getUserByIdLogic.mockResolvedValue(mockUser);

        const response = await request(app).get("/users/550e8400-e29b-41d4-a716-446655440000");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
    });
});
