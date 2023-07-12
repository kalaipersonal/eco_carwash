import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { getOrderDetails } from "../../api/GET";
import { deleteOrderData } from "../../api/DELETE";

import EditProduct from "../modals/EditProduct";
import EditOrder from "../modals/EditOrder";

import "./styles/ProductDetail.scss";
import product_image from '../../../../assets/chage_product.webp';
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      order_details: [],
      orderID: "",
    };
    this.actionTemplate = this.actionTemplate.bind(this);
    this.updateProductData = this.updateProductData.bind(this);
    this.getAllOrderDetails = this.getAllOrderDetails.bind(this);
    this.editOrderData = this.editOrderData.bind(this);
    this.editProduct = React.createRef();
    this.editOrder = React.createRef();
  }

  componentDidMount() {
    this.setState({ product: this.props.product });
    this.getAllOrderDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.orderID !== "") {
      this.editOrder.current.showModal();
    }
  }

  getAllOrderDetails() {
    this.setState({ orderID: "" });
    getOrderDetails(this.props.product[0].id).then((res) => {
      console.log("order list", res.data.Data);
      this.setState({ order_details: res.data.Data });
    });
  }

  editOrderData(id) {
    this.setState({ orderID: id });
  }

  updateProductData(data) {
    let product = this.state.product;
    product[0] = data;
    this.setState({ product: product });
  }

  actionTemplate(rowData) {
    return (
      <React.Fragment>
        <div className="d-flex flex-row align-items-center justify-content-center w-100">
          <i
            style={{ fontSize: "15px" }}
            className="fas fa-pen me-3"
            onClick={() => this.editOrderData(rowData.id)}
          ></i>
          {/* <i 
						style={{ fontSize: "15px" }} 
						className="fas fa-trash" 
						onClick={() => {
							if(window.confirm("Are you sure you want to delete?")){
								deleteOrderData(rowData.id).then(
									res => {
										this.getAllOrderDetails()
									}
								).catch(err => console.log(err))
							}
						}}
					></i> */}
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="product-detail-layout">
        <div className="product-detail-section">
          <div className="product-detail-data">
            <div className="product-image">
              <img src={product_image} />
            </div>
            <div className="product-detail">
              <div className="product-header">
                <div className="product-title">
                  <span className="title">Votary Products</span>
                  <span className="quantity mt-3">
                    Qty: 100
                  </span>
                </div>
                <button
                  className="btn-white mt-2"
                  onClick={() => {
                    this.editProduct.current.showModal();
                  }}
                >
                  Edit <i className="ms-3 fa fa-pencil"></i>
                </button>
              </div>
              <div className="product-description mt-4">
                {this.state.product[0]?.description}
              </div>
            </div>
          </div>
          <div className="product-detail-stats">
            <div className="fs-4 fw-bold">Summary</div>
            <div className="summary-box">
              <div className="summary-item">
                <span className="title">No of Purchase</span>
                <span className="value">
                  {this.state.product[0]?.total_count}
                </span>
              </div>
              <div className="summary-item">
                <span className="title">Total Revenue</span>
                <span className="value">
                  {this.state.product[0]?.total_price}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-order-section">
          <DataTable
            value={this.state.order_details}
            scrollable
            scrollHeight="100%"
          >
            <Column field="id" header="Order ID"></Column>
            <Column field="user.name" header="Customer Name"></Column>
            <Column field="user.mobile_no" header="Mobile No"></Column>
            <Column field="user.email" header="Email"></Column>
            <Column field="tracking_no" header="Tracking No"></Column>
            <Column field="tracking_status" header="Status"></Column>
            <Column
              field="id"
              header="Action"
              body={this.actionTemplate}
            ></Column>
          </DataTable>
        </div>
        {this.state.product.length > 0 ? (
          <EditProduct
            ref={this.editProduct}
            product={this.state.product[0]}
            updateProductData={this.updateProductData}
          />
        ) : null}
        {this.state.orderID !== "" ? (
          <EditOrder
            ref={this.editOrder}
            orderID={this.state.orderID}
            getAllOrderDetails={this.getAllOrderDetails}
          />
        ) : null}
      </div>
    );
  }
}
export default withRouter(ProductDetail);
