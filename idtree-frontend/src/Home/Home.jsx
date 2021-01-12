/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Nav from "./homeHeader.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from '../Dashboard/Loader.jsx';
import swal from 'sweetalert';



function Home(props) {
  const [key, setKey] = useState("");
  const [privatekey, setPrivatekey] = useState("");
  const [loader, setLoader] = useState(false);

  const getKey = async () => {
    setLoader(true);
    axios
      .get("http://3.23.128.15:3000/api/v1/users/generateUniqueId")
      .then((data) => {
        setKey(data.data.data.uniqueID.uniqueID);
        setPrivatekey(data.data.data.uniqueID.privateKey);
        setLoader(false);
      })
      .catch((error) => swal(error.response.data.data,'','error'));
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col p-0">
            <Nav button="LOGIN" />
            <div className="form-group genKey">
              <button
                type="submit"
                className="btn btn-primary btn-md btn-block w-30"
                onClick={getKey}
                style={{
                  backgroundColor: "#00917c",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {loader ? <Loader /> : "Generate Key"}
              </button>
            </div>
            <div    style={{
                justifyContent: "center",
                display: "flex",
              }}>
              <h5 style={{ width: "38%", wordBreak: "break-word" }}>Uniqueid: {key}</h5>
            </div>
            <div
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <h5 style={{ width: "38%", wordBreak: "break-word" }}>
                PrivateKey: {privatekey}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withRouter(Home);
