import storeIltn1 from "./assets/store_iltn_1.svg";
import React, { useState } from "react";
import "./styles/CreateStore.scss";
import { useRouteMatch } from "react-router-dom";
import { withRouter, useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import salonimage from '../../../../assets/salon_haircut.svg';

const CreateStore = () => {
  const history = useHistory();

  return (
    <div className="create-store-body">
      <div className="add-store">
        <h2 className="d-flex justify-content-start mx-auto ms-lg-5 mb-3">
          Create Store
        </h2>
        <div className="card d-flex mx-auto">
          <div className="card-body d-flex flex-column mx-auto">
            <Formik
              initialValues={{
                name: "",
                email: "",
                mobile_no: "",
                document: "",
                address: "",
                profile_image: "",
              }}
              onSubmit={(values, onSubmitProps) => {
                console.log(values);
                let fd = new FormData(
                  document.getElementById("create_store_form")
                );
                axios
                  .post("admin/manage_stores/", fd)
                  .then((res) => {
                    console.log(res.data);
                    onSubmitProps.resetForm();
                    history.push("/stores");
                  })
                  .catch((err) => console.log(err.data));
              }}
            >
              <Form id="create_store_form">
                <div className="mb-5">
                  <label className="label" htmlFor="name">
                    Store Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage name="name">
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className="mb-5">
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                  />
                  <ErrorMessage name="email">
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className="mb-5">
                  <label className="label" htmlFor="mobile_no">
                    Phone Number
                  </label>
                  <Field
                    id="mobile_no"
                    name="mobile_no"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage name="mobile_no">
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className="mb-5">
                  <label className="label" htmlFor="address">
                    Address
                  </label>
                  <Field
                    id="address"
                    name="address"
                    type="text area"
                    className="form-control"
                  />
                  <ErrorMessage name="address">
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className="mb-5">
                  <label className="label" htmlFor="document">
                    Document
                  </label>
                  <Field
                    id="document"
                    name="document"
                    type="file"
                    className="form-control"
                  />
                  <ErrorMessage name="document">
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>
                </div>

                <div>
                  <Field
                    id="user_type"
                    name="user_type"
                    value="3"
                    type="hidden"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn-navy mx-auto mt-5">
                  Create
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>

      <div className="illustrations" style={{width:"40%",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img src={salonimage} style={{width:"80%",display:"flex",alignItems:"center",justifyContent:"center"}} />
  
      </div>
    </div>
  );
};

export default withRouter(CreateStore);
