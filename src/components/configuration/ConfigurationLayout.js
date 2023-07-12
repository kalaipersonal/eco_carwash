import React, { Component } from 'react'
import { Switch, Route, Redirect, NavLink, withRouter } from "react-router-dom";

import ServiceLayout from "./components/service/ServiceLayout";
import LeaveConfig from "./components/leave/LeaveConfig";
import Coupons from './components/coupon/Coupons';

let url;
class ConfigurationLayout extends Component {
	constructor(props) {
		super(props);
		url = this.props.match.url;
	}
	
	render() {
		return (
			<div className="h-100 w-100">
				<Switch>
					<Redirect exact from={`${url}/`} to={`${url}/services`} />
					<Route exact path={`${url}/services`} component={ServiceLayout} />
					<Route exact path={`${url}/leave`} component={LeaveConfig} />
					<Route exact path={`${url}/coupons`} component={Coupons} />
				</Switch>
			</div>
		)
	}
}

export default withRouter(ConfigurationLayout)