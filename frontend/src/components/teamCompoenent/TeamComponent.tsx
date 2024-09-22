import { editIcon } from "@/assets/Images";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SheetTrigger } from "../ui/sheet";
import { CreateTeamComponent } from "./CreateTeamComponent";
import Grouppic from "../../assets/GroupMembers.png";
import { Badge } from "../ui/badge";

export interface TeamProps {
  team: {
    _id: string;
    title: string;
    description: string;
    admin: {
      email: string;
      name: string;
    };
    isAdmin: boolean;
    members: [
      {
        _id: string;
        email: string;
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
      <div className="">
        <div className="flex justify-between items-center mb-3 w-[93%]">
          {team?.isAdmin && (
            <Badge className="bg-admin-green text-green-600">Admin</Badge>
          )}
          <div className="flex gap-1 items-center">
            <Badge variant={"outline"}>{team?.admin?.name}</Badge>
          </div>
        </div>
        <div className=" space-y-1">
          <h2 className="text-base text-primary-blue font-medium mb">
            {team?.title}
          </h2>
          <p className="text-[#768396] text-sm">{team?.description}</p>
        </div>
      </div>
      <div className="mt-12">
        {team?.members?.length > 0 && (
          <div>
            {team?.members?.map((member: any) => (
              <Badge
                className="max-w-max mr-2 mb-2"
                variant={"secondary"}
                key={member?.id}
              >
                {member?.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamComponent;
