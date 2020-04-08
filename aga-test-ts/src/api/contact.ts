import axios from "axios/index";
import { Contact as ContactType } from "../store/contact/types";

export const getContactList = () =>
  axios.get("https://jsonplaceholder.typicode.com/users");

export const deleteContact = (contact: ContactType) =>
  axios.delete(`https://jsonplaceholder.typicode.com/users/${contact.id}`);

export const updateContact = (contact: ContactType) =>
  axios.put(`https://jsonplaceholder.typicode.com/users/${contact.id}`,contact);

export const addContact = (contact: ContactType) =>
  axios.post("https://jsonplaceholder.typicode.com/users", contact);
