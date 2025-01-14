
// Birim testleri

const { createUserLogic, getUserByIdLogic } = require("../logic/userLogic");
const User = require("../models").User;

jest.mock("../models", () => ({
    User: {
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));

describe("User Logic Tests", () => {
    it("should create a new user", async () => {
        const mockUser = { name: "John", email: "john@example.com", password: "hashedPass" };
        User.create.mockResolvedValue(mockUser);

        const result = await createUserLogic("John", "john@example.com", "password123");

        expect(User.create).toHaveBeenCalledWith({
            name: "John",
            email: "john@example.com",
            password: expect.any(String),
        });
        expect(result).toEqual(mockUser);
    });

    it("should return user by ID", async () => {
        const mockUser = { name: "John", email: "john@example.com" };
        User.findOne.mockResolvedValue(mockUser);

        const result = await getUserByIdLogic(1);

        expect(User.findOne).toHaveBeenCalledWith({
            where: { user_id: 1 },
            attributes: ["name", "email"],
        });
        expect(result).toEqual(mockUser);
    });
});
