import React, { useContext, useEffect, useState } from "react";
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
  const { addContact, updateContact, clearCurrent, current } =
    useContext(ContactContext);
  const [contact, setContact] = useState(initialContact);

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact(initialContact);
    }
  }, [current]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!current) addContact(contact);
    if (current) updateContact(contact);

    setContact(initialContact);
  };

  return (
    <Form onSubmit={onSubmit} className="bg-dark text-light p-4">
      <h2 className="text-primary mb-3">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <FormGroup>
        <Label for="name" className="text-light">
          Name
        </Label>
        <Input
          type="text"
          name="name"
          value={contact?.name}
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
          value={contact?.email}
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
          value={contact?.phone}
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
            checked={contact?.type === "personal"}
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
            checked={contact?.type === "professional"}
            onChange={onChange}
            className="bg-dark"
          />{" "}
          Professional
        </Label>
      </FormGroup>
      <Button type="submit" color="primary" block className="mt-3">
        <i className="fa fa-user" />{" "}
        {current ? "Update Contact" : "Add Contact"}
      </Button>
      {current && (
        <Button
          onClick={() => clearCurrent()}
          color="secondary"
          block
          className="mt-3"
        >
          Clear
        </Button>
      )}
    </Form>
  );
};

export default ContactForm;
