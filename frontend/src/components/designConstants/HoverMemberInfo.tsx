import {
  HoverCardContent,
} from "@/components/ui/hover-card";
import CustomAvatar from "./CustomAvatar";

export function HoverMemberInfo({ teamMembersDetails } : any) {
    console.log(teamMembersDetails);
    
  return (
    <HoverCardContent>
      <div className="flex gap-4 flex-col items-center">
        <CustomAvatar
          src={teamMembersDetails?.avatar}
          alt={"avatar"}
          size="100px"
        />
        <div className="flex flex-col items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {teamMembersDetails?.userName}
            </h1>
          </div>
          <span className="text-sm text-gray-500">
            {teamMembersDetails?.userEmail}
          </span>
        </div>
      </div>
    </HoverCardContent>
  );
}
