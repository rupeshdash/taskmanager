import { SortDownIcon, SortUpIcon } from "@/assets/Images";

const SortTask = () => {


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