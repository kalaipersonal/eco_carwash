import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { getCompletedGarageAppointmentList } from '../../api/GET'

import './styles/GarageAppointmentList.scss'

let url, id;
class GarageAppointmentList extends Component {
  constructor(props) {
    super(props)
    url = this.props.match.url
    id = this.props.match.params.id
    this.state = {
      appointments: []
    }
    this.getCompletedGarageAppointmentData = this.getCompletedGarageAppointmentData.bind(this)
    this.loadGarageAppointment = this.loadGarageAppointment.bind(this)
  }

  componentDidMount() {
    this.getCompletedGarageAppointmentData(id);
  }

  getCompletedGarageAppointmentData(user_id) {
    getCompletedGarageAppointmentList(user_id).then(res => {
      console.log(res.data.Data);
      this.setState({ appointments: res.data.Data })
    }).catch(err => {
      console.log(err);
    })
  }

  loadGarageAppointment(rowData) {
    // console.log(rowData);
    this.props.history.push(`/garage/appointment/${rowData.data.id}`)
  }
  render() {
    return (
      <div className="completed-appointment-list-layout">
        <div className="completed-appointment-list-layout-header">
          <button className="btn-white-circle" onClick={() => this.props.history.goBack()}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="completed-appointment-list-layout-title ms-4">
            Completed Orders
          </div>
        </div>
        <div className="completed-appointment-list">
          <DataTable value={this.state.appointments?.results} scrollable scrollHeight="100%" onRowClick={this.loadGarageAppointment}>
            <Column field="store.name" header="Store Name"></Column>
            <Column field="appointment_type" header="Type of Booking"></Column>
            <Column field="date" header="Start Date"></Column>
            <Column field="date" header="End Date"></Column>
            <Column field="payment_status" header="Payment"></Column>
          </DataTable>
        </div>
      </div>
    )
  }
}
export default withRouter(GarageAppointmentList)