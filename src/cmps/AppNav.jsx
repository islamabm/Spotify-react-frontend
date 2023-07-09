import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getSpotifySvg } from "../services/SVG.service"

export function AppNav() {
  const location = useLocation()

  const navigate = useNavigate()
  function getSvgIcon(iconName) {
    if (iconName === "homeIcon" && location.pathname === "/") {
      return getSpotifySvg("homeIconActive")
    }
    if (iconName === "searchIcon" && location.pathname === "/search") {
      return getSpotifySvg("searchIconActive")
    }
    return getSpotifySvg(iconName)
  }

  function isActive(path) {
    return location.pathname === path ? "active" : ""
  }

  function goHome() {
    navigate("/")
  }

  return (
    <section className="app-nav">
      <Link to="/" className={`shared-nav-item ${isActive("/")}`}>
        <span
          className={`icon ${isActive("/")}`}
          dangerouslySetInnerHTML={{ __html: getSvgIcon("homeIcon") }}
        ></span>
        <span onClick={goHome}>Home</span>
      </Link>
      <Link to="/search" className={`shared-nav-item ${isActive("/search")}`}>
        <span
          className={`icon ${isActive("/search")}`}
          dangerouslySetInnerHTML={{ __html: getSvgIcon("searchIcon") }}
        ></span>
        <span>Search</span>
      </Link>
    </section>
  )
}
