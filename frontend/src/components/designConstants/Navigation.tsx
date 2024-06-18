import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import {
  chatsIcon,
  settingIcon,
  taskIcon,
  teamNavIcon,
} from "../../assets/Images";
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
    <nav>
      <div>Logo</div>
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
