import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { DateSchema } from "yup";
import { getOrderData } from "../../api/GET";
import Sliderafter from "../sliders/sliderafter/Sliderafter";
import Sliderbefore from "../sliders/sliderbefore/Sliderbefore";
import "./styles/ViewCustomerStyle.scss";

let url, id;
class OrderSummary extends Component {
  constructor(props) {
    super(props);
    url = this.props.match.path;
    id = this.props.match.params.id;
    this.state = {
      orderData: {},
      OrderServicesDatas: [],
      StandardData: [],
      exteriorStandard: [],
      PremiumData: [],
      exteriorPremium: [],
    };
  }

  componentDidMount() {
    getOrderData(id)
      .then((res) => {
        let datas = res.data.Data.services;
        let StandardData = [];
        let PremiumData = [];
        let exteriorStandard = [];
        let exteriorPremium = [];
        datas.map((datas) => {
          if (
            datas.service_nature === "Standard" &&
            datas.service_type === "Interior"
          ) {
            StandardData.push(datas);
          } else if (
            datas.service_nature === "Premium" &&
            datas.service_type === "Exterior"
          ) {
            PremiumData.push(datas);
          } else if (
            datas.service_nature === "Standard" &&
            datas.service_type === "Exterior"
          ) {
            exteriorStandard.push(datas);
          } else if (
            datas.service_nature === "Premium" &&
            datas.service_type === "Exterior"
          ) {
            exteriorPremium.push(datas);
          }
        });
        this.setState({
          StandardData: StandardData,
          PremiumData: PremiumData,
          exteriorStandard: exteriorStandard,
          exteriorPremium: exteriorPremium,
        });

        console.log("order data", res.data.Data);

        this.setState({ orderData: res.data.Data });
        this.setState({ OrderServicesDatas: res.data.Data.services });
      })
      .catch((err) => {
        console.log("error api", err);
      });
  }
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };

    console.log("received image", this.state.orderData?.store?.image);

    return (
      <div className="view-cutomer-section">
        <div className="customer-section-body">
          <div className="customer-profile-dashboard">
            <div className="card w-100 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <div
                  className="order_split mb-5"
                 
                >
                  <div className="left_back">
                  <button
                    className="btn-white-circle"
                    onClick={() => this.props.history.goBack()}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  </div>
                <div className="summary-right">
                <p className="mt-3 ms-3">Order Summary</p>
                </div>
                </div>
                <div className="row profile-picture ms-4 me-3 border">
                  {this.state.orderData ? (
                    <div>
                      <img src={this.state.orderData?.cleaner?.profile_image} />
                    </div>
                  ) : (
                    <div> {this.state.orderData?.customer?.username}</div>
                  )}
                </div>
                <h5 className="fw-normal row mt-3 username">
                  {this.state.orderData?.customer?.username}
                </h5>
                <div className="row">
                  <div className="d-flex flex-column align-items-center mb-3 mt-4">
                    <p
                      className="phoes"
                      style={{
                        color: "#979797",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Phone
                    </p>
                    <p> {this.state.orderData?.customer?.mobile_no}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex flex-column align-items-center mb-3">
                    <p
                      style={{
                        color: "#979797",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Email
                    </p>
                    <p> {this.state.orderData?.customer?.email}</p>
                  </div>
                </div>
                <div className="row pb-5">
                  <div className="d-flex flex-column align-items-center">
                    <p
                      style={{
                        color: "#979797",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Address
                    </p>
                    <p> {this.state.orderData?.address?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="view-customer-services">
            <div className="card  ">
              <div className="card-body">
                <div className="d-flex flex-column car-type-section">
                  <div className="car-type-details ">
                    <h4 className=" car_type">Car Type</h4>
                    <div className="d-flex flex-row mt-3">
                      <div className="col-3">
                        <p>Type</p>
                        <p>{this.state.orderData?.user_car?.car_type}</p>
                      </div>
                      <div className="col-3">
                        <p>Make</p>
                        <p>{this.state.orderData?.user_car?.car_make}</p>
                      </div>
                      <div className="col-3">
                        <p>Model</p>
                        <p>{this.state.orderData?.user_car?.car_model}</p>
                      </div>
                    </div>
                  </div>

                  <div className="car-type-service ">
                    <h5 className=" services">Service</h5>

                    {this.state.StandardData ? (
                      <div className="box">
                        <div className="split_interior">
                          <p classname="texts">Interior</p>
                          <p className="standard">Standard</p>
                        </div>
                        <div className="back_datas">
                          {this.state.StandardData ? (
                            <div>
                              {this.state.StandardData.map((data, index) => {
                                return (
                                  <div className="split_serices">
                                    <p className="datas_title">{data.title}</p>
                                    <p>/</p>
                                    <p>{data.price}</p>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div>no Data!!</div>
                          )}

                          {this.state.exteriorStandard ? (
                            <div>
                              {this.state.exteriorStandard.map(
                                (data, index) => {
                                  return (
                                    <div className="split_serices">
                                      <p className="datas_title">
                                        {data.title}
                                      </p>
                                      <p>/</p>
                                      <p>{data.price}</p>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            <div>thanks</div>
                          )}

                          {this.state.PremiumData ? (
                            <div>
                              {this.state.PremiumData.map((data, index) => {
                                return (
                                  <div className="split_serices">
                                    <p className="datas_title">{data.title}</p>
                                    <p>/</p>
                                    <p>{data.price}</p>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div>thanks</div>
                          )}

                          {this.state.exteriorPremium ? (
                            <div>
                              {this.state.exteriorPremium.map((data, index) => {
                                return (
                                  <div className="split_serices">
                                    <p className="datas_title">{data.title}</p>
                                    <p>/</p>
                                    <p>{data.price}</p>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div>thanks</div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>No Data!!</div>
                    )}
                  </div>

                  <div className="product_payment_pricing">
                    <div className="left_pricing">
                      <h4 className="payment_price ">Pricing & Payment</h4>
                      <span>
                        ${this.state.orderData.amount_paid}
                        <span className="debit_card ">- Debit Card</span>
                      </span>
                      <p className="mt-3">
                        <span
                          className="px-2 discounts"
                          style={{ color: " #979797" }}
                        >
                          Discount appllied
                        </span>
                        {this.state.orderData.applied_coupon?.discount_amount}
                      </p>
                    </div>
                    <div className="right_pricing">
                      <div className="digital_time">
                        <h3 className="time">8:20 AM</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="right_split_photos">
                  <div className="start">
                    <h1 className="photo_name">Photos</h1>
                    <div className="before">
                      <span className="after">Before</span>
                      <Sliderbefore />
                      <span className="after">After</span>
                      <Sliderafter />
                    </div>
                  </div>
                  <div className="middle">
                    <div className="reviews">
                      <h4 className="review">Review</h4>
                      <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-column">
                          <div className="split_profiles">
                            <div className="inside_split_profiles">
                              <div className="reviews-profile-picture me-2 border">
                                <img src={this.state.orderData?.store?.image} />
                              </div>
                              <p className="my-auto">Anitha Kumar</p>
                            </div>
                          </div>
                          <p className="description mt-2 text-center">
                            {this.state.orderData.applied_coupon?.description}
                          </p>
                        </div>
                        <div className="d-flex flex-column ratting">
                          <div className="stars">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="end">
                    <div className="product">
                      <div className="left_product">
                        <span className="products">Product</span>
                        <p className="cars_perfume">
                          Car perfume <span className="price_car">30$</span>
                        </p>
                      </div>
                      <div className="right_product">
                        <button className="btn_export">Export</button>
                      </div>
                    </div>
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

export default withRouter(OrderSummary);
