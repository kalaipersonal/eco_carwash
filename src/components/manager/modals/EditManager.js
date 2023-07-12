import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Modal } from 'bootstrap';
import { Toast } from "primereact/toast";

import { getManagerData } from '../api/GET';
import { patchManagerData } from '../api/PATCH';

const validationSchema = yup.object().shape({
	name: yup.string().required("Name field is required!"),
	email: yup.string().required("Email field is required!"),
	mobile_no: yup.string().required("Mobile No Type field is required!"),
	date_joined: yup.date().required("Date Joined field is required!"),
});

let logo;
class EditManager extends Component {

	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			name: "",
			email: "",
			mobile_no: "",
			date_joined: "",
			profile: "https://avatars.dicebear.com/api/initials/random.svg"
		}
		this.modalRef = React.createRef()
		this.showError = this.showError.bind(this);
		this.changeImage = this.changeImage.bind(this);
	}

	componentDidMount() {
		getManagerData(this.props.editedID).then(res => {
			console.log(res.data.Data);
			let date = new Date(res.data.Data.date_joined)
			this.setState({
				name: res.data.Data.name,
				email: res.data.Data.email,
				mobile_no: res.data.Data.mobile_no,
				date_joined: `${date.getFullYear()}-${date.getMonth() + 1 >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
					}-${date.getDate()}`,
				profile: res.data.Data.profile_image
			})
		}).catch(err => console.log(err))
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
		this.props.resetEdit()
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
		let file = document.getElementById('edit_profile_image').files[0];
		logo = document.getElementById('edit_profile_image').files[0];

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
				id="createLeaveConfigModal"
				ref={this.modalRef}
				tabIndex="-1"
			>
				<Toast ref={(el) => (this.toast = el)} />
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Edit Coupons</h5>
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
									name: this.state.name,
									email: this.state.email,
									mobile_no: this.state.mobile_no,
									date_joined: this.state.date_joined,
								}}
								enableReinitialize={true}
								validationSchema={validationSchema}
								onSubmit={(values, onSubmitProps) => {
									console.log(values);
									let fd = new FormData(
										document.getElementById("editManagerForm")
									);
									patchManagerData(this.props.editedID, fd).then(
										res => {
											console.log(res);
											onSubmitProps.resetForm();
											this.setState({ profile: "https://avatars.dicebear.com/api/initials/random.svg" })
											this.props.getManagerList(true);
											this.hideModal();
										},
										err => {
											console.log(err);
										}
									)
								}}
							>
								<Form id="editManagerForm">
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

									<div className="row">
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
													<label className="label" htmlFor="edit_profile_image">
														Profile Image
													</label>
													<Field
														id="edit_profile_image"
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

									<button type="submit" className="btn-navy ms-auto m-3 w-25">
										Update Manager
									</button>
								</Form>
							</Formik>
						</div>
					</div>
				</div>
			</div >
		)
	}
}
export default EditManager