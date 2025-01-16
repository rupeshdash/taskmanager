import { useEffect, useState } from "react";
import Header from "../designConstants/Header";
import Navigation from "../designConstants/Navigation";
import { useAppDispatch } from "@/Redux/store";
import {
  getAllTasks,
  updateTaskStatus,
} from "@/Redux/TasksDetails/TaskDetailsActions";
import { useSelector } from "react-redux";
import TaskContainer from "../taskComponent/TaskType/TaskContainer";
import SearchTaskComponent from "../taskComponent/SearchAndSortTask/SearchTask/SearchTaskComponent";

const UserTaskWrapper = () => {
  const dispatch = useAppDispatch();
  const taskData = useSelector((state: any) => state.taskData);
  const [updatedStatus, setUpdatedStatus] = useState<{
    taskId: string;
    status: string;
    prevStatus: string;
  }>({ taskId: "", status: "", prevStatus: "" });
  //   const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [unArrangedTasks, setUnArrangedTasks] = useState<any>([]);
  const [arrangedTasks, setArrangedTasks] = useState<any>({
    backlog: [],
    assigned: [],
    in_progress: [],
    review: [],
  });
  const [showLoaderFortasks, setShowLoaderForTask] = useState(false);
  const statuses = [
    { label: "Backlog", value: "backlog" },
    { label: "Assigned", value: "assigned" },
    { label: "In Progress", value: "in_progress" },
    { label: "Review", value: "review" },
  ];

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    function getAllTasksAPI(userId: any) {
      //call get task API.
      const requestHeader = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        userId: userId,
      };
      setShowLoaderForTask(true);
      dispatch(getAllTasks({ headers: requestHeader }));
    }
    getAllTasksAPI(userId);
  }, []);
  useEffect(() => {
    console.log(updatedStatus.status);

    if (updatedStatus.status) {
      const requestHeader = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const requestBody = {
        taskId: updatedStatus?.taskId,
        status: updatedStatus?.status,
      };
      setShowLoaderForTask(false);
      dispatch(
        updateTaskStatus(requestBody, { headers: requestHeader }, userId)
      );
    }
  }, [updatedStatus]);

  //   useEffect(() => {
  //     if (taskData?.updateTaskStatusResponse) {
  //       setArrangedTasks((prev: any) => {
  //         return {
  //           ...prev,
  //           [updatedStatus?.status]: prev[updatedStatus?.prevStatus].map(
  //             (task: any) => {
  //               if (task._id === updatedStatus?.taskId) {
  //                 return {
  //                   ...task,
  //                   status: updatedStatus?.status,
  //                 };
  //               } else {
  //                 return task;
  //               }
  //             }
  //           ),
  //         };
  //       });
  //     }
  //   }, [taskData?.updateTaskStatusResponse]);
  useEffect(() => {
    if (taskData?.allTasks) {
      setUnArrangedTasks(taskData?.allTasks);
    }
  }, [taskData]);

  useEffect(()=>{
    console.log(unArrangedTasks);
    
    if(unArrangedTasks){
        const taskByStatus: any = {
          backlog: [],
          assigned: [],
          in_progress: [],
          review: [],
        };
        unArrangedTasks?.forEach((task: any) => {
          taskByStatus[task?.status] && task?.status
            ? taskByStatus[task?.status].push(task)
            : null;
        });
        setArrangedTasks(taskByStatus);
    }
    console.log(arrangedTasks);
    
  },[unArrangedTasks])
  return (
    <div className="page-wrapper">
      <Navigation />
      <div className="inner-wrapper">
        {" "}
        <Header />
        <section className="team-section">
          <>
            <header className="section-header my-7 px-5 flex justify-between">
              🔥 Your Tasks
              <SearchTaskComponent
                allTaskData={taskData?.allTasks}
                unArrangedTasks={unArrangedTasks}
                setUnArrangedTasks={setUnArrangedTasks}
              />
            </header>

            <div className="task-wrapper">
              {statuses.map((status) => {
                return (
                  <TaskContainer
                    key={status.value}
                    status={status.value}
                    title={status.label}
                    tasks={arrangedTasks[status.value]}
                    source="userTask"
                    updatedStatus={updatedStatus}
                    setUpdatedStatus={setUpdatedStatus}
                    showLoaderFortasks={showLoaderFortasks}
                  />
                );
              })}
            </div>
          </>
        </section>
      </div>
    </div>
  );
};

export default UserTaskWrapper;
