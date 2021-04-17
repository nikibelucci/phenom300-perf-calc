import React from "react";
import { Link } from "react-router-dom";

const Header = props => (
  <div className="header">
    <div className="container">
      <h1 className="header__title">{props.title}</h1>
      {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
      <ul className="header__list">
        <li className="header__list li">
          <Link className="header__list a" to="/">
            Weight & Balance
          </Link>
        </li>
        <li className="header__list li">
          <Link to="/takeOff">TakeOff Calculation</Link>
        </li>
      </ul>
    </div>
  </div>
);

Header.defaultProps = {
  title: "Phenom 300 - Weight & Balance"
};

export default Header;
