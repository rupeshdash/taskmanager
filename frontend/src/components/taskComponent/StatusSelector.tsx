import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskType } from "./Tasksheet";

interface PropType {
  taskDetails: TaskType;
  setTaskDetails: Function;
}

const statuses = [
  { label: "Backlog", value: "backlog" },
  { label: "Assigned", value: "assigned" },
  { label: "In Progress", value: "in_progress" },
  { label: "Review", value: "review" },
];
export function StatusSelector({ taskDetails, setTaskDetails }: PropType) {
  return (
    <Select onValueChange={(value) => setTaskDetails({ ...taskDetails, status: value })}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={taskDetails?.status || "Status of the task"}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {statuses.map((status: any) => {
            return (
              <SelectItem
                key={status.value}
                value={status.value}
              >
                {status.label}
              </SelectItem>
            );
          })}
          {/* <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
