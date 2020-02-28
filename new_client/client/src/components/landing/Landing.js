import React from "react";
import { connect } from "react-redux";
import logo from '../../img/logo.png'
import { setCurrentUser } from "../../actions/authActions";
// import { makeStyles } from '@material-ui/core/styles';
import "./Landing.css";

import HomeScreen from '../../HomeScreen/HomeScreen';
import LoginBox from '../../HomeScreen/LoginBox';


class Landing extends React.Component {
  async componentDidMount() {
    await this.props.setCurrentUser();
  }
  render() {
    
    const { isAuthenticated, user } = this.props.auth;
    return (
      <>
      <HomeScreen></HomeScreen>
      
      <LoginBox>             
                      <img src={logo}  alt="Chefmate logo" />
                      {isAuthenticated ? (
                        <div>
                          <br />
                        </div>
                      ) : (
                        <div className="google-btn-container">
                          <a href="/auth/google">
                            <div className="google-btn">
                              <div className="google-icon-wrapper">
                                <img
                                  className="google-icon"
                                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                  alt="signin"
                                />
                              </div>
                              <p className="btn-text">
                                <b >Log in with Google</b>
                              </p>
                            </div>
                          </a>
                        </div>
                      )}
      </LoginBox>
      
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { setCurrentUser }
)(Landing);
