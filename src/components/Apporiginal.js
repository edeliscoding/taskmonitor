import React, { useState, Fragment, Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";

export const Apporiginal = () => {
  const [inputFields, setInputFields] = useState([
    { firstName: "", lastName: "" }
  ]);

  const [secondary, setSecondary] = useState("");

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: "", lastName: "" });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "firstName") {
      values[index].firstName = event.target.value;
    } else {
      values[index].lastName = event.target.value;
    }

    setInputFields(values);
  };

  const handleSecondaryChange = event => {
    const values = { ...secondary };
    if (event.target.name === "comments") {
      values.secondary = event.target.value;
    }
    setSecondary(values);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const task = {
      tasks: [inputFields],
      additional: secondary
    };
    console.log(task);
    axios
      .post("http://localhost:3001/api/task/add", task)
      // .then(response => console.log(response.data));
      .then(res => {
        if (res.data.status === 201) {
          this.props.history.push("../pages/dashboard");
        }
      });
  };

  return (
    <div class="container">
      <h1 class="mb-4 mt-5"> Weekly Work Log | 7/13/2020 - 7/17/2020</h1>
      <form onSubmit={handleSubmit}>
        <h5 class="mb-3">
          1. Use the table below to list the tasks that you have been working on
          this past week. This can include meetings, grants, presentations,
          trainings and other projects that you worked or collaborated on.
          Details can be included in the comments box.
        </h5>
        <div className="form-row">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-6">
                <label htmlFor="firstName">Project/TaskName</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={inputField.firstName}
                  onChange={event => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="lastName">Comments</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={inputField.lastName}
                  onChange={event => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-2">
                <button
                  className="btn btn-danger mr-3"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-dash"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </button>
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
              </div>
            </Fragment>
          ))}
        </div>
        <h5>
          2. Please add anything else that you would like to share. (Enter N/A
          if not applicable)
        </h5>
        <div className="form-group col-sm-6">
          <input
            type="text"
            className="form-control"
            name="comments"
            value={secondary.secondComments}
            onChange={event => handleSecondaryChange(event)}
          />
        </div>

        <div className="submit-button">
          <button
            className="btn btn-primary mr-2 mb-4"
            type="submit"
            onSubmit={handleSubmit}
          >
            Save
          </button>
        </div>
        <br />
        <pre>{JSON.stringify(inputFields, null, 2)}</pre>
        <pre>{JSON.stringify(secondary)}</pre>
      </form>
    </div>
  );
};
