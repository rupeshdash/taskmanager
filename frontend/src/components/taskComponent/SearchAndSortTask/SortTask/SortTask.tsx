import { SortDownIcon, SortUpIcon } from "@/assets/Images";
import { useState } from "react";

const SortTask = () => {
    const [descendActive, setDescendActive] = useState(false);
    const [ascendActive, setAscendActive] = useState(false);

    const handleDescendClick = () => {
        setDescendActive(true);
        setAscendActive(false);
    };
    const handleAscendClick = () => {
        setDescendActive(false);
        setAscendActive(true);
    };

  return (
    <div className="absolute top-5 right-8">
      <span>
        {SortUpIcon()}
      </span>
      <span>
        {SortDownIcon()}
      </span>
    </div>
  );
}

export default SortTask