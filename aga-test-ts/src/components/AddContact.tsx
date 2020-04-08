import React, { useState, FC } from "react";
import { Contact as ContactType } from "../store/contact/types";

export interface Props {
  onAdd(contact: ContactType): void;
}

export const AddContact: FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAdd = () => {
    const contact = { id: '', name: name, email: email };
    onAdd(contact);
  };

  return (
    <div className="add-contact">
      <label htmlFor="name">
        Name
        <input
          className="add-contact__input"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          className="add-contact__input"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button className="add-contact__btn" onClick={handleAdd}>
        ADD
      </button>
    </div>
  );
};
