import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from "../componenets/shared/Main/Main";
import {initApp, newModal} from "../redux/actions/index";
import Header from '../componenets/shared/Header/Header';
import Logo from '../netesnaf.svg';
import CreateModal from "../componenets/modals/CreateModal";
import Footer from "../componenets/shared/Footer/Footer";


class Welcome extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Header  history={this.props.history}/>
        <div className="container">

          <CreateModal history={this.props.history} open={this.props.app.newModal}/>
          <Main>
            <div className="jumbotron">
              <div className="row">
                <div className="col-md-6">
                  <h1 className="display-5">Net Esnaf Şablon Tasarımcı</h1>
                  <p className="lead">
                    Netesnaf şablon tasarımcına hoşgeldiniz.
                  </p>
                  <p>
                    <button onClick={() => this.props.newModal(true)} className="btn btn-success" role="button">Şimdi Şablon Oluşturun</button>
                  </p>
                </div>
                <div className="col-md-6 text-center">
                  <img style={{paddingLeft:50}}  src={Logo} alt={'net Esnaf'}/>
                </div>
              </div>

            </div>
          </Main>
        </div>
        <Footer/>
      </div>

    )
  }

}
const mapStateToProps = state => {
  return {
    app: state.application,

  }
};
export default connect(mapStateToProps,{initApp, newModal})(Welcome);