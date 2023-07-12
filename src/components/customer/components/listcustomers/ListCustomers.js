import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";


import { CustomerData } from "../../assets/CustomerData";
import "./style/ListCustomers.scss"

let url;
class ListCustomers extends Component {
  constructor(props) {
    super(props);
    url = this.props.match.url
    this.state = {
      page: 1,
      lock: false,
      customers: {},
    }
    this.cust = new CustomerData()
    this.getCleanerList = this.getCleanerList.bind(this)
    this.scrollLoader = this.scrollLoader.bind(this)
    this.custRedirect = this.custRedirect.bind(this)
  }

  componentDidMount() {
    this.getCleanerList()
    this.scrollLoader()
  }

  scrollLoader() {
    let scroller = document.getElementsByClassName('p-datatable-scrollable-body')[0]
    let scrollerBody = document.getElementsByClassName('p-datatable-scrollable-body-table')[0]
    scroller.addEventListener('scroll', () => {
      if (scroller.scrollTop > (scrollerBody.clientHeight - scroller.clientHeight) * 0.85) {
        if (!this.state.lock && this.state.customers.next) {
          this.setState({ lock: true }, () => {
            this.setState({ page: this.state.page + 1 }, () => {
              this.getCleanerList();
            })
          })

        }
      }
    })
  }

  getCleanerList() {
    axios
      .get(`/admin/manage_customer?page_no=${this.state.page}`)
      .then((res) => {
        console.log(res.data.Data);
        if(Object.keys(this.state.customers).length!=0){
          let list = this.state.customers.results
          list.push(...res.data.Data.results)
          res.data.Data.results = list
          // console.log(res.data.Data);
          this.setState({customers: res.data.Data});
        }else{
          this.setState({customers: res.data.Data});
        }
        this.setState({lock: false})
      })
      .catch((err) => {
        console.log(err);
      });
  }

  custRedirect(rowData) {
    this.props.history.push(`${url}/${rowData.data.username}`)
  }

  render() {
    return (
      <div className="list-customers" >
        <h2>Customer List</h2>  
        <div className="list-customers-body">

          <DataTable value={this.state.customers.results} scrollable scrollHeight="100%" onRowClick={this.custRedirect}>
            <Column field="name" body={this.cust.nameTemplate}></Column>
            <Column field="mobile_no" body={this.cust.phoneTemplate}></Column>
            <Column field="email" body={this.cust.emailTemplate}></Column>
            <Column field="leave" body={this.cust.carTypeTemplate}></Column>
            <Column field="orders" body={this.cust.appointmentTemplate}></Column>
          </DataTable>
        </div>
      </div>
    );
  }
};

export default withRouter(ListCustomers);
