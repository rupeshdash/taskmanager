import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the message document (extends Document for Mongoose-specific fields)
interface MessageType extends Document {
  sender: mongoose.Types.ObjectId;
  recipients: mongoose.Types.ObjectId[];
  messageContent: string;
  messageType: "text" | "image" | "file" | "video";
  mediaUrl?: string; // Optional field, required only for non-text messages
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Message Schema
const messageSchema: Schema<MessageType> = new mongoose.Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipients: [{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
    messageContent: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file", "video"],
      default: "text",
    },
    mediaUrl: {
      type: String,
      required: function (this: MessageType) {
        return this.messageType !== "text";
      },
    },
    // isRead: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

// Define the Message Model using the interface
const Message: Model<MessageType> = mongoose.model<MessageType>(
  "Message",
  messageSchema
);

export default Message;
