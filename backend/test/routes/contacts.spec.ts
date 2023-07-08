import request from "supertest";
import app from "app";
import User from "../../src/models/User";
import bcrypt from "bcrypt";
import { ContactTypes, Roles, STATUS_CODE_OK } from "../../src/Utils/constants";
import { expect } from "chai";
import Contact from "../../src/models/Contact";

const mainPath = "/api/contacts/";
const authPath = "/api/auth/";

describe("get contacts check", () => {
  it("Get Contacts Api Is Working", async () => {
    let signInEmail = "user@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });
    let pass = "1234";

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "user",
        role: [Roles.User],
      });

      await user.save();
    }

    const signedInUser = await request(app)
      .post(`${authPath}signin`)
      .send({ email: signInEmail, password: "1234" });

    const token = signedInUser.body.data.token;

    //Get All Contacts Of User
    await request(app)
      .get(`${mainPath}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(STATUS_CODE_OK);

    await User.findOneAndDelete({ email: signInEmail });
  });
});

describe("add contact check", () => {
  it("Add Contact Api Is Working", async () => {
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

    const addedContact = await request(app)
      .post(`${mainPath}`)
      .send({
        email: "abcMeow@gmail.com",
        user: signedInUser.body.data.id,
        name: "shalala",
        phone: "+96181703203",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    await Contact.findByIdAndDelete(addedContact.body.data.id);
    await User.findOneAndDelete({ email: signInEmail });
  });
});

describe("edit contact check", () => {
  it("Edit Contact Api Is Working", async () => {
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

    const contact = await request(app)
      .post(`${mainPath}`)
      .send({
        email: "abcCon@gmail.com",
        user: signedInUser.body.data.id,
        name: "shalala",
        phone: "+96181703203",
      })
      .set("Authorization", `Bearer ${token}`);

    const contactId = contact.body.data.id;

    const updatedContact = await request(app)
      .put(`${mainPath}${contactId}`)
      .send({
        email: "abc2@gmail.com",
        user: signedInUser.body.data.id,
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(STATUS_CODE_OK);

    expect(updatedContact.body.data.email).to.be.equal("abc2@gmail.com");

    await Contact.findByIdAndDelete(contactId);
    await User.findOneAndDelete({ email: signInEmail });
  });
});

describe("delete contact check", () => {
  it("Delete Contact Api Is Working", async () => {
    let signInEmail = "user@gmail.com";
    const userExists = await User.findOne({ email: signInEmail });
    let pass = "1234";

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      const user = new User({
        email: signInEmail,
        password: hashedPass,
        name: "user",
        role: [Roles.User],
      });

      await user.save();
    }

    const signedInUser = await request(app)
      .post(`${authPath}signin`)
      .send({ email: signInEmail, password: "1234" });

    const token = signedInUser.body.data.token;

    let newContact = new Contact({
      user: signedInUser.body.data.id,
      name: "meow",
      email: "omg@omg.com",
      phone: 1212,
      type: ContactTypes.Professional,
    });

    newContact.save(async (err, data) => {
      //Not Found
      await request(app)
        .delete(`${mainPath}${data.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(STATUS_CODE_OK);
    });

    await User.findOneAndDelete({ email: signInEmail });
  });
});
