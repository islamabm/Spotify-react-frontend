import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getSpotifySvg } from "../services/SVG.service";

export function AppNav() {
  const location = useLocation();

  const getSvgIcon = (iconName) => {
    if (iconName === "homeIcon" && location.pathname === "/") {
      return getSpotifySvg("homeIconActive");
    }
    if (iconName === "searchIcon" && location.pathname === "/search") {
      return getSpotifySvg("searchIconActive");
    }
    return getSpotifySvg(iconName);
  };
  
  return (
    <section className="app-nav">
      <Link exact to="/" className="shared-nav-item">
        <span dangerouslySetInnerHTML={{ __html: getSvgIcon("homeIcon") }}></span>
        <span>Home</span>
      </Link>
      <Link to="/search" className="shared-nav-item">
        <span dangerouslySetInnerHTML={{ __html: getSvgIcon("searchIcon") }}></span>
        <span>Search</span>
      </Link>
    </section>
  );
}
