import { addImage } from "@/assets/Images";
import { useAppDispatch } from "@/Redux/store";
import { getAllTasks } from "@/Redux/TasksDetails/TaskDetailsActions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../designConstants/Header";
import Navigation from "../designConstants/Navigation";
import { Tasksheet } from "./Tasksheet";
import { fetchTeamDetails } from "@/Redux/TeamsDetails/TeamDetailsActions";
import Loader from "../designConstants/Loader";
import TaskContainer from "./TaskType/TaskContainer";
import groupPic1 from "../../assets/image.png";
const TaskWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const teamId = searchParams.get("teamid");
  const teamData = useSelector((state: any) => state.teamData);
  const dispatch = useAppDispatch();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [arrangedTasks, setArrangedTasks] = useState<any>({
    backlog: [],
    assigned: [],
    in_progress: [],
    review: [],
  });
  const statuses = [
    { label: "Backlog", value: "backlog" },
    { label: "Assigned", value: "assigned" },
    { label: "In Progress", value: "in_progress" },
    { label: "Review", value: "review" },
  ]
  useEffect(() => {
    if (!teamId) {
      navigate("/teams"); // Redirect to an error page or homepage
    } else {
      getTeamDetails(teamId);
    }
  }, []);

  function getAllTasksAPI(teamId: any) {
    //call get task API.
    const requestHeader = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const requestBody = {
      team: teamId,
    };

    dispatch(getAllTasks(requestBody, { headers: requestHeader }));
  }
  useEffect(() => {
    if (teamData?.getTeamDetailsResponse?.teamDetails) {
      setIsUserAdmin(
        teamData?.getTeamDetailsResponse?.teamDetails[0]?.admin?.toString() ===
          localStorage?.getItem("userId")
      );
    }

    if (teamData?.allTaskOfTeam) {
      const taskByStatus: any = {
        backlog: [],
        assigned: [],
        in_progress: [],
        review: [],
      };
      teamData?.allTaskOfTeam?.forEach((task: any) => {
        taskByStatus[task?.status].push(task);
      });
      setArrangedTasks(taskByStatus);
    }
  }, [teamData]);
  function getTeamDetails(teamId: any) {
    const requestHeader = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    dispatch(fetchTeamDetails(requestHeader, teamId));
  }
  return (
    <div className="page-wrapper">
      <Navigation />
      <div className="inner-wrapper">
        {" "}
        <Header />
        <section className="team-section">
          {teamData?.getTeamDetailsLoading ? (
            <Loader />
          ) : (
            <>
              <header className="section-header my-7 px-5 flex flex-row-reverse justify-between">
                <Tasksheet
                  source={"createTask"}
                  teamMembers={teamData?.allTeamMembers}
                  teamId={teamId ? teamId : ""}
                />
                <img className="w-64" src={groupPic1} />
              </header>
              <div className="task-wrapper">
                {
                  statuses.map((status) => {
                    return (
                      <TaskContainer
                        key={status.value}
                        status={status.value}
                        title={status.label}
                        tasks={arrangedTasks[status.value]}
                        teamMembers={teamData?.allTeamMembers}
                        teamId={teamId ? teamId : ""}
                        isUserAdmin={isUserAdmin}
                      />
                    );
                  })
                }
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default TaskWrapper;
