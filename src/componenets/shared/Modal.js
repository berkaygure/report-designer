import React, { Component } from 'react';

export default class Modal extends Component {

  componentDidMount() {
    this.toggleModal();
  }


  componentDidUpdate(){
    this.toggleModal();
  }

  toggleModal(){
    const that = this;
    if(that.props.onClose !== undefined){
      window.$(`#${this.props.id}`).on('hidden.bs.modal',  ()  => {
        that.props.onClose();
      })
    }

    if(this.props.open) {
      window.$(`#${this.props.id}`).modal('show');
    }else{
      window.$(`#${this.props.id}`).modal('hide');

    }
  }

  render() {
    return (
      <div id={this.props.id} className="modal"  role="dialog">
        <div className={`modal-dialog ${this.props.size}`} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              {this.props.footer}
              <button type="button" className="btn btn-default" data-dismiss="modal">Kapat</button>

            </div>
          </div>
        </div>
      </div>
    )
  }
}