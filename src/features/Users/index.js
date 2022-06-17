import React, { Component, Fragment } from "react";
import { Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
  fetchData,
  addForm,
  addData,
  clearError,
  confirmDel,
  closeForm,
  deleteData,
} from "./usersSlice";
import NumberFormat from "react-number-format";
import ReactDatatable from "@ashvin27/react-datatable";
import AppModal from "../../components/modal/MyModal";
import AppButton from "../../components/button/Button";
import { AppSwalSuccess } from "../../components/modal/SwalSuccess";

class Users extends Component {
  constructor(props) {
    super(props);
    this.initSelected = {
      type: 1,
      name: "",
      phone: "",
      password: "",
      email: "",
    };
    this.state = {
      sort_order: "ASC",
      sort_column: "name",
      keyword: "",
      page_number: 1,
      type: 1,
      per_page: 10,
      selected: this.initSelected,
      errMsg: this.initSelected,
      loadingForm: false,
    };
  }

  componentDidMount() {
    this.props.onLoad(this.state);
  }

  handleClose = () => {
    this.props.closeModal();
    this.setState({
      errMsg: {},
      selected: this.initSelected,
      loadingForm: false,
    });
  };

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

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      selected: {
        ...this.state.selected,
        [name]: value,
      },
    });
    this.setState({ errMsg: this.initSelected });
    this.props.resetError();
  }

  discardChanges = () => {
    this.setState({
      errMsg: {},
      selected: this.initSelected,
      loadingForm: false,
    });

    this.props.showForm();
  };

  editRecord = (record) => {
    this.setState({
      loadingForm: false,
      errMsg: this.initSelected,
      selected: { ...record },
    });
    this.props.showForm(true);
  };

  deleteRecord = (record) => {
    this.props.showConfirmDel(true);
  };

  handleSubmit() {
    var errors = this.state.errMsg;
    this.setState({
      ...this.state,
      loadingForm: true,
    });
    errors.name = !this.state.selected.name ? "Name required" : "";
    errors.email = !this.state.selected.email ? "Email required" : "";
    errors.password = !this.state.selected.password ? "Password required" : "";
    errors.password =
      this.state.selected.password.length < 6 && !errors.password
        ? "The password must be at least 6 characters."
        : "";
    errors.email =
      !new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
        this.state.selected.email
      ) && !errors.email
        ? "Format email invalid"
        : "";

    this.setState({ errors });
    if (this.validateForm(this.state.errMsg)) {
      this.props.onAdd(this.state.selected);
    } else {
      console.error("Invalid Form");
    }
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }

  handleDelete() {
    this.props.onDelete(this.state.selected);
  }

  render() {
    const { data } = this.props;
    const { selected, errMsg } = this.state;

    const columns = [
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
        key: "name",
        text: "Name",
        align: "center",
        sortable: true,
      },
      {
        key: "email",
        text: "Email",
        align: "center",
        sortable: true,
      },
      {
        key: "phone",
        text: "Phone",
        align: "center",
        sortable: true,
      },
      {
        key: "action",
        text: "Action",
        width: 140,
        align: "center",
        sortable: false,
        cell: (record) => {
          return (
            <div style={{ textAlign: "center" }}>
              <Fragment>
                <button
                  className="btn btn-xs btn-success"
                  onClick={(e) => this.editRecord(record)}
                  style={{ marginRight: "5px" }}
                >
                  <i className="fa fa-edit"></i> Edit
                </button>
                <button
                  className="btn btn-danger btn-xs"
                  onClick={() => this.deleteRecord(record)}
                >
                  <i className="fa fa-trash"></i> Delete
                </button>
              </Fragment>
            </div>
          );
        },
      },
    ];
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
    const frmUser = (
      <Form id="myForm">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          {this.props.errorPriority ? (
            <span className="float-right text-error badge badge-danger">
              {this.props.errorPriority}
            </span>
          ) : (
            ""
          )}
          {errMsg.name ? (
            <span className="float-right text-error badge badge-danger">
              {errMsg.name}
            </span>
          ) : (
            ""
          )}
          <Form.Control
            size="sm"
            autoComplete="off"
            name="name"
            type="text"
            value={selected.name}
            onChange={this.handleChange.bind(this)}
            placeholder="Name"
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>

          <NumberFormat
            name="phone"
            onChange={this.handleChange.bind(this)}
            className="form-control form-control-sm"
            value={selected.phone}
            thousandSeparator={false}
            decimalScale={0}
            inputMode="numeric"
            required
            autoComplete="off"
            placeholder="Phone"
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            {errMsg.email ? (
              <span className="float-right text-error badge badge-danger">
                {errMsg.email}
              </span>
            ) : (
              ""
            )}
            <Form.Control
              disabled={selected.id ? true : false}
              size="sm"
              autoComplete="off"
              name="email"
              type="text"
              value={selected.email}
              onChange={this.handleChange.bind(this)}
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="password">
            <Form.Label>Password</Form.Label>
            {errMsg.password ? (
              <span className="float-right text-error badge badge-danger">
                {errMsg.password}
              </span>
            ) : (
              ""
            )}
            <Form.Control
              size="sm"
              autoComplete="off"
              name="password"
              type="text"
              value={selected.password}
              onChange={this.handleChange.bind(this)}
              placeholder="Password"
            />
          </Form.Group>
        </Form.Row>
      </Form>
    );

    const contentDelete = (
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<div id="caption" style="padding-bottom:20px;">Apakah anda yakin <br/>akan menghapus data ini ?</div>',
        }}
      />
    );
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Users</h1>
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
                    <AppButton
                      isLoading={this.props.isLoading}
                      theme="info"
                      onClick={this.discardChanges}
                      icon="add"
                    >
                      Add
                    </AppButton>
                  </div>
                  <div className="card-body">
                    {data ? (
                      <ReactDatatable
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
          show={this.props.showFormAdd}
          form={frmUser}
          size="xs"
          backdrop={false}
          keyboard={false}
          title="Add/Edit Users"
          titleButton="Save change"
          themeButton="success"
          handleClose={this.handleClose}
          isLoading={
            this.props.isAddLoading
              ? this.props.isAddLoading
              : this.state.loadingForm
          }
          formSubmit={this.handleSubmit.bind(this)}
        ></AppModal>
        <AppModal
          show={this.props.showFormDelete}
          size="xs"
          form={contentDelete}
          handleClose={this.handleClose}
          backdrop="static"
          keyboard={false}
          title="Delete Users"
          titleButton="Delete Users"
          themeButton="danger"
          isLoading={this.props.isAddLoading}
          formSubmit={this.handleDelete.bind(this)}
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
            handleClose={
              this.props.isError
                ? this.props.closeSwalError
                : this.props.closeSwal
            }
          ></AppSwalSuccess>
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.usersAdm.data || [],
  totalData: state.usersAdm.totalData,

  isError: state.usersAdm.isError,
  isLoading: state.usersAdm.isLoading,
  isAddLoading: state.usersAdm.isAddLoading,
  showFormAdd: state.usersAdm.showFormAdd,
  errorPriority: state.usersAdm.errorPriority || null,
  contentMsg: state.usersAdm.contentMsg || null,
  showFormSuccess: state.usersAdm.showFormSuccess,
  showFormDelete: state.usersAdm.showFormDelete,
  tipeSWAL: state.usersAdm.tipeSWAL,
  user: state.main.currentUser,
});
const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: (param) => {
      dispatch(fetchData(param));
    },
    showForm: () => {
      dispatch(addForm());
    },
    showConfirmDel: (data) => {
      dispatch(confirmDel(data));
    },
    onAdd: (param) => {
      dispatch(addData(param));
    },
    onDelete: (param) => {
      dispatch(deleteData(param));
    },
    closeModal: () => {
      dispatch(closeForm());
    },
    resetError: () => {
      dispatch(clearError());
    },
    closeSwal: () => {
      dispatch(closeForm());
      const queryString = {
        type: 1,
        sort_order: "ASC",
        sort_column: "name",
        per_page: 10,
      };
      dispatch(fetchData(queryString));
    },
    closeSwalError: () => {
      dispatch(closeForm());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPros)(Users);
