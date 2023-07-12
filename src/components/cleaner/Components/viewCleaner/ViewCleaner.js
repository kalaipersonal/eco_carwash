import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import axios from "axios";

import "./styles/ViewCleaner.scss";

let url, cleaner_id;
class ViewCleaner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cleanerDetails: [],
      cleanerReviews: [],
    };

    url = this.props.match.path;
    console.log("viewcleaner:", url);
    cleaner_id = this.props.match.params.username;
    console.log("this is cleaner id", cleaner_id);
  }

  handleReflow = (rleState) => {
    const { clamped, text } = rleState;
  };

  StarComponent(rating){
    let html = []
    for(let i=1;i<=5;i++){
      (i <= rating) ?
      html.push(<span className="fa-solid fa-star-sharp checked"></span>) :  html.push(<span className="fa-solid fa-star-sharp"></span>)
    }
    return html
  }

  getCleanerProfile() {
    axios
      .get(`/admin/manage_staff/${cleaner_id}`)
      .then((res) => {
        console.log("this is res", res.data.Data);
        this.setState({ cleanerDetails: res.data.Data });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/admin/manage_ratings/?cleaner=cln_1`)
      .then((res) => {
        console.log("this is reviews", res.data.Data);
        this.setState({ cleanerReviews: res.data.Data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getCleanerProfile();
  }

  render() {
    return (
      <div className="view-cleaner-section">
        <div className="view-cleaner-dashboard">
          <div className="d-flex flex-row dashboard-top-section">
            <div className="col-12 card">
              <div className="card-body">
           <div className="left_back">
                  <button
                    className="btn-white-circle"
                    onClick={() => this.props.history.goBack()}
                    style={{width:"50px",height:"50px",borderRadius:"50%"}}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  </div>
                <div className="d-flex flex-row h-100 w-100 justify-content-center align-items-center">
                  
                  <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                    <div className="profile-picture mb-3">
                      <img src="https://picsum.photos/100" />
                    </div>
                    <h5 className="mb-3">{this.state.cleanerDetails.name}</h5>
                    <h6>Pending</h6>
                  </div>

                  <div className="col-4 p-5">
                    <div className="d-flex flex-column justify-content-between">
                      <div className="pb-5">
                        <h6>Phone</h6>
                        <p>{this.state.cleanerDetails.mobile_no}</p>
                      </div>
                      <div>
                        <h6>E-mail</h6>
                        <p>{this.state.cleanerDetails.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 leaves-display">
                    <div className="leaves-display-box">
                      <h4 className="mb-3">No.of Leaves</h4>
                      <div className="d-flex flex-row">
                        <div className="col-6 division">
                          <p>Taken</p>
                          <div className="value">{this.state.cleanerDetails.leave_taken}</div>
                        </div>
                        <div className="col-6 division">
                          <p>Available</p>
                          <div className="value">{this.state.cleanerDetails.total_leave}</div>
                        </div>
                      </div>
                      <NavLink to={`/leavedetails?cleaner=${this.state.cleanerDetails.username}`} className="view_more">
                        view more
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row dashboard-bottom-section mt-4">
            <div className="col-4">
              <NavLink to={`/orderdetails?status=Completed&cleaner=${this.state.cleanerDetails.username}`} className="card">
                <div className="card-body d-flex flex-column align-items-center">
                  <h5>Completed Appointments</h5>
                  <h1 className="my-auto">
                    {this.state.cleanerDetails.completed_appointments}
                  </h1>
                </div>
              </NavLink>
            </div>

            <div className="col-4">
              <div className="card">
                <NavLink to={`/orderdetails?status=Today&cleaner=${this.state.cleanerDetails.username}`} className="card-body d-flex flex-column align-items-center">
                  <h5>Today's Appointments</h5>
                  <h1 className="my-auto">
                    {this.state.cleanerDetails.today_appointments}
                  </h1>
                </NavLink>
              </div>
            </div>

            <div className="col-4">
              <NavLink to={`/orderdetails?status=Upcoming&cleaner=${this.state.cleanerDetails.username}`} className="card">
                <div className="card-body d-flex flex-column align-items-center">
                  <h5>Upcoming Appointments</h5>
                  <h1 className="my-auto">
                    {this.state.cleanerDetails.upcoming_appointments}
                  </h1>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="view-cleaner-body h-100">
          <div className="view-profile-reviews mb-4">
            <div className="card">
              <div className="card-body">
                <h5
                  style={{ height: "7%" }}
                  className="d-flex fw-normal justify-content-center"
                >
                  User Reviews
                </h5>
                <div className="cleaner-reviews-block">
                  {this.state.cleanerReviews.map((data, index) => {
                    return (
                      <div>
                        <div className="d-flex flex-column cleaner-reviews-element w-100">
                          <div
                            style={{ height: "40%" }}
                            className="d-flex flex-row align-items-center w-100 justify-content-between"
                          >
                            <div className="d-flex flex-row">
                              <div className="reviews-profile-picture me-2">
                                <img src="https://picsum.photos/100" />
                              </div>
                              <p className="my-auto">{data.user.name}</p>
                            </div>

                            <div className="d-flex flex-row">
                              {
                                this.StarComponent(data.rating)
                              }
                            </div>
                          </div>
                          <div
                            style={{ height: "60%" }}
                            className="review-content d-flex flex-row pt-2"
                          >
                            <LinesEllipsis
                              text={data.review}
                              maxLine="2"
                              ellipsis="..."
                              trimRight
                              basedOn="letters"
                              onReflow={this.handleReflow}
                            />
                          </div>
                        </div>

                        {index < this.state.cleanerReviews.length - 1 ? (
                          <div
                            id="#bottomLine"
                            style={{ borderBottom: "1px solid #b4b4b4" }}
                          ></div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="view-profile-documents">
            <div className="card">
              <div className="card-body"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ViewCleaner);
