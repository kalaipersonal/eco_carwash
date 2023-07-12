import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Staff } from "../../../../utils/Staff";
import axios from "axios";
import { Toast } from "primereact/toast";
import * as yup from 'yup';

import CreateCleaner from "./modals/CreateCleaner";
import EditCleaner from "./modals/EditCleaner";

import "./styles/CleanerLayout.scss";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name field is required!"),
  email: yup.string().email("Invalid email id").required("Email field is required!"),
  mobile_no: yup.string().required("Required!"),
});

let url;
class ListCleaner extends Component {
  constructor(props) {
    super(props);
    url = this.props.match.url
    this.state = {
      page: 1,
      lock: true,
      list: {},
      editedID: ""
    };
    this.Staff = new Staff();
    this.creationChild = React.createRef();
    this.updationChild = React.createRef();
    this.resetEdit = this.resetEdit.bind(this)
    this.nextTemplate = this.nextTemplate.bind(this)
    this.scrollLoader = this.scrollLoader.bind(this)
    this.getCleanerList = this.getCleanerList.bind(this)
    this.editTemplate = this.editTemplate.bind(this)
  }

  componentDidMount() {
    this.getCleanerList();
    this.scrollLoader();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editedID != "") {
      this.updationChild.current.showModal()
    }
  }

  scrollLoader() {
    let scroller = document.getElementsByClassName('p-datatable-scrollable-body')[0]
    let scrollerBody = document.getElementsByClassName('p-datatable-scrollable-body-table')[0]
    scroller.addEventListener('scroll', () => {
      if (scroller.scrollTop > (scrollerBody.clientHeight - scroller.clientHeight) * 0.9) {
        if (!this.state.lock && this.state.list.next) {
          this.setState({ lock: true }, () => {
            this.setState({ page: this.state.page + 1 }, () => {
              this.getCleanerList();
            })
          })

        }
      }
    })
  }

  getCleanerList(reset = false) {
    this.Staff.getStaff(3, this.state.page)
      .then((res) => {
        // console.log('Cleaner List',res.data.Data,reset);
        if (Object.keys(this.state.list).length != 0 && !reset) {
          let list = this.state.list.results
          list.push(...res.data.Data.results)
          res.data.Data.results = list
          // console.log(res.data.Data);
          this.setState({ list: res.data.Data })
        } else {
          this.setState({ list: res.data.Data });
        }
        this.setState({ lock: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showError(errTitle, errMsg) {
    this.toast.show({
      severity: "error",
      summary: errTitle,
      detail: errMsg,
      life: 3000,
    });
  }

  resetEdit() {
    this.setState({ editedID: "" })
  }

  nextTemplate(rowData) {
    return (
      <React.Fragment>
        <i className="fa fa-chevron-right mx-auto" onClick={
          () => {
            this.props.history.push(`/cleaner/${rowData.username}`);
          }
        }></i>
      </React.Fragment>
    );
  }

  editTemplate(rowData) {
    return (
      <React.Fragment>
        <i
          style={{ fontSize: "20px" }}
          className="fas fa-pen mx-auto"
          onClick={() => this.setState({ editedID: rowData.username })}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="cleaner-layout">
        <Toast ref={(el) => (this.toast = el)} />
        <div className="d-flex flex-row align-items-center">
          <h2 className="me-5">Stylist</h2>
          <button
            className="btn-white me-3"
            style={{ width: "6rem", height: "2.5rem" }}
            onClick={() => this.creationChild.current.showModal()}
          >
            + Add
          </button>
        </div>

        <div className="cleaner-body">
          <DataTable value={this.state.list.results} scrollable scrollHeight="100%">
            <Column field="name" header="Name" body={this.Staff.nameTemplate}></Column>
            <Column field="mobile_no" header="Mobile No." body={this.Staff.phoneTemplate}></Column>
            <Column field="email" header="Email" body={this.Staff.emailTemplate}></Column>
            <Column field="leave" header="Leave Taken" body={this.Staff.leaveTemplate}></Column>
            <Column field="orders" header="Order Undertaken" body={this.Staff.orderTemplate}></Column>
            <Column field="id" header="Edit Stylist" body={this.editTemplate}></Column>
            <Column field="id" header="View Stylist" body={this.nextTemplate}></Column>
          </DataTable>
        </div>
        <CreateCleaner ref={this.creationChild} getCleanerList={this.getCleanerList} />
        {
          this.state.editedID != "" ?
            <EditCleaner 
              ref={this.updationChild} 
              getCleanerList={this.getCleanerList} 
              editedID={this.state.editedID}
              resetEdit={this.resetEdit} 
            />
            : null
        }
      </div>
    );
  }
}

export default withRouter(ListCleaner);
