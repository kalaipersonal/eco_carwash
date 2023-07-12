import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Modal } from 'bootstrap';
import { Toast } from "primereact/toast";
import axios from 'axios';

const validationSchema = yup.object().shape({
	name: yup.string().required("Name field is required!"),
	email: yup.string().required("Email field is required!"),
	mobile_no: yup.string().required("Mobile No Type field is required!"),
	date_joined: yup.date().required("Date Joined field is required!"),
});

let logo;
class CreateManager extends Component {

	constructor(props) {
		super(props);
		this.state = {
			profile: "https://avatars.dicebear.com/api/initials/random.svg"
		}
		this.modalRef = React.createRef()
		this.showError = this.showError.bind(this);
		this.changeImage = this.changeImage.bind(this);
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
		this.setState({ profile: "https://avatars.dicebear.com/api/initials/random.svg" })
	}

	showError(errTitle, errMsg) {
		this.toast.show({
			severity: "error",
			summary: errTitle,
			detail: errMsg,
			life: 3000,
		});
	}

	changeImage() {
		let file = document.getElementById('profile_image').files[0];
		logo = document.getElementById('profile_image').files[0];

		if (file.size < 2097152) {
			if (file) {
				var reader = new FileReader();
				reader.onload = () => {
					this.setState({ profile: reader.result })
				}
				reader.readAsDataURL(file);
			}
		} else {
			console.log('Too Big');
		}
	}

	render() {
		return (
			<div
				className="modal fade"
				ref={this.modalRef}
				tabIndex="-1"
			>
				<Toast ref={(el) => (this.toast = el)} />
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Managers</h5>
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
									mobile_no: "",
									date_joined: "",
									document: "",
								}}
								validationSchema={validationSchema}
								onSubmit={(values, onSubmitProps) => {
									console.log(values);
									let fd = new FormData(document.getElementById("managerForm"))
									axios.post("admin/manage_staff/", fd).then(
										(res) => {
											console.log(res.data);
											this.props.getManagerList(true);
											onSubmitProps.resetForm()
											this.setState({ profile: "https://avatars.dicebear.com/api/initials/random.svg" })
											this.hideModal()
										}
									).catch((error) => {
										if (error.response) {
											console.log(error.response.data);

										// 	if (
										// 		error.response.data.ValidationErrors.hasOwnProperty(
										// 			"email"
										// 		)
										// 	) {
										// 		this.showError(
										// 			"Email",
										// 			error.response.data.ValidationErrors.email[0]
										// 		);
										// 	}
										// 	if (
										// 		error.response.data.ValidationErrors.hasOwnProperty(
										// 			"mobile_no"
										// 		)
										// 	) {
										// 		this.showError(
										// 			"Mobile Number",
										// 			error.response.data.ValidationErrors.mobile_no[0]
										// 		);
										// 	}
										}
									});
								}}
							>
								<Form id="managerForm">
									<div className="row">
										<div className="col-6 mb-3">
											<label className="label" htmlFor="name">
												Name
											</label>
											<Field
												id="name"
												name="name"
												type="text"
												className="form-control"
												onBlur={
													(e) =>
														e.target.value != "" ?
															this.setState(
																{ profile: `https://avatars.dicebear.com/api/initials/${e.target.value}.svg` }
															)
															: false
												}
											/>
											<div className="text-danger">
												<ErrorMessage
													name="name"
												/>
											</div>
										</div>

										<div className="col-6 mb-3">
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
									</div>

									<div className="row">
										<div className="col-6 mb-3">
											<label className="label" htmlFor="mobile_no">
												Phone Number
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

										<div className="col-6 mb-3">
											<label className="label" htmlFor="date_joined">
												Date Joined
											</label>
											<Field
												id="date_joined"
												name="date_joined"
												type="date"
												className="form-control"
											/>
											<div className="text-danger">
												<ErrorMessage
													name="date_joined"
												/>
											</div>
										</div>
									</div>

									<div className="row mt-3">
										{/* <div className="col-6 mb-3">
											<label className="label" htmlFor="document">
												Document
											</label>
											<Field
												id="document"
												name="document"
												type="file"
												className="form-control"
											/>
											<ErrorMessage name="document">
												{(msg) => <div>{msg}</div>}
											</ErrorMessage>
										</div> */}
										<div className="col-12 mb-3">
											<div className="row">
												<div className="col-3">
													<div className="profile-picture border">
														<img src={this.state.profile} alt="" />
													</div>
												</div>
												<div className="col-9 d-flex flex-column justify-content-center">
													<label className="label" htmlFor="profile_image">
														Profile Image
													</label>
													<Field
														id="profile_image"
														name="profile_image"
														type="file"
														className="form-control"
														onChange={(e) => {
															this.changeImage()
														}}
													/>
												</div>
											</div>
										</div>
									</div>

									<Field
										id="user_type"
										name="user_type"
										value="2"
										type="hidden"
										className="form-control"
									/>

									<button
										className="btn-navy ms-auto m-3 w-25"
										type="submit"
									>Create</button>
								</Form>
							</Formik>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default CreateManager