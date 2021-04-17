import React from "react";
import { Link } from "react-router-dom";

const Footer = props => (
  <div className="header">
    <div className="container">
      {props.credits && <div className="header__subtitle">{props.credits}</div>}
    </div>
  </div>
);

export default Footer;
