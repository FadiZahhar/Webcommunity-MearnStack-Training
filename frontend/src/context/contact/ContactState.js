import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

  const ContactState = props => {
    const initialState = {
        contacts:[
        {
            id: 1,
            name:'Jill Johnson',
            email:'jil@gmail.com',
            phone:'111-111-1111',
            type:'personal'
        },
        {
            id: 2,
            name:'Sara Watson',
            email:'sara@gmail.com',
            phone:'222-222-2222',
            type:'personal'
        },
        {
            id: 3,
            name:'Harry White',
            email:'sara@gmail.com',
            phone:'222-222-2222',
            type:'personal'
        },
    ]
    };

    const [state] = useReducer(contactReducer, initialState);

    // ...
    return (
        <ContactContext.Provider value={{
            contacts: state.contacts
        }}>
            {props.children}
        </ContactContext.Provider>
    );
  }

  export default ContactState;