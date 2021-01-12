import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../Home/homeHeader.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import swal from 'sweetalert';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    console.log(isAdmin);
    if (isAdmin && isAdmin != null) {
      props.history.push("/admin");
    } else if (isAdmin != null) {
      props.history.push("/user");
    }
  }, [isLogin]);
  const login = async () => {
    if (email != "") {
      axios
        .post("http://3.23.128.15:3000/api/v1/users/login", {
          email: email,
          password: password,
        })
        .then((data) => {
          if (data.data.data.isAdmin && data.data.data.isBlacklisted){
            swal('Your Admin Access is Revoked','','error')
          }else{
            if (data.data.data.apiKey != undefined) {
              localStorage.setItem("key", JSON.stringify(data.data.data.apiKey));
            } else {
              localStorage.setItem("key", JSON.stringify(""));
            }
            localStorage.setItem(
              "isAdmin",
              JSON.stringify(data.data.data.isAdmin)
            );
            toast.success("Login success");
            setIsLogin(true);
          }
        })
        .catch((error) => swal(error.response.data.msg,'','error'));
    }
  };

  return (
    <>
      <Nav button="SIGNUP" />
      <div id="signinpages">
        <section>
          {/* <NotifyModal /> */}
          <div className="boxpop text-center">
            <h3 style={{ color: "#433520" }}>Please Login</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="error">
                {/* {this.state.error == 'user' ? this.state.message : ''} */}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="error">
                {/* {this.state.error == 'password' ? this.state.message : ''} */}
              </div>
              {/* <div>
                <div className="auth-error">
                  {this.props.autherrormessage
                    ? this.props.autherrormessage
                    : ""}
                </div>
              </div> */}
              {/* <div style={{ marginBottom: "2px", textAlign: "left" }}>
                <Link className="frgtlink">Forgot your password?</Link>
              </div> */}
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-md btn-block"
                  // onClick={() => props.history.push('/admin')}
                  onClick={() => login()}
                  style={{ backgroundColor: "#00917c" }}
                >
                  Login
                </button>
              </div>
              <div className="ordiv">
                <div className="or">
                  <span>OR</span>
                </div>
              </div>
              <p className="text-center mb-0">
                New User ?{" "}
                <Link to="/signup" className="col-primary ">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
export default Login;
