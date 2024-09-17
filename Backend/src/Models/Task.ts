import { Schema, Document, model, Types } from "mongoose";
import { UserType } from "./User";

export interface TaskType extends Document {
  id: string;
  createdBy: Object;
  title: string;
  description: string;
  members: Types.ObjectId[] | UserType[];
  createdAt: string;
  deadline: string;
  priority: string;
  team: Object;
  status: string;
}
const taskSchema = new Schema<TaskType>({
  id: {
    type: String,
  },
  createdBy: {
    type: Object,
    requied: true,
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

  team: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
const Task = model<TaskType>("Task", taskSchema);
export default Task;
