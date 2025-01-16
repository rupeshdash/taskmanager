import CustomAvatar from "@/components/designConstants/CustomAvatar"
import { MemberType } from "@/components/teamCompoenent/CreateTeamComponent";


interface PropType {
  user: {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    lastMessage: string;
  };
  activeUserToChat: {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    lastMessage: string;
  };
  setActiveUserToChat: Function;
}
const MemberChat = ({user , activeUserToChat , setActiveUserToChat} : PropType) => {
  return (
    <div onClick={()=> setActiveUserToChat(user)} className="flex gap-4 p-4 items-center justify-start pl-4 pt-4 pb-4 hover:bg-gray-100 hover:shadow-md transition-all duration-500 cursor-pointer rounded-lg">
      <div>
        <CustomAvatar
          src={user?.avatar}
          alt="avatar"
          size="40px"
        />
      </div>
      <div>
        <h1>{user?.name}</h1>
        {
            user?.lastMessage && <small className="text-[#768396] text-sm">{user?.lastMessage}</small>
        }
      </div>
    </div>
  );
}

export default MemberChat