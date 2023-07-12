import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Modal } from 'bootstrap';

import { getOrderData } from '../../api/GET'
import { updateOrderData } from '../../api/PATCH';

const validationSchema = yup.object().shape({
	tracking_no: yup.string().required("Name field is required!"),
	tracking_status: yup.string().required("Description field is required!"),
});

class EditOrder extends Component {

	constructor(props) {
		super(props);
		this.state = {
			orderDetail: {
				tracking_no: "",
				tracking_status: "",
			}
		}
		this.modalRef = React.createRef()
	}

	componentDidMount() {
		getOrderData(this.props.orderID).then(
			res => {
				// console.log(res.data.Data);
				this.setState({
					orderDetail: res.data.Data
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
							<h5 className="modal-title">Edit Product</h5>
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
									tracking_no: this.state.orderDetail.tracking_no,
									tracking_status: this.state.orderDetail.tracking_status,
								}}
								enableReinitialize={true}
								validationSchema={validationSchema}
								onSubmit={(values, onSubmitProps) => {

									// console.log('form values',values);
									let fd = new FormData(document.getElementById("updateOrderForm"))
									updateOrderData(this.props.orderID, fd).then(
										res => {
											console.log('result',res);
											onSubmitProps.resetForm()
											this.hideModal();
											this.props.getAllOrderDetails()
										},
										err => {
											console.log(err.response.data);
										}
									)
								}}
							>
								<Form id="updateOrderForm">
									<div className="mb-3">
										<label className="label" htmlFor="tracking_no">
											Tracking No
										</label>
										<Field
											id="tracking_no"
											name="tracking_no"
											type="text"
											className="form-control"
										/>
										<div className="text-danger">
											<ErrorMessage
												name="tracking_no"
											/>
										</div>
									</div>

									<div className="mb-3">
										<label className="label" htmlFor="tracking_status">
											Tracking Status
										</label>
										<Field
											id="tracking_status"
											name="tracking_status"
											as="select"
											className="form-control"
										>
											<option value="" label="Select Order Status" />
											<option value="Order_Accepted" label="Order_Accepted" />
											<option value="Dispatched" label="Dispatched" />
											<option value="Delivered" label="Delivered" />
										</Field>
										<div className="text-danger">
											<ErrorMessage
												name="tracking_status"
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
export default EditOrder