import React, { useState } from "react";

const Months = ({ users }) => {
  const [usersMonth, setUsersMonth] = useState([]);
  const handleHover = (e) => {
    const { target } = e;
    const newUsers = users
      .filter((it) => it.month === +target?.innerText)
      .sort((a, b) => {
        if (a.fullName > b.fullName) {
          return 1;
        }
        if (a.fullName < b.fullName) {
          return -1;
        }
        return 0;
      });
    e.preventDefault();
    setUsersMonth(newUsers);
  };
  return (
    <React.Fragment>
      {usersMonth && usersMonth.map((it) => <p> {it.fullName} </p>)}
      <nav>
        {Array(12)
          .fill(0)
          .map((val, index) => index + 1)
          .map((it) => (
            <a
              href="/#"
              key={it}
              value={it}
              onMouseOver={handleHover}
              onMouseLeave={(e) => setUsersMonth([])}
            >
              {it}
            </a>
          ))}
      </nav>
    </React.Fragment>
  );
};

export default Months;
