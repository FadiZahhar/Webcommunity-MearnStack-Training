import React, { useContext, useEffect, useState } from 'react';
import ContactContext from '../../context/contact/contactContext';




const ContactForm = () => {
  
  const [contact, setContact] = useState({name:'',email:'',phone:'',type: 'personal'});
  const {name, email, phone, type } = contact;

  const contactContext = useContext(ContactContext);

  const  { addContact, updateContact, clearCurrent, current} = contactContext;

  useEffect(() => {
    if(current !== null) {
      setContact(current);
    } else {
      setContact({name:'',email:'',phone:'',type: 'personal'});
    }
    
  },[contactContext,current])

 
  

  const onChange = (e) =>{
  
    setContact({ ...contact, [e.target.name]: e.target.value });
  }
    const onSubmit = e => {
        e.preventDefault();
        if(current === null) {
          addContact(contact);
        }
        else {
          updateContact(contact);
        }
        setContact({
          name: '',
          email: '',
          phone: '',
          type: 'personal'
        })
    }

    const clearAll = () => {
      clearCurrent();
    }

    
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder="Name"
        name="name"
        value={contact?.name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={contact?.email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={contact?.phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={contact?.type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={contact?.type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && <div>
      <button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>  
      </div>}

    </form>
  );
};

export default ContactForm;
