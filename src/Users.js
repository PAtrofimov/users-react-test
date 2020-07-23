import React from "react";

const Users = ({users}) => {

  const userList =
    users.length === 0 ? (
      <p>No users</p>
    ) : (
      users.map((it) => (
        <li key={it.id}>
          <a href="/#">{it.fullName} - {it.month} </a>
        </li>
      ))
    );

  return <ul>{userList}</ul>;
};

export default Users;
