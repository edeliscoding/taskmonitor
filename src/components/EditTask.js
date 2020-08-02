import React, { Fragment, useState } from "react";
import Axios from "axios";

export default function EditTask({
  edittask,
  additionalcomment,
  taskid,
  taskindex
}) {
  //pass to edittask
  console.log(taskid);

  const [firstName, setFirstName] = useState(edittask.firstName);
  const [lastName, setLastName] = useState(edittask.lastName);
  const [additional, setAdditional] = useState(additionalcomment);

  //editPRojectTas function
  const updateProjectTask = async e => {
    e.preventDefault();
    try {
      const editTask = {
        firstName: firstName,
        lastName: lastName,
        additional: additional,
        taskIndex: taskindex
      };

      Axios.put(`http://localhost:3001/api/task/${taskid}`, editTask).then(
        response => {
          console.log(response);
          window.location.reload();
          // return false;
        }
      );
    } catch (err) {}
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${taskid}${taskindex}`}
      >
        Edit
      </button>
      {/*taskid = ._id 
    //taskindex = tasksArray index 0-2*/}
      <div class="modal" id={`id${taskid}${taskindex}`}>
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Task</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                className="form-control mb-3"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              ></input>

              <input
                className="form-control mb-3"
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              ></input>

              <input
                className="form-control"
                type="text"
                value={additional}
                onChange={e => setAdditional(e.target.value)}
              ></input>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateProjectTask(e)}
              >
                Edit
              </button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
