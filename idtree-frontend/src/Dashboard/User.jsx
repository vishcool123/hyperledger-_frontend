import React, { Component } from "react";
import Header from "./Header.jsx";
import SideNavbar from "./sideNavbar.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "./Loader.jsx";

export default class user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      miniBar: true,
      key: "",
      privateKey: "",
      loader: false,
      count: '',
    };
  }
  genKey = async () => {
    const apiKey = JSON.parse(localStorage.getItem("key"));
    this.setState({ loader: true });
    axios
      .post("http://3.23.128.15:3000/api/v1/users/generateUniqueIdwithKey", {
        apiKey,
      })
      .then((data) => {
        this.setState({
          key: data.data.data.uniqueID.uniqueID,
          privateKey: data.data.data.uniqueID.privateKey,
          count: data.data.data.totalAPICalls,
          loader: false,
        });
      })
      .catch((error) => toast.error(error));
  };
  render() {
    const apiKey = JSON.parse(localStorage.getItem("key"));
    console.log(this.state.key);
    return (
      <>
        <SideNavbar />
        <div id="page-wrapper" class="dark-bg" style={{ minHeight: "625px" }}>
          <div class="wrapper wrapper-content">
            <div class="wrapper wrapper-content">
              <div class="box-heading" style={{ marginLeft: "188px" }}>
                <h2>Generate Key</h2>
              </div>
              <div className="row mt-4" style={{ marginLeft: "173px" }}>
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      value={apiKey}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="form-group">
                    <div>
                      <div>
                        <h5>Uniqueid: {this.state.key}</h5>
                      </div>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <h5 style={{ width: "80%", wordBreak: "break-word" }}>
                          PrivateKey: {this.state.privateKey}
                        </h5>
                      </div>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <h5 style={{ width: "80%", wordBreak: "break-word" }}>
                          Total Api Count: {this.state.count}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary btn-md btn-block W-70"
                      onClick={() => this.genKey()}
                      style={{
                        backgroundColor: "#00917c",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      //   disabled={this.state.key != '' ? false: true}
                    >
                      {this.state.loader ? <Loader /> : "Generate Key"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
