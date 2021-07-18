import PropTypes from "prop-types";
import s from "./ContactList.module.css";

export default function ContactList({ contacts, onDeleteBtn }) {
  return (
    <div className={s.div}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.li}>
          {name}: {number}
          <button
            type="button"
            id={id}
            onClick={onDeleteBtn}
            className={s.button}
          >
            Delete
          </button>
        </li>
      ))}
    </div>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteBtn: PropTypes.func.isRequired,
};
