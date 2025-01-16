import Message from "../Models/Message";
import User from "../Models/User";

export const sendMessage = async (req: any, res: any) => {
  const { sender, recipients, messageContent, messageType, mediaUrl } = req.body;

  if (!sender || !recipients || !messageContent || !messageType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newMessage = await Message.create({
    sender,
    recipients,
    messageContent,
    messageType,
    mediaUrl,
  });

  const populatedMessage = await Message.findById(newMessage._id)
    .populate("sender", "-password -teamsMember -teamsAdmin -tasks")
    .populate("recipients", "-password -teamsMember -teamsAdmin -tasks");

  if (!populatedMessage) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res
    .status(200)
    .json({
      message: "Message sent successfully",
      recentMessage: populatedMessage,
    });
};

export const getMessages = async (req: any, res: any) => {
  const { sender, recipient } = req.body;
  const messages = await Message.find({
    $or: [{ sender: sender, recipient: recipient }, { sender: recipient, recipient: sender }],
  })
    .populate("sender", "-password -teamsMember -teamsAdmin -tasks")
    .populate("recipient", "-password -teamsMember -teamsAdmin -tasks");
  return res.status(200).json({ messages: messages });
};


export const getAllChatUsers = async (req: any, res: any) => {
    try {
      const { organization, userId } = req.body;
      const orgUsers = await User.find({ organization: organization }).select(
        "-password -teamsMember -teamsAdmin -tasks"
      );

      if (!orgUsers) {
        return res.status(400).json({ message: "User not found" });
      }
      const orgUsersWithLastMessage = await Promise.all(
        orgUsers.map(async (user: any) => {
          // Fetch the last message between the current user and the userId
          const lastMessage = await Message.findOne({
            $or: [
              { sender: userId, recipient: user._id },
              { sender: user._id, recipient: userId },
            ],
          })
            .sort({ createdAt: -1 }) // Get the most recent message
            .lean(); // Use .lean() for better performance if you don't need Mongoose documents

          // Return user data with the last message
          return {
            ...user.toObject(), // Convert Mongoose document to plain object
            lastMessage: lastMessage || null, // Attach last message or null if no message found
          };
        })
      );
      return res.status(200).json({ allChatUsers: orgUsersWithLastMessage });
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
}