// import { connect, useSelector } from 'react-redux'
// import { NavLink, useNavigate, withRouter } from 'react-router-dom'
import { getSpotifySvg } from "../services/SVG.service";

export function AppHeader() {
  return (
    <header className="app-header">
      <section className="arrows">
      <div className="black-circle">
        <span
          dangerouslySetInnerHTML={{ __html: getSpotifySvg("leftArrowIcon") }}
        ></span>
      </div>
      <div className="black-circle">
        <span
          dangerouslySetInnerHTML={{ __html: getSpotifySvg("rightArrowIcon") }}
        ></span>
      </div>
      </section>
      <div className="user-actions">
      <button className="login">Login</button>
        <img src="https://i.scdn.co/image/ab6761610000e5eb601fb0059594d52f3f7939a9"/>
      </div>
    </header>
  );
}

// export const AppHeader = withRouter(_AppHeader)
