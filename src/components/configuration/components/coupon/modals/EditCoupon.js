import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Modal } from 'bootstrap';

import { getCouponData } from '../api/GET';
import { updateCouponData } from '../api/PATCH';

const validationSchema = yup.object().shape({
	code: yup.string().required("Name field is required!"),
	description: yup.string().required("Description field is required!"),
	discount_type: yup.string().required("Discount Type field is required!"),
	discount_amount: yup.string().required("Discount Amount field is required!"),
	categories: yup.string().required("Categories field is required!")
});

class EditCoupon extends Component {

	constructor(props) {
		super(props);
		this.state = {
			code: "",
			description: "",
			discount_type: "",
			discount_amount: "",
			categories: "",
		}
		this.modalRef = React.createRef()
	}

	componentDidMount() {
		getCouponData(this.props.editCoupon).then(res => {
			console.log(res.data.Data);
			this.setState({
				code: res.data.Data.code,
				description: res.data.Data.description,
				discount_type: res.data.Data.discount_type,
				discount_amount: res.data.Data.discount_amount,
				categories: res.data.Data.categories
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
		this.props.editCouponData("")
	}

	render() {
		return (
			<div
				className="modal fade"
				id="createLeaveConfigModal"
				ref={this.modalRef}
				tabIndex="-1"
			>
				<div className="modal-dialog">
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
									code: this.state.code,
									description: this.state.description,
									discount_type: this.state.discount_type,
									discount_amount: this.state.discount_amount,
									categories: this.state.categories,
									coupon_type: this.props.couponType,
								}}
								enableReinitialize={true}
								validationSchema={validationSchema}
								onSubmit={(values, onSubmitProps) => {
									console.log(values);
									let fd = new FormData(document.getElementById("editCoupon"))
									updateCouponData(this.props.editCoupon, fd).then(
										res => {
											console.log(res);
											onSubmitProps.resetForm()
											this.hideModal();
											this.props.getCouponData();
										},
										err => {
											console.log(err);
										}
									)
								}}
							>
								<Form id="editCoupon">
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
									<div className="row">
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
export default EditCoupon