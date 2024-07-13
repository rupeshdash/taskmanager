import { Schema, Document, model, Types } from "mongoose";
import { TaskType } from "./Task";
import { UserType } from "./User";
export interface TeamType extends Document {
  admin: Types.ObjectId | UserType;
  members: Types.ObjectId[] | UserType[];
  title: string,
  createdAt: string;
  description: string;
  allTasks: Types.ObjectId[] | TaskType[];
}
const teamSchema = new Schema<TeamType>({
  
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  title: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  description: {
    type: String,
  },
  allTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});
const Team = model<TeamType>("Team", teamSchema);
export default Team;
