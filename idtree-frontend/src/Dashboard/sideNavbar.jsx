import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

// import '../assets/css/bootstrap.min.css';
// import '../assets/css/style.css';
// import '../assets/css/media-admin.css';
// import '../assets/css/mystyle.css';
// import '../assets/css/admin.css';
// import '../assets/font-awesome/css/font-awesome.css';
// import '../assets/css/datatables.min.css';

class sideNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: false,
      active: 1,
      loanToggle: false,
      profileToggle: false,
      documentToggle: false,
      calToggle: false,
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  logouthandler = () => {
    localStorage.clear();
    this.props.history.push("/");
  };
  render() {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const { collapsed } = this.state;
    const { active } = this.state;
    const classOne = collapsed
      ? "collapse navbar-collapse"
      : "collapse navbar-collapse show";
    const classTwo = collapsed
      ? "navbar-toggler navbar-toggler-right collapsed"
      : "navbar-toggler navbar-toggler-right";
    const colapse = `${classOne} collapse navbar-collapse`;
    return (
      <>
        {/* <nav
          class="navbar-default navbar-expand-lg  navbar-static-side left-main-menu"
          role="navigation"
        >
          <div class="sidebar-collapse">
            <ul class="nav metismenu" id="side-menu">
              <li
                class="nav-header"
                style={{
                  width:
                    this.props.miniBar && this.props.screenwidth > 769
                      ? "70px"
                      : !this.props.miniBar && this.props.screenwidth < 769
                      ? "70px"
                      : "221px",
                      height: '84px',
                      display: 'flex',
                      alignItems:'center',
                      justifyContent: 'center'
                }}
              >
                <div class="dropdown profile-element">
                  <div class="logo-panel text-center float-n">
                    <Link to='/dashboard'>
                      {" "}
                    </Link>
                  </div>
                </div>
           
              </li>
              {isAdmin ?<><li
                className={
                  this.props.location.pathname == "/dashboard" ? "active" : ""
                }
              >
                <Link to="/admin">
                  <i class="fa fa-tachometer" aria-hidden="true"></i>{" "}
                  <span class="nav-label">Dashboard</span>
                </Link>
              </li>
              <li
                className={
                  this.props.location.pathname == "/insight" ? "active" : ""
                }
              >
                <Link to="/insight">
                  <i class="fa fa-chart-bar" aria-hidden="true"></i>{" "}
                  <span class="nav-label">Insight</span>
                </Link>
              </li>
              <li
                className={
                  this.props.location.pathname == "/admin-user" ? "active" : ""
                }
              >
                <Link to="/admin-user">
                  <i class="fa fa-chart-bar" aria-hidden="true"></i>{" "}
                  <span class="nav-label">Admin User</span>
                </Link>
              </li>
              <li
                className={
                  this.props.location.pathname == "/blocklist" ? "active" : ""
                }
              >
                <Link to="/blocklist">
                  <i class="fa fa-chart-bar" aria-hidden="true"></i>{" "}
                  <span class="nav-label">Blocklist User</span>
                </Link>
              </li></>:   <li
                className={
                  this.props.location.pathname == "/user" ? "active" : ""
                }
              >
                <Link to="/user">
                  <i class="fa fa-chart-bar" aria-hidden="true"></i>{" "}
                  <span class="nav-label">User</span>
                </Link>
              </li>}
            </ul>
          </div>
        </nav> */}
        <header className="nav-wrapper header-white">
          <nav className="navbar fixed-top sticky">
            {/* <a class="navbar-brand">
          <img src={Image.logo_white} />
        </a> */}
            <button
              onClick={this.toggleNavbar}
              className={`${classTwo}`}
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded={!this.state.collapsed}
              // aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">
                {this.state.collapsed ? (
                  <i className="fa fa-bars" />
                ) : (
                  <i className="fa fa-times" />
                )}
              </span>
              Menu
            </button>
            <div className={`${classOne}`} id="navbarSupportedContent">
              <ul className="navbar-nav">
                {isAdmin ? (
                  <>
                    <li className={`nav-item`}>
                      <Link className="nav-link" to="/admin">
                        Dashboard
                        <span className="sr-only">(current)</span>
                      </Link>
                    </li>
                    <li className={`nav-item`}>
                      <Link to="/insight" className="nav-link">
                        {" "}
                        Insight
                        <span className="sr-only">(current)</span>
                      </Link>
                    </li>
                    <li className={`nav-item`}>
                      <Link to="/admin-user" className="nav-link">
                       Admin Users
                        <span className="sr-only">(current)</span>
                      </Link>
                    </li>
                    <li className={`nav-item`}>
                      <Link to="/blocklist" className="nav-link">
                      Manage Access
                        <span className="sr-only">(current)</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className={`nav-item`}>
                    <Link to="/user" className="nav-link">
                      User
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <ul className="signup-link">
             <li>
                <Link to='/' target='_blank'>HOME</Link>
              </li>
              <li>
                <a href='http://3.23.128.15/sdk-docs/' target='_blank'>SDK-DOCS</a>
              </li>
              <li>
                <Link onClick={this.logouthandler}>LOGOUT</Link>
              </li>
            </ul>
          </nav>
        </header>
      </>
    );
  }
}

export default withRouter(sideNavbar);
