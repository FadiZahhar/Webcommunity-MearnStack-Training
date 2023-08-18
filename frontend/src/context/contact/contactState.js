import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
} from "../types/types";
import ObjectId from "bson-objectid"; // Import the ObjectId function

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: new ObjectId().toHexString(), // Generate a new ObjectId
        user: 1,
        name: "blablabla",
        email: "blabla@gmail.com",
        phone: "+961 11 111 1111",
        type: "personal",
      },
      {
        id: new ObjectId().toHexString(), // Generate a new ObjectId
        user: 2,
        name: "blablabla2",
        email: "blabla2@gmail.com",
        phone: "+961 21 111 1111",
        type: "professional",
      },
    ],
    current: null,
    filteredContacts: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const addContact = (contact) => {
    const newContact = {
      ...contact,
      id: new ObjectId().toHexString(), // Generate a new ObjectId
    };
    dispatch({ type: ADD_CONTACT, payload: newContact });
  };

  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = (contact) => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  const filterContacts = (filter) => {
    dispatch({ type: FILTER_CONTACTS, payload: filter });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filteredContacts: state.filteredContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
