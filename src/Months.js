import React, { useState } from "react";
import { MONTHS } from "./utils/constants";

const Months = ({ users, monthQty, onHoverMonth }) => {
  const [activeMonth, setActiveMonth] = useState(0);
  const UserByName = (a, b) => {
    if (a.fullName > b.fullName) {
      return 1;
    }
    if (a.fullName < b.fullName) {
      return -1;
    }
    return 0;
  };

  const handleHover = (e) => {
    const { number, month, qty, color } = e.target.dataset;
    const newUsers = users
      .filter((it) => it.month === +number)
      .sort(UserByName);
    setActiveMonth(number);
    onHoverMonth({ month, qty, color, users: newUsers });
  };

  const handleLeave = (e) => {
    setActiveMonth(0);
    onHoverMonth({
      month: undefined,
      users: [],
      color: undefined,
      qty: 0,
    });
  };

  const getColorMonth = (qty) => {
    let color;
    if (qty <= 2) {
      color = "grey";
    } else if (qty >= 3 && qty <= 6) {
      color = "blue";
    } else if (qty >= 7 && qty <= 10) {
      color = "green";
    } else {
      color = "red";
    }
    return color;
  };

  const renderMonths = () => {
    return MONTHS.map((it) => {
      const qty = monthQty[it.number] ?? 0;
      const color = getColorMonth(qty);
      const className =
        "month-ref" + (it.number === +activeMonth ? " active-month" : "");
      return (
        <a
          href="/#"
          key={it.number}
          data-number={it.number}
          data-month={it.name}
          data-qty={qty}
          data-color={color}
          style={{ color }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          className={className}
        >
          <span className="month-name">{it.name}</span> ({qty})
        </a>
      );
    });
  };

  return <nav className="months-wrapper">{renderMonths()}</nav>;
};

export default Months;
