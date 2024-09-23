import { downArrow, Images, notificationBell } from "../../assets/Images";
import ActionMenu from "../authentication/ActionMenu";
import "./designconstant.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import CustomAvatar from "./CustomAvatar";
const Header = () => {
  const authData = useSelector((state: any) => state.authData);
  const userDetails = {
    userName: authData?.userName || localStorage.getItem("name"),
    userEmail: authData?.userEmail || localStorage.getItem("userEmail"),
    avatar: authData?.avatar || localStorage.getItem("avatar"),
  };
  console.log(userDetails);

  return (
    <header className="header">
      <div className="action-center">
        <div className="notification">{notificationBell()}</div>

        <Popover>
          <PopoverTrigger asChild>
            <div
              className={`avatar rounded-full overflow-hidden flex items-center justify-center bg-gray-200 shadow-md`}
              style={{
                width: "40px",
                height: "40px",
              }}
            >
              <img
                src={userDetails?.avatar}
                alt={"avatar"}
                className="w-full h-full object-cover"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 top-1">
            <div className="flex gap-4 flex-col items-center">
              <CustomAvatar src={userDetails?.avatar} alt={"avatar"} size="100px"/>
              <div className="flex flex-col items-center">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-800">
                    {userDetails?.userName}
                  </h1>
                </div>
                <div>
                  <span className="text-sm text-gray-500">
                    {userDetails?.userEmail}
                  </span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {/* <span onClick={()=>{
          console.log("something");
          
        }}>{downArrow()}</span> */}
        <ActionMenu />
      </div>
    </header>
  );
};

export default Header;
