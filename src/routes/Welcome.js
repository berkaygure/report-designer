import React, { Component } from 'react';
import Main from "../componenets/shared/Main/Main";
import Header from '../componenets/shared/Header/Header';
import Logo from '../netesnaf.svg';
import CreateModal from "../componenets/modals/CreateModal";


export default class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show:false
    }
  }

  render() {
    return (
      <div>
        <Header  history={this.props.history}/>
        <div className="container">

          <CreateModal history={this.props.history} open={this.state.show}/>
          <Main>
            <div className="jumbotron">
              <div className="row">
                <div className="col-md-6">
                  <h1 className="display-5">Net Esnaf Şablon Tasarımcı</h1>
                  <p className="lead">
                    Netesnaf şablon tasarımcına hoşgeldiniz.
                  </p>
                  <p>
                    <button onClick={() => this.setState({ show : true})} className="btn btn-success" role="button">Şimdi Şablon Oluşturun</button>
                  </p>
                </div>
                <div className="col-md-6 text-center">
                  <img style={{paddingLeft:50}}  src={Logo} alt={'net Esnaf'}/>
                </div>
              </div>

            </div>
          </Main>
        </div>
      </div>

    )
  }

}