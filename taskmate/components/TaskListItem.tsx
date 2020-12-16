import React, { useEffect } from "react";
import { Task, useDeleteTaskMutation } from "../gql/codegen/graphql-frontend";
import Link from "next/link";
import { Reference } from "@apollo/client";

interface Props {
  task: Task;
}

const TaskListItem: React.FC<Props> = ({ task }) => {
  const [deleteTask, { loading, error }] = useDeleteTaskMutation({
    variables: { id: task.id },
    errorPolicy: "all",
    update: (cache, result) => {
      const deletedTask = result.data?.deleteTask;

      if (deletedTask) {
        cache.modify({
          fields: {
            tasks(taskRefs: Reference[], { readField }) {
              return taskRefs.filter(
                (taskRef) => readField("id", taskRef) !== deletedTask.id
              );
            },
          },
        });
      }
    },
  });
  const handleDeleteClick = () => {
    deleteTask();
  };

  useEffect(() => {
    if (error) {
      alert("An error occurred, please try again.");
    }
  }, [error]);

  return (
    <li className="task-list-item" key={task.id}>
      <Link href="/update/[id]" as={`/update/${task.id}`}>
        <a className="task-list-item-title">{task.title}</a>
      </Link>
      <button
        className="task-list-item-delete"
        disabled={loading}
        onClick={handleDeleteClick}
      >
        &times;
      </button>
    </li>
  );
};

export default TaskListItem;
