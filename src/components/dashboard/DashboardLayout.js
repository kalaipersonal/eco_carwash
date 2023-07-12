import { withRouter,NavLink } from "react-router-dom";
import "./styles/DashboardLayout.scss";
import { Chart } from "primereact/chart";
import { API } from "./api/Api";
import Piechart from "./graphchart/piechart/Piechart";
import React, { Component } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { Horizontal } from "./graphchart/horizontalchart/Horizontal";

let getIndustryList = [{ value: "", label: "Select an industry" }];
let horizontalOptions, basicOptions, c, ctx, d, arraylist;
var piechartindustryname = [];
var piechartindustryvalue = [];
var mainchartindustryname = [];
var stageone = [];
var stagetwo = [];
var stagethree = [];

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      industrylist: getIndustryList,
      getuserslist: "",
      webinar: [],
      appiontment: [],
      showWebinarandAppointment: false,
      showpiechart: false,
      star_count: "",
      initialfeedback: [],
    };

    this.myRef = React.createRef();
    this.courseAPI = new API();
    this.getFeedback = this.getFeedback.bind(this);

    this.chartData = {
      labels: ["A", "B", "C", "D", "E", "F"],
      datasets: [
        {
          data: [10, 10, 10, 10, 10, 10],
          backgroundColor: [
            "#FB9B51",
            "#11224E",
            "#1A3B70",
            "#2C599D",
            "#5C83C4",
            "#F88125",
          ],
          hoverBackgroundColor: [
            "#FB9B51",
            "#11224E",
            "#1A3B70",
            "#2C599D",
            "#5C83C4",
            "#F88125",
          ],
        },
      ],
    };

    this.lightOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
          position: "right",
        },
      },
    };

    this.basicData3 = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],

      datasets: [
        {
          backgroundColor: "#6DDFD8",
          data: [10, 30, 25, 50, 20, 26, 57, 80, 38, 15, 28, 34],
        },
      ],
    };

    horizontalOptions = {
      indexAxis: "y",
      maintainAspectRatio: false,
      aspectRatio: 1.9,
      plugins: {
        legend: {
          labels: {
            color: "green",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "green",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1.0,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.4,
          },
        ],
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "white",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "white",
          },
        },
      },
    };
  }

  getFeedback(e) {
    this.courseAPI.getFeedback(e.target.value).then((res) => {
      console.log(res);
    });
  }
 
  render() {
    console.log(this.state.star_count.five_star);

    return (
      <div className="scroll_dashboards">
        <div className="dashboard ">
          <div className="start_user_list">
            <div className="box_1">
              <div className="empty"></div>
              <div className="user_content">
                <span className="texts">User</span>
                <span className="number">20</span>
              </div>
              <div className="icon"></div>
            </div>
            <div className="box_1">
              <div className="empty"></div>
              <div className="user_content">
                <span className="texts">Stores</span>
                <span className="number">20</span>
              </div>
              <div className="icon">
                <span className="icons">
                  <i className="far fa-plus"></i>
                </span>
              </div>
            </div>
            <div className="box_1">
              <div className="empty"></div>
              <div className="user_content">
                <span className="texts">Stylist</span>
                <span className="number">20</span>
              </div>
              <div className="icon">
                <span className="icons">
                  <i className="far fa-plus"></i>
                </span>
              </div>
            </div>
            <div className="box_1">
              <div className="empty"></div>
              <div className="user_content">
                <span className="texts">Manager</span>
                <span className="number">20</span>
              </div>
              <div className="icon">
                <span className="icons">
                  <i className="far fa-plus"></i>
                </span>
              </div>
            </div>
            <div className="box_1">
              <div className="empty"></div>
              <div className="user_content">
                <span className="texts">Booking</span>
                <span className="number">20</span>
              </div>
              <div className="icon"></div>
            </div>
          </div>
          <div className="dashboardgraph d-flex flex-row justify-content-between ">
            <div className="w-100">
              <div className="dashboard-bargraph ">
                <div className="d-flex flex-row col-11">
                  <div className="dashboard-piechart-title col-6 ps-3"></div>
                  <div
                    className="dashboard-piechart-viewmore col-6 d-flex flex-row justify-content-end "
                    data-bs-toggle="modal"
                    data-bs-target="#open-industrymodal"
                  >
                    <span className="months">
                      <span className="circle_color">
                        <i className="fas fa-circle"></i>
                      </span>
                      Months
                    </span>
                  </div>
                </div>
                <Chart
                  type="bar"
                  data={this.basicData3}
                  options={basicOptions}
                  style={{ width: "90%", height: "85%" }}
                  ref={this.myRef}
                />
              </div>
            </div>
            <div className="dashboard-piechart">
              <div className="d-flex flex-row col-12">
                <div className="dashboard-piechart-title col-6 px-3 py-2">
                  Services
                </div>
              </div>
              <div>
                <Piechart />
                {}
              </div>
            </div>
          </div>

          <div className="feed_backs">
            <div className="start">
              <div className="interior">
                <div className="dots_content">
                  <div className="names1">
                    <span>
                      <i className="fas fa-circle circles"></i>
                    </span>
                    <span>Hair </span>
                  </div>
                  <div className="names">
                    <span>
                      <i className="fas fa-circle circle_1"></i>
                    </span>
                    <span className="exterior">Spa</span>
                  </div>
                </div>
              </div>
              <div>
                <Horizontal />
              </div>
            </div>
            <div className="middle">
              <div className="feed_conten_split">
                <p>Feedback </p>
                <span>
                  View more
                </span>
              </div>
              <div className="circles_size mt-2">
                <div>
                  <Progress type="circle" width={50} percent={20} />
                  <p className="text-center pt-1">5</p>
                </div>
                <div>
                  <Progress type="circle" width={50} percent={40} />
                  <p className="text-center pt-1">6</p>
                </div>
                <div>
                  <Progress type="circle" width={50} percent={60} />
                  <p className="text-center pt-1">10</p>
                </div>
                <div>
                  <Progress type="circle" width={50} percent={80} />
                  <p className="text-center pt-1">20</p>
                </div>
                <div>
                  <Progress type="circle" width={50} percent={99} />
                  <p className="text-center pt-1">25</p>
                </div>
              </div>
              <div className="back_content p-3">
                <div className="box_splits">
                  <div className="main_inside">
                    <div className="left_person_image">
                      <div className="left_number">1.</div>
                      <div className="right_person_images">
                        <div className="inside_right_image_person">
                          <img
                            src="https://picsum.photos/id/237/200/200"
                            className="dog"
                          />
                        </div>
                        <div className="inside_right_content">
                          <span>Thamarai</span>
                          <div>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                          </div>
                          <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                      </div>
                    </div>

                    <div className="numbers">4.0</div>
                  </div>
                </div>
                <div className="box_splits">
                  <div className="main_inside">
                    <div className="left_person_image">
                      <div className="left_number">2.</div>
                      <div className="right_person_images">
                        <div className="inside_right_image_person">
                          <img
                            src="https://picsum.photos/id/237/200/200"
                            className="dog"
                          />
                        </div>
                        <div className="inside_right_content">
                          <span>Thamarai</span>
                          <div>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                          </div>
                          <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                      </div>
                    </div>

                    <div className="numbers">4.0</div>
                  </div>
                </div>
                <div className="box_splits">
                  <div className="main_inside">
                    <div className="left_person_image">
                      <div className="left_number">3.</div>
                      <div className="right_person_images">
                        <div className="inside_right_image_person">
                          <img
                            src="https://picsum.photos/id/237/200/200"
                            className="dog"
                          />
                        </div>
                        <div className="inside_right_content">
                          <span>Thamarai</span>
                          <div>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                          </div>
                          <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                      </div>
                    </div>

                    <div className="numbers">4.0</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="end">
              <div className="split_box1">
                <div className="box_split_1">
                  <div className="empty"></div>
                  <div className="app_download">
                    <p> App Download </p>
                    <span>45</span>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="split_box1">
                <div className="box_split_2">
                  <div className="empty"></div>
                  <div className="app_downloads">
                    <p> Leave Approval </p>
                    <span>20</span>
                  </div>
                  <div className="arrows">
                    <NavLink to="/leavedetails" style={{textDecoration:"none"}} className="arrow">
                      <i className="fal fa-chevron-right"></i>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DashboardLayout);
