import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserBytoken } from "../main/mainSlice";
import {
  fetchData,
  addData,
  clearError,
  closeForm,
  chgProps,
} from "./settingSlice";
import { AppSwalSuccess } from "../../components/modal/SwalSuccess";
import { Placeholder, Alert } from "rsuite";
import { Col, Form } from "react-bootstrap";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import AppButton from "../../components/button/Button";
import NumberFormat from "react-number-format";

class Setting extends Component {
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

  handleClose = () => {
    this.props.closeModal();
    this.setState({
      errMsg: {},
      selected: this.initSelected,
      loadingForm: false,
    });
  };

  handleChange(evt) {
    this.setState({ errMsg: { email: "" } });
    const name = evt.target.name;
    var value = evt.target.value;
    const dt = {};
    dt["key"] = name;
    dt["value"] = value;
    this.props.changeProps(dt);
  }

  handleChangeDesk(name, value) {
    const dt = {};
    dt["key"] = name;
    dt["value"] = value;
    this.props.changeProps(dt);
  }

  handleSubmit() {
    var errors = this.state.errMsg;
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    //console.log(this.props.data.send_mail);
    if (this.props.data.send_mail) {
      if (!pattern.test(this.props.data.send_mail)) {
        errors.email = "Please enter valid email address";
      }
    }
    this.setState({ errors });
    if (this.validateForm(this.state.errMsg)) {
      this.props.onAdd(this.props.data);
    } else {
      console.error("Invalid Form");
      Alert.error(this.state.errMsg.email, 5000);
    }
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }

  closeSwal() {
    this.props.closeSwal();
  }

  render() {
    const { data } = this.props;
    const { Paragraph } = Placeholder;
    const { errMsg } = this.state;

    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Setting</h1>
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
                  style={{ minHeight: "670px" }}
                >
                  <div className="card-body">
                    {this.props.isLoading ? (
                      <Paragraph
                        rowHeight={25}
                        rowMargin={30}
                        rows={10}
                        active
                        style={{ marginTop: 30 }}
                      />
                    ) : (
                      <Form>
                        <Form.Row>
                          <Form.Group as={Col} controlId="send_mail">
                            {errMsg.email ? (
                              <span className="float-right text-error badge badge-danger">
                                {errMsg.email}
                              </span>
                            ) : (
                              ""
                            )}
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              value={data.send_mail}
                              autoComplete="off"
                              onChange={this.handleChange.bind(this)}
                              size="md"
                              name="send_mail"
                              type="text"
                              placeholder="Email"
                            />
                          </Form.Group>

                          <Form.Group as={Col} controlId="mail_pass">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              value={data.mail_pass}
                              autoComplete="off"
                              onChange={this.handleChange.bind(this)}
                              size="md"
                              name="mail_pass"
                              type="text"
                              placeholder="Password"
                            />
                          </Form.Group>

                          <Form.Group as={Col} controlId="suku_bunga">
                            <Form.Label>Suku Bunga(%) / Cicilan</Form.Label>
                            <NumberFormat
                              name="suku_bunga"
                              onChange={this.handleChange.bind(this)}
                              className="form-control form-control-sm"
                              value={data.suku_bunga}
                              thousandSeparator={false}
                              decimalScale={0}
                              inputMode="numeric"
                              autoComplete="off"
                              placeholder="Suku Bunga(%)"
                            />
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group
                            as={Col}
                            xs={12}
                            controlId="content_forgotPass"
                          >
                            <Form.Label>Content Forgot Password</Form.Label>
                            <SunEditor
                              defaultValue={data.content_forgotPass}
                              setContents={data.content_forgotPass}
                              onChange={this.handleChangeDesk.bind(
                                this,
                                "content_forgotPass"
                              )}
                              setOptions={{
                                placeholder: "Content Forgot Password ...",
                                maxHeight: 250,
                                height: 250,
                                buttonList: [
                                  [
                                    "fontSize",
                                    "formatBlock",
                                    "bold",
                                    "underline",
                                    "italic",
                                    "align",
                                    "horizontalRule",
                                    "list",
                                    "lineHeight",
                                    "link",
                                    "strike",
                                    "subscript",
                                    "superscript",
                                    "codeView",
                                    "undo",
                                    "redo",
                                    "fontColor",
                                    "hiliteColor",
                                    "textStyle",
                                    "paragraphStyle",
                                    "blockquote",
                                    "removeFormat",
                                  ],
                                ],
                              }}
                            />
                          </Form.Group>
                        </Form.Row>

                        <AppButton
                          onClick={this.handleSubmit.bind(this)}
                          isLoading={this.props.isAddLoading}
                          type="button"
                          theme="success"
                        >
                          Update Data
                        </AppButton>
                      </Form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
  data: state.settings.data || [],
  isError: state.settings.isError,
  isLoading: state.settings.isLoading,
  isAddLoading: state.settings.isAddLoading,
  contentMsg: state.settings.contentMsg || null,
  showFormSuccess: state.settings.showFormSuccess,
  tipeSWAL: state.settings.tipeSWAL,
  user: state.main.currentUser,
});
const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: (param) => {
      dispatch(fetchUserBytoken());
      dispatch(fetchData(param));
    },
    onAdd: (param) => {
      dispatch(addData(param));
    },
    changeProps: (data) => {
      dispatch(chgProps(data));
    },
    resetError: () => {
      dispatch(clearError());
    },
    closeSwalError: () => {
      dispatch(closeForm());
      const queryString = {
        cms: 1,
      };
      dispatch(fetchData(queryString));
    },
    closeSwal: () => {
      dispatch(closeForm());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPros)(Setting);
