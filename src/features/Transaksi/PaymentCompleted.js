import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchData,
  closeForm,
  receiveCicilan,
  historyCicilan,
} from "./transaksiSlice";
import { fetchUserBytoken } from "../main/mainSlice";
import ReactDatatable from "@ashvin27/react-datatable";
import NumberFormat from "react-number-format";
import moment from "moment";
import "moment/locale/id";
import AppModal from "../../components/modal/MyModal";
import { AppSwalSuccess } from "../../components/modal/SwalSuccess";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class PaymentCompleted extends Component {
  constructor(props) {
    super(props);
    this.initSelected = {
      id: "",
    };
    this.state = {
      sort_order: "ASC",
      sort_column: "id",
      keyword: "",
      page_number: 1,
      per_page: 10,
      loadingForm: false,
      showHistory: false,
      status: 2,
      selected: this.initSelected,
    };
  }

  componentDidMount() {
    this.props.onLoad(this.state);
  }

  tableChangeHandler = (data) => {
    let queryString = this.state;
    Object.keys(data).map((key) => {
      if (key === "sort_order" && data[key]) {
        queryString.sort_order = data[key].order;
        queryString.sort_column = data[key].column;
      }
      if (key === "page_number") {
        queryString.page_number = data[key];
      }
      if (key === "page_size") {
        queryString.per_page = data[key];
      }
      if (key === "filter_value") {
        queryString.keyword = data[key];
      }
      return true;
    });
    this.props.onLoad(this.state);
  };

  cicilan = (record) => {
    this.setState({
      approveForm: true,
      selected: { ...record },
    });
  };

  handleCicilan() {
    this.props.onApprove(this.state.selected);
    this.setState({
      approveForm: false,
    });
  }

  handleClose = () => {
    this.setState({
      approveForm: false,
      showHistory: false,
    });
  };

  pengajuan = (record) => {
    this.setState({
      selected: { ...record },
    });
    alert("On process");
  };

  rowClickedHandler = async (record) => {
    const qs = { id: record.id };
    this.props.oncLickRow(qs);
    this.setState({ showHistory: true });
  };

  render() {
    const { data, user, historyCicilan } = this.props;
    const { selected } = this.state;
    var columns = [
      {
        key: "no",
        text: "No.",
        width: 20,
        align: "center",
        sortable: false,
        cell: (row, index) => (
          <div style={{ textAlign: "center" }}>
            {(this.state.page_number - 1) * this.state.per_page +
              index +
              1 +
              "."}
          </div>
        ),
        row: 0,
      },
      {
        key: "created_at",
        text: "Date",
        align: "center",
        sortable: true,
        width: 130,
        cell: (record) => {
          return moment(new Date(record.created_at)).format("DD-MM-YYYY HH:mm");
        },
      },
      {
        key: "no_pinjaman",
        text: "No.Pinjaman",
        align: "center",
        sortable: true,
        width: 200,
        cell: (record) => {
          return (
            <div>
              <Fragment>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="tooltip-top">History Angsuran</Tooltip>}
                >
                  <Link to="#" onClick={(e) => this.rowClickedHandler(record)}>
                    {record.no_pinjaman}
                  </Link>
                </OverlayTrigger>
              </Fragment>
            </div>
          );
        },
      },
      {
        key: "name",
        text: "Anggota",
        align: "center",
        sortable: true,
      },
      {
        key: "alamat_penjemputan",
        text: "Rincian",
        align: "center",
        sortable: true,
        cell: (record) => {
          return (
            <div>
              <Fragment>
                <strong>Pokok Pinjaman :</strong>{" "}
                <NumberFormat
                  value={record.nominal}
                  thousandSeparator={true}
                  decimalScale={2}
                  displayType={"text"}
                />
                <br />
                <strong>Suku Bunga : </strong>
                {record.suku_bunga}%<br />
                <strong>Lama Angsuran : </strong>
                {record.lama_angsuran}x<br />
                <strong>Total Bunga :</strong>{" "}
                <NumberFormat
                  value={record.nominal_bunga}
                  thousandSeparator={true}
                  decimalScale={2}
                  displayType={"text"}
                />
                <br />
                <strong>Biaya Adm :</strong>{" "}
                <NumberFormat
                  value={record.biaya_adm}
                  thousandSeparator={true}
                  decimalScale={2}
                  displayType={"text"}
                />
              </Fragment>
            </div>
          );
        },
      },
      {
        key: "phone",
        text: "Phone",
        align: "center",
        width: 120,
        sortable: true,
      },
      {
        key: "total",
        text: "Total",
        width: 120,
        align: "center",
        sortable: true,
        cell: (record) => {
          return (
            <div style={{ textAlign: "right" }}>
              <Fragment>
                <strong>Cicilan :</strong>{" "}
                <NumberFormat
                  value={record.angsuran}
                  thousandSeparator={true}
                  decimalScale={2}
                  displayType={"text"}
                />
                <br />
                <NumberFormat
                  value={record.total}
                  thousandSeparator={true}
                  decimalScale={2}
                  displayType={"text"}
                />
              </Fragment>
            </div>
          );
        },
      },
    ];
    if (user.type === 2) {
      columns = [
        ...columns,
        {
          key: "action",
          text: "Action",
          width: 150,
          align: "center",
          sortable: false,
          cell: (record) => {
            return (
              <div style={{ textAlign: "center" }}>
                <Fragment>
                  <button
                    className="btn btn-xs btn-success"
                    onClick={(e) => this.cicilan(record)}
                    style={{ marginRight: "5px" }}
                  >
                    <i className="fa fa-check"></i> Bayar Cicilan
                  </button>
                </Fragment>
              </div>
            );
          },
        },
      ];
    }
    const config = {
      key_column: "id",
      page_size: 10,
      length_menu: [10, 20, 50],
      show_filter: true,
      show_pagination: true,
      pagination: "advance",
      button: {
        excel: false,
        print: false,
      },
      language: {
        loading_text: "Please be patient while data loads...",
      },
    };
    const contentDelete = (
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<div id="caption" style=padding-bottom:20px;">Apakah anda yakin <br/>telah mennerima pembayaran cicilan sebesar <strong>' +
            selected.angsuran +
            "</strong> ?</div>",
        }}
      />
    );

    const contentHistory = (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Angsuran ke</th>
            <th>Tgl Pembayaran</th>
            <th>Diterima oleh</th>
          </tr>
        </thead>
        <tbody>
          {historyCicilan
            ? historyCicilan.map((at, index) => {
                return (
                  <Fragment key={index}>
                    <tr>
                      <td>{at.angsuran_ke}</td>
                      <td>
                        {moment(new Date(at.created_at)).format(
                          "DD-MM-YYYY HH:mm"
                        )}
                      </td>
                      <td>{at.received_name}</td>
                    </tr>
                  </Fragment>
                );
              })
            : ""}
        </tbody>
      </table>
    );
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Pinjaman</h1>
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
                  <div className="card-header card-header-content">
                    <h1 className="card-title card-title-custom">Approved</h1>
                    {user.type === 3 && (
                      <div className="box-tools pull-right">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={(e) => this.pengajuan()}
                          style={{ marginRight: "5px" }}
                        >
                          Ajukan Pinjaman Baru
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    {data ? (
                      <ReactDatatable
                        className="table table-striped table-bordered"
                        config={config}
                        records={data}
                        columns={columns}
                        dynamic={true}
                        onChange={this.tableChangeHandler}
                        loading={this.props.isLoading}
                        total_record={this.props.totalData}
                      />
                    ) : (
                      <p>No Data ...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <AppModal
          show={this.state.approveForm}
          size="xs"
          form={contentDelete}
          handleClose={this.handleClose}
          backdrop="static"
          keyboard={false}
          title="Cicilan"
          titleButton="Ya, saya telah terima"
          themeButton="warning"
          isLoading={this.props.isAddLoading}
          formSubmit={this.handleCicilan.bind(this)}
        ></AppModal>
        <AppModal
          show={this.state.showHistory}
          size="xs"
          form={contentHistory}
          handleClose={this.handleClose}
          backdrop="static"
          keyboard={false}
          title="History Angsuran"
          noBtnAction={true}
        ></AppModal>
        {this.props.showFormSuccess ? (
          <AppSwalSuccess
            show={this.props.showFormSuccess}
            title={
              <div
                dangerouslySetInnerHTML={{ __html: this.props.contentMsg }}
              />
            }
            type={this.props.tipeSWAL}
            handleClose={this.props.closeSwal}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.transaksi.data || [],
  isError: state.transaksi.isError,
  isLoading: state.transaksi.isLoading,
  totalData: state.transaksi.totalData,
  showFormSuccess: state.transaksi.showFormSuccess,
  contentMsg: state.transaksi.contentMsg,
  tipeSWAL: state.transaksi.tipeSWAL,
  historyCicilan: state.transaksi.historyCicilan || [],
  user: state.main.currentUser,
});
const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: (param) => {
      dispatch(fetchUserBytoken());
      dispatch(fetchData(param));
    },
    onApprove: (param) => {
      dispatch(receiveCicilan(param));
    },
    oncLickRow: (param) => {
      dispatch(historyCicilan(param));
    },
    closeSwal: () => {
      const queryString = {
        sort_order: "DESC",
        sort_column: "id",
        per_page: 10,
        status: 2,
      };
      dispatch(fetchData(queryString));
      dispatch(closeForm());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPros)(PaymentCompleted);
