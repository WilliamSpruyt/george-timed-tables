import React from "react";
import { Link } from "react-router-dom";
export const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/stats">STATS</Link>
        </li>
      </ul>
    </nav>
  </header>
);
