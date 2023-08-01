import { useReducer } from 'react';
import contactReducer from './contactReducer';
import ContactContext from './contactContext';
// import uuid from 'uuid';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER
} from '../types';

function ContactState(props) {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jil@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'sara@gmail.com',
        phone: '222-222-2222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Harry White',
        email: 'sara@gmail.com',
        phone: '222-222-2222',
        type: 'personal'
      },
    ]
  }

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  // Delete Contact
  // Set Current Contact
  // Clear Current Contact
  // Update Contact
  // Filter Contacts
  // Clear Filter
  
  return (
    <ContactContext.Provider value={{
      contacts: state.contacts
    }}>
      {props.children}
    </ContactContext.Provider>
  );
}

export default ContactState;
