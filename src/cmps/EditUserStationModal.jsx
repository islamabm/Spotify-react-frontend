import React from "react";
import {getSpotifySvg} from '../services/SVG.service'
import { useState } from "react";

export function EditUserStationModal() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <section className="modal-container">
      <div className="modal-header flex align-center">
        <h2>Edit details</h2>
        <span>X</span>
      </div>
      <div className="edit-actions">
        <div class="default-image-div"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
        <span
          className="music-note"
          dangerouslySetInnerHTML={{
            __html: isHovered ? getSpotifySvg("editImgIcon") : getSpotifySvg("userStationImg"),
          }}
        ></span>
        </div>

        <div className="flex column inputs-container">
          <input type="text" placeholder="Add a name"/>
          <input className="bigger-input" type="text" placeholder="Add an optional description"/>
        </div>
      </div>
      <button>Save</button>
      <p>
        By proceeding, you agree to give Spotify access to the image you choose
        to upload. Please make sure you have the right to upload the image.
      </p>
    </section>
  );
}
