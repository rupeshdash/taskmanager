import CustomAvatar from "../designConstants/CustomAvatar";
interface PropType {
  setShowMemberDetails: Function;
}
const ChatSectionHeader = ({ setShowMemberDetails } : PropType) => {
  return (
    <div onClick={() => setShowMemberDetails(true)} className="flex gap-4 p-8 items-center justify-start cursor-pointer rounded-lg">
      <div>
        <CustomAvatar
          src="https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg"
          alt="avatar"
          size="60px"
        />
      </div>
      <div>
        <h1 className="text-2xl font-semibold">Member Name</h1>
        <small className="text-[#768396] text-sm">Member Details</small>
      </div>
    </div>
  );
};

export default ChatSectionHeader