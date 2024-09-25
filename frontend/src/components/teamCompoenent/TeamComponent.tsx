import { editIcon } from "@/assets/Images";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SheetTrigger } from "../ui/sheet";
import { CreateTeamComponent } from "./CreateTeamComponent";
import Grouppic from "../../assets/GroupMembers.png";
import { Badge } from "../ui/badge";
import CustomAvatar from "../designConstants/CustomAvatar";
import BagdeWithName from "../designConstants/BagdeWithName";

export interface TeamProps {
  team: {
    _id: string;
    title: string;
    description: string;
    admin: {
      _id: string;
      email: string;
      name: string;
      avatar: string;
    };
    isAdmin: boolean;
    members: [
      {
        _id: string;
        email: string;
        avatar: string;
      }
    ];
  };
}
const TeamComponent: React.FC<TeamProps> = ({ team }) => {
  const navigate = useNavigate();
  const [openUpdateTeam, setOpenUpdateTeam] = useState(false);

  return (
    <div
      className="mx-auto relative w-full bg-white rounded-lg overflow-hidden p-4  transition-transform transition-colors duration-500 ease-in-out hover:scale-105  hover:shadow-lg hover:cursor-pointer"
      onClick={() => navigate("/team?teamid=" + team?._id)}
    >
      <CreateTeamComponent
        source={"update"}
        team={team}
        isAdmin={team?.isAdmin}
      />
      <div className="h-full">
        <div className="flex justify-between items-center mb-3 w-[93%]">
          {team?.isAdmin && (
            <Badge className="bg-admin-green text-green-600">Admin</Badge>
          )}
          <div className="flex gap-1 items-center">
            <BagdeWithName
              _id={team?.admin?._id}
              name={team?.admin?.name}
              avatar={team?.admin?.avatar}
            />
          </div>
        </div>
        <div className="flex h-[78%] flex-col justify-between space-y-5">
          <div>
            <h2 className="text-base text-primary-blue font-medium mb">
              {team?.title}
            </h2>
            <p className="text-[#768396] text-sm">{team?.description}</p>
          </div>
          <div>
            {team?.members?.length > 0 && (
              <div>
                {team?.members?.map((member: any) => (
                  <BagdeWithName
                    _id={member?._id}
                    name={member?.name}
                    avatar={member?.avatar}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamComponent;
