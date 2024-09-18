import { Tasksheet } from "./Tasksheet";

interface PropType {
  status?: string;
  title: string;
  teamId: string;
  teamMembers: { _id: string; email: string; name: string }[];
}
const Addtask = ({ status , title  , teamId , teamMembers} : PropType) => {
  return (
    <div className="mx-auto flex justify-between items-center p-5 rounded-md bg-white ">
      <div className="font-medium text-[#232360] md:text-lg">{title}</div>
      <Tasksheet source={"addTask"} teamId={teamId} teamMembers={teamMembers} status={status}/>
    </div>
  );
};

export default Addtask;
