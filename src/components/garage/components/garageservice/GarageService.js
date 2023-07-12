import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { getCarTypeList, getServices } from './api/GET'
import { deleteService } from './api/DELETE'

import CarType from './components/cartype/CarType'
import DataTabled from './components/datatable/DataTabled'
import CreateCarType from './components/modals/CreateCarType'
import CreateService from './components/modals/CreateService'
import EditService from './components/modals/EditService'

import './styles/ServiceLayout.scss'

let url, id;
class GarageService extends Component {
	constructor(props) {
		super(props);
		url = this.props.match.url;
		id = this.props.match.params.id;
		this.state = {
			carList: [],
			carType: "",
			editServiceID: "",
			serviceType: "Interior",
			standardServices: [],
			premiumServices: []
		};
		this.changeCarType = this.changeCarType.bind(this);
		this.updateCarTypeList = this.updateCarTypeList.bind(this);
		this.getServiceData = this.getServiceData.bind(this);
		this.getStandardServices = this.getStandardServices.bind(this)
		this.getPremiumServices = this.getPremiumServices.bind(this)
		this.editServiceData = this.editServiceData.bind(this);
		this.deleteServiceData = this.deleteServiceData.bind(this);
		this.resetEditId = this.resetEditId.bind(this);
		this.openModal = this.openModal.bind(this)
		this.standardChild = React.createRef()
		this.premiumChild = React.createRef()
		this.updateChild = React.createRef()
		this.carTypeChild = React.createRef()
	}

	componentDidMount() {
		getCarTypeList().then((res) => {
			// console.log(res.data);
			this.setState({ carList: res.data.Data });
			this.changeCarType(res.data.Data[0].id);
			this.getServiceData();
		}).catch((err) => {
			console.log(err);
		});
	}

	updateCarTypeList() {
		getCarTypeList().then((res) => {
			this.setState({ carList: res.data.Data });
		}).catch((err) => {
			console.log(err);
		});
	}

	getServiceData(type = '') {
		this.setState({ editServiceID: '' })
		if (type === "Standard") {
			this.getStandardServices()
		} else if (type === "Premium") {
			this.getPremiumServices()
		} else {
			this.getStandardServices()
			this.getPremiumServices()
		}
	}

	resetEditId() {
		this.setState({ editServiceID: '' })
	}

	getStandardServices() {
		getServices(id, this.state.carType, this.state.serviceType, "Standard").then((res) => {
			// console.log('services',res.data);
			this.setState({ standardServices: res.data.Data });
		}).catch((err) => {
			console.log(err);
		});
	}

	getPremiumServices() {
		getServices(id, this.state.carType, this.state.serviceType, "Premium").then((res) => {
			// console.log('services',res.data);
			this.setState({ premiumServices: res.data.Data });
		}).catch((err) => {
			console.log(err);
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if ((prevState.carType !== "" && prevState.carType !== this.state.carType) || (prevState.serviceType !== this.state.serviceType)) {
			this.getServiceData()
		}
		if (this.state.editServiceID !== "") {
			this.updateChild.current.showModal()
		}
	}

	changeCarType(value) {
		this.setState({ carType: value });
	}

	openModal(type) {
		if (type === "Standard") {
			this.standardChild.current.showModal()
		} else {
			this.premiumChild.current.showModal()
		}
	}

	editServiceData(id) {
		this.setState({ editServiceID: id })
	}

	deleteServiceData(id, type) {
		if (window.confirm("Do you want to delete this service?")) {
			deleteService(id).then(
				res => {
					console.log(res)
					this.getServiceData(type)
				}
			).catch(
				err => console.log(err)
			)
		}
	}

	render() {
		return (
			<div className='service-config-layout'>
				<div className="service-config-layout-header">
					<button
						className="btn-white-circle me-2"
						onClick={() => this.props.history.goBack()}
					>
						<i className="fas fa-chevron-left"></i>
					</button>
					Service Configuration
				</div>
				<CarType
					carList={this.state.carList}
					carType={this.state.carType}
					changeCarType={this.changeCarType}
					openCarModal={this.openCarModal}
				/>
				<div className="service-config-body">
					<div className="service-config-body-header">
						<div className="service-config-body-header-title">
							Service Types
						</div>
						<button
							className={`service-config-body-header-tabs mx-auto ${(this.state.serviceType === "Interior") ? 'active' : null}`}
							onClick={() => { this.setState({ serviceType: "Interior" }) }}
						>
							Interior
						</button>
						<button
							className={`service-config-body-header-tabs mx-auto ${(this.state.serviceType === "Exterior") ? 'active' : null}`}
							onClick={() => { this.setState({ serviceType: "Exterior" }) }}
						>
							Exterior
						</button>
					</div>
					<div className="service-config-body-body">
						<div className="service-config-body-standard">
							{
								this.state.carType !== "" ?
									<DataTabled
										serviceData={this.state.standardServices}
										serviceNature={"Standard"}
										openModal={this.openModal}
										editServiceData={this.editServiceData}
										deleteServiceData={this.deleteServiceData}
									/> : null
							}

						</div>
						<div className="service-config-body-premium">
							{
								this.state.carType !== "" ?
									<DataTabled
										serviceData={this.state.premiumServices}
										serviceNature={"Premium"}
										openModal={this.openModal}
										editServiceData={this.editServiceData}
										deleteServiceData={this.deleteServiceData}
									/> : null
							}
						</div>
					</div>
				</div>
				{
					this.state.CarType !== "" ?
						<>
							<CreateService
								serviceType={this.state.serviceType}
								serviceNature={"Standard"}
								carType={this.state.carType}
								ref={this.standardChild}
								getServiceData={this.getServiceData}
								garage={id}
							/>

							<CreateService
								serviceType={this.state.serviceType}
								serviceNature={"Premium"}
								carType={this.state.carType}
								ref={this.premiumChild}
								getServiceData={this.getServiceData}
								garage={id}
							/>
						</>
						: null
				}

				{
					this.state.editServiceID ?
						<EditService
							ref={this.updateChild}
							getServiceData={this.getServiceData}
							editServiceID={this.state.editServiceID}
							resetEditId={this.resetEditId}
						/>
						: null
				}
			</div>
		)
	}
}
export default withRouter(GarageService)