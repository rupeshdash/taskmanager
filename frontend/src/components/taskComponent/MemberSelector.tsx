import { useState, useRef, useEffect } from 'react';
import AvatarComp from './AvatarComp';
import { Checkbox } from "@/components/ui/checkbox";
import Grouppic from '../../assets/GroupMembers.png';

interface MemberType {
  id: string;
  name: string;
  avatar: string;
}

const members: MemberType[] = [
  { id: '1', name: 'John Doe', avatar: 'https://example.com/john.png' },
  { id: '2', name: 'Jane Smith', avatar: 'https://example.com/jane.png' },
  { id: '3', name: 'Alice Johnson', avatar: 'https://example.com/alice.png' },
  { id: '4', name: 'Bob Brown', avatar: 'https://example.com/bob.png' },
  { id: '5', name: 'Bob Brown', avatar: 'https://example.com/bob.png' },
  { id: '6', name: 'Bob Brown', avatar: 'https://example.com/bob.png' },
  { id: '7', name: 'Bob Brown', avatar: 'https://example.com/bob.png' },
];

const MemberSelector = () => {
  const [selectedMembers, setSelectedMembers] = useState<MemberType[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMember = (member: MemberType) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(member)
        ? prevSelected.filter((m) => m.id !== member.id)
        : [...prevSelected, member]
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="py-2 relative">
      <h2 className="text-base font-medium mb-4">
        Select Members
      </h2>
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
            {members.map((member) => (
              <div
                key={member.id}
                className={`flex items-center space-x-2 p-2 cursor-pointer rounded-md hover:bg-gray-100`}
                onClick={() => toggleMember(member)}
              >
                <Checkbox
                  checked={selectedMembers.includes(member)}
                  onChange={() => toggleMember(member)}
                />
                <AvatarComp src={member.avatar} fallback={member.name[0]} />
                <span className='text-sm'>{member.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberSelector;
