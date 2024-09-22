import Task from "../Models/Task";
import Team from "../Models/Team";
import User from "../Models/User";

export const createTask = async (req: any, res: any) => {
  const {
    createdBy,
    title,
    description,
    members,
    createdAt,
    deadline,
    priority,
    team,
    status,
  } = req.body;
  try {
    //check if admin of task exist or not
    const taskAdmin = await User.findOne({ _id: createdBy }).select(
      "-password -teamsMember -teamsAdmin -tasks"
    );
    if (!taskAdmin) {
      return res.status(401).json({
        message: "Unauthorized task creation",
      });
    }
    console.log("admin exist");
    const memberIds = members.map((member: any) => member?._id?.toString());
    console.log("memberIds", memberIds);

    const memberUserList = await User.find({
      _id: { $in: memberIds },
    }).select("-password -teamsMember -teamsAdmin");

    const adminTeam = await Team.findOne({ _id: team });
    if (!adminTeam) {
      return res.status(401).json({
        message: "Unauthorized task creation",
      });
    }
    const teamMembers = adminTeam?.members?.map((member: any) =>
      member._id.toString()
    );
    console.log("teamMembers", teamMembers);
    console.log("memberUserList", memberUserList);

    const nonTeamMembers = memberUserList.filter((user: any) => {
      console.log("user", user._id.toString());
      return !teamMembers.includes(user._id.toString());
    });
    console.log("nonTeamMembers", nonTeamMembers);
    if (nonTeamMembers.length > 0) {
      return res.status(401).json({
        message: "Unauthorized task creation",
        nonTeamMembers: nonTeamMembers,
      });
    }

    const newTask = await Task.create({
      createdBy: taskAdmin,
      title: title,
      description: description,
      members: memberUserList,
      createdAt: createdAt,
      deadline: deadline,
      priority: priority,
      team: adminTeam,
      status: status,
    });
    // Update each member's task array with the new task's ID
    await User.updateMany(
      { _id: { $in: memberIds } }, // Find members by their IDs
      { $push: { tasks: newTask } } // Push the new task ID into their tasks array
    );

    await Team.updateOne(
      { _id: adminTeam._id },
      { $push: { allTasks: newTask } }
    );
    return res.status(200).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllTasks = async (req: any, res: any) => {
  const userId = req.header("userId");

  const requiredUser = await User.findOne({ _id: userId }).populate({
    path: "tasks",
    populate: {
      path: "members",
      select: "-password -teamsMember -teamsAdmin -tasks",
    },
  });
  if (!requiredUser) {
    return res.status(500).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    allTasks: requiredUser?.tasks,
  });
};

export const updateTask = async (req: any, res: any) => {
  const { _id, title, description, members, deadline, priority, status } =
    req.body;

  const task = await Task.findOne({ _id: _id });
  if (!task) {
    return res.status(500).json({
      message: "Task not found",
    });
  }

  // Store the current members for comparison
  const currentMembers = task.members.map((member) => member.toString());

  task.title = title;
  task.description = description;
  task.members = members;
  task.deadline = deadline;
  task.priority = priority;
  task.status = status;
  await task.save();

  // Update task references in user documents
  // Remove task from users who are no longer members
  await User.updateMany(
    { _id: { $in: currentMembers }, tasks: _id },
    { $pull: { tasks: _id } }
  );

  // Add task to the new members' task lists
  await User.updateMany(
    { _id: { $in: members }, tasks: { $ne: _id } },
    { $push: { tasks: _id } }
  );

  return res.status(200).json({
    message: "Task updated successfully",
    task: task,
  });
};

export const updateTaskStatus = async (req: any, res: any) => {
  console.log("Update has started");

  const { taskId, status } = req.body;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return res.status(500).json({
      message: "Task not found",
    });
  }
  task.status = status;
  task.save();
  return res.status(200).json({
    status: 200,
    message: "Task updated successfully",
    task: task,
  });
};

export const deleteTask = () => {};
