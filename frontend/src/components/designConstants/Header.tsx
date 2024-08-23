import { downArrow, Images, notificationBell } from "../../assets/Images";
import ActionMenu from "../authentication/ActionMenu";
import "./designconstant.css";
const Header = () => {
  return (
    <header className="header">
      <div className="action-center">
        <div className="notification">{notificationBell()}</div>
        <div>
          <img src={Images.sampleProfImg} />
        </div>
        {/* <span onClick={()=>{
          console.log("something");
          
        }}>{downArrow()}</span> */}
        <ActionMenu/>
      </div>
    </header>
  );
};

export default Header;
