import { Schema, Document, model, Types } from "mongoose";
import { TeamType } from "./Team";
import { TaskType } from "./Task";

export interface UserType extends Document {
  avatar?: string;
  name: string;
  organization: string;
  email: string;
  password: string;
  teamsMember: Types.ObjectId[] | TeamType[];
  teamsAdmin: Types.ObjectId[] | TeamType[];
  tasks: Types.ObjectId[] | TaskType[];
}

const userSchema = new Schema<UserType>({
  avatar: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  teamsMember: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  teamsAdmin: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const User = model<UserType>("User", userSchema);

export default User;
