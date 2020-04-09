import React, { useState, FC } from "react";
import { Contact as ContactType } from "../store/contact/types";

export interface Props {
  contact: ContactType;
  onDelete(contact: ContactType): void;
  onChange(contact: ContactType): void;
}

export const Contact: FC<Props> = ({ contact, onDelete, onChange }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [email, setEmail] = useState("");

  const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowEdit(true);
  };

  const handleSave = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    contact: ContactType
  ) => {
    e.preventDefault();
    setShowEdit(false);
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

  // Edit form let change email.
  // By default edit form is hide. 
  // It appers when "change email" button is clicked.
  let editForm;
  if (showEdit === true) {
    editForm = (
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
      <tr>{editForm}</tr>
    </React.Fragment>
  );
};
