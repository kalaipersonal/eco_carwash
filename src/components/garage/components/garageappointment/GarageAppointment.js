import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { getGarageAppointmentServicesList, getGarageAppointmentData } from '../../api/GET'
import EditGarageServices from './modals/EditGarageServices'

import './styles/GarageAppoinment.scss'

let url, appointment_id;
class GarageAppointment extends Component {
	constructor(props) {
		super(props)
		url = this.props.match.url
		appointment_id = this.props.match.params.id
		this.state = {
			appointmentDetails: {},
			appointmentServices: [],
			editedNumber: '',
			editedTime: ''
		}
		this.getAppointmentDetails = this.getAppointmentDetails.bind(this)
		this.getAppointmentServices = this.getAppointmentServices.bind(this)
		this.editServiceCollection = this.editServiceCollection.bind(this)
		this.actionTemplate = this.actionTemplate.bind(this)
		this.editServiceChild = React.createRef()
	}

	componentDidMount() {
		this.getAppointmentDetails(appointment_id)
		this.getAppointmentServices(appointment_id)
	}

	getAppointmentDetails(id) {
		getGarageAppointmentData(id).then(res => {
			console.log(res.data.Data);
			this.setState({ appointmentDetails: res.data.Data })
		}).catch(err => {
			console.log(err);
		})
	}

	getAppointmentServices(id) {
		getGarageAppointmentServicesList(id).then(res => {
			// console.log(res.data.Data);
			this.setState({
				appointmentServices: res.data.Data,
				editedNumber: '',
				editedTime: ''
			})
		}).catch(err => {
			console.log(err);
		})
	}

	editServiceCollection(number, time) {
		this.setState({ editedNumber: number, editedTime: time })
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.editedNumber !== "" && this.state.editedTime !== "") {
			this.editServiceChild.current.showModal()
		}
	}

	actionTemplate(rowData) {
		return (
			<React.Fragment>
				<div className="d-flex flex-row align-items-center justify-content-center">
					{
						this.state.appointmentDetails?.appointment_status !== "Completed" ?
							<i
								style={{ fontSize: "15px" }}
								className="fas fa-pen me-3"
								onClick={() => this.editServiceCollection(rowData.car_number, rowData.start_time)}
							></i>
							:
							<i
								style={{ fontSize: "15px" }}
								className="fas fa-eye me-3"
								onClick={() => this.editServiceCollection(rowData.car_number, rowData.start_time)}
							></i>
					}

				</div>
			</React.Fragment>
		);
	}

	render() {
		return (
			<div className='garage-appointment-details-layout'>
				<div className="garage-appointment-details">
					<div className="garage-appointment-details-header">
						<button
							className="btn-white-circle mt-2 ms-2"
							onClick={() => this.props.history.goBack()}
						>
							<i className="fas fa-chevron-left"></i>
						</button>
						<span className="title ms-4">Summary</span>
					</div>
					<div className="garage-appointment-details-body">
						<div className="profile">
							<img src="https://picsum.photos/200" alt="" />
						</div>

						<div className="name">{this.state.appointmentDetails?.user?.name}</div>

						<div className="user-data">
							<div className="title">
								Phone
							</div>
							<div className="data">
								{this.state.appointmentDetails?.user?.mobile_no}
							</div>
						</div>

						<div className="user-data">
							<div className="title">
								Email
							</div>
							<div className="data">
								{this.state.appointmentDetails?.user?.email}
							</div>
						</div>

						<div className="user-data">
							<div className="title">
								Address
							</div>
							<div className="data">
								{this.state.appointmentDetails?.address?.address}
							</div>
						</div>
					</div>
					<div className="garage-appointment-details-cleaner">
						{
							(
								Object.keys(this.state.appointmentDetails).length > 0 &&
								this.state.appointmentDetails.hasOwnProperty('cleaners') &&
								this.state.appointmentDetails.cleaners.length > 0
							) ?
								this.state.appointmentDetails?.cleaners.map((cleaner, index) => {
									return (
										<div className="cleaner-card" key={index}>
											<div className="profile">
												<img src="https://picsum.photos/100" alt="" />
											</div>
											<div className="data">
												<div className="title">Name</div>
												<div className="name">{cleaner.name}</div>
											</div>
										</div>
									)
								})
								:
								<div>
									No cleaners
								</div>
						}
					</div>
				</div>
				<div className="garage-appointment-list-outer">
					<div className="garage-appointment-list-outer-header">
						<span className='fw-3 fs-3'>Booking Type</span>
						<span className="ms-5 fs-4">{this.state.appointmentDetails?.appointment_type}</span>
					</div>
					<div className="garage-appointment-list">
						<DataTable value={this.state.appointmentServices?.results} scrollable scrollHeight="100%">
							<Column field="car_number" header="Car Number"></Column>
							<Column field="car_type" header="Car Type"></Column>
							<Column field="start_time" header="Start Time"></Column>
							<Column field="end_time" header="End Time"></Column>
							<Column field="no_of_services" header="No of Services"></Column>
							<Column field="id" header="Action" body={this.actionTemplate}></Column>
						</DataTable>
					</div>
				</div>
				{
					this.state.editedNumber !== "" && this.state.editedTime !== "" ?
						<EditGarageServices
							ref={this.editServiceChild}
							appointment_id={appointment_id}
							editedNumber={this.state.editedNumber}
							editedTime={this.state.editedTime}
							appointmentData={this.state.appointmentDetails}
							getAppointmentServices={this.getAppointmentServices}
						/>
						: null
				}
			</div>
		)
	}
}
export default withRouter(GarageAppointment)