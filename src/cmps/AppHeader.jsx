import { getSpotifySvg } from "../services/SVG.service";
import { useLocation } from "react-router-dom";

export function AppHeader() {
  const location = useLocation();
  return (
    <header className="app-header">
      <section className="arrows-and-input">
        <section className="arrows">
          <div className="black-circle">
            <span
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg("leftArrowIcon"),
              }}
            ></span>
          </div>
          <div className="black-circle">
            <span
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg("rightArrowIcon"),
              }}
            ></span>
          </div>
        </section>
        {location.pathname === "/search" && (
          <div className="flex align-center justify-center"><input placeholder="What do you want to listen to?" /></div>
        )}
      </section>

      <div className="user-actions">
        <button className="login pointer">Login</button>
        <img
          src="https://i.scdn.co/image/ab6761610000e5eb601fb0059594d52f3f7939a9"
          className="pointer"
        />
      </div>
    </header>
  );
}
