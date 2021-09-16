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
  const [loader, setLoader] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    var reqBody = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    setLoader(true);
    axios
      .post(`https://jfbackend.herokuapp.com/signup`, reqBody)
      .then((response) => {
        setLoader(false);
        alert(response.data.message);
        history.push("/signin");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="custom-margin">
      <h3 style={{ textAlign: "center", marginTop: "5%", marginBottom: "2%" }}>
        Register
      </h3>
      <div className="register-page col-lg-6 col-md-8 col-sm-10 col-xs-12">
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
            {loader ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
