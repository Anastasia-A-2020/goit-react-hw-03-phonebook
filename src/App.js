import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

import Form from "./components/Form";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

import s from "./App.css";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem("contacts"));

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      toast(`${name} is already in contacts`, {
        duration: 3000,
      });
      return;
    }

    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
    /*{ contacts } - prevState.contacts*/
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  onDeleteBtn = (e) => {
    const id = e.target.id;
    const newContacts = this.state.contacts.filter(
      (contact) => contact.id !== id
    );
    this.setState({
      contacts: newContacts,
      filter: "",
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={s.div}>
        <h1>Phonebook</h1>

        <Form onFormSubmit={this.addContact} />
        <Toaster />

        {contacts.length > 0 && <h1>Contacts</h1>}

        {contacts.length > 0 && (
          <Filter value={filter} onChange={this.changeFilter} />
        )}

        {contacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onDeleteBtn={this.onDeleteBtn}
          />
        )}
      </div>
    );
  }
}

export default App;
