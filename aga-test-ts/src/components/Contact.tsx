import React, { useState, FC } from "react";
import { Contact as ContactType } from "../store/contact/types";

export interface Props {
  contact: ContactType;
  onDelete(contact: ContactType): void;
  onChange(contact: ContactType): void;
}

export const Contact: FC<Props> = ({ contact, onDelete, onChange }) => {
  const initialEmail = contact.email;
  const [state, setState] = useState(false);
  const [email, setEmail] = useState(initialEmail);

  const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setState(true);
  };

  const handleSave = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    contact: ContactType
  ) => {
    e.preventDefault();
    setState(false);
    const updatedContact = { ...contact, email: email };
    onChange(updatedContact);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    contact: ContactType
  ) => {
    e.preventDefault();
    onDelete(contact);
  };

  let input;
  if (state === true) {
    input = (
      <React.Fragment>
        <td>
          <input
            className="contact-row__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </td>
        <td>
          <button
            className="contact-row__btn"
            type="submit"
            onClick={(e) => handleSave(e, contact)}
          >
            SAVE
          </button>
        </td>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <tr>
        <td>{contact.name}</td>
        <td>{contact.email}</td>
        <td>
          <button className="contact-row__btn" onClick={handleChange}>
            CHANGE EMAIL
          </button>
        </td>
        <td>
          <button
            className="contact-row__btn delete"
            onClick={(e) => handleDelete(e, contact)}
          >
            DELETE
          </button>
        </td>
      </tr>
      <tr>{input}</tr>
    </React.Fragment>
  );
};
