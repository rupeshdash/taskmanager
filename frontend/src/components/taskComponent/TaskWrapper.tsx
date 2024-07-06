import Header from "../designConstants/Header";
import Navigation from "../designConstants/Navigation";
import Backlog from "./TaskType/Backlog";

const TaskWrapper = () => {
  return (
      <div className="page-wrapper">
      <Navigation />
      <div className="inner-wrapper">
        {" "}
        <Header />
        <section className="team-section">
          <header className="section-header my-7 px-5">Tasks</header>
          <div className="task-wrapper">
            <Backlog/>
            <Backlog/>
            <Backlog/>
            <Backlog/>
          </div>
        </section>
      </div>
    </div>

   
  );
};

export default TaskWrapper;
