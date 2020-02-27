import React from "react";
import { connect } from "react-redux";

import { setCurrentUser } from "../../actions/authActions";
import { TextField, Button } from '@material-ui/core';
import "./Profile.css";
import logo from '../images/logo.png';
import HeaderSimple from './HeaderSimple';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: [] };
  }

  async componentDidMount() {
    await this.props.setCurrentUser();
    // if (!this.props.auth.isAuthenticated) {
    //   this.props.history.push("/");
    // }
  }
  render() {
    // const [query, changeQuery] = useState('');
    if (this.props.auth.isAuthenticated) {
      return (
        <>
        <div className="container">
      <HeaderSimple />
      <div className="contents">
        <img src={logo}  alt="Chefmate logo" />
        <br />
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          variant="outlined"
          className="searchField"
          // value={query}
          // onChange={handleQueryChange}
        />
        <Button
          variant="contained"
          className="buttonStyle"
          // onClick={makeSearch}
        >
          GO
        </Button>
      </div>
    </div>
    </>
      );
    } else return <div>Loading...</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(Profile);
