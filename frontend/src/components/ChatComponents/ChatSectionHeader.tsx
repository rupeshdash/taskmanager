import CustomAvatar from "../designConstants/CustomAvatar";
interface PropType {
  setShowMemberDetails: Function;
  activeUserToChat: {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    lastMessage: string;
  };
}
const ChatSectionHeader = ({ activeUserToChat ,setShowMemberDetails } : PropType) => {
  return (
    <div onClick={() => setShowMemberDetails(true)} className="flex gap-4 p-8 items-center justify-start cursor-pointer rounded-lg">
      <div>
        <CustomAvatar
          src={activeUserToChat?.avatar}
          alt="avatar"
          size="60px"
        />
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{activeUserToChat?.name}</h1>
        <small className="text-[#768396] text-sm">{activeUserToChat?.email}</small>
      </div>
    </div>
  );
};

export default ChatSectionHeader