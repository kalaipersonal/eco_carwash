import { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux'

import Routing from './components/Routing';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className={this.props.theme.is_dark ? 'theme--dark' : 'theme--light'}>
        <div className="eco-app">
          <Router>
            <Routing />
          </Router>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)((App));
