import React, { Component,useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Home/homeHeader.jsx";
import axios from 'axios';
import { toast  } from 'react-toastify';

// import "../assets/css/bootstrap.css";
// import "../assets/css/fontsCss.css";
// import "../assets/css/custom.css";
// import '../assets/css/mystyle.css';

function Signup(props) {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

   const signup = async() => {
      axios.post('http://3.23.128.15:3000/api/v1/users/registerUser',{
          email: email,
          password: password
      })
      .then(data => {toast.success('signup success');props.history.push('/login')})
      .catch(error => toast.error(error))
    }
    const submit = () => {
        {toast.success('Signup success');props.history.push('/login')}
    }
    return (
      <>
        <Nav button="Login" />
        <div id="signinpages">
          <section>
            {/* <NotifyModal /> */}
            <div className="boxpop text-center">
              <h3 style={{ color: "#433520" }}>Please Signup</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input
                    type="email"
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
                <div>
                  {/* <div className="auth-error">
                  {this.props.autherrormessage
                    ? this.props.autherrormessage
                    : ''}
                </div> */}
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary btn-md btn-block"
                      onClick={signup}
                    style={{ backgroundColor: "#00917c" }}
                  >
                    Sign up
                  </button>
                </div>
                <div className="ordiv">
                  <div className="or">
                    <span>OR</span>
                  </div>
                </div>
                <p className="text-center mb-0">
                  Already a Member ?{" "}
                  <Link to="/login" className="col-primary ">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </section>
        </div>
      </>
    );
  }
  export default Signup;