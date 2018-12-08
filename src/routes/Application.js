import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Header from "../components/shared/Header/Header";
import Tools from "../components/shared/Tools/Tools";
import Properties from "../components/shared/Properties/Properties";
import Main from "../components/shared/Main/Main";
import Loading from "../components/shared/Loading";
import Paper from "../components/elements/Paper/Paper";
import { OPEN_APP } from "../api/index";
import { initApp, previewModal } from "../redux/actions/index";
import PreviewModal from "../components/modals/PreviewModal";

class Application extends Component {
  componentDidMount() {
    const that = this;
    if (this.props.app.app === null) {
      axios
        .post(OPEN_APP, { id: that.props.match.params.id })
        .then(response => {
          that.props.initApp(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div>
        <Header match={this.props.match} />

        <div className="container-fluid">
          {this.props.app.app === null ? <Loading /> : null}
          <div className="row">
            <Tools />
            <Main className={"col-sm-7 offset-sm-3 col-md-8 offset-md-2"}>
              <Paper w={this.props.paper.w} />
            </Main>
            <PreviewModal open={this.props.app.previewModal} />
            <Properties />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    app: state.application,
    paper: state.paper
  };
};
export default connect(
  mapStateToProps,
  { initApp, previewModal }
)(Application);
