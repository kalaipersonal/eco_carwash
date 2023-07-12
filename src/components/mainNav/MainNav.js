import { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Ecologo from '../../assets/ecologo.svg'
import { connect } from "react-redux";
import haircutlogo from '../../assets/hair_cut_logo.png';
let url;
class MainNav extends Component {
  constructor(props) {
    super(props)
  }

  // componentDidUpdate() {
  //   url = window.location.pathname.split('/')[1]
  // }

  render() {
    return (
      <nav className="navbar sticky-top main-nav" >
        <div className="container-fluid">
        <div className="img_logo" style={{display:"flex",alignItems:"center",justifyContent:"center",height:"50px",padding:"10px"}}>
          <img src={haircutlogo} alt="" style={{with:"50px",height:"70px"}}/>
          </div>
          {/* <a className="navbar-brand" href="#">
           
         
          </a> */}
         
          {
            (this.props.menu.is_nav_menu_shown) ?
              <div className="main-center-nav">
                <NavLink to="/configuration/services" activeClassName="active">Services</NavLink>
                <NavLink to="/configuration/leave" activeClassName="active">Leave</NavLink>
                <NavLink to="/configuration/coupons" activeClassName="active">Coupons</NavLink>
              </div>
              : null
          }
          <div className="nav-corner-align">
            <form>
              <input
                className="form-control me-2"
                type="search"
                aria-label="Search"
              />
              <i className="fas fa-search"></i>
            </form>
            <div className="nav-profile-picture ms-4 me-3" onClick={() => this.props.toggleMenu()}>
              <img src="https://picsum.photos/100" />
            </div>
            {
              (this.props.menu.is_open) ?
                <div className="nav-dropdown">
                  <div className="nav-dropdown-item">
                    <span className="me-3">
                      Dark Mode
                    </span>
                    <label className="customised-switch">
                      <input
                        type="checkbox"
                        checked={this.props.theme.is_dark}
                        onChange={() => this.props.toggleTheme()}
                      />
                      <span className="customised-slider customised-round"></span>
                    </label>
                  </div>
                  <div className="nav-dropdown-item" onClick={() => {
                    this.props.toggleMenu()
                    this.props.logout()
                    this.props.history.push('/login')
                  }}>
                    Logout <i className="fas fa-sign-out-alt ms-3"></i>
                  </div>
                </div>
                : null
            }
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    user: state.user,
    menu: state.menu
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTheme: () => {
      dispatch({ type: "TOGGLE_THEME" });
    },
    toggleMenu: () => {
      dispatch({ type: "TOGGLE_MENU" });
    },
    logout: () => {
      dispatch({ type: "LOGOUT_USER" });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainNav));