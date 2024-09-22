import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskType } from "../taskComponent/Tasksheet";
import { formatDate } from "../helper";
import { Badge } from "../ui/badge";
interface PropType {
  taskDetails: TaskType;
}
export function UserTaskDetails({taskDetails}: PropType) {
    console.log(taskDetails);
    
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
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
          </div>
          <DialogTitle>{taskDetails.title}</DialogTitle>
          <DialogDescription className="max-h-[23rem] overflow-scroll break-word">
            {taskDetails.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 items-center text-sm mt-4">
          {taskDetails?.members?.map((member) => (
            <Badge key={member?._id} variant="secondary">
              {member?.name}
            </Badge>
          ))}

          <div className="flex gap-2 items-center text-[#5A5A5A]"></div>
        </div>
       
        <div className="grid gap-4">
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
        </div>
      </DialogContent>
    </>
  );
}
