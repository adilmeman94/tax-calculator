import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./styles.css";

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    var reqBody = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    axios
      .post(`https://jfbackend.herokuapp.com/signup`, reqBody)
      .then((response) => {
        alert(response.data.message);
        history.push("/signin");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", marginTop: "5%", marginBottom: "2%" }}>
        Register
      </h3>
      <div className="register-page col-lg-6 col-md-8 col-sm-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">FirstName</label>
            <input
              type="text"
              className="form-control"
              placeholder="FirstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
            />
            <label className="form-label">LastName</label>
            <input
              type="text"
              className="form-control"
              placeholder="LastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
            />
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="johndoe@mail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
