import React, { Component } from "react";
import { Container, Content } from "rsuite";
import { MyHeader, MySidebar } from "../Template";

import "moment/locale/id";
import { connect } from "react-redux";
import { onLogout, fetchUserBytoken } from "../features/main/mainSlice";

class Main extends Component {
  componentDidMount() {
    this.fetchProfileAdmin();
  }

  fetchProfileAdmin = () => {};

  render() {
    const { children } = this.props;

    document.getElementById("root").classList.remove("login-page");
    document.getElementById("root").classList.remove("hold-transition");
    document.getElementById("root").classList.add("bg-sidebar");
    document.getElementById("root").className += " sidebar-mini";
    return (
      <div>
        <div className="show-container">
          <Container>
            <MyHeader></MyHeader>
            <Container>
              <MySidebar />
              <Content>{children}</Content>
            </Container>
          </Container>
        </div>
      </div>
    );
  }
}
const mapDispatchToPros = (dispatch) => {
  return {
    fetchDataAdmin: () => {
      dispatch(fetchUserBytoken());
    },
    logOut: () => {
      dispatch(onLogout());
    },
  };
};
const mapStateToProps = (state) => ({
  user: state.main.currentUser,
});
export default connect(mapStateToProps, mapDispatchToPros)(Main);
