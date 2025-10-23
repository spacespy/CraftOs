import React from "react";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/clients">Clients</NavLink>
    </nav>
  );
}
