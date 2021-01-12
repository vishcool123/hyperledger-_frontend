import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class homeHeader extends Component {
  render() {
    const isLogin = JSON.parse(localStorage.getItem("key"));
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

    return (
      <>
        {/* <nav className="navbar before navbar-expand-md py-1">
          <Link className="navbar-brand" to="/">
            <h1 style={{ color: "#433520" }}>IDTree</h1>
            <sub style={{ color: "#433520" }}>Uniqueid generator on Hyperledger fabric blockchain</sub>
          </Link>
          <div>
          <a
            className="f-m"
            style={{padding: '12px' }}
            target='_blank'
            href='http://3.23.128.15/sdk-docs/'
          >
            SDK-DOCS
          </a>
          <Link
            to={
              !isLogin
                ? "/" + this.props.button.toLowerCase()
                : isAdmin
                ? "/admin"
                : "/user"
            }
            className="btn btn-primary f-m"
            style={{ backgroundColor: "#00917c",padding: '12px' }}
          >
            {!isLogin ? this.props.button : isAdmin ? "Admin" : "User"}
          </Link>
          </div>
        </nav> */}
        <header className="nav-wrapper header-white">
          <nav
            className="navbar fixed-top sticky"
          >
            {/* <a class="navbar-brand">
          <img src={Image.logo_white} />
        </a> */}
 <Link className="navbar-brand" to="/">
            <h1 style={{ color: "#433520",marginBottom:'-14px' }}>IDTree</h1>
            <sub style={{ color: "#000", fontSize:'13px',fontWeight:'bold' }}>UniqueID Generator on Hyperledger Fabric Blockchain</sub>
          </Link>
            <ul className="signup-link">
              <li>
                <a href="http://3.23.128.15/sdk-docs/" target="_blank">
                  SDK-DOCS
                </a>
              </li>
              {/* <li>
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li> */}
               <Link
            to={
              !isLogin
                ? "/" + this.props.button.toLowerCase()
                : isAdmin
                ? "/admin"
                : "/user"
            }
            className="btn btn-primary f-m"
            style={{ backgroundColor: "#00917c",padding: '12px' }}
          >
            {!isLogin ? this.props.button : isAdmin ? "DASHBOARD" : "DASHBOARD"}
          </Link>
            </ul>
          </nav>
        </header>
      </>
    );
  }
}
