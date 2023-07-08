import request from "supertest";
import app from "app";
import {
  Roles,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_NOT_FOUND,
  STATUS_CODE_OK,
} from "../../src/Utils/constants";
import User from "../../src/models/User";
import bcrypt from "bcrypt";
import { STATUS_CODE_AUTHORIZATION } from "Utils/constants";
import { expect } from "chai";

const mainPath = "/api/users/";
const authPath = "/api/auth/";

describe("get users check", () => {
  it("Get Users Api Is Working", async () => {
    let signInEmail = "admin@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });
    let pass = "1234";

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "admin",
        role: [Roles.Admin, Roles.User],
      });

      await user.save();
    }

    const signedInUser = await request(app)
      .post(`${authPath}signin`)
      .send({ email: signInEmail, password: "1234" });

    const token = signedInUser.body.data.token;

    //Get All Users Stricted to Admin
    await request(app)
      .get(`${mainPath}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(STATUS_CODE_OK);

    await User.findOneAndDelete({ email: signInEmail });
  });
});

describe("get users check", () => {
  it("Get Users Api Is Unauth with regular user", async () => {
    let signInEmail = "regularUser@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });
    let pass = "1234";

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "test regular user",
        role: [Roles.User],
      });

      await user.save();
    }

    const signedInUser = await request(app)
      .post(`${authPath}signin`)
      .send({ email: signInEmail, password: "1234" });

    const token = signedInUser.body.data.token;

    //Get All Users Stricted to Admin
    await request(app)
      .get(`${mainPath}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(STATUS_CODE_AUTHORIZATION);
  });
});

describe("edit user check", () => {
  it("Edit User Api Is Working", async () => {
    let signInEmail = "regularUser@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });
    let pass = "1234";

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "test regular user",
        role: [Roles.User],
      });

      await user.save();
    }

    const signedInUser = await request(app)
      .post(`${authPath}signin`)
      .send({ email: signInEmail, password: "1234" });

    const token = signedInUser.body.data.token;

    const res = await request(app)
      .put(`${mainPath}${signedInUser.body.data.id}`)
      .send({ email: `edited${signInEmail}` })
      .set("Authorization", `Bearer ${token}`)
      .expect(STATUS_CODE_OK);

    const updatedUser = res.body.data;

    expect(updatedUser.email).to.be.equal(`edited${signInEmail}`);

    await User.findOneAndDelete({ email: `edited${signInEmail}` });
  });
});

describe("edit user check", () => {
  it("Admin can edit any user", async () => {
    let signInEmail = "adminCanEdit@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });
    let pass = "1234";

    let userToEditEmail = "regularUserToEdit@gmail.com";
    let userToEditExists = await User.findOne({ email: signInEmail });

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "test admin user",
        role: [Roles.User, Roles.Admin],
      });

      await user.save();
    }

    if (!userToEditExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const userEdit = new User({
        email: userToEditEmail,
        password: hashedPass,
        name: "test user",
        role: [Roles.User],
      });

      const res = await userEdit.save();

      userToEditExists = res;
    }

    const signedInUser = await request(app)
      .post(`${authPath}signin`)
      .send({ email: signInEmail, password: "1234" });

    const token = signedInUser.body.data.token;

    const userToEditId = userToEditExists.id;

    const leNameEdit = "test user to edit edited yes";

    const updatedUser = await request(app)
      .put(`${mainPath}${userToEditId}`)
      .send({ name: leNameEdit })
      .set("Authorization", `Bearer ${token}`)
      .expect(STATUS_CODE_OK);

    expect(updatedUser.body.data.name).to.be.equal(leNameEdit);
    await User.findOneAndDelete({ email: userToEditEmail });
    await User.findOneAndDelete({ email: signInEmail });
  });
});

describe("edit user check", () => {
  it("Regular User can not edit any user", async () => {
    let signInEmail = "user1@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });
    let pass = "1234";

    let userToEditEmail = "user2@gmail.com";
    let userToEditExists = await User.findOne({ email: signInEmail });

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "test user",
        role: [Roles.User],
      });

      await user.save();
    }

    if (!userToEditExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const userEdit = new User({
        email: userToEditEmail,
        password: hashedPass,
        name: "test user",
        role: [Roles.User],
      });

      const res = await userEdit.save();

      userToEditExists = res;
    }

    const signedInUser = await request(app)
      .post(`${authPath}signin`)
      .send({ email: signInEmail, password: "1234" });

    const token = signedInUser.body.data.token;

    const userToEditId = userToEditExists.id;

    const leNameEdit = "test user to edit edited yes";

    await request(app)
      .put(`${mainPath}${userToEditId}`)
      .send({ name: leNameEdit })
      .set("Authorization", `Bearer ${token}`)
      .expect(STATUS_CODE_AUTHORIZATION);

    await User.findOneAndDelete({ email: userToEditEmail });
    await User.findOneAndDelete({ email: signInEmail });
  });
});

describe("delete user check", () => {
  it("Delete User Api Is Working", async () => {
    let signInEmail = "admin@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });
    let pass = "1234";

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "admin",
        role: [Roles.Admin, Roles.User],
      });

      await user.save();
    }

    const signedInUser = await request(app)
      .post(`${authPath}signin`)
      .send({ email: signInEmail, password: "1234" });

    const token = signedInUser.body.data.token;

    //Delete Himself hehe
    await request(app)
      .delete(`${mainPath}${signedInUser.body.data.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(STATUS_CODE_OK);
  });
});

describe("delete user check", () => {
  it("Regular User Can not delete", async () => {
    let signInEmail = "averagejoe@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });
    let pass = "1234";

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "average",
        role: [Roles.User],
      });

      await user.save();
    }

    const signedInUser = await request(app)
      .post(`${authPath}signin`)
      .send({ email: signInEmail, password: "1234" });

    const token = signedInUser.body.data.token;

    //Can't delete Himself hehe
    await request(app)
      .delete(`${mainPath}${signedInUser.body.data.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(STATUS_CODE_AUTHORIZATION);

    await User.findOneAndDelete({ email: signInEmail });
  });
});

describe("delete user check", () => {
  it("User Not Found to delete", async () => {
    let signInEmail = "admin@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });
    let pass = "1234";

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "admin",
        role: [Roles.Admin, Roles.User],
      });

      await user.save();
    }

    const signedInUser = await request(app)
      .post(`${authPath}signin`)
      .send({ email: signInEmail, password: "1234" });

    const token = signedInUser.body.data.token;

    //Not Found
    await request(app)
      .delete(`${mainPath}69a94a22cc541132d85f02eb`)
      .set("Authorization", `Bearer ${token}`)
      .expect(STATUS_CODE_NOT_FOUND);

    await User.findOneAndDelete({ email: signInEmail });
  });
});

describe("delete user check", () => {
  it("User Not Found to delete", async () => {
    let signInEmail = "admin@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });
    let pass = "1234";

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "admin",
        role: [Roles.Admin, Roles.User],
      });

      await user.save();
    }

    const signedInUser = await request(app)
      .post(`${authPath}signin`)
      .send({ email: signInEmail, password: "1234" });

    const token = signedInUser.body.data.token;

    //Not a valid object id
    await request(app)
      .delete(`${mainPath}shalala`)
      .set("Authorization", `Bearer ${token}`)
      .expect(STATUS_CODE_BAD_REQUEST);

    await User.findOneAndDelete({ email: signInEmail });
  });
});
