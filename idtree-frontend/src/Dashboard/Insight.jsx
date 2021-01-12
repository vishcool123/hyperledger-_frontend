import React, { Component } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import Header from "./Header.jsx";
import SideNavbar from "./sideNavbar.jsx";
import { toast } from "react-toastify";
import swal from 'sweetalert';

export default class Insight extends Component {
    constructor(props){
        super(props);
        this.state = {
            miniBar: true,
            platformUsers: '',
            nonPlatformUsers: ''
        }
    }
    insight = async () => {
        axios
          .get("http://3.23.128.15:3000/api/v1/users/fetchTotalAPICalls")
          .then((data) => {
              this.setState({platformUsers:data.data.data.platformUsers,nonPlatformUsers:data.data.data.nonPlatformUsers})
          })
          .catch((error) => swal(error.response.data.data,'','error'));
      };
    componentDidMount(){
      this.insight()
    }
    minBar = () => {
        this.setState({ miniBar: !this.state.miniBar });
      };
  render() {
    let data = {
      labels: ["PlatformUsers", "NonPlatformUsers"],
      datasets: [
        {
          label: "AcceptedCount",
          backgroundColor: ["#FF6600", "#FF0F00"],
          data: [this.state.platformUsers, this.state.nonPlatformUsers],

        },
    
      ],
   
    };
    return (
      <>
      
        <SideNavbar
    
        />
        <div id="page-wrapper" class="dark-bg" style={{ minHeight: "625px" }}>
          <div class="wrapper wrapper-content">
            <div class="">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
              <div class="ibox">
                <div class="ibox-content" id="history">
                  <div class="box-heading">
                    <h2>Insight</h2>
                  </div>
                  <div>
                    <div
                      id="donut"
                      style={{
                        height: "50vh",
                        marginTop: "0px",
                        width: "100%",
                      }}
                    >
                      <Doughnut
                        data={data}
                        width={400}
                        height={400}
                        // datasetKeyProvider={this.datasetKeyProvider}
                        options={{
                          legend: {
                            display: true,
                            position: "bottom",
                            // labels: {
                            //   boxWidth: 10,
                            //   boxHeight: 10,
                            //   usePointStyle: true,
                            // },
                          },
                          responsive: true,
                          maintainAspectRatio: false,
                          cornerRadius: 8,
                        }}
                      />
                    </div>
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
