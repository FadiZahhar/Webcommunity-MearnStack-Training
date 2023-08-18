import React, { Fragment, useContext } from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "bootstrap/dist/css/bootstrap.min.css";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filteredContacts } = contactContext;

  return (
    <Fragment>
      <TransitionGroup>
        {filteredContacts
          ? filteredContacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames="fade">
                <ContactItem key={contact.id} contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames="fade">
                <ContactItem key={contact.id} contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
