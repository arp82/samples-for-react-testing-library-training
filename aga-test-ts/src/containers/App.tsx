import React, { useState, useEffect, FC, Suspense } from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";

import {
  getContactList,
  deleteContact,
  addContact,
  updateContact,
} from "../api";
import {
  loadAllContacts,
  contactUpdate,
  contactCreate,
  contactDelete,
} from "../store/contact/actions";
import { Contact, AddContact, Loading } from "../components/";
import {
  ContactActionTypes,
  Contact as ContactType,
} from "../store/contact/types";
import { RootState } from "../store/contact/index";

export const App: FC = () => {
  const dispatch = useDispatch<Dispatch<ContactActionTypes>>();
  const contacts = useSelector((state: RootState) => state.contactReducer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getContactList()
      .then((u) => dispatch(loadAllContacts(u.data)))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (contact: ContactType) => {
    setLoading(true);
    updateContact(contact)
      .then(() => dispatch(contactUpdate(contact)))
      .finally(() => setLoading(false));
  };

  const handleDelete = (contact: ContactType) => {
    setLoading(true);
    deleteContact(contact)
      .then(() => dispatch(contactDelete(contact)))
      .finally(() => setLoading(false));
  };

  const handleAdd = (contact: ContactType) => {
    setLoading(true);
    addContact(contact)
      .then((u) => dispatch(contactCreate(u.data)))
      .finally(() => setLoading(false));
  };

  return (
    <div className="contacts-app">
      <Loading hidden={!loading}>
        <h1 className="contacts-title">My Contacts</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact: ContactType) => {
              return (
                <Contact
                  key={contact.id}
                  onChange={handleChange}
                  onDelete={handleDelete}
                  contact={contact}
                />
              );
            })}
          </tbody>
        </table>
        <AddContact onAdd={handleAdd} />
      </Loading>
    </div>
  );
};
