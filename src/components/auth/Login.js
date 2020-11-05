import React from "react";
import "./Login.css";
import { loginUrl } from "../../config/spotify";
import logo from "../../assets/images/logo.jpg";

function Login() {
  return (
    <div className="login">
      <img src={logo} alt="Logo" />
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}

export default Login;
