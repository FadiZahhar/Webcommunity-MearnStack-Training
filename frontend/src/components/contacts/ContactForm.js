import React, { useContext, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import ContactContext from "../../context/contact/contactContext";

const initialContact = {
  name: "",
  email: "",
  phone: "",
  type: "personal",
  user: "",
};

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const [contact, setContact] = useState(initialContact);

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    contactContext.addContact(contact);
    setContact(initialContact);
  };

  return (
    <Form onSubmit={onSubmit} className="bg-dark text-light p-4">
      <h2 className="text-primary mb-3">Add Contact</h2>
      <FormGroup>
        <Label for="name" className="text-light">
          Name
        </Label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Enter name"
          required
          className="bg-dark text-light"
        />
      </FormGroup>
      <FormGroup>
        <Label for="email" className="text-light">
          Email
        </Label>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Enter email"
          required
          className="bg-dark text-light"
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone" className="text-light">
          Phone
        </Label>
        <Input
          type="text"
          name="phone"
          value={phone}
          onChange={onChange}
          placeholder="Enter phone"
          className="bg-dark text-light"
        />
      </FormGroup>
      <h5 className="text-light">Contact Type</h5>
      <FormGroup check>
        <Label check className="text-light">
          <Input
            type="radio"
            name="type"
            value="personal"
            checked={type === "personal"}
            onChange={onChange}
            className="bg-dark"
          />{" "}
          Personal
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check className="text-light">
          <Input
            type="radio"
            name="type"
            value="professional"
            checked={type === "professional"}
            onChange={onChange}
            className="bg-dark"
          />{" "}
          Professional
        </Label>
      </FormGroup>
      <Button color="primary" block className="mt-3">
        <i className="fa fa-user" /> Add Contact
      </Button>
    </Form>
  );
};

export default ContactForm;
