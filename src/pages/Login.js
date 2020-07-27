import React, { useState } from "react";
import axios from "axios";

export const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container">
      <h2 className="text-center">Login</h2>
      <form
        onSubmit={async e => {
          e.preventDefault();
          console.log("form submitted");
          const response = await axios.post(
            "http://localhost:3001/api/user/login",
            {
              email: email,
              password: password
            }
          );
          // if (response.data) {
          //   history.push("/");
          // }
          // if (response.data.msg === "LOGGEDIN") {
          //   history.push("/dashboard");
          // }

          if (response.data) {
            // history.push("/dashboard", { token: response.data.token });
            console.log(response);
            history.push("/dashboard");
            // this.props.history.replace("/dashboard");
          }
          //should handle react stuff here if successful
          // history.push("/dashboard");
        }}
      >
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          ></input>
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};
