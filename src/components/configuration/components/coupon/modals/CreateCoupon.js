import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Modal } from 'bootstrap';

import { createCouponData } from '../api/POST';
import { getUsersForCoupon } from '../api/GET';

const validationSchema = yup.object().shape({
	code: yup.string().required("Name field is required!"),
	description: yup.string().required("Description field is required!"),
	discount_type: yup.string().required("Discount Type field is required!"),
	discount_amount: yup.string().required("Discount Amount field is required!"),
	categories: yup.string().required("Categories field is required!")
});

class CreateCoupon extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showSide: false,
			couponUsers: [],
			name: "",
			mobile_no: "",
			carType: "",
			carModel: "",
			carMake: "",
		}
		this.modalRef = React.createRef()
		this.getCouponUsers = this.getCouponUsers.bind(this)
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.couponType === 'Specific' && this.state.couponUsers.length === 0) {
			this.getCouponUsers()
		}
	}

	getCouponUsers() {
		getUsersForCoupon().then(
			res => {
				console.log(res.data.Data);
				this.setState({ couponUsers: res.data.Data })
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
	}

	render() {
		return (
			<div
				className="modal"
				id="createLeaveConfigModal"
				ref={this.modalRef}
				tabIndex="-1"
			>
				<div className={`modal-dialog ${this.state.showSide ? 'modal-xl' : null}`}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Coupons</h5>
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
									code: "",
									description: "",
									discount_type: "",
									discount_amount: "",
									categories: "",
									coupon_type: this.props.couponType,
								}}
								enableReinitialize={true}
								validationSchema={validationSchema}
								onSubmit={(values, onSubmitProps) => {
									console.log(values);
									let fd = new FormData(document.getElementById("createCoupon"))
									createCouponData(fd).then(
										res => {
											console.log(res);
											this.props.getCouponData();
											onSubmitProps.resetForm()
											this.hideModal();
										},
										err => {
											console.log(err);
										}
									)
								}}
							>
								<Form id="createCoupon">
									<div className={this.state.showSide ? 'row' : null}>
										<div className={this.state.showSide ? 'col-7 border-end' : null}>
											<div className="mb-3">
												<label className="label" htmlFor="code">
													Coupon Code
												</label>
												<Field
													id="code"
													name="code"
													type="text"
													className="form-control"
												/>
												<div className="text-danger">
													<ErrorMessage
														name="code"
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
												<label className="label" htmlFor="categories">
													Categories
												</label>
												<Field
													id="categories"
													name="categories"
													type="text"
													className="form-control"
												/>
												<div className="text-danger">
													<ErrorMessage
														name="categories"
													/>
												</div>
											</div>

											<div className="row mb-3">
												<div className="col-5">
													<label className="label" htmlFor="discount_type">
														Discount Type
													</label>
													<Field
														name="discount_type"
														id="discount_type"
														as="select"
														className="form-select"
													>
														<option value="" label="Select Type" />
														<option value="Percentage" label="Percentage" />
														<option value="Amount" label="Amount" />
													</Field>
													<div className="text-danger">
														<ErrorMessage
															name="discount_type"
														/>
													</div>
												</div>
												<div className="col-7">
													<label className="label" htmlFor="discount_amount">
														Discount Amount
													</label>
													<Field
														id="discount_amount"
														name="discount_amount"
														type="text"
														className="form-control"
													/>
													<div className="text-danger">
														<ErrorMessage
															name="discount_amount"
														/>
													</div>
												</div>
											</div>
											<Field
												id="coupon_type"
												name="coupon_type"
												type="hidden"
												className="form-control"
											/>
										</div>
										{
											this.state.showSide ?
												<div className="col-5">
													<div className="mb-3">
														<label className="label" htmlFor="user">
															Email
														</label>
														<Field
															name="user"
															id="user"
															as="select"
															className="form-select"
															onChange={(e) => {
																this.state.couponUsers.forEach(user => {
																	if (user.uuid === e.target.value) {
																		this.setState({
																			name: user.name,
																			mobile_no: user.mobile_no,
																			carType: user.car_type,
																			carModel: user.car_model,
																			carMake: user.car_make,
																		});
																	}
																})

															}}
														>
															<option value="" label="Select User" />
															{
																this.state.couponUsers.length !== 0 ?
																	this.state.couponUsers.map((user, index) => {
																		return (
																			<option key={index} value={user.uuid} label={user.email} />
																		)
																	})
																	:
																	null
															}
														</Field>
														<div className="text-danger">
															<ErrorMessage
																name="user"
															/>
														</div>
													</div>
													<div className="mb-3">
														<label className="label" htmlFor="name">
															Name
														</label>
														<Field
															id="name"
															name="name"
															type="text"
															value={this.state.name}
															className="form-control"
															readOnly={true}
														/>
														<div className="text-danger">
															<ErrorMessage
																name="name"
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
															value={this.state.mobile_no}
															className="form-control"
															readOnly={true}
														/>
														<div className="text-danger">
															<ErrorMessage
																name="mobile_no"
															/>
														</div>
													</div>
													<div className="mb-3 row">
														<div className="col-4">
															<label className="label" htmlFor="car_type">
																Car Type
															</label>
															<Field
																id="car_type"
																name="car_type"
																type="text"
																value={this.state.carType}
																className="form-control"
																readOnly={true}
															/>
														</div>
														<div className="col-4">
															<label className="label" htmlFor="carMake">
																Car Make
															</label>
															<Field
																id="carMake"
																name="carMake"
																type="text"
																value={this.state.carMake}
																className="form-control"
																readOnly={true}
															/>
														</div>
														<div className="col-4">
															<label className="label" htmlFor="carModel">
																Car Type
															</label>
															<Field
																id="carModel"
																name="carModel"
																type="text"
																value={this.state.carModel}
																className="form-control"
																readOnly={true}
															/>
														</div>
													</div>
												</div>
												:
												null
										}
										{
											this.props.couponType === 'Specific' && !this.state.showSide ?
												<div
													className="btn-navy mx-auto m-5"
													onClick={() => {
														// if ( this.state.couponUsers.length === 0 ){
														// this.getCouponUsers()
														// }
														this.setState({ showSide: true })
													}}
												>
													Add User
												</div>
												:
												<button
													className="btn-navy my-5 mx-auto"
													type='submit'
													{
													...(this.props.couponType === 'Specific' && this.state.showSide ?
														{ style: { width: '50%' } }
														: null)
													}
												>
													Create
												</button>
										}
									</div>
								</Form>
							</Formik>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default CreateCoupon