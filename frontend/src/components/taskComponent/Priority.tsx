import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Priority = () => {
  const [priority, setPriority] = useState<string | null>(null);

  return (
    <div>
      <Select
        onValueChange={(value) => setPriority(value)}
      >
        <SelectTrigger
          className={`w-[150px] ${
            priority === 'high'
              ? 'bg-red-500 text-white'
              : priority === 'medium'
              ? 'bg-orange-500 text-white'
              : priority === 'low'
              ? 'bg-green-500 text-white'
              : ''
          }`}
        >
          <SelectValue placeholder="Priority" />
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
