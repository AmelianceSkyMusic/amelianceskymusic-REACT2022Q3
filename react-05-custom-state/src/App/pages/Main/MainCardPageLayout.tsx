import './MainCardPageLayout.scss';
import React from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';

export function MainCardPageLayout() {
  const navigate = useNavigate();

  const { id } = useParams(); // TODO: remove and set name form state

  return (
    <>
      <header className="header main-card-page-layout">
        <div className="container">
          <nav className="breadcrumbs">
            <button
              onClick={() => navigate(-1)}
              className="icon inverted click icon--arrow-left navigation-back"
            />
            <NavLink className="p1" end to="/">
              Main
            </NavLink>
            <p className="p1">/</p>
            <p className="p1 active">{id}</p>
          </nav>
          <nav className="navigation">
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
      <footer className="footer main-card-page-layout">
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
