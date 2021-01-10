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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      miniBar: true,
      screenwidth: "",
    };
  }

  logouthandler = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    const profileDataFromProfile = this.props.profileDataFromProfile;
    const profileData = JSON.parse(localStorage.getItem("profileData"));
    return (
      <>
        <div className="row top-menu2">
          <nav
            className="navbar navbar-static-top dark-bg-header top-menu"
            role="navigation"
            style={{ marginBottom: "0" }}
          >
            <div className="navbar-header">
              <span
                className="navbar-minimalize minimalize-styl-2 btn btn-primary "
                onClick={this.props.addMiniBar}
              >
                <i className="fa fa-bars" />{" "}
              </span>
              {/* <!--      <form role="search" class="navbar-form-custom" action="search_results.html">
                   <div class="form-group">
                     <input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search">
                     </div>
                     </form> --> */}
            </div>
            <ul className="navbar-top-links navbar-right">
              <li className="user-info-box welcome tooltipa">
                {/* <!--   <p class="m-t-sm m-r-sm">Welcome First Name </p> --> */}
                <div className="dropdown d-flex">
                  <span className="prof-img">
                    <a>
                      {" "}
                      <img
                        alt="image"
                        className="img-back"
                        // src={user}
                      />
                    </a>
                  </span>
                  <span
                    data-toggle="dropdown"
                    className="dropdown-toggle"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="clear">
                      {" "}
                      <span className="block m-t-xs" />{" "}
                      <span className="text-muted text-xs block">
                        {/* {profileDataFromProfile ? profileDataFromProfile.firstName : profileData ? profileData.firstName : ''} */}
                        {/* <b className="caret" /> */}
                      </span>{" "}
                    </span>{" "}
                  </span>
                  <ul className="dropdown-menu">
                    {/* <!--                            <li><a href="contacts.html">Contacts</a></li>--> */}
                    <li>
                      <a onClick={this.logouthandler}>Logout</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

export default withRouter(Header);
