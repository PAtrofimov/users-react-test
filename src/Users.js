import React from "react";

const Users = ({ users, month, qty, color }) => {
  const userList =
    users.length === 0 ? (
      <p>No users</p>
    ) : (
      users.map((it) => (
        <li key={it.id}>
          <a href="/#">
            <span className="user-fullname">{it.fullName} </span>
            <span className="user-date">({it.dob})</span>
          </a>
        </li>
      ))
    );

  const renderUsers = () => {
    if (!month) {
      return null;
    }
    return (
      <div>
        <h1>
          <span className="users-qty" style={{ color }}>
            {qty}
          </span>{" "}
          Users of birthday in{" "}
          <span className="users-month" style={{ color }}>
            {month}
          </span>
        </h1>
        <ul className="users-month-list">{userList}</ul>
      </div>
    );
  };

  return renderUsers();
};

export default Users;
