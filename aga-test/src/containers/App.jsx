import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import getUserList from "../api/user";
import {
  usersUpdate,
  userUpdate,
  userCreate,
  userDelete,
} from "../actions/user";
import { User } from "../components/User";

export function App() {
  // const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users);

  useEffect(() => {
    getUserList().then((u) => dispatch(usersUpdate(u.data)));
  }, []);

  const handleClick = (updatedUser) => {
    dispatch(userUpdate(updatedUser));
  };

  const handleDelete = (updatedUser) => {
    dispatch(userDelete(updatedUser));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const user = { name: "agusia" };
    dispatch(userCreate(user));
  };

  return (
    <div className="App">
      <button onClick={handleAdd}>ADD</button>
      <ul>
        {users.map((user) => {
          return <User key={user.id} onChange={handleClick} onDelete={handleDelete} user={user} />;
        })}
      </ul>
    </div>
  );
}
