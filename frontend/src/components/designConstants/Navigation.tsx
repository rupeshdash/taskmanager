import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { NAVIGATION_OBJ } from "./navigationConstant";

const Navigation = () => {
  const location = useLocation();
  const [NAVIGATION, SET_NAVIGATION] = useState(NAVIGATION_OBJ);
  const [currentNavLink, setCurrentNavLink] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const updatedNavigation = NAVIGATION.map((navItem) =>
      navItem.path === location.pathname
        ? { ...navItem, isActive: true }
        : { ...navItem, isActive: false }
    );
    SET_NAVIGATION(updatedNavigation);
  }, [currentNavLink]);
  return (
    <nav className="z-20">
      <div onClick={()=>navigate('/')}>Logo</div>
      <div className="nav-container">
        {NAVIGATION.map((nav) => {
          return (
            <div
              className={`nav-icon-container ${nav.isActive ? "selected" : ""}`}
              onClick={() => {
                if (!nav.isDisable) {
                  navigate(nav.path);
                  setCurrentNavLink(nav.path);
                }
              }}
            >
              <span>{nav.icon()}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
