import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
  PaginationTotalStandalone,
} from "react-bootstrap-table2-paginator";
// import { connect } from "react-redux";
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from "axios";
import { toast } from "react-toastify";
import Header from "./Header.jsx";
import SideNavbar from "./sideNavbar.jsx";
import swal from 'sweetalert';

import {
  tableOptions,
  defaultSorted,
  getDate,
  customSort,
} from "../utils/tableData";

// import '../assets/css/bootstrap.min.css';
// import '../assets/css/style.css';
// import '../assets/css/media-admin.css';
// import '../assets/css/mystyle.css';
// import '../assets/css/admin.css';
// import '../assets/font-awesome/css/font-awesome.css';
// import '../assets/font-awesome/css/fontawesome.css';
// import '../assets/css/datatables.min.css';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      quizList: [],
      totalCount: 0,
      pageSize: this.props.match.params.page
        ? Number(this.props.match.params.page)
        : 10,
      showModal: false,
      quizId: "",
      isQuizLoading: false,
      reasonText: "",
      fetchingNext: false,
      totalQuiz: 0,
      showInfoModal: false,
      infoMessage: "",
      isFullLoading: false,
      filterText: "",
      quizListOld: [],
      masterQuiz: "",
      cell: false,
      value: "",
      urlData: "",
      miniBar: true,
      screenwidth: "",
      user_list: "",
      tableload: false,
      lastPage: 1,
      user: [
        {
          id: "1",
          email: "john123@gmail.com",
          count: 2,
        },
        {
          id: "2",
          email: "john123@gmail.com",
          count: 2,
        },
        {
          id: "3",
          email: "john123@gmail.com",
          count: 2,
        },
        {
          id: "4",
          email: "john123@gmail.com",
          count: 2,
        },
        {
          id: "5",
          name: "John wick",
          email: "john123@gmail.com",
          count: 2,
        },
        {
          id: "6",
          name: "John wick",
          email: "john123@gmail.com",
          count: 2,
        },
      ],
    };
    // this.props.getUserList({skip:0,limit:100,search:''})
  }

  minBar = () => {
    this.setState({ miniBar: !this.state.miniBar });
  };
  getAllUser = async () => {
    axios
      .get("http://3.23.128.15:3000/api/v1/users/getAllUser")
      .then((data) => {
        this.setState({ user_list: data.data.data });
      })
      .catch((error) => swal(error.response.data.data,'','error'));
  };
  componentDidMount() {
    this.getAllUser();
    // window.addEventListener("resize", function (event) {
    //   const x = document.documentElement.clientWidth;
    //   this.updateWidth(x);
    // });
    // this.setState({ cell: true });
  }

  //   updateWidth = (x) => {
  //     this.setState({
  //       screenwidth: x,
  //     });
  //   };

  // searchResult = () => {
  //   const { filterText, quizList, quizListOld } = this.state;
  //   const { fetchQuizListDetails } = this.props;

  //   if (quizListOld.length === 0) {
  //     this.setState({ quizListOld: quizList });
  //   }
  //   this.setState({ isLoading: true });

  //   fetchQuizListDetails(0, 100, filterText);
  // };

  // getCategoryNames = (items) => {
  //   let categoryNames = "";

  //   if (items.length > 1) {
  //     items.forEach((item, index) => {
  //       if (item !== ",") {
  //         if (index === items.length - 1) {
  //           categoryNames += `${item} `;
  //         } else {
  //           categoryNames += `${item}, `;
  //         }
  //       }
  //     });
  //     categoryNames = categoryNames.substring(0, categoryNames.length - 1);
  //     return categoryNames;
  //   } else {
  //     return items[0] !== "," ? items[0] : "";
  //   }
  // };
  componentDidUpdate(prevProps) {
    // let list
    // if (prevProps.userList != this.props.userList) {
    //   console.log(this.props.userList.data.data[0].list)
    //   list = this.getList(this.props.userList.data.data[0].list)
    //   console.log('lissst',list)
    //   this.setState({user_list: list})
    // }
  }

  getList = (data) => {
    const { quizList, fetchingNext } = this.state;
    let newList = quizList;
    const list = [];
    let masterQuiz = "";

    if (data) {
      data.forEach((listItem) => {
        const detail = {
          id: listItem._id,
          firstName: listItem.firstName,
          email: listItem.email,
          phone: listItem.phone,
        };
        list.push(detail);
      });
      return list;
    }
  };

  rowStyleFormat = (row, rowIdx) => {
    return {
      outline: "none",
    };
  };
  userAccess = (email) => {
    axios
      .post("http://3.23.128.15:3000/api/v1/users/manageUserAccess", { email })
      .then((data) => {
        toast.success("User Access Updated");
        this.getAllUser();
      })
      .catch((error) => toast.error(error.response.data.data));
  };
  rankFormater = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div class="action-btn" style={{ cursor: "pointer" }}>
        {row.isBlacklisted ? (
          <span onClick={() => this.userAccess(row.email)}>Unblacklist</span>
        ) : (
          <span onClick={() => this.userAccess(row.email)}>Blacklist</span>
        )}
        {/* <!--   <a href="#" data-toggle="modal" data-target="#modal-delete"><i class="fa fa-trash" aria-hidden="true"></i></a> --> */}
      </div>
    );
  };

  getUserDetail = (id) => {
    this.props.getUserDetail({ id });
    this.props.history.push(`/user-detail/${id}`);
  };
  handleSearchText = (e) => {
    // this.props.getUserList({skip:0,limit:30,search: e.target.value})
  };
  render() {
    console.log(this.state.user);
    const { SearchBar } = Search;

    // if (this.state.cell == false) {
    //   this.componentDidMount();
    // }
    const columns = [
      //   {
      //     dataField: "firstName",
      //     text: "Full Name",
      //     sort: true,
      //     // formatter: this.redirectComponent,
      //     headerStyle: (colum, colIndex) => {
      //       return {
      //         width: "25%",
      //         textAlign: "center",
      //         outline: "none",
      //       };
      //     },
      //   },
      {
        dataField: "email",
        text: "Email Address",
        sort: true,
        editCellStyle: {
          backgroundColor: "#000",
        },
        headerStyle: (colum, colIndex) => {
          return {
            textAlign: "center",
            outline: "none",
          };
        },
      },
      {
        dataField: "apiCalls",
        text: "ApiCount",
        sort: true,
        headerStyle: (colum, colIndex) => {
          return {
            width: "25%",
            textAlign: "center",
            outline: "none",
          };
        },
      },
      {
        dataField: "isBlacklisted",
        text: "Actions",
        formatter: this.rankFormater,
        headerStyle: (colum, colIndex) => {
          return {
            width: "12%",
            textAlign: "center",
            outline: "none",
          };
        },
      },
    ];

    const {
      quizList,
      pageSize,
      showModal,
      isQuizLoading,
      reasonText,
      infoMessage,
      showInfoModal,
      isFullLoading,
      masterQuiz,
    } = this.state;

    const options = {
      ...tableOptions,
      // totalSize: this.state.user.length,
      sizePerPage: 5,
      custom: true,
      // onPageChange: this.onPageChange,
    };
    return (
      <>
        {this.state.user_list ? (
          <>
            <SideNavbar
            //   miniBar={this.state.miniBar}
            //   screenwidth={this.state.screenwidth}
            />
            <div
              id="page-wrapper"
              class="dark-bg"
              style={{ minHeight: "625px" }}
            >
              {/* <Header addMiniBar={this.minBar} /> */}
              <div class="wrapper wrapper-content">
                <div class="">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
                  <div class="ibox">
                    <div class="ibox-content" id="history">
                      <div class="box-heading">
                        <h2>Admin</h2>
                      </div>

                      <div id="owner-detail-btn">
                        <div className="table dataTables-example">
                          {this.state.user_list && (
                            <ToolkitProvider
                              keyField="id"
                              data={this.state.user_list}
                              columns={columns}
                              noDataIndication="Table is Empty"
                              tabIndexCell
                              search
                            >
                              {(props) => (
                                <>
                                  <div class="search">
                                    <div
                                      id="DataTables_Table_0_filter"
                                      class="dataTables_filter"
                                    >
                                      <label style={{ display: "inline" }}>
                                        Search:
                                      </label>
                                      {/* <input
                                        type="search"
                                        class="form-control input-sm"
                                        placeholder=""
                                        aria-controls="DataTables_Table_0"
                                        style={{
                                          width: "15%",
                                          display: "inline-block",
                                          height: "30px",s
                                        }}
                                        onChange={this.handleSearchText}
                                        onKeyDown={this.onKeyDown}
                                      /> */}
                                      <SearchBar
                                        class="form-control input-sm"
                                        style={{
                                          width: "25%",
                                          display: "inline-block",
                                          height: "30px",
                                        }}
                                        {...props.searchProps}
                                      />

                                      {/* <span
                                        class="input-group-append search-btn"
                                        style={{
                                          display: "inline-block",
                                        }}
                                        onClick={() => this.searchResult()}
                                      >
                                        <i
                                          class="feather icon-search input-group-text"
                                          style={{
                                            minHeight: "36px",
                                          }}
                                        ></i>
                                      </span> */}
                                    </div>
                                  </div>

                                  <div>
                                    <PaginationProvider
                                      pagination={paginationFactory(options)}
                                    >
                                      {({
                                        paginationProps,
                                        paginationTableProps,
                                      }) => (
                                        <>
                                          {"Show"}{" "}
                                          <SizePerPageDropdownStandalone
                                            {...paginationProps}
                                          />{" "}
                                          {"entries"}{" "}
                                          <BootstrapTable
                                            options={tableOptions}
                                            noDataIndication={() => (
                                              <div
                                                style={{ textAlign: "center" }}
                                              >
                                                Table is Empty
                                              </div>
                                            )}
                                            striped
                                            trStyle={this.rowStyleFormat}
                                            rowStyle={{
                                              textAlign: "center",
                                              outline: "none",
                                            }}
                                            {...props.baseProps}
                                            {...paginationTableProps}
                                            sort={{
                                              sortFunc: this.sorting,
                                              sortCaret: this.sortCaret,
                                            }}
                                          />
                                          <div className="paginationbottom">
                                            <PaginationTotalStandalone
                                              {...paginationProps}
                                            />
                                            <PaginationListStandalone
                                              {...paginationProps}
                                            />
                                          </div>
                                        </>
                                      )}
                                    </PaginationProvider>
                                  </div>
                                </>
                              )}
                            </ToolkitProvider>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  }
}
