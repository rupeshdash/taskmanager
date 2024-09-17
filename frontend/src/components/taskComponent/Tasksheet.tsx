import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
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
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getTodayDate } from "../teamCompoenent/teamsHelper";
import { title } from "process";
import { createTask } from "@/Redux/TasksDetails/TaskDetailsActions";
import { useAppDispatch } from "@/Redux/store";
import { StatusSelector } from "./StatusSelector";

interface PropType {
  source: string;
  teamMembers: { _id: string; email: string; name: string }[];
  teamId: string;
}
export interface TaskType {
  title: string;
  description: string;
  members: Array<object>;
  createdAt: string;
  deadline: string
  priority: string
  status: string
}
export function Tasksheet({ source, teamMembers , teamId}: PropType) {
  const authData = useSelector((state: any) => state.authData); 
 const dispatch = useAppDispatch();
  const [taskDetails, setTaskDetails] = useState<TaskType>({
    title: "",
    description: "",
    members: [],
    createdAt: "",
    deadline: "",
    priority: "",
    status: "",
  });

  function handleCreateTask() {
    const requestHeader = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const requestBody = {
      ...taskDetails,
      createdBy: authData?.userId,
      createdAt: getTodayDate(),
      team: teamId
    };
    setTaskDetails({
      title: "",
      description: "",
      members: [],
      createdAt: "",
      deadline: "",
      priority: "",
      status: "",
    });
    console.log(requestBody);
    
    dispatch(
      createTask(requestBody, { headers: requestHeader }, teamId)
    );
  }
  return (
    <Sheet>
      {source === "addTask" && (
        <SheetTrigger asChild>
          <button className="bg-[#E8EAFF] rounded-lg p-2 hover:bg-[#b3b8f9]">
            <PlusIcon strokeWidth={3} size={20} color="#6772FE" />
          </button>
        </SheetTrigger>
      )}
      {source === "createTask" && (
        <SheetTrigger asChild>
          <button className="btn-primary flex items-center gap-3">
            <span>+</span>
            <span>create task</span>
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
            <Input
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
            setTaskDetails={setTaskDetails}
          />
          <StatusSelector
            taskDetails={taskDetails}
            setTaskDetails={setTaskDetails}
          />
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
            <Button type="submit">Add task</Button>
            // </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
