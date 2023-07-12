import "./styles/StoreDashboard.scss";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import StoreMenu from "../storeMenu/StoreMenu";
import AssignManager from "../assignManager/AssignManager";
import AssignCleaner from "../assignCleaner/AssignCleaner";
import ServiceType from "../serviceType/ServiceType";
import axios from "axios";
import haircutlogo from '../../../../../../assets/hair_cut_logo.png';
let url, store_id, leave_url;

class ViewStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuSelected: 1,
      storeDetails: [],
      storeManager: "",
      storeCleaners: [],
    };
    this.changeMenu = this.changeMenu.bind(this);
    url = this.props.match.path;
    store_id = this.props.match.params.id;
    leave_url = url.split("/");
    leave_url.pop();
    leave_url = leave_url.join("/");
    this.getStoreManager = this.getStoreManager.bind(this);
    this.getStoreCleaners = this.getStoreCleaners.bind(this);
  }

  changeMenu(value) {
    this.setState({ menuSelected: value });
  }

  getStore() {
    axios
      .get(`/admin/manage_stores/${store_id}`)
      .then((res) => {
        console.log("Store Details:", res.data.Data);
        this.setState({ storeDetails: res.data.Data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getStoreManager() {
    axios
      .get(`/admin/manage_staff?user_type=2&store=${store_id}`)
      .then((res) => {
        console.log("manager Details:", res.data.Data.results);
        this.setState({ storeManager: res.data.Data.results[0].name });
      })
      .catch((err) => {
        this.setState({ storeManager: "No Manager" });
      });
  }

  getStoreCleaners() {
    axios
      .get(`/admin/manage_staff?user_type=3&store=${store_id}`)
      .then((res) => {
        console.log("cleaner Details:", res.data.Data.results);
        this.setState({ storeCleaners: res.data.Data.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getStore();
    this.getStoreManager();
    this.getStoreCleaners();
  }

  render() {
    return (
      <div className="view-store-section">
        <div className="view-store-dashboard">
          <div class="row dashboard-top-section">
            <div class="card h-100 w-100">
              <div class="card-body d-flex flex-row h-100 w-100">
                <div
                  style={{ width: "30%" }}
                  className="d-flex flex-column justify-content-center align-items-center h-100"
                >
                  <div className="profile-picture mb-3" >
                    {/* <img src="https://picsum.photos/100" /> */}
                    <img src={haircutlogo} />
                  </div>
                  <h5 className="mb-3">{this.state.storeDetails.name}</h5>
                  <h6>{this.state.storeDetails?.address?.address}</h6>
                </div>

                <div
                  style={{ width: "34%" }}
                  className="d-flex flex-column justify-content-between align-items-center h-100 p-3"
                >
                  {/* <div className="w-100 h-100 bg-dark"> */}
                    <div  className="d-flex flex-row card w-100">
                        <div className="card-body h-100 dashboard-store-manager-card">
                        <h6 className="mint">Manager</h6>
                        <p>{this.state.storeManager}</p>
                      </div> 
                    </div>
                    <div  className="d-flex flex-row  w-100 ps-3 mt-2">
                      <div className="h-100 w-100 justify-content-around align-items-center">
                      <h6>Phone</h6>
                      <p >{this.state.storeDetails.mobile_no}</p>
                      <h6>Email</h6>
                      <p >{this.state.storeDetails.email}</p>
                    </div>
                    </div>
                  {/* </div> */}
                </div>

                <div
                  style={{ width: "36%" }}
                  className="d-flex flex-column justify-content-center align-items-center h-100 p-3"
                >
                  <div className="card w-100 h-100">
                    <div className="card-body w-100 h-100 dashboard-store-manager-card">
                      <h6 className="mint">Stylist</h6>
                      <div className="dashboard-store-cleaner-card">
                        {this.state.storeCleaners.length === 0 ? (
                          <p>No Cleaner</p>
                        ) : (
                          this.state.storeCleaners.map((data, index) => {
                            return <p>{data.name}</p>;
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <NavLink
            style={{ textDecoration: "none", color: "#000" }}
            to={`/stores/appointments/${store_id}`}
            
          >
            <div className="row dashboard-bottom-section pt-4">
              <div className="col-4 store-appointment-card ps-0">
                <div className="card">
                  <div className="card-body d-flex flex-column align-items-center">
                    <h5>Total appointments</h5>
                    <h1 className="my-auto mint">
                      {this.state.storeDetails.totalapps}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="card">
                  <div className="card-body d-flex flex-column align-items-center">
                    <h5>Today's appointments</h5>
                    <p style={{ fontSize: "80px" }} className="my-auto mint">
                      {this.state.storeDetails.todaysapps}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-4 pe-0">
                <div className="card">
                  <div className="card-body d-flex flex-column align-items-center">
                    <h5>Upcoming appointments</h5>
                    <p style={{ fontSize: "80px" }} className="my-auto mint">
                      {this.state.storeDetails.upcomingapps}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </div>

        <div
          style={{ textDecoration: "none", color: "#000" }}
          className="view-store-body"
        >
          {this.state.menuSelected === 1 && (
            <StoreMenu changeMenu={this.changeMenu} />
          )}
          {this.state.menuSelected === 2 && (
            <AssignManager
              changeMenu={this.changeMenu}
              store_id={store_id}
              getStoreManager={this.getStoreManager}
            />
          )}
          {this.state.menuSelected === 3 && (
            <AssignCleaner
              changeMenu={this.changeMenu}
              store_id={store_id}
              getStoreCleaners={this.getStoreCleaners}
            />
          )}
          {this.state.menuSelected === 4 && (
            <ServiceType changeMenu={this.changeMenu} store_id={store_id} />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(ViewStore);
