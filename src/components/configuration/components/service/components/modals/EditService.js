import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Modal } from 'bootstrap';

import { getService } from '../../api/GET';
import { updateService } from '../../api/PATCH';

const validationSchema = yup.object().shape({
	title: yup.string().required("Title field is required!"),
	price: yup.string().test(
		'',
		'This field must be a decimal',
		value => (value + "").match(/^[0-9]*\.*[0-9]+$/)
	  ).required("Price field is required!"),
	timetaken: yup.number().required("Time Taken field is required!")
});

class EditService extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			price: "",
			timetaken: ""
		}
		this.updateServiceModalRef = React.createRef()
	}

	componentDidMount(){
		getService(this.props.editServiceID).then(
			res => {
				console.log(res.data);
				this.setState({title: res.data.Data?.title})
				this.setState({price: res.data.Data?.price})
				this.setState({timetaken: res.data.Data?.timetaken})
			}
		).catch(
			err => console.log(err)
		)
	}

	showModal() {
		const modalEle = this.updateServiceModalRef.current
		const bsModal = new Modal(modalEle, {
			backdrop: 'static',
			keyboard: false
		})
		bsModal.show()
	}

	hideModal() {
		const modalEle = this.updateServiceModalRef.current
		const bsModal = Modal.getInstance(modalEle)
		bsModal.hide()
		this.props.resetEditId()
	}

	render() {
		return (
			<div
				className="modal fade"
				ref={this.updateServiceModalRef}
				tabIndex="-1"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Edit Service</h5>
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
									title: this.state.title,
									price: this.state.price,
									timetaken: this.state.timetaken,
								}}

								validationSchema={validationSchema}
								enableReinitialize={true}
								onSubmit={(values, onSubmitProps) => {

									console.log(values);
									let fd = new FormData(document.getElementById(`editServiceForm`))
									updateService(this.props.editServiceID,fd).then(
										res => {
											// console.log(res);
											onSubmitProps.resetForm()
											this.hideModal();
											this.props.getServiceData();
										},
										err => {
											console.log(err);
										}
									)
								}}
							>
								<Form id={`editServiceForm`}>
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
export default EditService