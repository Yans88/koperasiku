import React, { Component, Fragment } from "react";
import { Icon } from "rsuite";
import { connect } from "react-redux";
import { fetchDataDashboard } from "../Setting/settingSlice";
import NumberFormat from "react-number-format";

class Beranda extends Component {
  constructor(props) {
    super(props);
    this.initSelected = {
      id_category: "",
      category_name: "",
      id_operator: "",
    };
    this.state = {
      cms: 1,
      errMsg: { email: "" },
    };
  }

  componentDidMount() {
    this.props.onLoad(this.state);
  }
  render() {
    const { data, main } = this.props;
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Home</h1>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                {/* card start */}
                <div
                  className="card card-success shadow-lg"
                  style={{ minHeight: "800px" }}
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-4 col-xs-6">
                        <div className="small-box bg-aqua">
                          <div className="inner">
                            <h3>
                              {data.jml_pinjaman && (
                                <NumberFormat
                                  value={data.jml_pinjaman}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  displayType={"text"}
                                />
                              )}
                            </h3>
                            <p>
                              {main.type === 3
                                ? "Pinjaman Saya"
                                : "Uang Beredar"}
                            </p>
                          </div>
                          <div className="icon">
                            <Icon icon="credit-card" />
                          </div>
                          <a
                            href="/waiting_payment"
                            className="small-box-footer"
                          >
                            More info{" "}
                            <i className="fa fa-arrow-circle-right"></i>
                          </a>
                        </div>
                      </div>

                      {main.type === 1 && (
                        <Fragment>
                          <div className="col-lg-4 col-xs-6">
                            <div className="small-box bg-yellow">
                              <div className="inner">
                                <h3>{data.jml_agen}</h3>
                                <p>Agen</p>
                              </div>
                              <div className="icon">
                                <Icon icon="group" />
                              </div>
                              <a href="/data-agen" className="small-box-footer">
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                              </a>
                            </div>
                          </div>
                        </Fragment>
                      )}

                      {(main.type === 1 || main.type === 2) && (
                        <Fragment>
                          <div className="col-lg-4 col-xs-6">
                            <div className="small-box bg-green">
                              <div className="inner">
                                <h3>{data.jml_anggota}</h3>
                                <p>Anggota</p>
                              </div>
                              <div className="icon">
                                <Icon icon="people-group" />
                              </div>
                              <a
                                href="/data-anggota"
                                className="small-box-footer"
                              >
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                              </a>
                            </div>
                          </div>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: (param) => {
      dispatch(fetchDataDashboard(param));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    main: state.main.currentUser,
    data: state.settings.data || [],
  };
};

export default connect(mapStateToProps, mapDispatchToPros)(Beranda);
