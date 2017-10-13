import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from '../componenets/shared/Header/Header';
import Tools from '../componenets/shared/Tools/Tools';
import Properties from '../componenets/shared/Properties/Properties';
import Main from "../componenets/shared/Main/Main";
import Loading from "../componenets/shared/Loading";
import Paper from "../componenets/elements/Paper/Paper";
import {OPEN_APP} from "../api/index";
import {initApp, previewModal} from "../redux/actions/index";
import PreviewModal from '../componenets/modals/PreviewModal';

class Application extends Component {

  constructor(props) {
    super(props);
  }


  componentDidMount() {

    const that = this;
    if(this.props.app.app === null) {
      axios.post(OPEN_APP,{id:that.props.match.params.id})
        .then(response => {
          that.props.initApp(response.data);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }


  render() {
    return (
      <div>
        <Header  match={this.props.match}/>

        <div className="container-fluid">

        {this.props.app.app === null ? <Loading/> : null}
        <div className="row">
          <Tools/>
          <Main className={'col-sm-7 offset-sm-3 col-md-8 offset-md-2'}>
            <Paper w={this.props.paper.w}/>
          </Main>
          <PreviewModal open={this.props.app.previewModal}/>
          <Properties/>
        </div>
      </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    app: state.application,
    paper: state.paper,

  }
};
export default connect(mapStateToProps,{initApp, previewModal})(Application);