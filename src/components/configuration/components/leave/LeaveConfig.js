import React, { Component, createRef } from 'react'
import { withRouter } from 'react-router-dom'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";

import { getLeaveConfigs, getLeaveCount } from './api/GET'
import { createLeaveCount } from './api/POST'
import { updateLeaveStatus, updateLeaveCount } from './api/PATCH'
import { DeleteLeaveConfig } from './api/DELETE'

import CreateLeaveConfig from './modals/CreateLeaveConfig'
import UpdateLeaveConfig from './modals/UpdateLeaveConfig'

import './styles/LeaveConfig.scss'

class LeaveConfig extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leaveConfigs: [],
			editLeave: "",
			managerLeaveCount: "",
			cleanerLeaveCount: "",
			managerLeaveID: "",
			cleanerLeaveID: "",
		};
		this.getLeaveConfig = this.getLeaveConfig.bind(this);
		this.actionTemplate = this.actionTemplate.bind(this);
		this.statusTemplate = this.statusTemplate.bind(this);
		this.getLeaveCountData = this.getLeaveCountData.bind(this);
		this.editLeaveData = this.editLeaveData.bind(this);
		this.createChild = createRef()
		this.updateChild = createRef()
	}
	componentDidMount() {
		this.props.toggleMenu()
		this.getLeaveConfig()
		this.getLeaveCountData()
	}
	componentWillUnmount() {
		this.props.toggleMenu()
	}
	getLeaveConfig() {
		getLeaveConfigs().then((res) => {
			// console.log(res.data.Data);
			this.setState({ editLeave: "" })
			this.setState({ leaveConfigs: res.data.Data });
		}).catch((err) => {
			console.log(err);
		});
	}

	getLeaveCountData() {
		getLeaveCount().then(
			res => {
				console.log(res.data.Data);
				res.data.Data.forEach(data => {
					if (data.user_type === 2) {
						this.setState({
							managerLeaveCount: data.leave_count,
							managerLeaveID: data.id
						});
					}
					if (data.user_type === 3) {
						this.setState({
							cleanerLeaveCount: data.leave_count,
							cleanerLeaveID: data.id
						});
					}
				})
			}
		).catch(
			err => console.log(err)
		)
	}

	changeStatus(i) {
		let leaveConfigs = this.state.leaveConfigs;
		if (leaveConfigs[i].status === "active") {
			leaveConfigs[i].status = "inactive";
		} else if (leaveConfigs[i].status === "inactive") {
			leaveConfigs[i].status = "active";
		}
		updateLeaveStatus(leaveConfigs[i].id, { status: leaveConfigs[i].status }).then(
			res => {
				this.setState({ leaveConfigs: leaveConfigs })
			},
			err => console.log(err)
		)
	}

	statusTemplate(rowData) {
		// console.log(rowData);
		let i = this.state.leaveConfigs.indexOf(rowData);
		return (
			<React.Fragment>
				<div className="d-flex flex-row justify-content-center">
					<label className="customised-switch">
						<input
							type="checkbox"
							checked={rowData.status === "active" ? true : false}
							onChange={() => this.changeStatus(i)}
						/>
						<span className="customised-slider customised-round"></span>
					</label>
				</div>
			</React.Fragment>
		)
	}

	actionTemplate(rowData) {
		return (
			<React.Fragment>
				<div className="d-flex flex-row align-items-center justify-content-center">
					<i style={{ fontSize: "15px" }} className="fas fa-pen me-3" onClick={() => this.editLeaveData(rowData.id)}></i>
					<i style={{ fontSize: "15px" }} className="fas fa-trash" onClick={() => this.deleteLeaveData(rowData.id)}></i>
				</div>
			</React.Fragment>
		);
	}

	editLeaveData(id) {
		this.setState({ editLeave: id })
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.editLeave !== "") {
			this.updateChild.current.showModal()
		}
	}

	deleteLeaveData(id) {
		if (window.confirm('Do you want to delete this leave config')) {
			DeleteLeaveConfig(id).then(
				res => {
					this.getLeaveConfig()
				}
			).catch(
				err => console.log(err)
			)
		}
	}

	render() {
		return (
			<div className="leaves-layout">
				<div className="leaves-title">
					Leave Configurations
				</div>
				<div className="leaves-add">
					<div className="leave-count">
						<div className="leave-count-title">
							Leave <br /> Count
						</div>
						<div className="leave-count-form ms-5">
							<Formik
								initialValues={{
									manager_count: this.state.managerLeaveCount,
									cleaner_count: this.state.cleanerLeaveCount,
								}}
								enableReinitialize={true}
								// validationSchema={validationSchema}
								onSubmit={(values, onSubmitProps) => {

									// console.log(values);

									if (this.state.managerLeaveID !== "") {
										let data = {
											leave_count: values.manager_count
										}
										updateLeaveCount(this.state.managerLeaveID, data).then(
											res => {
												this.setState({ managerLeaveCount: values.manager_count })
											}
										).catch(err => console.log(err))
									} else {
										let data = {
											user_type: 2,
											leave_count: values.manager_count
										}
										createLeaveCount(data).then(
											res => {
												this.setState({ managerLeaveCount: values.manager_count })
											}
										).catch(err => console.log(err))
									}

									if (this.state.cleanerLeaveID !== "") {
										let data = {
											leave_count: values.cleaner_count
										}
										updateLeaveCount(this.state.cleanerLeaveID, data).then(
											res => {
												this.setState({ cleanerLeaveCount: values.cleaner_count })
											}
										).catch(err => console.log(err))
									} else {
										let data = {
											user_type: 3,
											leave_count: values.cleaner_count
										}
										createLeaveCount(data).then(
											res => {
												this.setState({ cleanerLeaveCount: values.cleaner_count })
											}
										).catch(err => console.log(err))
									}
								}}
							>
								<Form id="createLeaveCountForm">
									<div className="row">
										<div className="col-4 mb-3">
											<label className="label" htmlFor="manager_count">
												Manager Leave Count
											</label>
											<Field
												id="manager_count"
												name="manager_count"
												type="text"
												className="form-control"
											/>
											<div className="text-danger">
												<ErrorMessage
													name="manager_count"
												/>
											</div>
										</div>

										<div className="col-4 mb-3">
											<label className="label" htmlFor="cleaner_count">
												Stylist Leave Count
											</label>
											<Field
												id="cleaner_count"
												name="cleaner_count"
												type="text"
												className="form-control"
											/>
											<div className="text-danger">
												<ErrorMessage
													name="cleaner_count"
												/>
											</div>
										</div>
										<div className="col-3">
										{
											this.state.managerLeaveCount === "" && this.state.cleanerLeaveCount === "" ?
												<button className="btn-navy mt-3" type='submit'>Create</button>
												:
												<button className="btn-navy mt-3" type='submit'>Update</button>
										}
										</div>

									</div>
								</Form>
							</Formik>
						</div>
					</div>
					<button
						className="btn-white"
						style={{ maxWidth: '5rem' }}
						onClick={() => {
							this.createChild.current.showModal()
						}}
					>
						+ Add
					</button>
				</div>

				<div className="leaves-list">
					<DataTable value={this.state.leaveConfigs} scrollable scrollHeight="100%">
						<Column field="name" header="Name"></Column>
						<Column field="description" header="Description"></Column>
						<Column field="date" header="Date"></Column>
						<Column field="id" header="Status" body={this.statusTemplate}></Column>
						<Column field="id" header="Action" body={this.actionTemplate}></Column>
					</DataTable>
				</div>
				<CreateLeaveConfig getLeaveConfig={this.getLeaveConfig} ref={this.createChild} />
				{
					(this.state.editLeave !== '') ?
						<UpdateLeaveConfig
							getLeaveConfig={this.getLeaveConfig}
							editLeave={this.state.editLeave}
							ref={this.updateChild}
							editLeaveData={this.editLeaveData}
						/>
						: null
				}

			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		menu: state.menu
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleMenu: () => {
			dispatch({ type: "NAV_MENU" });
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LeaveConfig));
// export default withRouter(LeaveConfig)