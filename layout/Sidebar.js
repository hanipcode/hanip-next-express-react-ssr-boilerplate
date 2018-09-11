import React from 'react';
import Link from 'next/link';

type SidebarProps = {
  onLogoutPress: Function,
};

/* Materialize css sidenav-overlay is have too strong z-index so we define custome overlay */
export default ({ onLogoutPress }: SidebarProps) => (
  <div>
    <ul className="sidenav" id="mobile-demo">
      <li>
        <Link href="/home" prefetch>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </li>

      {/* <li>
              <Link href="/register" prefetch>
                <a>Register</a>
              </Link>
            </li>

            <li>
              <Link href="/login" prefetch>
                <a>Login</a>
              </Link>
            </li> */}
      <li>
        <a role="button" onClick={onLogoutPress}>
          Logout
        </a>
      </li>
    </ul>
  </div>
);
