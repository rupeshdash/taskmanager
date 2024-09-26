import { LucideSendHorizonal } from "lucide-react";
import { Input } from "../ui/input";
import ChatSectionHeader from "./ChatSectionHeader";
import { EmojiIcon, sendMessageIcon } from "@/assets/Images";
import { Textarea } from "../ui/textarea";
import ChatsContainer from "./ChatsContainer";
interface PropType {
  setShowMemberDetails: Function;
}
const ChatSection = ({ setShowMemberDetails }: PropType) => {
  return (
    <section className="grow-2 wrapper-bg-grey">
      {/* header to contain group or user info */}
      <header className="fixed top-10 flex w-full bg-wrapper-bg-grey">
        <ChatSectionHeader setShowMemberDetails={setShowMemberDetails} />
      </header>

      {/* message section */}

      <ChatsContainer />

      {/* input section */}
      <section className="p-4 relative">
        <Textarea
          className="w-full rounded-md p-3 pr-20 resize-none  border max-h-[120px] min-h-[40px] overflow-y-auto border-gray-300 focus:outline-none focus:border-none"
          rows={1}
          autoFocus
          placeholder="Type your message..."
        />
        <span className="flex flex-row-reverse absolute gap-4 top-[27px] right-8">
          {sendMessageIcon()}
          {EmojiIcon()}
        </span>
      </section>
    </section>
  );
};

export default ChatSection;
