import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getSpotifySvg } from "../services/SVG.service";

export function UserLibrary() {
  return (
    <section className="user-library">
      <div className="flex align-center library-header">
        <div className="flex align-center your-library pointer">
      <span
        dangerouslySetInnerHTML={{
          __html: getSpotifySvg("libraryIconActive"),
        }}
      ></span>
      <span>Your Library</span>
      </div>
      <span className="plus-icon flex align-center justify-center pointer"
        dangerouslySetInnerHTML={{
          __html: getSpotifySvg("plus"),
        }}
      ></span>
      </div>
      <div className="your-library-btns flex align-center">
        <button className="library-btn">Playlists</button>
        <button className="library-btn">Artists</button>
        <button className="library-btn">Albums</button>
      </div>
    </section>
  );
}
