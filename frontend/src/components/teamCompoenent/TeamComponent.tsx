import { editIcon } from "@/assets/Images";
import { useState } from "react";
import { SheetTrigger } from "../ui/sheet";
import { CreateTeamComponent } from "./CreateTeamComponent";

export interface TeamProps {
  team: {
    _id: string;
    title: string;
    description: string;
    admin: {
      email: string;
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
  
  const [openUpdateTeam, setOpenUpdateTeam] = useState(false);
  return (
    <div className="team relative">
      <CreateTeamComponent source={"update"} team={team} />
      <div title={team?.title} className="team-header">
        {team?.title}
      </div>
      <div className="flex flex-col gap-4 h-4/5 justify-between">
        <div className="team-description">{team?.description}</div>
        <div className="team-footer">
          {team?.isAdmin && <div className="admin-indicator">Admin</div>}
          <div className="team-members-indicator">
            <button className="invite-button">Invite</button>
            <div className="images-placeholder flex -space-x-2">
              <img
                src="https://via.placeholder.com/40"
                alt="Member 1"
                className="rounded-full"
              />
              <img
                src="https://via.placeholder.com/40"
                alt="Member 2"
                className="rounded-full"
              />
              <img
                src="https://via.placeholder.com/40"
                alt="Member 3"
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamComponent;
