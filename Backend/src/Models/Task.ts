import { Schema, Document, model, Types } from "mongoose";
import { UserType } from "./User";

export interface TaskType extends Document {
  id: string;
  title: string;
  description: string;
  members: Types.ObjectId[] | UserType[];
  createdAt: string;
  deadline: string;
  priority: string;
  teamid: string;
}
const taskSchema = new Schema<TaskType>({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: String,
    required: true,
  },

  deadline: {
    type: String,
    required: true,
  },

  priority: {
    type: String,
    required: true,
  },

  teamid: {
    type: String,
    required: true,
  },
});
const Task = model<TaskType>("Team", taskSchema);
export default Task;