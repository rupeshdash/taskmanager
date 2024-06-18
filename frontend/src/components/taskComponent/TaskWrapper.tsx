import Header from "../designConstants/Header";
import Navigation from "../designConstants/Navigation";

const TaskWrapper = () => {
  return (
    <div className="page-wrapper">
      <Navigation />
      <div className="inner-wrapper">
        {" "}
        <Header />
        
      </div>
    </div>
  );
};

export default TaskWrapper;
