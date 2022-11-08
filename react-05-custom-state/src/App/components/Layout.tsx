import './Layout.scss';
import React, { Component } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export class Layout extends Component {
  render() {
    return (
      <>
        <header className="header">
          <NavLink className="p1" end to="/">
            Main
          </NavLink>
          <NavLink className="p1" to="/form">
            Form
          </NavLink>
          <NavLink className="p1" to="/about">
            About
          </NavLink>
          <NavLink className="p1" to="/404">
            404
          </NavLink>
        </header>
        <Outlet />
        <footer className="footer">
          <a
            href="https://amelianceskymusic.github.io/"
            target="_blank"
            className="link link__underlined "
            rel="noreferrer"
          >
            AmelianceSkyMusic © 2022
          </a>
        </footer>
      </>
    );
  }
}
