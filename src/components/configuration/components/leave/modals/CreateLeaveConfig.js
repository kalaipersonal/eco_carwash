import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Modal } from 'bootstrap';

import { createLeaveConfig } from '../api/POST';

const validationSchema = yup.object().shape({
	name: yup.string().required("Name field is required!"),
	description: yup.string().required("Description field is required!"),
	date: yup.date().required("Date field is required!")
});

class CreateLeaveConfig extends Component {

	constructor(props){
		super(props);
		this.modalRef = React.createRef()
	}

	showModal(){
		const modalEle = this.modalRef.current
		const bsModal = new Modal(modalEle, {
			backdrop: 'static',
			keyboard: false
		})
		bsModal.show()
	}

	hideModal(){
		const modalEle = this.modalRef.current
		const bsModal = Modal.getInstance(modalEle)
		bsModal.hide()
	}

	render(){
		return (
			<div
				className="modal"
				ref={this.modalRef}
				tabIndex="-1"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Leave Config</h5>
							<button
								type="button"
								className="btn-close"
								onClick={()=>this.hideModal()}
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body mx-5">
							<Formik
								initialValues={{
									name: "",
									description: "",
									date: "",
								}}
								validationSchema={validationSchema}
								onSubmit={(values, onSubmitProps) => {
	
									console.log(values);
									let fd = new FormData(document.getElementById("createLeaveForm"))
									createLeaveConfig(fd).then(
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
								<Form id="createLeaveForm">
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
export default CreateLeaveConfig