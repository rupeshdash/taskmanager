import CustomAvatar from "@/components/designConstants/CustomAvatar"

const MemberChat = () => {
  return (
    <div className="flex gap-4 p-4 items-center justify-start pl-4 pt-4 pb-4 hover:bg-gray-100 hover:shadow-md transition-all duration-500 cursor-pointer rounded-lg">
      <div>
        <CustomAvatar
          src="https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg"
          alt="avatar"
          size="40px"
        />
      </div>
      <div>
        <h1>Member Name</h1>
        <small className="text-[#768396] text-sm">Member message</small>
      </div>
    </div>
  );
}

export default MemberChat