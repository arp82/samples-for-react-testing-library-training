import React, { useState, useEffect, FC } from "react";
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
  const [error, setError] = useState(false);

  // useEffect load all contacts.
  useEffect(() => {
    setLoading(true);
    getContactList()
      .then((u) => dispatch(loadAllContacts(u.data)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // If there is an error display simple message
  if (error === true) {
    return <h1>Something went wrong...</h1>;
  }

  const handleChange = (contact: ContactType) => {
    setLoading(true);
    updateContact(contact)
      .then(() => dispatch(contactUpdate(contact)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  const handleDelete = (contact: ContactType) => {
    setLoading(true);
    deleteContact(contact)
      .then(() => dispatch(contactDelete(contact)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  const handleAdd = (contact: ContactType) => {
    setLoading(true);
    addContact(contact)
      .then((u) => dispatch(contactCreate(u.data)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container">
      <Loading hidden={!loading}>
        <h1 className="container-title">My Contacts</h1>
        <div className="table-responsive">
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
        </div>
        <AddContact onAdd={handleAdd} />
      </Loading>
    </div>
  );
};
