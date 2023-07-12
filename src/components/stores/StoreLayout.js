import { Component } from "react";
import { Route, Switch, withRouter } from "react-router";
import CreateStore from "./Components/createStore/CreateStore";
import ListStores from "./Components/listStores/ListStores";
import ViewStore from "./Components/viewStore/Components/storeDashboard/StoreDashboard";
import StoreAppointments from './Components/storeAppointments/StoreAppointments';
import StoreLeaves from "./Components/storeLeaves/StoreLeaves";

let url;

class StoreLayout extends Component{
    constructor(props){
        super(props)
        url = this.props.match.path;
    }

    render(){
        return(
            <div style={{height: "100%"}}>
                <Switch>
                    <Route exact path={`${url}/`} component={ListStores} />
                    <Route exact path={`${url}/createstore`} component={CreateStore} />
                    <Route exact path={`${url}/appointments/:id`} component={StoreAppointments} />
                    <Route exact path={`${url}/storeleaves/:id`} component={StoreLeaves} />
                    <Route exact path={`${url}/:id`} component={ViewStore} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(StoreLayout);