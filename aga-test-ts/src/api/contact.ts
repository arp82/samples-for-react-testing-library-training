import axios from "axios/index";
import { Contact as ContactType } from "../store/contact/types";

// Get all contacts
export const getContactList = () =>
  axios.get("https://jsonplaceholder.typicode.com/users");

// Delete contact
export const deleteContact = (contact: ContactType) =>
  axios.delete(`https://jsonplaceholder.typicode.com/users/${contact.id}`);

// Update existing contact
export const updateContact = (contact: ContactType) =>
  axios.put(`https://jsonplaceholder.typicode.com/users/${contact.id}`,contact);

// Create new contact
export const addContact = (contact: ContactType) =>
  axios.post("https://jsonplaceholder.typicode.com/users", contact);
