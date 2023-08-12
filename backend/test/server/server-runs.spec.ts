import request from "supertest";
import { expect } from "chai";
import app from "app";

describe("server checks", () => {
  it("Server has been successfully created", (done) => {
    request(app).get("/").expect(200, done);
  });
});
