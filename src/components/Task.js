import React from "react";
import { Link } from "react-router-dom";

const Task = ({ additional, tasksArray }) => {
  return (
    <div className="card mb-3">
      <h2>{additional}</h2>
      {tasksArray.map(task => {
        return (
          <p>
            {task.firstName} --- {task.lastName}
          </p>
        );
      })}
      <Link to="/" class="btn btn-primary">
        Edit
      </Link>
      <Link to="/" class="btn btn-success">
        Delete
      </Link>
    </div>
  );
};

export default Task;
