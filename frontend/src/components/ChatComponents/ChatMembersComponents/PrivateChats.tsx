import MemberChat from "./MemberChat";
import { MemberType } from "@/components/teamCompoenent/CreateTeamComponent";

interface PropType {
  activeUserToChat: {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    lastMessage: string;
  };
  setActiveUserToChat: Function;
  chatUsersData: {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    lastMessage: string;
  }[];
}
const PrivateChats = ({ chatUsersData , activeUserToChat , setActiveUserToChat}: PropType) => {
  return (
    <section className="border-b-2 p-4 min-h-[max-content] max-h-[40%] overflow-y-auto">
      {chatUsersData?.map((user, index) => {
        return <MemberChat key={index} user={user} activeUserToChat={activeUserToChat} setActiveUserToChat={setActiveUserToChat}/>;
      })}
      {/* <MemberChat />
      <MemberChat />
      <MemberChat /> */}
    </section>
  );
};

export default PrivateChats;
