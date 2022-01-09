import React, { useState } from "react";
//import { Link } from "react-scroll";
import { useIssues } from "../contexts/IssuesContext";
import { Link } from "react-router-dom";

const FullNavbar = ({ navClass, linkClassName }) => {
  return (
    <NavComponent
      navClass={navClass}
      linkClassName={linkClassName}
      onClick={() => null}
    />
  );
};

export const NavComponent = ({ onClick, navClass, linkClassName }) => {
  const { setDisplayIssue } = useIssues();
  const handleClick = () => {
    setDisplayIssue(null);
    onClick();
  };
  return (
    <nav className={navClass}>
      {["Home", "Issues", "Add Issue", "Edit Issue"].map((page) => (
        <Link
          key={page}
          to={`/${page.split(" ").join("-")}`}
          className={linkClassName}
          onClick={handleClick}
        >
          {page}
        </Link>
      ))}
    </nav>
  );
};
export default FullNavbar;
