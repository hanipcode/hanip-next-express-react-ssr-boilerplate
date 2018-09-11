import React from 'react';

import '../styles/navbar.scss';

export type NavbarProptype = {
  rightIconName?: string,
  onRightIconClick: Function,
  withRightIcon?: boolean,
};

/* Materialize css sidenav-overlay is have too strong z-index so we define custome overlay */
export default ({ withRightIcon = false, rightIconName, onRightIconClick }: NavbarProptype) => (
  <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper green fixed">
        <a href="#!" className="brand-logo center">
          Logo
        </a>
        <a role="button" data-target="mobile-demo" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        {withRightIcon && (
          <a onClick={onRightIconClick} role="button" className="white-text right-button">
            <i className="material-icons  right-button-item">{rightIconName}</i>
          </a>
        )}
      </div>
    </nav>
  </div>
);
