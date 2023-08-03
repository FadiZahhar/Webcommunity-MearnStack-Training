import PropTypes from "prop-types";
import { useContext } from "react";
import ContactContext from "../../context/contact/contactContext";

function ContactItem({ contact }) {
  const { id, name, email, phone, type } = contact;
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const onDelete = () => { deleteContact(id); clearCurrent(); }

  return (
    <div className='card bg-light'>
      <h3 className="text-primary text-left">
        {name + " "}
        <span
          style={{ float: 'right' }}
          className={`badge ${type === 'professional' ? 'badge-success' : 'badge-primary'}`}
        >
          {type[0].toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (<li>
          <i className="fas fa-envelope-open"></i> {email}
        </li>)}
        {phone && (<li>
          <i className="fas fa-phone"></i> {phone}
        </li>)}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => { setCurrent(contact) }}>Edit</button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
      </p>
    </div>
  )
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
}

export default ContactItem;