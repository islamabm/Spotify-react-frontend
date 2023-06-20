import React from "react";
import { getSpotifySvg } from "../services/SVG.service";

export function AppNav() {
  return (
    <section className="app-nav">
      <div className="nav-home-div">
      <span
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('homeIcon'),
              }}
            ></span>
        <span>Home</span>
      </div>
      <div className="nav-search-div">
      <span
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('searchIcon'),
              }}
            ></span>
        <span>Search</span>
      </div>
    </section>
  );
}
