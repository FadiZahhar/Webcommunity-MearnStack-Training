import request from "supertest";
import app from "app";
import User from "../../src/models/User";
import bcrypt from "bcrypt";
import {
  STATUS_CODE_AUTHORIZATION,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_OK,
} from "Utils/constants";
import { connectToMongooseDB } from "scripts/connectDB";

const mainPath = "/api/auth/";

//Regular Sign Up
describe("auth check sign up", () => {
  it("Sing Up Is Working", async () => {
    await connectToMongooseDB();

    const leEmail = "abcd@gmail.com";
    await User.findOneAndDelete({ email: leEmail });

    const addedUser = await request(app)
      .post(`${mainPath}signup`)
      .send({
        name: `test`,
        email: leEmail,
        password: "pwdWow@123",
        role: ["user"],
      })
      .expect(STATUS_CODE_OK);

    await User.findOneAndDelete({ email: leEmail });
  });
});

//Sign Up Existing User
describe("auth check sign up", () => {
  it("User Already Exists", async () => {
    await connectToMongooseDB();

    const allUsers = await User.find();

    let existingUser = allUsers[0];

    if (!existingUser) {
      existingUser = await request(app)
        .post(`${mainPath}signup`)
        .send({
          name: `test`,
          email: `abcsha@gmail.com`,
          password: "pwdWow@123",
          role: ["user"],
        });
    }

    const email = existingUser.email;

    const userAdded = await request(app)
      .post(`${mainPath}signup`)
      .send({
        name: `test`,
        email: email,
        password: "pwdWow@123",
        role: ["user"],
      })
      .expect(STATUS_CODE_BAD_REQUEST);

    existingUser && (await User.findByIdAndDelete(existingUser?.body.data.id));
  });
});

//Sign Up with Invalid Email
describe("auth check sign up", () => {
  it("Invalid Email", async () => {
    await request(app)
      .post(`${mainPath}signup`)
      .send({
        name: `test`,
        email: "lalalala",
        password: "pwdWow@123",
        role: ["user"],
      })
      .expect(STATUS_CODE_BAD_REQUEST);
  });
});

//Sign In
describe("auth check sign in", () => {
  it("Sing In Is Working", async () => {
    await connectToMongooseDB();

    let signInEmail = "test@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });

    if (!userExists) {
      let pass = "1234";
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "test sign in",
      });

      await user.save();
    }

    await request(app)
      .post(`${mainPath}signin`)
      .send({ email: signInEmail, password: "1234" })
      .expect(STATUS_CODE_OK);

    await User.findOneAndDelete({ email: signInEmail });
  });
});

//Sign In with wrong credentials
describe("auth check sign in", () => {
  it("Sing In With Bad Cred", async () => {
    await connectToMongooseDB();

    let signInEmail = "test@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });

    if (!userExists) {
      let pass = "1234";
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "test sign in",
      });

      await user.save();
    }

    await request(app)
      .post(`${mainPath}signin`)
      .send({ email: signInEmail, password: "12345" })
      .expect(STATUS_CODE_BAD_REQUEST);

    await User.findOneAndDelete({ email: signInEmail });
  });
});

//Check User is authorized
describe("auth check user signed in", () => {
  it("Check Auth User", async () => {
    await connectToMongooseDB();

    let signInEmail = "signUser@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });
    let pass = "1234";

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "test sign in",
      });

      await user.save();
    }

    const signedInUser = await request(app)
      .post(`${mainPath}signin`)
      .send({ email: signInEmail, password: "1234" });

    const token = signedInUser.body.data.token;

    await request(app)
      .get(`${mainPath}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(STATUS_CODE_OK);

    await User.findOneAndDelete({ email: signInEmail });
  });
});

//Check User is not authorized
describe("auth check user signed in", () => {
  it("Check Auth User Fail", async () => {
    await connectToMongooseDB();

    let signInEmail = "signUser@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });
    let pass = "1234";

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "test sign in",
      });

      await user.save();
    }

    const signedInUser = await request(app)
      .post(`${mainPath}signin`)
      .send({ email: signInEmail, password: "1234" });

    const token = signedInUser.body.data.token;

    await request(app)
      .get(`${mainPath}`)
      .set("Authorization", `Bearer ${token + 1}`)
      .expect(STATUS_CODE_AUTHORIZATION);

    await User.findOneAndDelete({ email: signInEmail });
  });
});
