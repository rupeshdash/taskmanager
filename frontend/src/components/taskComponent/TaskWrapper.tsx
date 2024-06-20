import Header from "../designConstants/Header";
import Navigation from "../designConstants/Navigation";
import { Task } from "./Task";

const TaskWrapper = () => {
  return (
    <div className="page-wrapper">
    <Navigation />
    <div className="inner-wrapper">
      {" "}
      <Header />
      <section className="team-section pt-4 pl-4">
        <header className="section-header">Teams</header>
        <div className="task-wrapper">
          <Task/>
          <Task/>
          <Task/>
          <Task/>
          <Task/>
          <Task/>
          <Task/>
          <Task/>
          <Task/>
          <Task/>
          <Task/>
          <Task/>
          <Task/>
          <Task/>
          <Task/>
          <Task/>
          <Task/>
        </div>
      </section>
    </div>
  </div>
  );
};

export default TaskWrapper;
