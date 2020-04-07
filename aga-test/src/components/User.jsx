import React, { useState } from "react";
import PropTypes from "prop-types";

export function User({ user, onDelete, onChange }) {
  const [state, setState] = useState(false);
  const [email, setEmail] = useState(user.email);

  const handleChange = (e) => {
    e.preventDefault();
    setState(true);
  };

  const handleSave = (e, user) => {
    e.preventDefault();
    setState(false);
    const updatedUser = { ...user, email: email };
    onChange(updatedUser);
  };

  const handleDelete = (e, user) => {
    e.preventDefault();
    onDelete(user);
  };

  let input;
  if (state === true) {
    input = <input value={email} onChange={(e) => setEmail(e.target.value)} />;
  }
  return (
    <div className="user-content">
      <div className="user-row">
        <div>{user.name}</div>
        <div>{user.email}</div>
        <button onClick={handleChange}>Change email</button>
        <button onClick={(e) => handleDelete(e, user)}>DELETE</button>
      </div>
      <div className="user-row">
        {input}
        <button type="submit" onClick={(e) => handleSave(e, user)}>
          save
        </button>
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default User;
