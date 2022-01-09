import React from "react";
import FullNavbar from "./FullNavbar";
import { Link } from "react-scroll";
import SmallNavbar from "./SmallNavbar";
import { useWindowWidthAndHeight } from "../customHooks/CustomHooks";

const Header = () => {
  const [width, height] = useWindowWidthAndHeight();
  return (
    <header>
      <div className="header-inner">
        <Link to="Home" className="logo nav-link">
          ISSUE TRACKER
        </Link>
        {width > 1000 ? (
          <FullNavbar navClass="nav-big" linkClassName="nav-big-link" />
        ) : (
          <SmallNavbar navClass="nav-small" linkClassName="nav-small-link" />
        )}
      </div>
    </header>
  );
};

export default Header;
