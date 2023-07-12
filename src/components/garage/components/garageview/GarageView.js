import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { getGarageData, getGarageAppointmentList } from "../../api/GET";

import "./styles/GarageView.scss";

let url, id;
class GarageView extends Component {
  constructor(props) {
    super(props);
    url = this.props.match.url;
    id = this.props.match.params.id;
    this.state = {
      garageUser: {},
      appointments: [],
    };
    this.getGarageUserData = this.getGarageUserData.bind(this);
    this.getGarageAppointmentData = this.getGarageAppointmentData.bind(this);
    this.loadGarageAppointment = this.loadGarageAppointment.bind(this);
  }

  componentDidMount() {
    this.getGarageUserData(id);
    this.getGarageAppointmentData(id);
  }

  getGarageUserData(user_id) {
    getGarageData(user_id)
      .then((res) => {
        console.log(res.data.Data);
        this.setState({ garageUser: res.data.Data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getGarageAppointmentData(user_id) {
    getGarageAppointmentList(user_id)
      .then((res) => {
        // console.log(res.data.Data);
        this.setState({ appointments: res.data.Data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadGarageAppointment(rowData) {
    // console.log(rowData);
    this.props.history.push(`/garage/appointment/${rowData.data.id}`);
  }

  render() {
    return (
      <div className="garage-view-layout">
        <div className="garage-user-details">
          <div className="garage-user-card">
            <NavLink to="/garage" className="btn-white-circle mt-2 ms-2">
              <i className="fas fa-chevron-left"></i>
            </NavLink>
            <div className="garage-user-image">
              <div className="garage-profile-image">
                <img
                  src="https://picsum.photos/200"
                  alt="garage-profile-image"
                />
              </div>
              <h4 className="mt-3 fw-bold">Ware House</h4>
              {/* <span className="name mt-3">{this.state.garageUser?.name}</span>
							<span className="address">{this.state.garageUser?.address?.address}</span> */}
            </div>
            <div className="garage-user-data">
              <div className="user-data">
                <span className="title">Phone</span>
                <span className="data">{this.state.garageUser?.mobile_no}</span>
              </div>
              <div className="user-data">
                <span className="title">Email</span>
                <span className="data">{this.state.garageUser?.email}</span>
              </div>
              <div className="user-data">
                <span className="title">Description</span>
                <span className="data">
                  {this.state.garageUser?.description}
                </span>
              </div>
            </div>
          </div>
          <div className="garage-user-navigation">
            <NavLink
              to={`/garage/service/${id}`}
              className="garage-user-navigation-card"
            >
              <span
                className="bg-secondary rounded"
                style={{
                  width: "50px",
                  height: "85%",
                }}
              ></span>
              <span className="mx-auto">Service Config</span>
              <span>
                <i className="fas fa-chevron-right"></i>
              </span>
            </NavLink>
            <NavLink
              to={`/garage/appointments/${id}`}
              className="garage-user-navigation-card"
            >
              <span
                className="bg-secondary rounded"
                style={{
                  width: "50px",
                  height: "85%",
                }}
              ></span>
              <span className="mx-auto">Complete Order</span>
              <span>
                <i className="fas fa-chevron-right"></i>
              </span>
            </NavLink>
          </div>
        </div>
        <div className="garage-appointment-table">
          <DataTable
            value={this.state.appointments?.results}
            scrollable
            scrollHeight="100%"
            onRowClick={this.loadGarageAppointment}
          >
            <Column field="store.name" header="Store Name"></Column>
            <Column field="appointment_type" header="Type of Booking"></Column>
            <Column field="date" header="Start Date"></Column>
            <Column field="date" header="End Date"></Column>
            <Column field="appointment_status" header="Status"></Column>
            <Column field="invoice_status" header="Invoice"></Column>
          </DataTable>
        </div>
      </div>
    );
  }
}
export default withRouter(GarageView);
