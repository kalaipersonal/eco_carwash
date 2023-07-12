import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { getCustomerData, getCustomerRating } from "../../api/GET";
import LinesEllipsis from "react-lines-ellipsis";
import "./styles/ViewCustomer.scss";

import { patchCustomer } from "./api/PATCH";

let url, id;
class ViewCustomer extends Component {
  constructor(props) {
    super(props);
    url = this.props.match.path;
    id = this.props.match.params.id;
    this.state = {
      customer: [],
      customerReview: [],
    };
    this.getCustomerDetails = this.getCustomerDetails.bind(this);
  }

  componentDidMount() {
    this.getCustomerDetails();
  }

  StarComponent(rating) {
    let html = [];
    for (let i = 1; i <= 5; i++) {
      i <= rating
        ? html.push(<span className="fa-solid fa-star-sharp checked"></span>)
        : html.push(<span className="fa-solid fa-star-sharp"></span>);
    }
    return html;
  }

  updateRatingStatus(i) {
    let list = this.state.customerReview;
    list[i].is_approved = !list[i].is_approved;
    patchCustomer(list[i].id, { is_approved: list[i].is_approved })
      .then((res) => {
        console.log(res.data);
        this.setState({ customerReview: list });
      })
      .catch((err) => console.log(err));
  }

  customerReviewSection() {
    return this.state.customerReview.map((data, index) => {
      let i = this.state.customerReview.indexOf(data);
      return (
        <React.Fragment>
          <div className="d-flex flex-column customer-reviews-element w-100">
            
            <div
              style={{ height: "40%" }}
              className="d-flex flex-row align-items-center w-100 justify-content-between "
            >
              <div className="d-flex flex-column customer-profile-picture me-3">
                <img src="https://picsum.photos/100" />
              </div>
              <div className="d-flex flex-column">
                <p className="d-flex flex-row mb-2 mt-0">{data.user.name}</p>
                <div className="d-flex flex-row">
                  {this.StarComponent(data.rating)}
                </div>
              </div>

              <div className="d-flex flex-column my-auto ms-auto">
                <select
                  name={`rating_${data.id}`}
                  id={`rating_${data.id}`}
                  className="form-select"
                  value={this.state.customerReview[i].is_approved}
                  className="drop-down"
                  onChange={() => this.updateRatingStatus(i)}
                >
                  <option value="true">Approved</option>
                  <option value="false">Disapproved</option>
                </select>
              </div>
            </div> 
            <div
              style={{ height: "60%" }}
              className="review-content d-flex flex-row pt-4"
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

          {index < this.state.customerReview.length - 1 ? (
            <div
              id="#bottomLine"
              style={{ borderBottom: "1px solid #b4b4b4" }}
            ></div>
          ) : null}
        </React.Fragment>
      );
    });
  }

  getCustomerDetails() {
    getCustomerData(id).then((res) => {
      console.log(res.data.Data);
      this.setState({
        customer: res.data.Data,
      });
    });

    getCustomerRating(id).then((res) => {
      console.log(res.data.Data);
      this.setState({
        customerReview: res.data.Data,
      });
    });
  }

