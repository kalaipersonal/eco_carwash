import "./styles/ListStores.scss";
import { NavLink, useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import {StoresData} from "../../utils/StoresData";

const ListStores = () => {
  let { url } = useRouteMatch();
  const history = useHistory();
  let [storesList, setStoresList] = useState([]);
  let store = new StoresData()

  console.log("List store url:",url)
  const storeRedirect = (rowData) => {
    history.push(`${url}/${rowData.data.id}`)
  }

  useEffect(() => {
    axios
      .get(`/admin/manage_stores/`)
      .then((res) => {
        let value = res.data.Data;
        setStoresList(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [storesList === []]);

  return (
    <div className="list-stores">
      <div className="list-stores-head">
        <h2>Physical Stores</h2>
        <div className="d-flex flex-row">
          <NavLink
            to={`${url}/createstore`}
            className="btn-navy list-stores-btn"
          >
            Create Store
          </NavLink>
          <p className="ms-5 my-auto">You can manually create store</p>
        </div>
      </div>

      <div className="list-stores-body">

        <DataTable value={storesList} scrollable scrollHeight="100%" onRowClick={storeRedirect}>
            <Column field="name" body={store.nameTemplate}></Column>
            <Column field="mobile_no" body={store.phoneTemplate}></Column>
            <Column field="email" body={store.emailTemplate}></Column>
            <Column field="leave" body={store.leaveTemplate}></Column>
            <Column field="orders" body={store.orderTemplate}></Column>
        </DataTable> 

        
      </div>
    </div>
  );
};

export default withRouter(ListStores);
