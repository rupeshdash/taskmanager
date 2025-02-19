import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Priority from "./Priority";
import { DatePicker } from "./DatePicker";
import MemberSelector from "./MemberSelector";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getTodayDate } from "../teamCompoenent/teamsHelper";
import { createTask } from "@/Redux/TasksDetails/TaskDetailsActions";
import { useAppDispatch } from "@/Redux/store";
import { Textarea } from "../ui/textarea";
import { MemberType } from "../teamCompoenent/CreateTeamComponent";

interface PropType {
  source: string;
  teamMembers?: MemberType[];
  teamId: string;
  status?: string;
}
export interface TaskType {
  _id?: number;
  createdBy: MemberType;
  title: string;
  description: string;
  members: MemberType[];
  createdAt: string;
  deadline: string;
  priority: string;
  status: string;
}
export function Tasksheet({ source, teamMembers, teamId }: PropType) {
  const authData = useSelector((state: any) => state.authData);
  const defaultStatus = "backlog";
  const dispatch = useAppDispatch();
  const [taskDetails, setTaskDetails] = useState<TaskType>({
    title: "",
    createdBy: authData?.userId,
    description: "",
    members: [],
    createdAt: "",
    deadline: "",
    priority: "",
    status: "",
  });
  const [updatedMembers, setUpdatedMembers] = useState([]);
  function handleCreateTask() {
    const requestHeader = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const requestBody = {
      ...taskDetails,
      createdBy : taskDetails?._id ? taskDetails?._id : authData?.userId,
      members: updatedMembers,
      createdAt: getTodayDate(),
      team: teamId,
      status: taskDetails?.status
        ? taskDetails?.status
        : updatedMembers.length > 0
        ? "assigned"
        : defaultStatus,
    };
    setTaskDetails({
      title: "",
      createdBy: { _id: "" ,email: "", name: "",avatar: "" },
      description: "",
      members: [],
      createdAt: "",
      deadline: "",
      priority: "",
      status: "",
    });
    console.log(requestBody);

    dispatch(createTask(requestBody, { headers: requestHeader }));
  }
  return (
    <Sheet>
      {/* {source === "addTask" && (
        <SheetTrigger asChild>
          <button className="bg-[#E8EAFF] rounded-lg p-2 hover:bg-[#b3b8f9]">
            <PlusIcon strokeWidth={3} size={20} color="#6772FE" />
          </button>
        </SheetTrigger>
      )} */}
      {source === "createTask" && (
        <SheetTrigger asChild>
          <button className="btn-primary flex items-center gap-3 bg-primary-purple-2">
            <span className="text-primary-purple font-semibold">+</span>
            <span className="text-primary-purple font-semibold">
              Create task
            </span>
          </button>
        </SheetTrigger>
      )}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Task</SheetTitle>
          <SheetDescription>
            Manage or Create your tasks effortlessly!
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 ">
          <div className="flex flex-col md:grid md:grid-cols-4 md:items-center gap-4">
            <Label htmlFor="title" className="text-left mb-2">
              Title
            </Label>
            <Input
              id="title"
              // defaultValue="Profile ui"
              value={taskDetails?.title}
              className="col-span-3"
              onChange={(e) => {
                setTaskDetails((prev: any) => {
                  return {
                    ...prev,
                    title: e.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="flex flex-col md:grid md:grid-cols-4 md:items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Textarea
              id="description"
              // defaultValue="design the ui for the profile"
              value={taskDetails?.description}
              className="col-span-3"
              onChange={(e) => {
                setTaskDetails((prev: any) => {
                  return {
                    ...prev,
                    description: e.target.value,
                  };
                });
              }}
            />
          </div>
        </div>
        <div className="flex gap-5 my-8 flex-wrap items-center">
          <Priority
            priority={taskDetails?.priority}
            setTaskDetails={setTaskDetails}
          />
          <DatePicker
            deadline={taskDetails?.deadline}
            setTaskDetails={setTaskDetails}
          />
          <MemberSelector
            teamMembers={teamMembers}
            updatedMembers={updatedMembers}
            setUpdatedMembers={setUpdatedMembers}
          />
          {/* <StatusSelector
            defaultStatus={defaultStatus}
            taskDetails={taskDetails}
            setTaskDetails={setTaskDetails}
          /> */}
        </div>
        <SheetFooter>
          {source === "createTask" && (
            // <SheetClose asChild>
            <Button onClick={handleCreateTask} type="submit">
              Create Task
            </Button>
            // </SheetClose>
          )}
          {source === "addTask" && (
            // <SheetClose asChild>
            <Button type="submit" onClick={handleCreateTask}>
              Add task
            </Button>
            // </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
