import { MessageCircleIcon, MessageCircleMoreIcon } from "lucide-react";
import GroupChats from "./GroupChats";
import PrivateChats from "./PrivateChats";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useAppDispatch } from "@/Redux/store";
import { useSelector } from "react-redux";
import { fetchAllChatUsers } from "@/Redux/ChatDetails/ChatDetailsActions";

interface PropType {
  activeUserToChat: {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    lastMessage: string;
  };
  setActiveUserToChat: Function;
}
const ChatMemberSection = ({
  activeUserToChat,
  setActiveUserToChat,
}: PropType) => {
  const dispatch = useAppDispatch();
  const chatData = useSelector((state: any) => state.chatData);
  useEffect(() => {
    const requestHeader = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const requestBody = {
      organization: localStorage.getItem("org"),
      userId: localStorage.getItem("userId"),
    };

    dispatch(fetchAllChatUsers(requestBody, { headers: requestHeader }));
  }, [dispatch]);

  return (
    <section className="w-[25%] bg-bg-white flex flex-col">
      <header className="h-20 flex items-center justify-center gap-0 text-[25px] font-bold">
        Messages
      </header>
      <div className="flex items-center justify-center">
        <Input
          placeholder="Search"
          className="w-[80%] h-12 bg-bg-grey-status"
        />
      </div>
      <PrivateChats
        chatUsersData={chatData?.chatUsers}
        activeUserToChat={activeUserToChat}
        setActiveUserToChat={setActiveUserToChat}
      />

      <GroupChats />
      {/* private chat */}
    </section>
  );
};

export default ChatMemberSection;
