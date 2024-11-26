import { useSelector } from 'react-redux';
import Contact from '../contact/Contact';
import styles from './ContactList.module.css';
import { selectContacts } from '../../redux/contactsSlice';
import { selectNameFilter } from '../../redux/filtersSlice';

export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  if (!contacts || contacts.length === 0) {
    return <p>No contacts available</p>;
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={styles.list}>
      {filteredContacts.map(contact => (
        <li key={contact.id} className={styles.element}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
