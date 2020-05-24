import React from "react";
import {Todo} from "../entities/todo";
import {connect} from "mongodb";

type Props = {todos: Todo[]};
type WithProps = { props: Props };

export async function getServerSideProps(): Promise<WithProps> {
  const mongo = await connect(process.env.MONGO_URL);
  const db = mongo.db('freeDeploy');
  const todos = await db.collection<Todo>('todos')
    .find()
    .map<string>(JSON.stringify)
    .map<Todo>(JSON.parse)
    .toArray();

  const props = {todos};
  return {props};
}

export default function (props: Props) {
  return (
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>TEXT</th>
        <th>DONE</th>
      </tr>
      </thead>
      <tbody>
      {props.todos.map(todo =>
        <tr>
          <td>{todo._id}</td>
          <td>{todo.text}</td>
          <td>{todo.done ? '☑' : '☐'}</td>
        </tr>
      )}
      </tbody>
    </table>
  )
}