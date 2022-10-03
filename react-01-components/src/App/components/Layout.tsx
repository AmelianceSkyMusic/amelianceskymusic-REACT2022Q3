import './Layout.css';
import React, { Component } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const setActive = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '');

export default class Layout extends Component {
  render() {
    return (
      <>
        <header>
          <NavLink end to="/">
            Main
          </NavLink>
          <NavLink to="/about">About</NavLink>
        </header>
        <Outlet />
        <footer>2022</footer>
      </>
    );
  }
}
