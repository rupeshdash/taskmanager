import { MessageCircleIcon, MessageCircleMoreIcon } from "lucide-react";
import GroupChats from "./GroupChats";
import PrivateChats from "./PrivateChats";
import { Input } from "@/components/ui/input";

const ChatMemberSection = () => {
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
      <PrivateChats />

      <GroupChats />
      {/* private chat */}
    </section>
  );
}

export default ChatMemberSection