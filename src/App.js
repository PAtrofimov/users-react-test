import React, { useState, useEffect } from "react";
import Months from "./Months";
import Users from "./Users";
import { fetchUsers } from "./utils/fetchUsers";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [failure, setFailure] = useState("");
  const [users, setUsers] = useState([]);
  const [monthUsers, setMonthUsers] = useState({
    month: undefined,
    qty: 0,
    color: undefined,
    users: [],
  });
  const [monthQty, setMonthQty] = useState({});

  const onHoverMonth = (newUsers) => {
    setMonthUsers(newUsers);
  };

  useEffect(() => {
    setIsLoading(true);

    fetchUsers()
      .then((data) => {
        const newUsers = data.map((it) => {
          return {
            id: it.id,
            fullName: `${it.firstName} ${it.lastName}`,
            month: new Date(it.dob).getMonth() + 1,
            dob: new Date(it.dob).toLocaleDateString("en-US"),
          };
        });
        const monthQty = newUsers.reduce((acc, cur) => {
          const qty = acc[cur.month] ? acc[cur.month] : 0;
          return { ...acc, [cur.month]: qty + 1 };
        }, {});
        setUsers(newUsers);
        setMonthQty(monthQty);
      })
      .catch((error) => {
        console.log(error);
        setFailure(error.message);
      });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return "Loading ...";
  }

  if (failure) {
    return <p>Error occurs: {failure} </p>;
  }

  return (
    <div className="content-wrapper">
      <Months
        users={users}
        monthQty={monthQty}
        className="month-menu"
        onHoverMonth={onHoverMonth}
      />
      <Users {...monthUsers} className="user-list" />
    </div>
  );
}

export default App;
