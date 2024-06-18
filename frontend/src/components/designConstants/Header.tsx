import { downArrow, Images, notificationBell } from "../../assets/Images";
import "./designconstant.css";
const Header = () => {
  return (
    <header className="header">
      <div className="action-center">
        <div className="notification">{notificationBell()}</div>
        <div>
          <img src={Images.sampleProfImg} />
        </div>
        {downArrow()}
      </div>
    </header>
  );
};

export default Header;
