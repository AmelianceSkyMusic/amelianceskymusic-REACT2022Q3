import './Layout.scss';
import React, { Component } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export class Layout extends Component {
  render() {
    return (
      <>
        <header className="header">
          <div className="container">
            <nav className="navigation">
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
            </nav>
          </div>
        </header>
        <Outlet />
        <footer className="footer">
          <div className="container">
            <a
              href="https://amelianceskymusic.github.io/"
              target="_blank"
              className="link underlined"
              rel="noreferrer"
            >
              AmelianceSkyMusic © 2022
            </a>
          </div>
        </footer>
      </>
    );
  }
}
