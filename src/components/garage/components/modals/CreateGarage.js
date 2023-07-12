import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Modal } from 'bootstrap';

import { createGarage } from '../../api/POST';

const validationSchema = yup.object().shape({
	name: yup.string().required("Name field is required!"),
	email: yup.string().required("Email field is required!"),
	mobile_no: yup.string().required("Mobile No field is required!"),
	description: yup.string().required("Description field is required!"),
});

class CreateGarage extends Component {

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
				className="modal"
				id="createProductModal"
				ref={this.modalRef}
				tabIndex="-1"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Product</h5>
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
									name: "",
									email: "",
									// profile_image: "",
									mobile_no: "",
									description: "",
								}}

								validationSchema={validationSchema}

								onSubmit={(values, onSubmitProps) => {

									console.log(values);
									let fd = new FormData(document.getElementById("garageForm"))
									createGarage(fd).then(
										res => {
											console.log(res);
											this.props.setGarageList();
											onSubmitProps.resetForm()
											this.hideModal();
										},
										err => {
											console.log(err);
										}
									)
								}}
							>
								<Form id="garageForm">
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
										<label className="label" htmlFor="email">
											Email
										</label>
										<Field
											id="email"
											name="email"
											type="email"
											className="form-control"
										/>
										<div className="text-danger">
											<ErrorMessage
												name="email"
											/>
										</div>
									</div>

									<div className="mb-3">
										<label className="label" htmlFor="mobile_no">
											Mobile No
										</label>
										<Field
											id="mobile_no"
											name="mobile_no"
											type="text"
											className="form-control"
										/>
										<div className="text-danger">
											<ErrorMessage
												name="mobile_no"
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
export default CreateGarage