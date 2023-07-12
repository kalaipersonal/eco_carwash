import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { getGarageList } from '../../api/GET'
import CreateGarage from '../modals/CreateGarage';

import './styles/GarageList.scss'

class GarageList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			garages: []
		}
		this.setGarageList = this.setGarageList.bind(this);
		this.loadGarageUser = this.loadGarageUser.bind(this);
		this.createChild = React.createRef();
		this.openCreateGarage = this.openCreateGarage.bind(this);
	}

	componentDidMount() {
		this.setGarageList();
	}

	setGarageList() {
		getGarageList().then(res => {
			// console.log(res.data.Data);
			this.setState({
				garages: res.data.Data
			})
		})
	}

	actionTemplate(rowData) {
		return (
			<React.Fragment>
				<div className="d-flex flex-row align-items-center justify-content-center">
					<i
						style={{ fontSize: "15px" }}
						className="fas fa-pen me-3"
					// onClick={() => this.editLeaveData(rowData.id)}
					></i>
					<i
						style={{ fontSize: "15px" }}
						className="fas fa-trash"
					// onClick={() => this.deleteLeaveData(rowData.id)}
					></i>
				</div>
			</React.Fragment>
		);
	}

	loadGarageUser(rowData) {
		// console.log(rowData);
		this.props.history.push(`/garage/${rowData.data.username}`)
	}

	openCreateGarage() {
		this.createChild.current.showModal();
	}

	render() {
		return (
			<div className='garage-list-layout'>
				{
					this.state.garages.length === 0 ?
						<div className='garage-empty'>
							<button className="btn-navy" onClick={() => this.openCreateGarage()}>Create Garage</button>
						</div>
						:
						<div className="garage-list">
							<div className="garage-list-header">
								<div className="title">Ware House</div>
								<button className="btn-white" onClick={() => this.openCreateGarage()}>Add +</button>
							</div>
							<div className='garage-table'>
								<DataTable value={this.state.garages.results} scrollable scrollHeight="100%" onRowClick={this.loadGarageUser}>
									<Column field="name" header="Name"></Column>
									<Column field="address.address" header="Address"></Column>
									<Column field="email" header="Email"></Column>
									<Column field="mobile_no" header="Phone"></Column>
									<Column field="totalapps" header="No of Bookings"></Column>
								</DataTable>
							</div>
						</div>
				}
				<CreateGarage ref={this.createChild} setGarageList={this.setGarageList} />
			</div>
		)
	}
}
export default withRouter(GarageList)