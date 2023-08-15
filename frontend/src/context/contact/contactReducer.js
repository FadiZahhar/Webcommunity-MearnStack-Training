import { ADD_CONTACT } from "../types/types";

const contactReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT: {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    }
    default:
      return state;
  }
};
export default contactReducer;
