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
      email: members.map((member: any) => {
        return member;
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
    const allTeams = await Team.find({ admin: adminUser?._id })
      .populate("admin", "-password")
      .populate("members", "-password")
      .lean();

    return res.status(200).json({ teams: allTeams });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
