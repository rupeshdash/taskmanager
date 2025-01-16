import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
interface PropType {
  setTaskDetails: Function;
  priority: string
}
const Priority = ({priority, setTaskDetails } : PropType) => {
  useEffect(()=>{
    if(priority){
      setTaskDetails((prev:any)=>{
        return {
          ...prev,
          priority: priority,
        }
      })
    }
  },[priority])
  return (
    <div>
      <Select onValueChange={(value) => setTaskDetails((prev:any)=> {return {...prev, priority: value}})}>
        <SelectTrigger
          className={`w-[100px] ${
            priority === "high"
              ? "bg-red-500 text-white"
              : priority === "medium"
              ? "bg-orange-500 text-white"
              : priority === "low"
              ? "bg-green-500 text-white"
              : ""
          }`}
        >
          <SelectValue placeholder={priority || "Priority"}/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Priority;
