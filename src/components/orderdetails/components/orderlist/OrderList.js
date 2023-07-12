import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { getOrderDetails } from "../../api/GET";

import "./styles/OrderList.scss";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetail: [],
    };
    this.loadAppointment = this.loadAppointment.bind(this);
  }
  componentDidMount() {
    let data;
    try {
      data = "?" + window.location.href.split("?")[1];
      console.log(data);
    } catch {
      data = "";
    }
    getOrderDetails(data)
      .then((res) => {
        console.log(res.data.Data);
        this.setState({ orderDetail: res.data.Data });
      })
      .catch((err) => {
        console.log(err.res);
      });
  }
  nameTemplate(rowData) {
    return (
      <React.Fragment>
        <img
          alt={rowData.name}
          src={
            rowData.profile_image
              ? rowData.profile_image
              : `https://avatars.dicebear.com/api/initials/${rowData.name}.svg`
          }
          onError={(e) =>
            (e.target.src =
              "https://avatars.dicebear.com/api/initials/random.svg")
          }
          width={50}
          style={{ verticalAlign: "middle" }}
          className="border rounded-circle me-3"
        />
        <span>{rowData.customer.name}</span>
      </React.Fragment>
    );
  }
  loadAppointment(rowData) {
    this.props.history.push(`/orderdetails/${rowData.data.id}`);
  }
  render() {
    return (
      <div className="orderlist-layout">
        <div className="orderlist-layout-header">
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
            <span>
              <h3> Completed orders</h3>
            </span>
          </div>
        </div>
        <div className="orderlist-layout-body">
          <DataTable
            value={this.state.orderDetail.results}
            scrollable
            scrollHeight="100%"
            onRowClick={this.loadAppointment}
          >
            <Column
              field="customer.name"
              header="Customer name"
              body={this.nameTemplate}
            ></Column>
            <Column field="customer.mobile_no" header="Phone no"></Column>
            <Column field="customer.email" header="Email"></Column>
            <Column field="appointment_nature" header="Booking Type"></Column>
            <Column field="amount_paid" header="Price "></Column>
          </DataTable>
        </div>
      </div>
    );
  }
}
export default withRouter(OrderList);
