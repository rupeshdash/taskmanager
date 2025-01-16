import CustomAvatar from "@/components/designConstants/CustomAvatar";
import MemberChat from "./MemberChat";
import MemberGroupChats from "./MemberGroupChats";

const GroupChats = () => {
  return (
    <section className=" p-4 min-h-[max-content] max-h-[50%] overflow-y-auto">
      <MemberGroupChats />
      <MemberGroupChats />
      
    </section>
  );
}

export default GroupChats