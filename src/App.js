import React, { useState, useEffect } from "react";
import "./App.css";
import Months from "./Months";
import Users from "./Users";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [Failure, setFailure] = useState("");
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    setIsLoading(true);
    fetch("https://yalantis-react-school-api.yalantis.com/api/task0/users")
      .then((result) => result.json())
      .then((result) => {
        setUsers(
          result.map((it) => {
            return { id: it.id, fullName: `${it.firstName} ${it.lastName}`, month: new Date(it.dob).getMonth() + 1};
          })
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setFailure(error.message);
      });
  }, []);

  if (isLoading) {
    return "Loading ...";
  }

  if (Failure) {
    return <p>Error occurs: {Failure} </p>;
  }

  return (
    <div>
      <header></header>
      <Months users={users} />
      <Users users={users} />
    </div>
  );
}

export default App;
