import React, { Component } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

export class Layout extends Component {
  render() {
    return (
      <>
        <header className="header">
          <NavLink end to="/">
            Main
          </NavLink>
          <NavLink to="/form">Form</NavLink>
          <NavLink to="/about">About</NavLink>
        </header>
        <Outlet />
        <footer className="footer">2022</footer>
      </>
    );
  }
}
