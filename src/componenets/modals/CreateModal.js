import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from "../shared/Modal";
import {INIT,CREATE} from '../../api';
import AlertBox from "../shared/AlertBox";
import { initApp } from '../../redux/actions';

const windowConfig = {
  title: 'Yeni Şablon Oluştur',
};

class CreateModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fileTypes: [],
      pageSizes: [],
      template: {
        title: '',
        type: null,
        page: null,
        orientation: 'v',
        pageCount: 1
      },
      loading: false,
      valid: false,
      error: false,
      errorMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.createAction = this.createAction.bind(this);
  }

  componentDidMount() {
    const that = this;
    axios.get(INIT)
      .then(response => {
        that.setState({
          fileTypes: response.data.fileTypes,
          pageSizes: response.data.pageSizes
        });
      })
  }

  createAction() {
    const that = this;
    this.setState({loading: true, error: false, errorMessage:''});
    if (this.state.valid) {
      axios.post(CREATE,this.state.template)
        .then(response => {
          that.setState({loading: false, error: !response.data.success, errorMessage:response.data.message});
          const app = {
            app : {
              ...this.state.template,
              id: response.data.id,
              ...response.data.app
            },
            tools: response.data.tools,
            toolGroups : response.data.toolGroups
          };
          this.props.initApp(app);
          window.$(`#createNewModal`).modal('hide');
          this.props.history.push(`/edit/${response.data.id}`);
        })
        .catch(error => {
          that.setState({loading: false, error: true, errorMessage:'Veriler gönderilirken hata!'});
          console.log(error);
        })
    }else{
      that.setState({loading: false, error: true, errorMessage:'Lütfen tüm zorunlu alanları doldurun'});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      template: {
        ...this.state.template,
        [name]: value,
      }
    }, () => {
      this.setState({
        valid: this.state.template.title !== '' && this.state.template.page !== null && this.state.template.type !== null
      })
    });
  }

  render() {
    return (
      <Modal title={windowConfig.title} id={'createNewModal'} open={this.props.open}
             footer={<button onClick={this.createAction} type="button"
                             disabled={this.state.loading || !this.state.valid}
                             className="btn btn-primary"> {this.state.loading ?
               <span><i className='fa fa-circle-o-notch fa-spin'/> Oluşturuluyor</span> :
               <span>Oluştur</span>} </button>}>
        {this.state.error ?
          <AlertBox title={'Hata Oluştu'} type={'danger'} message={this.state.errorMessage}/>
          : null}
        <div className="form-group">
          <label htmlFor="templateName">Şablon Başlığı</label>
          <input name='title' id={'templateName'} onChange={this.handleChange} value={this.state.template.title}
                 type="text" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="templateId">Şablon Tipi</label>
          <select onChange={this.handleChange} name='type' value={this.state.template.type} id='templateId'
                  className={'form-control'}>
            <option>Seçiniz</option>
            {this.state.fileTypes.map(type => (
              <option key={type.id} value={type.id}>{type.title}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="templatePage">Sayfa Tipi</label>
          <select onChange={this.handleChange} name='page' value={this.state.template.page} id='templatePage'
                  className={'form-control'}>
            <option>Seçiniz</option>
            {this.state.pageSizes.map(page => (
              <option key={page.id} value={page.id}>{page.title}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="templatePageCount">Sayfa Adedi</label>
          <select onChange={this.handleChange} name='pageCount' value={this.state.template.pageCount} id='templatePageCount'
                  className={'form-control'}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor="">Sayfa Şekli</label>
        </div>
        <div className="form-inline">

          <div className='form-group'>
            <div className="radio">
              <label htmlFor="dikey" className="radio-inline control-label">
                <input onChange={this.handleChange} type="radio" id="dikey" name="orientation" checked={this.state.template.orientation === 'v'} value="v"/>
                <div>
                  <div style={{width: 85, textAlign: 'center'}}>Dikey</div>
                  <div style={{
                    marginLeft: 10,
                    width: 75,
                    height: 100,
                    backgroundColor: 'white',
                    border: 'thin solid #ccc'
                  }}/>
                </div>
              </label>

            </div>
            <div className="radio" style={{marginLeft: 10}}>
              <label htmlFor="yatay" className="radio-inline control-label">
                <input onChange={this.handleChange} type="radio" id="yatay" name="orientation" checked={this.state.template.orientation === 'h'} value="h"/>
                <div>
                  <div style={{width: 110, textAlign: 'center'}}>Yatay</div>
                  <div style={{
                    marginLeft: 10,
                    width: 100,
                    height: 75,
                    backgroundColor: 'white',
                    border: 'thin solid #ccc'
                  }}/>
                </div>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}
const mapStateToProps = state => {
  return {

  };
};
export default connect(mapStateToProps, { initApp })(CreateModal);