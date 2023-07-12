import { Component } from "react";
import "./styles/LoginLayout.scss";
import { withRouter } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { connect } from 'react-redux'

class LoginLayout extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // clear token for login
    // localStorage.setItem('isloggedin', JSON.stringify(false));
    // localStorage.removeItem('eco_token');
    // delete axios.defaults.headers.common["Authorization"];
    // this.props.logout()
    // this.showSuccess()
    // console.log('login', this.props)
    // this.props.toster()
  }

  render() {
    return (
      <div className="login-layout">
        <div className="login-head "></div>

        <div className="login-body">
          <div className="login-body-inner">
            <h1>Log In</h1>

            <Formik
              initialValues={{
                email: "admin@eco.com",
                password: "123456",
              }}
              onSubmit={(values, onSubmitProps) => {
                // onSubmitProps.resetForm()
                // console.log(values);
                // var formData = new FormData();
                // formData.append("email", values["email"]);
                // formData.append("password", values["password"]);
                // axios.post('auth/login/', formData)
                //   .then(res => {
                //     // console.log(res.data.Data)
                //     this.props.loginUser(res.data.Data.access_token)
                //     // console.log("------>",localStorage.getItem('eco_token'));
                //     // axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('eco_token')
                //     this.props.history.push('/')
                //   })
                //   .catch(err => {
                //     console.log("user not found", err)
                //     localStorage.clear();
                //     delete axios.defaults.headers.common["Authorization"];
                //   })
              }}
            >
              <Form className="login">
                <div className="form-floating mb-3">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                  />
                  <label htmlFor="email">Email</label>
                  <ErrorMessage name="name">
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className="form-floating mb-3">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                  />
                  <label htmlFor="name">Password</label>
                  <ErrorMessage name="name">
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>
                </div>

                <button type="submit" className="btn-navy mx-auto m-5">Log In</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (data) => {
      dispatch({ type: "LOGIN_USER", data });
    },
    logout: () => {
      dispatch({ type: "LOGOUT_USER" });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginLayout));
