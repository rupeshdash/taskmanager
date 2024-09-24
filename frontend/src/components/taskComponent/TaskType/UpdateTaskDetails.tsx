import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskType } from "../Tasksheet";
import { useEffect, useState } from "react";
import Priority from "../Priority";
import MemberSelector from "../MemberSelector";
import { DatePicker } from "../DatePicker";
import { StatusSelector } from "../StatusSelector";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/Redux/store";
import { updateTask } from "@/Redux/TasksDetails/TaskDetailsActions";

interface PropType {
  taskDetails: TaskType;
  teamMembers?: { _id: string; email: string; name: string; avatar: string }[];
}
export function UpdateTaskDetails({ taskDetails, teamMembers }: PropType) {
  const authData = useSelector((state: any) => state.authData);
  const dispatch = useAppDispatch();
  const [updatedMembers, setUpdatedMembers] = useState(taskDetails?.members);

  const [taskProperties, setTaskProperties] = useState<TaskType>({
    _id: taskDetails?._id,
    createdBy: taskDetails?.createdBy,
    title: taskDetails?.title,
    description: taskDetails?.description,
    members: updatedMembers,
    createdAt: taskDetails?.createdAt,
    deadline: taskDetails?.deadline,
    priority: taskDetails?.priority,
    status: taskDetails?.status,
  });

  useEffect(() => {
    setTaskProperties((prev) => ({
      ...prev,
      members: updatedMembers,
      status:
        updatedMembers.length > 0
          ? taskDetails?.status === "backlog"
            ? "assigned"
            : taskDetails?.status
          : updatedMembers.length === 0 &&
            (taskDetails?.status === "assigned" ||
              taskDetails?.status === "in_progress")
          ? "backlog"
          : taskDetails?.status,
    }));
  }, [updatedMembers]);
  function saveChanges() {
    const requestHeader = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const requestBody = {
      ...taskProperties,
      members: updatedMembers,
    };
    console.log(requestBody);

    dispatch(updateTask(requestBody, { headers: requestHeader }));
  }
  //   console.log(taskDetails);
  console.log(taskDetails?.members, "updatedMembers");

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Task Details</DialogTitle>
        <DialogDescription>
          Make changes to the task here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            value={taskProperties?.title}
            className="col-span-3"
            onChange={(e) => {
              setTaskProperties((prev: any) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              });
            }}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            value={taskProperties?.description}
            className="col-span-3"
            onChange={(e) => {
              setTaskProperties((prev: any) => {
                return {
                  ...prev,
                  description: e.target.value,
                };
              });
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 contents-center items-center">
          <Priority
            priority={taskProperties?.priority}
            setTaskDetails={setTaskProperties}
          />
          <DatePicker
            deadline={taskProperties?.deadline}
            setTaskDetails={setTaskProperties}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 content-center items-center">
          <MemberSelector
            teamMembers={teamMembers}
            updatedMembers={updatedMembers}
            setUpdatedMembers={setUpdatedMembers}
          />
          <StatusSelector
            //   defaultStatus={defaultStatus}
            taskDetails={taskProperties}
            setTaskDetails={setTaskProperties}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={saveChanges}>
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
