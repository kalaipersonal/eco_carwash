import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Modal } from 'bootstrap';

import { postService } from '../../api/POST';

const validationSchema = yup.object().shape({
	title: yup.string().required("Title field is required!"),
	price: yup.string().test(
		'',
		'This field must be a decimal',
		value => (value + "").match(/^[0-9]*\.*[0-9]+$/)
	  ).required("Price field is required!"),
	timetaken: yup.number().required("Time Taken field is required!")
});

class CreateService extends Component {
	constructor(props) {
		super(props);
		this.modalRef = React.createRef()
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
	}

	render() {
		return (
			<div
				className="modal fade"
				ref={this.modalRef}
				tabIndex="-1"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Service</h5>
							<button
								type="button"
								className="btn-close"
								onClick={() => this.hideModal()}
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body mx-5">
							<Formik
								initialValues={{
									title: "",
									price: "",
									timetaken: "",
									service_type: this.props.serviceType,
									service_nature: this.props.serviceNature,
									car_type: this.props.carType,
								}}

								validationSchema={validationSchema}
								enableReinitialize={true}
								onSubmit={(values, onSubmitProps) => {

									console.log(values);
									this.hideModal();
									let fd = new FormData(document.getElementById(`service${this.props.serviceNature}Form`))
									postService(fd).then(
										res => {
											// console.log(res);
											this.props.getServiceData(this.props.serviceNature);
											onSubmitProps.resetForm()
										},
										err => {
											console.log(err);
										}
									)
								}}
							>
								<Form id={`service${this.props.serviceNature}Form`}>
									<div className="mb-3">
										{/* {this.props.serviceType}
										{this.props.serviceNature}
										{this.props.carType} */}
										<label className="label" htmlFor="title">
											Title 
										</label>
										<Field
											id="title"
											name="title"
											type="text"
											className="form-control"
										/>
										<div className="text-danger">
											<ErrorMessage
												name="title"
											/>
										</div>
									</div>

									<div className="mb-3">
										<label className="label" htmlFor="price">
											Price
										</label>
										<Field
											id="price"
											name="price"
											type="text"
											className="form-control"
										/>
										<div className="text-danger">
											<ErrorMessage
												name="price"
											/>
										</div>
									</div>

									<div className="mb-3">
										<label className="label" htmlFor="timetaken">
											Time Taken
										</label>
										<Field
											id="timetaken"
											name="timetaken"
											type="text"
											className="form-control"
										/>
										<div className="text-danger">
											<ErrorMessage
												name="timetaken"
											/>
										</div>
									</div>
									<Field
										id="service_type"
										name="service_type"
										type="hidden"
										className="form-control"
									/>
									<Field
										id="service_nature"
										name="service_nature"
										type="hidden"
										className="form-control"
									/>
									<Field
										id="car_type"
										name="car_type"
										type="hidden"
										className="form-control"
									/>
									<button className="btn-navy mx-auto m-5" type='submit'>Create</button>
								</Form>
							</Formik>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default CreateService