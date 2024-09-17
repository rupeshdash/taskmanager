import Addtask from '../Addtask'
import { Task } from '../Task'

const TaskContainer = () => {
  return (
    <div className="w-full space-y-8">
      <Addtask />
      <div className=" space-y-5">
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
};

export default TaskContainer;