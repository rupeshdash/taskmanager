import { LucideSendHorizonal } from "lucide-react";
import { Input } from "../ui/input";
import ChatSectionHeader from "./ChatSectionHeader";
import { EmojiIcon, sendMessageIcon } from "@/assets/Images";
import { Textarea } from "../ui/textarea";
import ChatsContainer from "./ChatsContainer";
import { useState } from "react";
import { sendMessage } from "@/Redux/ChatDetails/ChatDetailsActions";
import { useAppDispatch } from "@/Redux/store";
interface PropType {
  activeUserToChat: {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    lastMessage: string;
  };
  setShowMemberDetails: Function;
}
const ChatSection = ({ activeUserToChat ,setShowMemberDetails }: PropType) => {
  const dispatch = useAppDispatch();
  const [chatMessage , setChatMessage] = useState('');
  function handleSendMessage(e:any) {
    e.preventDefault();
     const requestHeader = {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
     };

     const requestBody = {
       sender: localStorage.getItem("userId"),
       recipients: [activeUserToChat?._id],
       messageContent: chatMessage,
       messageType: "text",
     };

     dispatch(sendMessage(requestBody, { headers: requestHeader }));
    console.log(chatMessage);
  }
  return (
    <section className="grow-2 wrapper-bg-grey">
      {/* header to contain group or user info */}
      <header className="fixed top-10 flex w-full bg-wrapper-bg-grey">
        <ChatSectionHeader
          activeUserToChat={activeUserToChat}
          setShowMemberDetails={setShowMemberDetails}
        />
      </header>

      {/* message section */}

      <ChatsContainer activeUserToChat={activeUserToChat} />

      {/* input section */}
      <form className="p-4 relative" onSubmit={(e) => handleSendMessage(e)}>
        <Textarea
          className="w-full rounded-md p-3 pr-20 resize-none  border max-h-[120px] min-h-[40px] overflow-y-auto border-gray-300 focus:outline-none focus:border-none"
          rows={1}
          autoFocus
          placeholder="Type your message..."
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
        />
        <span className="flex flex-row-reverse absolute gap-4 top-[27px] right-8">
          <span onClick={(e:any) => handleSendMessage(e)}>{sendMessageIcon()}</span>
          {EmojiIcon()}
        </span>
      </form>
    </section>
  );
};

export default ChatSection;
