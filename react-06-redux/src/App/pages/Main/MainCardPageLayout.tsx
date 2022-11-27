import './MainCardPageLayout.scss';
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import asm from 'asmlib/asm-scripts';
import { useTypedSelector } from 'App/store/hooks/useTypedSelector';
import { IVideoItem } from 'App/types/IYoutubeResponse';

export function MainCardPageLayout() {
  const navigate = useNavigate();

  const state = useTypedSelector((state) => state.mainPageReducer);

  const title = state.currentCard ? (state.currentCard as IVideoItem).snippet.title : '';

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
            <p className="p1 active">{asm.stringCut(title, 28)}</p>
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
