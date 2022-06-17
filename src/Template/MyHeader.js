import React, { Component } from "react";
import { Dropdown, Header, Icon, Nav, Navbar } from "rsuite";
import { connect } from "react-redux";
import {
  clickExpand,
  onLogout,
  setDefaultOpenKeys,
  fetchUserBytoken,
} from "../features/main/mainSlice";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

class MyHeader extends Component {
  componentDidMount() {
    this.props.fetchDataAdmin();
    const token = localStorage.getItem(tokenLogin);
    if (!token) <Redirect to="/login" />;
  }

  handleToggle() {
    this.props.onClickExpand();
  }
  handleLogout() {
    this.props.logOut();
    <Redirect to="/login" />;
  }

  render() {
    return (
      <Header>
        <Navbar appearance="inverse" className="my-navbar1">
          <Navbar.Header>
            <Link to="/" className="navbar-brand logo">
              <b>Koperasiku</b>
            </Link>
          </Navbar.Header>
          <Navbar.Body>
            <Nav>
              <Nav.Item
                icon={<Icon icon="bars" />}
                onClick={this.handleToggle.bind(this)}
                className="drawwer"
              ></Nav.Item>
            </Nav>

            <Nav pullRight>
              <Dropdown
                className="show dr-logout"
                icon={<Icon icon="user-o" size="lg" />}
                title={this.props.user.name ? this.props.user.name : "Account"}
              >
                <Dropdown.Item
                  onClick={this.handleLogout.bind(this)}
                  className="dropdown-menuu"
                  icon={<Icon icon="sign-out" />}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </Header>
    );
  }
}
const mapDispatchToPros = (dispatch) => {
  return {
    onClickExpand: () => {
      dispatch(clickExpand());
    },
    logOut: () => {
      dispatch(onLogout());
    },
    onLoad: (dt) => {
      dispatch(setDefaultOpenKeys(dt));
    },
    fetchDataAdmin: (payload) => {
      dispatch(fetchUserBytoken(payload));
    },
  };
};
const mapStateToProps = (state) => ({
  user: state.main.currentUser,
});
export default connect(mapStateToProps, mapDispatchToPros)(MyHeader);
