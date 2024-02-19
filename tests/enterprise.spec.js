const request = require("supertest");
const app = require("../app");
const {Enterprise, UserEnterprises, User} = require("../db/models");

describe("POST /enterprise/users/add", () => {
	it("should add users to an enterprise with provided taxId, userHashes, and permissions", async () => {
		const requestData = {
			taxId: "7162828483",
			userHashes: ["0xHash1", "0xHash2"],
			permissions: ["perm1", "perm2"]
		};

		const response = await request(app).post("/enterprise/users/add").send(requestData);

		expect(response.status).toBe(200);

		expect(response.body.message).toEqual("Users added to enterprise successfully with permissions");

		const enterprise = await Enterprise.findOne({where: {taxId: requestData.taxId}});
		const userEnterprises = await UserEnterprises.findAll({where: {enterpriseId: enterprise.enterpriseId}});
		const users = await Promise.all(userEnterprises.map(entry => User.findByPk(entry.userId)));

		expect(users.length).toBe(requestData.userHashes.length);

		users.forEach(user => {
			const userPermissions = userEnterprises.find(entry => entry.userId === user.userId).permissions;
			expect(userPermissions).toEqual(requestData.permissions);
		});
	});
});

describe("GET /enterprise/users", () => {
	it("should retrieve users of a specific enterprise using taxId", async () => {
		const taxId = "7162828483";

		const response = await request(app).get("/enterprise/users").query({taxId});

		expect(response.status).toBe(200);

		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);

		response.body.forEach(user => {
			expect(user.userId).toBeDefined();
			expect(user.email).toBeDefined();
			expect(user.firstName).toBeDefined();
		});
	});
});
