import React, { useContext, useEffect, useRef } from "react";
import { Form, Input } from "reactstrap";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const filter = useRef("");

  const { filterContacts, clearFilter, filteredContact } = contactContext;

  useEffect(() => {
    if (filteredContact === null) {
      filter.current = "";
    }
  }, [filteredContact]);

  const onChange = (e) => {
    if (filter.current !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()} className="mt-3">
      <Input
        innerRef={filter}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
        style={{ backgroundColor: "#343a40", color: "#ffffff" }}
      />
    </Form>
  );
};

export default ContactFilter;
