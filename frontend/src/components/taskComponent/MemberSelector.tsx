import { useState, useRef, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import CustomAvatar from "../designConstants/CustomAvatar";

interface PropType {
  teamMembers?: { _id: string; email: string; name: string; avatar:string}[];
  setUpdatedMembers: Function;
  updatedMembers?: { _id: string; email: string; name: string; avatar:string }[];
}

const MemberSelector = ({
  teamMembers,
  updatedMembers,
  setUpdatedMembers,
}: PropType) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  console.log(updatedMembers, "updatedMembers");
  
  const toggleMember = (member: any) => {
    setUpdatedMembers((prevSelected: any) =>
      prevSelected.some((m: any) => m._id === member._id)
        ? prevSelected.filter((m: any) => m._id !== member._id)
        : [...prevSelected, member]
    );
  };

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

  return (
    <div className="py-2 relative">
      <div className="relative">
        <button
          className="hover:opacity-75"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex flex-row p-2 bg-custom-grey items-center rounded-[20px]">
            {updatedMembers?.map((member) => (
              <CustomAvatar src={member.avatar} alt={"avatar"} size="20px" />
            ))}
            {updatedMembers && updatedMembers?.length === 0 && (
              <span className="ml-2 text-sm">Add members</span>
            )}
            <span className="ml-2 font-bold">+</span>
          </div>
        </button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 min-w-60 max-h-60 overflow-y-auto p-2 z-50 bg-white border border-gray-200 shadow-md rounded-md mt-2 no-scrollbar scroll-smooth"
          >
            {teamMembers?.map((member) => (
              <div
                key={member._id}
                className="flex items-center space-x-2 p-2 cursor-pointer rounded-md hover:bg-gray-100"
                onClick={() => toggleMember(member)}
              >
                <Checkbox
                  checked={updatedMembers?.some((m) => m._id === member._id)}
                  onChange={() => toggleMember(member)}
                />
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

export default MemberSelector;
