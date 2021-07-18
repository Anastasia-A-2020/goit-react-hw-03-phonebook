import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./Form.module.css";

const INITIAL_STATE = {
  name: "",
  number: "",
};

export default class Form extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({
      ...INITIAL_STATE,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit(this.state);
    this.reset();
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <form onSubmit={this.handleFormSubmit} className={s.form}>
          <label className={s.label}>
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              className={s.input}
            />
          </label>
          <label className={s.label}>
            Phone number
            <input
              type="tel"
              name="number"
              value={number}
              onChange={this.handleChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              className={s.input}
            />
          </label>

          <button type="submit" className={s.button}>
            Add contact
          </button>
        </form>
      </>
    );
  }
}

Form.propType = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
