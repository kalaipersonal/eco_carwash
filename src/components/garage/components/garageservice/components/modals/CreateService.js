import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Modal } from 'bootstrap';

import { getServiceData } from '../../api/GET'
import { postService } from '../../api/POST';

const validationSchema = yup.object().shape({
	service: yup.string().required("Title field is required!"),
	price: yup.string().test(
		'',
		'This field must be a decimal',
		value => (value + "").match(/^[0-9]*\.*[0-9]+$/)
	  ).required("Price field is required!"),
});

class CreateService extends Component {
	constructor(props) {
		super(props);
		this.state = {
			serviceList: []
		}
		console.log('props',this.props);
		this.modalRef = React.createRef()
	}

	componentDidMount() {
		getServiceData(
			this.props.carType,
			this.props.serviceType,
			this.props.serviceNature
		).then(res => {
			// console.log(res.data.Data);
			this.setState({ serviceList: res.data.Data });
		}).catch(err => console.log(err))
	}

	componentDidUpdate(prevProps) {
		if ((this.props.carType !== prevProps.carType && this.props.carType !== "" && prevProps.carType !== "") ||  (this.props.serviceType !== prevProps.serviceType && this.props.serviceType !== "" && prevProps.serviceType !== "")) {
			getServiceData(
				this.props.carType,
				this.props.serviceType,
				this.props.serviceNature
			).then(res => {
				// console.log(res.data.Data);
				this.setState({ serviceList: res.data.Data });
			}).catch(err => console.log(err))
		}
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
									service: "",
									price: "",
									garage: this.props.garage,
								}}

								validationSchema={validationSchema}
								enableReinitialize={true}
								onSubmit={(values, onSubmitProps) => {

									console.log(values);
									let fd = new FormData(document.getElementById(`service${this.props.serviceNature}Form`))
									postService(fd).then(
										res => {
											// console.log(res);
											this.hideModal();
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
										<label className="label" htmlFor="service">
											Service 
										</label>
										<Field
											id="service"
											name="service"
											as="select"
											className="form-control"
										>
											<option value="">Select Service</option>
											{
												this.state.serviceList.map((service,index) => {
													return (
														<option key={index} value={service.id}>{service.title} - {service.price}</option>
													)
												})
											}
										</Field>
										<div className="text-danger">
											<ErrorMessage
												name="service"
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

									<Field
										id="garage"
										name="garage"
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