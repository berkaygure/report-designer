import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from "../shared/Modal";
import { initApp, previewModal } from '../../redux/actions';
import {PREVIEW,SHOW_PREVIEW} from "../../api/index";

const windowConfig = {
  title: 'Önizle',
};

class PreviewModal extends Component {

  constructor(props){
    super(props);

    this.changeNewLine = this.changeNewLine.bind(this);
    this.addRow = this.addRow.bind(this);
    this.preview = this.preview.bind(this);
    this.changeElement = this.changeElement.bind(this);


    this.state = {
      invoice_lines: [],
      newItem: {

      },
      loading: false
    };
  }

  componentWillReceiveProps(){
    const elements = {};
    this.props.elements.filter((x) => x.element_type !== 'table').map((e, index) => {
      if(e.group === 'special') {
        elements[e.db_field] = e.properties.content;
      }else{
        if(this.state.elements !== undefined && this.state.elements[e.db_field] !== undefined){
          elements[e.db_field] = '';

        }
      }
      return e;
    });
    this.setState({
      ...elements
    });
  }


  changeNewLine(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      newItem: {
        ...this.state.newItem,
        [name]: value
      }
    });
  }

  preview(){
    const post = {
      data: this.state,
      layout: this.props.elements,
      paper : this.props.paper
    };
    console.log(post);
    const that = this;
    this.setState({
      loading:true
    });
    axios.post(PREVIEW, post)
      .then(response => {
        that.setState({
          loading:false
        },()=> {
          window.$(`#previewModal`).modal('hide');
          window.open(`${SHOW_PREVIEW}&id=${response.data.url}`,'_blank');
        })
      })
      .catch(error => {
        console.log(error);
        that.setState({
          loading:false
        })
      })
  }

  addRow(){
    const newItem = {};
    this.props.tableColumns.columns.map(col => {
       newItem[`${col.id}`] = "";
       return col;
    });
    this.setState({
      invoice_lines: [
        ...this.state.invoice_lines,
        {
          ...this.state.newItem
        }
      ],
      newItem
    })
  }

  deleteRow(index){
    this.setState({
      invoice_lines:this.state.invoice_lines.filter((item,i) => i!== index)
    })
  }

  changeElement(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {

    return (
      <Modal size={'modal-lg'} onClose={ () => { this.props.previewModal(false) }} title={windowConfig.title} id={'previewModal'} open={this.props.open}
             footer={<button onClick={()=>{this.preview()}} type="button"
                             disabled={this.state.loading}
                             className="btn btn-primary"> {this.state.loading ?
               <span><i className='fa fa-circle-o-notch fa-spin'/> Oluşturuluyor</span> :
               <span>Oluştur</span>} </button>}>
        {this.props.elements.filter((x) => x.element_type !== 'table' && x.group !== 'special' ).map((e, index) =>
          <div className="form-group">
            <label htmlFor={e.db_field}>{e.title}</label>
            <input name={e.db_field} id={e.db_field} placeholder={e.title} onChange={this.changeElement} value={this.state[e.db_field]} type="text" className="form-control"/>
          </div>
        )}
        {this.props.tableDropped ?
          <div className="form-group">
            <label>Tablo ayarı</label>
            <div>

              <table className={'table table-condensed'}>
                <thead>
                  <tr>
                    {this.props.tableColumns.columns.map(col => (
                      <th>
                        {col.title}
                      </th>
                    ))}
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.invoice_lines.map((row,i) =>  (
                  <tr>
                    {this.props.tableColumns.columns.map(col => (
                      <th>
                        <input value={row[`${col.id}`]} className={'form-control form-control-warning'} type={'text'} placeholder={col.title}/>
                      </th>
                    ))}
                    <th>
                      <button onClick={()=>{  this.deleteRow(i) }} className="btn btn-danger btn-block">Sil</button>
                    </th>
                  </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                  {this.props.tableColumns.columns.map(col => (
                    <th>
                      <input name={`${col.id}`} value={this.state.newItem[`${col.id}`]} onChange={this.changeNewLine}  className={'form-control'} type={'text'} placeholder={col.title}/>
                    </th>
                  ))}
                  <th><button onClick={this.addRow} className="btn btn-primary btn-block">Ekle</button></th>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>
          : null}
      </Modal>
    )
  }
}
const mapStateToProps = state => {
  return {
    elements: state.elements.elements,
    tableDropped: state.elements.tableDropped,
    paper: state.paper,
    tableColumns: state.elements.elements.find(x => x.element_type === 'table'),
  };
};
export default connect(mapStateToProps, { initApp, previewModal })(PreviewModal);