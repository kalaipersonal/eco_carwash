import { Component } from "react";
import { Route, Switch, withRouter } from "react-router";
import CreateStore from "./Components/createStore/CreateStore";
import ListStores from "./Components/listStores/ListStores";
import ViewStore from "./Components/viewStore/ViewStore";
import StoreAppointments from "./Components/viewStore/Components/storeAppointments/StoreAppointments";
import StoreLeaves from "../storeLeaves/StoreLeaves";

import Popupdatas from "./Components/serviceType/popupdatasmale/Popupdatas";
 

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
                    <Route path={`${url}/:id`} component={ViewStore} />
                    <Route path="/pop" component={Popupdatas}/>
                    </Switch>
            </div>
        )
    }
}

export default withRouter(StoreLayout);