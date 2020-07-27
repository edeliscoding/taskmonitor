import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;

    axios
      .post("http://localhost:3001/api/user/login", {
        email: email,
        password: password
      })
      .then(response => {
        console.log(response);

        // if(response.data.)
        // const token = response.header("auth-token");
        // if (token) {
        //   this.props.history.push("/dashboard");
        // }
        // if (response.data.logged_in) {
        //   this.props.handleSuccessfulAuth(response.data);
        // }
      })
      //my front end hit this
      .catch(error => {
        console.log("login error here", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
