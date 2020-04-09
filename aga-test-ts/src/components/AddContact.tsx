import React, { useState, FC } from "react";
import { Contact as ContactType } from "../store/contact/types";

export interface Props {
  onAdd(contact: ContactType): void;
}

export const AddContact: FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Initial id is an epty string which is gonna be change when api is called
  const handleAdd = () => {
    const contact = { id: '', name: name, email: email };
    onAdd(contact);
  };

  return (
    <div className="contact-add">
      <label htmlFor="name">
        Name
        <input
          className="contact-add__input"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          className="contact-add__input"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button className="contact-add__btn" onClick={handleAdd}>
        ADD
      </button>
    </div>
  );
};
