import {ObjectId} from "bson";

export type Todo = {
  _id: ObjectId;
  text: string;
  done: boolean;
}