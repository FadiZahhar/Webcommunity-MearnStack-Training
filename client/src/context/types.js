// business logic actions of contact keeper app, used in contactReducer

// for fetching all contacts from a server or local data
export const GET_CONTACTS = 'GET_CONTACTS';

// for adding a new contact
export const ADD_CONTACT = 'ADD_CONTACT';

// for deleting a contact
export const DELETE_CONTACT = 'DELETE_CONTACT';

// for setting the current contact, likely for an edit or update operation
export const SET_CURRENT = 'SET_CURRENT';

// for clearing the current contact from the state after an update or other operation
export const CLEAR_CURRENT = 'CLEAR_CURRENT';

// for updating a contact
export const UPDATE_CONTACT = 'UPDATE_CONTACT';

// for filtering the list of contacts based on certain criteria
export const FILTER_CONTACTS = 'FILTER_CONTACTS';

// clear the list of contacts from the state, maybe after a logout or similar operation
export const CLEAR_CONTACTS = 'CLEAR_CONTACTS';

// clear any active filters on the list of contacts
export const CLEAR_FILTER = 'CLEAR_FILTER';

// for handling errors related to contact operations
export const CONTACT_ERROR = 'CONTACT_ERROR';

// for showing alert messages to the user
export const SET_ALERT = 'SET_ALERT';

// clear the alert message from the state
export const REMOVE_ALERT = 'REMOVE_ALERT';
