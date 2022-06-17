import React, { Component } from "react";
import { Dropdown, Nav, Sidebar, Sidenav, Icon } from "rsuite";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MySidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { lastSegmentUrl: "" };
  }

  componentDidMount = async () => {
    const location = window.location.href;
    const BaseName = location.substring(location.lastIndexOf("/") + 1);
    await this.setState({ lastSegmentUrl: BaseName });
  };

  handleMenu = async (dt) => {
    await this.setState({ lastSegmentUrl: dt });
  };

  render() {
    const { expandMenu, currentUser } = this.props.main;
    const { lastSegmentUrl } = this.state;
    return (
      <div>
        <Sidebar
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(31, 30, 30)",
          }}
          width={expandMenu ? 230 : 56}
          collapsible
        >
          <Sidenav
            className="my-sidebar"
            expanded={expandMenu}
            //defaultOpenKeys={[`${defaultOpenKeys}`]}
            appearance="subtle"
          >
            <Sidenav.Body>
              {expandMenu ? (
                <h5
                  style={{ textAlign: "center", fontWeight: 600, fontSize: 16 }}
                >
                  Selamat datang <br />
                  dihalaman Administrator
                </h5>
              ) : (
                ""
              )}

              <Nav>
                <Nav.Item
                  onSelect={(e) => this.handleMenu("/")}
                  componentClass={Link}
                  to="/"
                  eventKey="/"
                  exact="/"
                  className={
                    lastSegmentUrl === "/" ||
                    lastSegmentUrl === "" ||
                    lastSegmentUrl === "cooljek"
                      ? "my-dropdown my-dropdown-active"
                      : "my-dropdown"
                  }
                  icon={<Icon icon="home" />}
                >
                  Home
                </Nav.Item>
                {currentUser.type === 1 ? (
                  <Nav.Item
                    onSelect={(e) => this.handleMenu("data_agen")}
                    componentClass={Link}
                    to={currentUser.type === 1 ? "/data_agen" : "/no_akses"}
                    exact={currentUser.type === 1 ? "/data_agen" : "/no_akses"}
                    eventKey={
                      currentUser.type === 1 ? "/data_agen" : "/no_akses"
                    }
                    className={
                      lastSegmentUrl === "data_agen"
                        ? "my-dropdown my-dropdown-active"
                        : "my-dropdown"
                    }
                    icon={<Icon icon="group" />}
                  >
                    Data Agen
                  </Nav.Item>
                ) : (
                  ""
                )}

                {currentUser.type === 1 || currentUser.type === 2 ? (
                  <Nav.Item
                    onSelect={(e) => this.handleMenu("data-anggota")}
                    componentClass={Link}
                    to="/data-anggota"
                    exact="/data-anggota"
                    eventKey="/data-anggota"
                    className={
                      lastSegmentUrl === "data-anggota"
                        ? "my-dropdown my-dropdown-active"
                        : "my-dropdown"
                    }
                    icon={<Icon icon="people-group" />}
                  >
                    Data Anggota
                  </Nav.Item>
                ) : (
                  ""
                )}

                
                  <Dropdown
                    eventKey="4"
                    trigger="hover"
                    title="Pinjaman"
                    icon={<Icon icon="shopping-bag" />}
                    placement="rightStart"
                    className={
                      lastSegmentUrl === "waiting_payment" ||
                      lastSegmentUrl === "payment" ||
                      lastSegmentUrl === "onprocess" ||
                      lastSegmentUrl === "completed" ||
                      lastSegmentUrl === "expired"
                        ? "my-dropdown my-dropdown-active"
                        : "my-dropdown"
                    }
                  >
                    <Dropdown.Item
                      onSelect={(e) => this.handleMenu("waiting_payment")}
                      componentClass={Link}
                      to="/waiting_payment"
                      exact="/waiting_payment"
                      className={
                        lastSegmentUrl === "waiting_payment"
                          ? "my-dropdown my-dropdown-active"
                          : "my-dropdown"
                      }
                      icon={<Icon icon="shopping-basket" />}
                      eventKey="4-1"
                    >
                      {" "}
                      Waiting Approve
                    </Dropdown.Item>
                    <Dropdown.Item
                      onSelect={(e) => this.handleMenu("payment")}
                      componentClass={Link}
                      to="/payment"
                      exact="/payment"
                      className={
                        lastSegmentUrl === "payment"
                          ? "my-dropdown my-dropdown-active"
                          : "my-dropdown"
                      }
                      icon={<Icon icon="money" />}
                      eventKey="4-2"
                    >
                      {" "}
                      Approved
                    </Dropdown.Item>
                   
                    <Dropdown.Item
                      onSelect={(e) => this.handleMenu("completed")}
                      componentClass={Link}
                      to="/completed"
                      exact="/completed"
                      className={
                        lastSegmentUrl === "completed"
                          ? "my-dropdown my-dropdown-active"
                          : "my-dropdown"
                      }
                      icon={<Icon icon="check-circle" />}
                      eventKey="4-4"
                    >
                      {" "}
                      Lunas
                    </Dropdown.Item>
                    <Dropdown.Item
                      onSelect={(e) => this.handleMenu("rejected")}
                      componentClass={Link}
                      to="/rejected"
                      exact="/rejected"
                      className={
                        lastSegmentUrl === "rejected"
                          ? "my-dropdown my-dropdown-active"
                          : "my-dropdown"
                      }
                      icon={<Icon icon="recycle" />}
                      eventKey="4-4"
                    >
                      {" "}
                      Rejected
                    </Dropdown.Item>
                  </Dropdown>
                

                {currentUser.type === 1 ? (
                  <Dropdown
                    eventKey="3"
                    trigger="hover"
                    title="Master Data"
                    icon={<Icon icon="list-ul" />}
                    placement="rightStart"
                    className={
                      lastSegmentUrl === "setting" ||
                      lastSegmentUrl === "users" ||
                      lastSegmentUrl === "level"
                        ? "my-dropdown my-dropdown-active"
                        : "my-dropdown"
                    }
                  >
                    <Dropdown.Item
                      onSelect={(e) => this.handleMenu("users")}
                      componentClass={Link}
                      to="/users"
                      exact="/users"
                      className={
                        lastSegmentUrl === "users"
                          ? "my-dropdown my-dropdown-active"
                          : "my-dropdown"
                      }
                      icon={<Icon icon="peoples" />}
                      eventKey="3-2"
                    >
                      {" "}
                      User Admin
                    </Dropdown.Item>
                    <Dropdown.Item
                      onSelect={(e) => this.handleMenu("setting")}
                      componentClass={Link}
                      to="/setting"
                      exact="/setting"
                      className={
                        lastSegmentUrl === "setting"
                          ? "my-dropdown my-dropdown-active"
                          : "my-dropdown"
                      }
                      icon={<Icon icon="cog" />}
                      eventKey="3-3"
                    >
                      {" "}
                      Setting
                    </Dropdown.Item>
                  </Dropdown>
                ) : (
                  ""
                )}
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </Sidebar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    main: state.main,
  };
};

export default connect(mapStateToProps)(MySidebar);
