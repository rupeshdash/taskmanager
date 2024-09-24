import { formatDate } from "../helper";
import { TaskType } from "./Tasksheet";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { UpdateTaskDetails } from "./TaskType/UpdateTaskDetails";
import { UserTaskDetails } from "../userTaskComponents/UserTaskDetails";
import BagdeWithName from "../designConstants/BagdeWithName";
import { Edit } from "lucide-react";

interface PropType {
  key: number;
  taskDetails: TaskType;
  isUserTeamAdmin?: boolean;
  teamMembers?: { _id: string; email: string; name: string; avatar: string }[];
}
export const Task = ({
  key,
  taskDetails,
  isUserTeamAdmin,
  teamMembers,
}: PropType) => {
  const isUserTaskAdmin =
    taskDetails?.createdBy?._id === localStorage.getItem("userId");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          key={key}
          className="mx-auto bg-white rounded-lg overflow-hidden p-4 space-y-5 duration-500 ease-in-out hover:scale-105  hover:shadow-lg hover:cursor-pointer"
        >
          <div className="">
            <div className="flex justify-between items-center mb-3">
              <p
                className={` text-white font-semibold rounded-md border border-opacity-75 px-5 py-2 text-xs ${
                  taskDetails?.priority === "high"
                    ? "bg-red-500 text-white"
                    : taskDetails?.priority === "medium"
                    ? "bg-orange-500 text-white"
                    : taskDetails?.priority === "low"
                    ? "bg-green-500 text-white"
                    : ""
                }`}
              >
                {taskDetails?.priority.toUpperCase()}
              </p>
              <div className="flex gap-1 items-center">
                <BagdeWithName
                  _id={taskDetails?.createdBy?._id}
                  name={taskDetails?.createdBy?.name}
                  avatar={taskDetails?.createdBy?.avatar}
                />
                {(isUserTaskAdmin || isUserTeamAdmin) && (
                  <span className="h-6 top-2 cursor-pointer">{<Edit />}</span>
                )}
              </div>
            </div>
            <div className=" space-y-1">
              <h2 className="text-base text-primary-blue font-medium mb">
                {taskDetails?.title}
              </h2>
              <p className="text-[#768396] text-sm">
                {taskDetails?.description}
              </p>
            </div>
          </div>
          <div className=" flex justify-between items-center text-sm">
            <p className="text-primary-blue font-medium rounded-md border border-opacity-75 p-2">
              <span>Deadline : </span>
              {formatDate(taskDetails?.deadline)}
            </p>
            <p className="text-primary-blue font-medium rounded-md border border-opacity-75 p-2">
              <span>Created at : </span>
              {formatDate(taskDetails?.createdAt)}
            </p>
            <div className="flex gap-2 items-center text-[#5A5A5A]">
              {/* <p className="font-medium">Assigned To</p> */}
            </div>
          </div>
          {taskDetails?.members?.length > 0 && (
            <div className="flex gap-2 flex-row">
              {taskDetails?.members?.map((member: any) => (
                <BagdeWithName
                  _id={member?._id}
                  name={member?.name}
                  avatar={member?.avatar}
                />
              ))}
            </div>
          )}
        </div>
      </DialogTrigger>
      {isUserTaskAdmin || isUserTeamAdmin ? (
        <UpdateTaskDetails
          taskDetails={taskDetails}
          teamMembers={teamMembers}
        />
      ) : (
        <UserTaskDetails taskDetails={taskDetails} />
      )}
    </Dialog>
  );
};
