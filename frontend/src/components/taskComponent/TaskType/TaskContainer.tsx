import Addtask from '../Addtask'
import { Task } from '../Task'
import { TaskType } from '../Tasksheet';

interface PropType {
  status: string;
  tasks: Array<TaskType>;
  title: string;
  teamId: string;
  teamMembers: { _id: string; email: string; name: string }[];
  isUserAdmin: boolean
}
const TaskContainer = ({
  status,
  title,
  tasks,
  teamMembers,
  teamId,
  isUserAdmin,
}: PropType) => {
  return (
    <div className="w-full space-y-8">
      <Addtask
        status={status}
        title={title}
        teamMembers={teamMembers}
        teamId={teamId ? teamId : ""}
      />
      <div className=" space-y-5">
        {tasks.map((task: any) => {
          return (
            <Task
              key={task._id}
              taskDetails={task}
              isUserAdmin={isUserAdmin}
              teamMembers={teamMembers}
            />
          );
        })}
        {/* <Task />
        <Task />
        <Task /> */}
      </div>
    </div>
  );
};

export default TaskContainer;