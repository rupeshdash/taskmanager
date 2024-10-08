import Team from "../Models/Team";
import User, { UserType } from "../Models/User";

export const createTeam = async (req: any, res: any) => {
  const { _id, admin, members, createdAt, description, title } = req.body;
  try {
    const adminUser = await User.findOne({ email: admin }).select("-password");
    if (!adminUser) {
      return res.status(500).json({
        message: "Admin not found",
      });
    }

    const memberUserList = await User.find({
      _id: members.map((member: any) => {
        return member._id;
      }),
    }).select("-password");
    
    const existingTeam = await Team.findOne({ _id: _id });
    if (existingTeam) {
      existingTeam.members = memberUserList;
      existingTeam.description = description;
      existingTeam.title = title;
      existingTeam.save();
      return res.status(200).json({
        message: "Team details updated successfully",
        team: existingTeam,
      });
    } else {
      const newTeam = await Team.create({
        admin: adminUser,
        members: memberUserList,
        description: description,
        createdAt: createdAt,
        title: title,
      });
      adminUser?.teamsAdmin?.push(newTeam.id);
      memberUserList?.map((member) => {
        member.teamsMember.push(newTeam.id);
        member.save();
      });
      if (adminUser) adminUser.save();
      return res.status(200).json({
        message: "Team created successfully",
        team: newTeam,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTeams = async (req: any, res: any) => {
  try {
    const { adminEmail } = req.body;
    const adminUser = await User.findOne({ email: adminEmail }).select(
      "-password"
    );
    const adminTeams = await Team.find({ admin: adminUser?._id })
      .populate("admin", "-password -teamsMember -teamsAdmin -tasks")
      .populate("members", "-password -teamsMember -teamsAdmin -tasks")
      .lean();
    // Find teams where the user is a member
    const memberTeams = await Team.find({ members: adminUser?._id })
      .populate("admin", "-password -teamsMember -teamsAdmin -tasks")
      .populate("members", "-password -teamsMember -teamsAdmin -tasks")
      .lean();
    // Combine the results and remove duplicates
    const allTeams = [...adminTeams, ...memberTeams];
    const uniqueTeams = allTeams.filter(
      (team, index, self) =>
        index ===
        self.findIndex((t) => t._id.toString() === team._id.toString())
    );

    return res.status(200).json({ teams: uniqueTeams });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllUsers = async (req: any, res: any) => {
  try {
    const { organization } = req.body;
    const orgUsers = await User.find({ organization: organization }).select(
      "-password -teamsMember -teamsAdmin -tasks"
    );
    return res.status(200).json({ orgUsers: orgUsers });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getTeamDetails = async (req: any, res: any) => {
  try {
    const { teamId } = req.query; // Fetch the organization from query params
    if (!teamId) {
      return res.status(400).json({ message: "Organization is required" });
    }

    const teamDetails = await Team.find({ _id: teamId })
      .populate("members", "-password -teamsMember -teamsAdmin -tasks")
      .populate({
        path: "allTasks",
        populate: {
          path: "members", 
          select: "-password -teamsMember -teamsAdmin -tasks", 
        },
      });
   
    if (!teamDetails) {
      return res.status(400).json({ message: "Team not found." });
    }
    
    return res.status(200).json({ teamDetails: teamDetails });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
