import { Tasksheet } from "./Tasksheet";

interface PropType {
  status?: string;
  title: string;
  teamId: string;
  teamMembers?: { _id: string; email: string; name: string; avatar:string}[];
  source?: string;
}
const Addtask = ({ status , title  , teamId , teamMembers , source} : PropType) => {
  return (
    <div className="mx-auto flex justify-between items-center p-5 rounded-md bg-bg-grey-status">
      <div className="font-medium md:text-lg font-semibold">
        {title}
      </div>
      {source !== "userTask" && (
        <Tasksheet
          source={"addTask"}
          teamId={teamId}
          teamMembers={teamMembers}
          status={status}
        />
      )}
    </div>
  );
};

export default Addtask;
