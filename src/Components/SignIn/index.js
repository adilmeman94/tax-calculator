import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignIn(props) {
  const history = useHistory();
  const { setName } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    var reqBody = {
      email: email,
      password: password,
    };
    setLoader(true);
    axios
      .post(`https://jfbackend.herokuapp.com/login`, reqBody)
      .then((response) => {
        console.log(response);
        localStorage.setItem("auth", response.data.token);
        localStorage.setItem("name", response.data.firstName);
        localStorage.setItem("id", response.data.userId);
        const Name = localStorage.getItem("name");
        setName(Name);
        setLoader(false);
        alert(response.data.message);
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className="custom-margin">
      <h3 style={{ textAlign: "center", marginTop: "5%", marginBottom: "2%" }}>
        Login
      </h3>
      <div className="register-page col-lg-6 col-md-8 col-sm-10 col-xs-12">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {loader ? "Loading..." : "SignIn"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
