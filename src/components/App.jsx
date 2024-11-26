import './App.css';

import SearchBox from '../components/searchBox/SearchBox';
import ContactList from '../components/contactList/ContactList';
import ContactForm from '../components/contactForm/ContactForm';

function App() {
  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;
