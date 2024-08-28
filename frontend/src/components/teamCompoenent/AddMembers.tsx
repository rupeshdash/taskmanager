import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Grouppic from "../../assets/GroupMembers.png";
import AvatarComp from "../taskComponent/AvatarComp";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/Redux/store";
import { fetchAllUsers } from "@/Redux/TeamsDetails/TeamDetailsActions";
import { Checkbox } from "../ui/checkbox";

interface AddMembersProps {
  newMembers: { _id: string; email: string }[];
  setNewMembers: Function;
}
interface MemberType {
  id: string;
  name: string;
  email: string;
  organization: string;
}

const AddMembers: React.FC<AddMembersProps> = ({
  newMembers,
  setNewMembers,
}) => {
  const authData = useSelector((state: any) => state.authData);
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
        setMembers(teamData?.allUsers);
    }
  }, [teamData]);

  return (
    <div className="py-2 relative">
      <h2 className="text-base font-medium mb-4">Select Members</h2>
      <div className="relative">
        <button
          className="hover:opacity-75"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <img src={Grouppic} alt="Group Members" className="rounded-md" />
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
                <span className="text-sm">{member.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMembers;
