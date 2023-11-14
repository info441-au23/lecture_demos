import app from "./app.js";
import request from "supertest";

describe("/", () => {
  it("should render a page", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBe(null);
    console.log(response);
  });
});
