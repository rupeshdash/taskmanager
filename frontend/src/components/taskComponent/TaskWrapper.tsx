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
        <section className="team-section mx-3 md:mx-5">
          <header className="section-header my-7">Tasks</header>
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
