import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import { ADD_CONTACT } from "../types/types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        user: 1,
        name: "blablabla",
        email: "blabla@gmail.com",
        phone: "+961 11 111 1111",
        type: "personal",
      },
      {
        id: 2,
        user: 2,
        name: "blablabla2",
        email: "blabla2@gmail.com",
        phone: "+961 21 111 1111",
        type: "professional",
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
  const addContact = (contact) => {
    // contact.id = uuid;
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
