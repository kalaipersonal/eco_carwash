import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Modal } from 'bootstrap';

import { updateLeaveConfig } from '../api/PATCH';
import { getSingleLeaveConfig } from '../api/GET';

const validationSchema = yup.object().shape({
	name: yup.string().required("Name field is required!"),
	description: yup.string().required("Description field is required!"),
	date: yup.string().required("Date field is required!")
});

class UpdateLeaveConfig extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			description: "",
			date: "",
		}
		this.modalRef = React.createRef()
	}

	componentDidMount() {
		getSingleLeaveConfig(this.props.editLeave).then(
			res => {
				let value = res.data.Data
				console.log(value);
				this.setState({
					name: value.name,
					description: value.description,
					date: value.date,
				})
			}
		).catch(
			err => {
				console.log(err);
			}
		)
	}

	showModal() {
		const modalEle = this.modalRef.current
		const bsModal = new Modal(modalEle, {
			backdrop: 'static',
			keyboard: false
		})
		bsModal.show()
	}

	hideModal() {
		const modalEle = this.modalRef.current
		const bsModal = Modal.getInstance(modalEle)
		bsModal.hide()
		this.props.editLeaveData("")
	}

	render() {
		return (
			<div
				className="modal fade"
				id="updateLeaveConfigModal"
				ref={this.modalRef}
				tabIndex="-1"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Edit Leave Config</h5>
							<button
								type="button"
								className="btn-close"
								onClick={() => this.hideModal()}
							></button>
						</div>
						<div className="modal-body mx-5">
							<Formik
								initialValues={{
									name: this.state.name,
									description: this.state.description,
									date: this.state.date,
								}}
								enableReinitialize={true}
								validationSchema={validationSchema}
								onSubmit={(values, onSubmitProps) => {

									console.log(values);
									let fd = new FormData(document.getElementById("updateLeaveForm"))
									updateLeaveConfig(this.props.editLeave,fd).then(
										res => {
											// console.log(res);
											this.props.getLeaveConfig();
											onSubmitProps.resetForm()
											this.hideModal();
										},
										err => {
											console.log(err);
										}
									)
								}}
							>
								<Form id="updateLeaveForm">
									<div className="mb-3">
										<label className="label" htmlFor="name">
											Name
										</label>
										<Field
											id="name"
											name="name"
											type="text"
											className="form-control"
										/>
										<div className="text-danger">
											<ErrorMessage
												name="name"
											/>
										</div>
									</div>

									<div className="mb-3">
										<label className="label" htmlFor="description">
											Description
										</label>
										<Field
											id="description"
											name="description"
											as="textarea"
											className="form-control"
										/>
										<div className="text-danger">
											<ErrorMessage
												name="description"
											/>
										</div>
									</div>

									<div className="mb-3">
										<label className="label" htmlFor="date">
											Date
										</label>
										<Field
											id="date"
											name="date"
											type="date"
											className="form-control"
										/>
										<div className="text-danger">
											<ErrorMessage
												name="date"
											/>
										</div>
									</div>
									<button className="btn-navy mx-auto m-5" type='submit'>Update</button>
								</Form>
							</Formik>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default UpdateLeaveConfig;