  render() {
    return (
      <div className="viewcustomer-layout">
        <div className="customer-details">
           <div className="customer_details_card">
            <div className="start-back">
              <div className="buttons">
                <button
                  className="btn-white-circle ms-2"
                  onClick={() => this.props.history.goBack()}
                
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
              </div>
            </div>
            <div className="start-content bg-dark ">
              <div className="image">
                <img src="https://picsum.photos/100" />
              </div>
              <h5 className="mb-3">{this.state.customer?.name}</h5>
            </div>
            <div className="middle_address">
              <div className="phone">
                <h6>Phone</h6>
                <p style={{ color: "gray" }}>
                  {this.state.customer?.mobile_no}
                </p>
              </div>
              <div className="email">
                <h6>E-mail</h6>
                <p style={{ color: "gray" }}>{this.state.customer?.email}</p>
              </div>
              <div className="address">
                <h6>address</h6>
                <div className="inside_scroll_address">
                  <h6
                    style={{
                      color: "gray",
                    }}
                  >
                    {this.state.customer?.address?.address}
                  </h6>
                </div>
              </div>
            </div>
            <div className="end-list_address">
            <div className="card">
                <div className="card-body d-flex flex-column">
                  <h4 className="pb-4">Car Type</h4>
                  <div className="d-flex flex-row">
                    <div className="col-4">
                      <h6 className="mint">Make</h6>
                      <p>{this.state.customer?.user_cars?.car_make}</p>
                    </div>
                    <div className="col-4">
                      <h6 className="mint">Model</h6>
                      <p>{this.state.customer?.user_cars?.car_model}</p>
                    </div>
                    <div className="col-4">
                      <h6 className="mint">Type</h6>
                      <p>{this.state.customer?.user_cars?.car_type}</p>
                    </div>
                  </div>
                </div>
              </div>  
            </div>
          </div>
           {/* <div className="d-flex flex-row customer-details-card">
            <div className="col-4 d-flex flex-column justify-content-center align-items-center">
              <div className="buttons">
                <button
                  className="btn-white-circle ms-2"
                  onClick={() => this.props.history.goBack()}
                  style={{
                    width: "45px",
                    height: "45px",
                  }}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
              </div>
              <div className="profile-picture mb-3">
                <img src="https://picsum.photos/100" />
              </div>
              <h5 className="mb-3">{this.state.customer?.name}</h5>
            </div>

            <div className="col-3 py-5">
              <div className="d-flex flex-column justify-content-between ps-4 py-5">
                <div className="">
                  <h6>Phone</h6>
                  <p style={{ color: "gray" }}>
                    {this.state.customer?.mobile_no}
                  </p>
                </div>
                <div>
                  <h6>E-mail</h6>
                  <p style={{ color: "gray" }}>{this.state.customer?.email}</p>
                </div>
                <div className="address-scroll">
                  <h6>address</h6>
                 <div className="inside_scroll_address">
                 <h6
                    style={{
                      width: "100%",
                      height: "8rem",
                      lineHeight: "2",
                      color: "gray",
                    }}
                  >
                    {this.state.customer?.address?.address}
                  </h6>
                 </div>
                </div>
              </div>
            </div>

            <div className="col-5 d-flex flex-column text-center justify-content-center align-items-center">
              <div className="card">
                <div className="card-body d-flex flex-column">
                  <h4 className="pb-4">Car Type</h4>
                  <div className="d-flex flex-row">
                    <div className="col-4">
                      <h6 className="mint">Make</h6>
                      <p>{this.state.customer?.user_cars?.car_make}</p>
                    </div>
                    <div className="col-4">
                      <h6 className="mint">Model</h6>
                      <p>{this.state.customer?.user_cars?.car_model}</p>
                    </div>
                    <div className="col-4">
                      <h6 className="mint">Type</h6>
                      <p>{this.state.customer?.user_cars?.car_type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  */}

          <div className="customer-extra-details">
            <NavLink
              to={`/orderdetails?status=All&customer=${id}`}
              style={{ textDecoration: "none" }}
              className="card customer-appointments"
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="mb-5">Total Appointments</h5>
                <h1>{this.state.customer?.totalapps}</h1>
              </div>
            </NavLink>

            <div className="customer-ratings">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-between">
                    <h5
                      style={{ height: "7%" }}
                      className="d-flex justify-content-left"
                    >
                      User Reviews
                    </h5>

                    {this.state.customerReview.length > 0 ? (
                      <a
                        style={{ color: "gray", textDecoration: "none" }}
                        className="d-flex justify-content-right"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        View more
                      </a>
                    ) : null}
                    <div
                      className="modal fade"
                      id="staticBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="staticBackdropLabel"
                            >
                              User Reviews
                            </h5>
                            <a data-bs-dismiss="modal">Close</a>
                          </div>
                          <div className="modal-body modal-lg px-4">
                            {this.customerReviewSection()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="customer-reviews-block">
                    { this.state.customerReview.length > 0 ? this.customerReviewSection() : <div className="h-100 w-100 d-flex align-items-center justify-content-center"> No Reviews</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="invoice-details">hiii</div>
      </div>
    );
  }
}
export default withRouter(ViewCustomer);
