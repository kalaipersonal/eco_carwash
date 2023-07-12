import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { getStoreLeaves } from './api/GET'
import { updateUserLeave } from './api/PATCH'

let url;
class LeaveDetails extends Component {
	constructor(props) {
		super(props);
		url = this.props.match.path;
		this.state = {
			storeLeavesList: []
		}
		this.loadStoreList = this.loadStoreList.bind(this)
		this.approvetemplate = this.approvetemplate.bind(this)
	}

	componentDidMount() {
		this.loadStoreList()
	}

	loadStoreList() {
		let data;
		try {
			data = "?" + window.location.href.split('?')[1]
		}
		catch (e) {
			data = ""
		}
		console.log(data);
		getStoreLeaves(data).then((res) => {
			this.setState({ storeLeavesList: res.data.Data })
		})
	}

	approvetemplate(rowData) {
		let i = this.state.storeLeavesList.indexOf(rowData)
		return (
			<React.Fragment>
				{
					(this.state.storeLeavesList[i].approved_by !== null) ?
						rowData.approved_by.name
						:
						<button
							className='btn-navy'
							onClick={() => {
								updateUserLeave(rowData.id, { is_approved: true }).then(
									(res) => {
										console.log(res);
										let list = this.state.storeLeavesList
										list[i] = res.Data
										this.setState({ storeLeavesList: list })
									},
									(err) => console.log(err)
								)
							}}
						>
							Approve
						</button>
				}
			</React.Fragment>
		)
	}

	render() {
		return (
			<div className="store-staff-leaves h-100 w-100">
				<div className="d-flex flex-row store-staff-leaves-head w-100">
				<div className="lay_stores" style={{display:"flex",gap:"20px"}}>
				<div className="left_store" style={{width:"30%"}}>
				<button
                    className="btn-white-circle"
                    onClick={() => this.props.history.goBack()}
					style={{width:"50px",height:"50px",display:"flex",alignItems:"center",justifyContent:"center"}}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
				</div>
				  <div className="right_store" style={{width:"70%",whiteSpace:"nowrap",display:"flex",justifyContent:"center",fontSize:"2em"}}>
				  <p>Store Leaves</p>
				  </div>
				</div>
				
				</div>

				<div className="d-flex flex-column store-staff-leaves-body w-100">
					<DataTable value={this.state.storeLeavesList} scrollable scrollHeight="100%">

						<Column field="title" header="Title"></Column>
						<Column field="description" header="Description"></Column>
						<Column field="from_date" header="From"></Column>
						<Column field="to_date" header="To"></Column>
						<Column field="days" header="No.of Days"></Column>
						<Column field="user.name" header="Requested By"></Column>
						<Column field="approved_by.name" header="Approved By" body={this.approvetemplate}></Column>
					</DataTable>
				</div>
			</div>
		)
	}
}
export default withRouter(LeaveDetails);