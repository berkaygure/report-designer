import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { initApp, previewModal, saveState } from "../../../redux/actions/index";
import Logo from "../../../netesnaf.svg";
import "./Header.css";
import { SAVE } from "../../../api/index";

class Header extends Component {
  constructor(props) {
    super(props);
    this.saveApp = this.saveApp.bind(this);
    this.state = {
      loading: false,
      text: ""
    };
    document.addEventListener("keyup", this.handleKeyDown.bind(this));
  }
  handleKeyDown(key) {
    if (key.keyCode === 83 && key.ctrlKey) {
      this.saveApp();
    }
    if (key.keyCode === 80 && key.ctrlKey) {
      this.props.previewModal(true);
    }
  }
  saveApp() {
    this.setState({
      loading: true,
      text: "Kaydediliyor..."
    });
    axios
      .post(SAVE, { ...this.props.elements, id: this.props.match.params.id })
      .then(response => {
        this.setState({
          loading: false,
          text: "Kaydedildi."
        });
        this.props.saveState(true);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          text: "Kaydederken Hata Oluştu."
        });
      });
  }

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-white fixed-top">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand">
          <img src={Logo} width={32} height={32} alt={"Net Esnaf Tasarımcı"} />{" "}
          Net Esnaf Tasarımcı{" "}
          {this.props.app !== null ? (
            <small>[{this.props.app.title}]</small>
          ) : null}
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link">
                {this.props.app !== null ? (
                  this.props.save ? (
                    this.state.loading ? (
                      <span>
                        <i className="fa fa-circle-o-notch fa-spin" />{" "}
                        {this.state.text}
                      </span>
                    ) : (
                      <span>
                        {" "}
                        <i className="fa fa-check" />
                        &nbsp; {this.state.text}
                      </span>
                    )
                  ) : null
                ) : null}
              </a>
            </li>
          </ul>

          <form className="form-inline my-2 my-lg-0">
            {this.props.app !== null ? (
              <div>
                <button
                  className="btn btn-light my-2 my-sm-0"
                  type="button"
                  onClick={() => {
                    this.props.previewModal(true);
                  }}
                >
                  <i className="fa fa-play" />
                  &nbsp; Önizle
                </button>{" "}
                &nbsp;
                <button
                  onClick={this.saveApp}
                  className="btn btn-light my-2 my-sm-0"
                  type="button"
                >
                  {this.state.loading ? (
                    <span>
                      <i className="fa fa-circle-o-notch fa-spin" />{" "}
                      Kaydediliyor...
                    </span>
                  ) : (
                    <span>
                      {" "}
                      <i className="fa fa-file-text-o" />
                      &nbsp; Kaydet
                    </span>
                  )}
                </button>{" "}
                &nbsp;
              </div>
            ) : null}
          </form>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    elements: state.elements,
    app: state.application.app,
    save: state.application.save
  };
};

export default connect(
  mapStateToProps,
  { initApp, previewModal, saveState }
)(Header);
