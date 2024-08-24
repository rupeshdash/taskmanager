import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
interface AddMembersProps {
  newMembers: string[];
  setNewMembers: Function
}
const AddMembers: React.FC<AddMembersProps> = ({
  newMembers,
  setNewMembers,
}) => {
  const [email, setEmail] = useState("");
  const handleInputChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setNewMembers([...newMembers, email]);
      setEmail(""); 
    }
  };
   const handleRemoveEmail = (emailToRemove: string) => {
     setNewMembers(newMembers.filter((member) => member !== emailToRemove));
   };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Label htmlFor="new-member-email" className="text-left mb-2">
          Email
        </Label>
        <Input
          type="email"
          id="new-member-email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter email of the participants."
          className="col-span-7 w-full mt-4"
        />
      </form>
      <div className="email-list mt-4">
        {newMembers.map((member) => (
          <div key={member} className="email-item flex items-center mb-2">
            <span className="email-text bg-gray-200 p-2 rounded mr-2">
              {member}
            </span>
            <button
              onClick={() => handleRemoveEmail(member)}
              className="text-red-500"
              aria-label="Remove email"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddMembers;
