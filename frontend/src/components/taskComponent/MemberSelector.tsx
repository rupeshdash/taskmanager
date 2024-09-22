import { useState, useRef, useEffect } from "react";
import AvatarComp from "./AvatarComp";
import { Checkbox } from "@/components/ui/checkbox";
import Grouppic from "../../assets/GroupMembers.png";

interface PropType {
  teamMembers?: { _id: string; email: string; name: string }[];
  setUpdatedMembers: Function;
  updatedMembers?: { _id: string; email: string; name: string }[];
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
          <img src={Grouppic} alt="Group Members" className="rounded-md" />
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
                <span className="text-sm">{member.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberSelector;
