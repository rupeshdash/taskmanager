import { Schema, Document, model, Types } from "mongoose";
import { TaskType } from "./Task";
import { UserType } from "./User";
export interface TeamType extends Document {
  id: string;
  admin: Types.ObjectId | UserType;
  members: Types.ObjectId[] | UserType[];
  createdAt: string;
  description: string;
  allTasks: Types.ObjectId[] | TaskType[];
}
const teamSchema = new Schema<TeamType>({
  id: {
    type: String,
  },
  admin: {
    type: String,
    required: true,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  createdAt: {
    type: String,
    required: true,
  },
  description: 
    {
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
