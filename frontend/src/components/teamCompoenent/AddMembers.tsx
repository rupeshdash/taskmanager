import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/Redux/store";
import { fetchAllUsers } from "@/Redux/TeamsDetails/TeamDetailsActions";
import { Checkbox } from "../ui/checkbox";
import CustomAvatar from "../designConstants/CustomAvatar";

interface AddMembersProps {
  newMembers: { _id: string; email: string; avatar:string }[];
  setNewMembers: Function;
}

const AddMembers: React.FC<AddMembersProps> = ({
  newMembers,
  setNewMembers,
}) => {
  const teamData = useSelector((state: any) => state.teamData);
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [members, setMembers] = useState([]);
  const toggleMember = (member: any) => {
    setNewMembers((prevSelected: any) =>
      prevSelected.includes(member)
        ? prevSelected.filter((m: any) => m._id !== member._id)
        : [...prevSelected, member]
    );
  };
console.log(newMembers);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  useEffect(() => {
    const requestHeader = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const requestBody = {
      organization: localStorage.getItem("org"),
    };

    dispatch(fetchAllUsers(requestBody, { headers: requestHeader }));
  }, []);

  useEffect(() => {
    if(teamData?.allUsers){
      console.log(teamData?.allUsers);
      
        setMembers(teamData?.allUsers);
    }
  }, [teamData]);

  return (
    <div className="py-2 relative">
      <div className="relative">
        <button
          className="hover:opacity-75"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          {/* <img src={Grouppic} alt="Group Members" className="rounded-md" /> */}
          <div className="flex flex-row p-2 bg-custom-grey items-center rounded-[20px]">
            {newMembers.map((member: any) => (
              <CustomAvatar src={member.avatar} alt={"avatar"} size="20px" />
            ))}
            {newMembers.length === 0 ? (
              <>
                <span className="ml-2 text-sm">Select members</span>
                <span className="ml-2 font-bold">+</span>
              </>
            ) : (
              <span className="ml-2 font-bold">+</span>
            )}
          </div>
        </button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 min-w-60 max-h-60 overflow-y-auto p-2 z-50 bg-white border border-gray-200 shadow-md rounded-md mt-2 no-scrollbar scroll-smooth"
          >
            {members.map((member: any) => (  
              <div
                key={member._id}
                className={`flex items-center space-x-2 p-2 cursor-pointer rounded-md hover:bg-gray-100`}
                onClick={() => toggleMember(member)}
              >
                <Checkbox
                  checked={newMembers.some(
                    (newMember) => newMember._id === member._id
                  )}
                  onChange={() => toggleMember(member)}
                />
                {/* <AvatarComp src={member.avatar} fallback={member.name[0]} /> */}
                <CustomAvatar src={member.avatar} alt={"avatar"} size="20px" />
                <span className="text-sm">
                  {member?._id === localStorage.getItem("userId")
                    ? "You"
                    : member.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMembers;
