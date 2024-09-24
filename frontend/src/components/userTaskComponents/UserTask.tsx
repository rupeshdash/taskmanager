import { ChevronLeft, Loader, Loader2 } from "lucide-react";
import { formatDate } from "../helper";
import { TaskType } from "../taskComponent/Tasksheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { UserTaskDetails } from "./UserTaskDetails";
import { Badge } from "../ui/badge";
import CustomAvatar from "../designConstants/CustomAvatar";
import BagdeWithName from "../designConstants/BagdeWithName";

interface PropType {
  key: number;
  taskDetails: TaskType;
  currentStatus: string;
  updatedStatus?: {
    taskId: string;
    status: string;
    prevStatus: string;
  };
  setUpdatedStatus: Function;
}

export const updatTaskStatus: any = {
  backlog: {
    nextStatus: "assigned",
    nextStatusText: "Pick the task",
  },
  assigned: {
    nextStatus: "in_progress",
    nextStatusText: "Start the task",
    prevStatus: "backlog",
    prevStatusText: "Backlog",
  },
  in_progress: {
    nextStatus: "review",
    nextStatusText: "Submit for review",
    prevStatus: "assigned",
    prevStatusText: "Assigned",
  },
  review: {
    // nextStatus: "closed",
    // nextStatusText: "Close the task",
    prevStatus: "in_progress",
    prevStatusText: "In Progress",
  },
};
const UserTask = ({
  key,
  taskDetails,
  currentStatus,
  updatedStatus,
  setUpdatedStatus,
}: PropType) => {
  const taskData = useSelector((state: any) => state.taskData);
  const [btnClicked, setButtonClicked] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          key={key}
          className="mx-auto bg-white rounded-lg overflow-hidden p-4 space-y-5 transition-transform transition-colors duration-500 ease-in-out hover:scale-105  hover:shadow-lg hover:cursor-pointer"
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

              <BagdeWithName
                _id={taskDetails?.createdBy?._id}
                name={taskDetails?.createdBy?.name}
                avatar={taskDetails?.createdBy?.avatar}
              />
            </div>
            <div className=" space-y-1">
              <h2 className="text-base text-primary-blue font-medium mb">
                {taskDetails?.title}
              </h2>
              <p className="text-[#768396] text-sm">
                {taskDetails?.description}
              </p>
            </div>
            <div className=" flex justify-between items-center text-sm mt-4">
              <p className="text-primary-blue font-medium">
                <span>Deadline : </span>
                {formatDate(taskDetails?.deadline)}
              </p>
              <p className="text-primary-blue font-medium">
                <span>Created at : </span>
                {formatDate(taskDetails?.createdAt)}
              </p>
              <div className="flex gap-2 items-center text-[#5A5A5A]">
                {/* <p className="font-medium">Assigned To</p> */}
              </div>
            </div>
            <div className="mt-4 flex justify-between flex-row-reverse">
              {updatTaskStatus[currentStatus].nextStatusText && (
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUpdatedStatus({
                      taskId: taskDetails._id,
                      status: updatTaskStatus[currentStatus].nextStatus,
                      prevStatus: currentStatus,
                    });
                    setButtonClicked("next");
                  }}
                >
                  {taskData?.updateTaskStatusLoading &&
                  btnClicked === "next" ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Please wait..
                    </>
                  ) : (
                    updatTaskStatus[currentStatus].nextStatusText
                  )}
                </Button>
              )}
              {updatTaskStatus[currentStatus].prevStatusText && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUpdatedStatus({
                      taskId: taskDetails._id,
                      status: updatTaskStatus[currentStatus].prevStatus,
                      prevStatus: currentStatus,
                    });
                    setButtonClicked("prev");
                  }}
                  variant="outline"
                  size="icon"
                >
                  {taskData?.updateTaskStatusLoading &&
                  btnClicked === "prev" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <UserTaskDetails taskDetails={taskDetails} />
    </Dialog>
  );
};

export default UserTask;
