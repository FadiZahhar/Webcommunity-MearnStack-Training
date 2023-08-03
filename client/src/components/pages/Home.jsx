import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

function Home() {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}
export default Home;