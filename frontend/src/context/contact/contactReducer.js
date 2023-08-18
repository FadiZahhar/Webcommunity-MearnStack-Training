import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
} from "../types/types";

const contactReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT: {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    }
    case DELETE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    }
    case SET_CURRENT: {
      return {
        ...state,
        current: action.payload,
      };
    }
    case CLEAR_CURRENT: {
      return {
        ...state,
        current: null,
      };
    }
    case UPDATE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    }

    case FILTER_CONTACTS: {
      if (!action.payload || action.payload.length === 0) {
        return {
          ...state,
          filteredContacts: null,
        };
      }
      return {
        ...state,
        filteredContacts: state.contacts.filter((contact) => {
          const regEx = new RegExp(`${action.payload}`, "gi");
          return (
            contact.name.match(regEx) ||
            contact.email.match(regEx) ||
            contact.phone.match(regEx) ||
            contact.type.match(regEx)
          );
        }),
      };
    }

    case CLEAR_FILTER: {
      return {
        ...state,
        filteredContacts: null,
      };
    }

    default:
      return state;
  }
};
export default contactReducer;
