import {React, Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from '../components/Filter/Filter';
import s from '../components/Filter/Filter.module.css'
import { nanoid } from 'nanoid'

class App extends Component {
  state = {
    contacts: [
  { id: 'id-1', name: 'Cristiano Ronaldo', number: '459-12-56' },
  { id: 'id-2', name: 'Harry Kane', number: '443-89-12' },
  { id: 'id-3', name: 'Erling Haaland', number: '645-17-79' },
  { id: 'id-4', name: 'Raheem Sterling', number: '227-91-26' },
    ],
    filter: '' 
  }

  onSubmit = (submitName, submitNumber) => {
    if (this.state.contacts.find(contact => contact.name === submitName)) {
      return alert(`${submitName} is already in contacts.`);
    }
    this.setState(PreviousState => {
      return {
        contacts: [
          ...PreviousState.contacts,
          {
            id: nanoid(),
            name: submitName,
            number: submitNumber,
          },
        ],
      };
    });
  };

handleRemoveContact = id => 
this.setState(({contacts}) => ({
  contacts: contacts.filter(contact => contact.id !== id),
}))

handleFilterChange = filter => this.setState({filter});

getVisibleContacts = () => {
  const {contacts, filter} = this.state;
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()))
}

  render() {
    
const {filter} = this.state;
const visibleContacts = this.getVisibleContacts();

      return(
        <>
        <ContactForm 
        onSubmit={this.onSubmit}
        />
        <div className={s.container}>
        <h2 className={s.header_contact}>Contacts</h2>
        <Filter filter={filter} onChange={this.handleFilterChange}/>
        <ContactList onRemove={this.handleRemoveContact}  contacts={visibleContacts}/>
        </div>          
        </>
      )
  }
}

export default App;