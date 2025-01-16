import { useEffect, useRef, useState } from "react";
import { TaskType } from "../../Tasksheet";
import {  XIcon } from "lucide-react";


const statuses = [
  { label: "Backlog", value: "backlog" },
  { label: "Assigned", value: "assigned" },
  { label: "In Progress", value: "in_progress" },
  { label: "Review", value: "review" },
];

interface PropType {
  allTaskData: Array<TaskType>;
  unArrangedTasks: any;
  setUnArrangedTasks: Function;
}
const SearchTaskComponent = ({
  allTaskData,
  unArrangedTasks,
  setUnArrangedTasks,
}: PropType) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState({ label: "", value: "" });
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  console.log(unArrangedTasks);
  
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };
  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    console.log(searchText);
    console.log(unArrangedTasks);
    
    let modifiedUnArrangedTasks = unArrangedTasks.filter((task: any) => {
        console.log(task.title.toLowerCase());
        
      console.log(task.title.toLowerCase().includes(searchText.toLowerCase()));
      console.log(task.status === statusFilter.value);
      return statusFilter.value
        ? task.title.toLowerCase().includes(searchText.toLowerCase()) &&
            task.status === statusFilter.value
        : task.title.toLowerCase().includes(searchText.toLowerCase());
    });
    
    setUnArrangedTasks(modifiedUnArrangedTasks);
    // console.log(modifiedUnArrangedTasks);
  };
  return (
    <form
      className="w-[32rem] relative"
      onSubmit={(e) => handleSearchSubmit(e)}
    >
      <div className="flex">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Your Email
        </label>
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
          onClick={() => {
            setDropdownOpen(!isDropdownOpen);
          }}
        >
          {statusFilter.label ? statusFilter?.label : "All Status"}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            id="dropdown"
            onBlur={() => {
              setDropdownOpen(false);
            }}
            className="z-10 absolute z-50 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-button"
            >
              {statuses?.map((status) => (
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter(status);
                      setDropdownOpen(false);
                    }}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {status?.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter({ label: "", value: "" });
                    setDropdownOpen(false);
                  }}
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {"All Status"}
                </button>
              </li>
            </ul>
          </div>
        )}

        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search tasks by title..."
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
            required
          />
          {searchText && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setSearchText("");
                setUnArrangedTasks(allTaskData);
              }}
              className="absolute top-[9px] right-12 text-primary-purple"
            >
              <XIcon />
            </button>
          )}

          <button
            onClick={(e) => handleSearchSubmit(e)}
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-primary-purple border-primary-purple border-1 btn-primary bg-primary-purple-2"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchTaskComponent;
