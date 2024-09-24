import UserTask from "@/components/userTaskComponents/UserTask";
import Addtask from "../Addtask";
import { Task } from "../Task";
import { TaskType } from "../Tasksheet";
import { useSelector } from "react-redux";
import { SkeletonLoading } from "@/components/designConstants/SkeletonLoading";
import SortTask from "../SearchAndSortTask/SortTask/SortTask";

interface PropType {
  status: string;
  tasks: Array<TaskType>;
  title: string;
  teamId?: string;
  teamMembers?: { _id: string; email: string; name: string; avatar:string }[];
  isUserTeamAdmin?: boolean;
  source?: string;
  updatedStatus?: {
    taskId: string;
    status: string;
    prevStatus: string;
  };
  setUpdatedStatus: Function;
  showLoaderFortasks?: boolean;
}
const TaskContainer = ({
  status,
  title,
  tasks,
  teamMembers,
  teamId,
  isUserTeamAdmin,
  source,
  updatedStatus,
  setUpdatedStatus,
  showLoaderFortasks,
}: PropType) => {
  const teamData = useSelector((state: any) => state.teamData);
  const taskData = useSelector((state: any) => state.taskData);
  return (
    <div className="w-full space-y-8">
      <div className="sticky top-12 z-10 bg-wrapper-bg-grey p-[0.7rem] relative">
        <Addtask
          status={status}
          title={title}
          teamMembers={teamMembers}
          teamId={teamId ? teamId : ""}
          source={source}
        />
        {/* <SortTask/> */}
      </div>

      {teamData?.getTeamDetailsLoading && !showLoaderFortasks && (
        <>
          <SkeletonLoading />
          <SkeletonLoading />
        </>
      )}

      {taskData?.getAllTasksLoading && showLoaderFortasks && (
        <>
          <SkeletonLoading />
          <SkeletonLoading />
        </>
      )}
      <div className=" space-y-5">
        {source === "userTask"
          ? tasks.map((task: any) => {
              return (
                <UserTask
                  key={task._id}
                  taskDetails={task}
                  currentStatus={status}
                  updatedStatus={updatedStatus}
                  setUpdatedStatus={setUpdatedStatus}
                />
              );
            })
          : tasks.map((task: any) => {
              return (
                <Task
                  key={task._id}
                  taskDetails={task}
                  isUserTeamAdmin={isUserTeamAdmin}
                  teamMembers={teamMembers}
                />
              );
            })}
        {/* <Task />
        <Task />
        <Task /> */}
      </div>
    </div>
  );
};

export default TaskContainer;
