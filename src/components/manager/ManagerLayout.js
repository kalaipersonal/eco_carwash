import "./styles/ManagerLayout.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Staff } from "../../utils/Staff";
import { Toast } from "primereact/toast";
import axios from "axios";
import * as yup from "yup";

import CreateManager from './modals/CreateManager';
import EditManager from './modals/EditManager';

class ManagerLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: 1,
      lock: false,
      editedID: ""
      // user_id: "",
    };
    this.Staff = new Staff();
    this.showError = this.showError.bind(this);
    this.creationChild = React.createRef();
    this.updationChild = React.createRef();
    this.resetEdit = this.resetEdit.bind(this);
    this.getManagerList = this.getManagerList.bind(this);
    this.scrollLoader = this.scrollLoader.bind(this);
    this.editTemplate = this.editTemplate.bind(this);
  }

  componentDidMount() {
    this.getManagerList();
    this.scrollLoader()
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
              this.getManagerList();
            })
          })

        }
      }
    })
  }

  getManagerList(reset = false) {
    this.Staff.getStaff(2, this.state.page)
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

  resetEdit() {
    this.setState({ editedID: "" })
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

  showError(errTitle, errMsg) {
    this.toast.show({
      severity: "error",
      summary: errTitle,
      detail: errMsg,
      life: 3000,
    });
  }

  render() {
    return (
      <div className="manager-layout">
        <Toast ref={(el) => (this.toast = el)} />
        <div className="d-flex flex-row align-items-center">
          <h2 className="me-5">Manager List</h2>
          <button
            className="btn-white me-3"
            onClick={() => this.creationChild.current.showModal()}
            style={{ width: "6rem", height: "2.5rem" }}
          >
            + Add
          </button>
        </div>

        <div className="manager-body">
          <DataTable value={this.state.list.results} scrollable scrollHeight="100%">
            <Column field="name" header="Name" body={this.Staff.nameTemplate}></Column>
            <Column field="mobile_no" header="Mobile No." body={this.Staff.phoneTemplate}></Column>
            <Column field="email" header="Email" body={this.Staff.emailTemplate}></Column>
            <Column field="leave" header="Leave Taken" body={this.Staff.leaveTemplate}></Column>
            <Column field="id" header="Action" body={this.editTemplate}></Column>
          </DataTable>
        </div>
        <CreateManager ref={this.creationChild} getManagerList={this.getManagerList} />
        {
          this.state.editedID != "" ?
            <EditManager
              ref={this.updationChild}
              getManagerList={this.getManagerList}
              editedID={this.state.editedID}
              resetEdit={this.resetEdit}
            />
            : null
        }
      </div>
    );
  }
}

export default withRouter(ManagerLayout);
