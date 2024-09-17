import { addImage } from "@/assets/Images";
import { useAppDispatch } from "@/Redux/store";
import { getAllTasks } from "@/Redux/TasksDetails/TaskDetailsActions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../designConstants/Header";
import Navigation from "../designConstants/Navigation";
import { Tasksheet } from "./Tasksheet";
import { fetchTeamDetails } from "@/Redux/TeamsDetails/TeamDetailsActions";
import Loader from "../designConstants/Loader";
import TaskContainer from "./TaskType/TaskContainer";

const TaskWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const teamId = searchParams.get("teamid");
  const teamData = useSelector((state: any) => state.teamData);
  const dispatch = useAppDispatch();
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
                <span>Tasks</span>
              </header>
              <div className="task-wrapper">
                <TaskContainer />
                <TaskContainer />
                <TaskContainer />
                <TaskContainer />
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default TaskWrapper;
