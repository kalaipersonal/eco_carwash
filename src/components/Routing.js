import { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import LoginLayout from "./login/LoginLayout";
import MainNav from "./mainNav/MainNav";
import SideNav from "./sideNav/SideNav";
import Dashboard from "./dashboard/DashboardLayout";
import StoreLayout from "./stores/StoreLayout";
import CustomerLayout from "./customer/CustomerLayout";
import GarageLayout from "./garage/GarageLayout";
import CleanerLayout from "./cleaner/CleanerLayout";
import ManagerLayout from "./manager/ManagerLayout";
import ECommerceLayout from "./ecommerce/ECommerceLayout";
import ConfigurationLayout from "./configuration/ConfigurationLayout";
import OrderLayout from "./orderdetails/OrderLayout";
import LeaveDetails from "./leavedetails/LeaveDetails";

let path;
class Routing extends Component {
  constructor(props) {
    super(props);
    path = this.props.location.pathname;
    if (!this.props.user.isloggedin) {
      this.props.history.push('/login')
    } else if (path === '/login') {
      this.props.history.push('/')
    }
    if (localStorage.hasOwnProperty('eco_token')) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('eco_token')
    }
  }

  render() {
    return (
      <div className="eco-body">
        {(this.props.user.isloggedin) ? <SideNav /> : null}
        <main>
          {(this.props.user.isloggedin) ? <MainNav /> : null}
          {
            this.props.menu.is_open ?
              <div
                id="fullscreenblocker"
                onClick={() => this.props.toggleMenu()}
              ></div>
              : null
          }
          <Switch>
            <Route exact path="/login"><LoginLayout /></Route>
            <div className="main-body">
              <Route exact path="/" component={Dashboard} />
              <Route path="/stores" component={StoreLayout} />
              <Route path="/customer" component={CustomerLayout} />
              <Route path="/garage" component={GarageLayout} />
              <Route path="/cleaner" component={CleanerLayout} />
              <Route path="/manager" component={ManagerLayout} />
              <Route path="/ecommerce" component={ECommerceLayout} />
              <Route path="/configuration" component={ConfigurationLayout} />
              <Route path="/orderdetails" component={OrderLayout} />
              <Route path="/leavedetails" component={LeaveDetails} />
            </div>
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    menu: state.menu
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMenu: () => {
      dispatch({ type: "TOGGLE_MENU" });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Routing));
