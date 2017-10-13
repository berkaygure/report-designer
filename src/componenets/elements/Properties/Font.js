import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProperty } from '../../../redux/actions';
import CardAccordion from "../../shared/CardAccordion";

class Font extends Component {

  constructor(props) {
    super(props);
    this.sizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
    this.state = {
      size: this.props.activeElement.properties.font.size,
      fontFamily: '',
      bold: this.props.activeElement.properties.font.bold,
      italic: this.props.activeElement.properties.font.italic,
      underline: this.props.activeElement.properties.font.underline,
    };
    this.handleMe = this.handleMe.bind(this);
  }

  handleMe(setting) {
    this.setState(setting);
    const prop = {
      id: this.props.activeElement.id,
      properties: {
        ...this.props.activeElement.properties,
        font: {
          ...this.props.activeElement.properties.font,
          ...setting,
        },
      },
    };

    this.props.setProperty(prop);
  }

  handleSelectChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const settings = {
      fontFamily: value,
    };

    this.setState({ ...settings });
    this.handleMe(settings);
  }

  handleSize(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const settings = {
      size: value,
    };

    this.setState({ ...settings });
    this.handleMe(settings);
  }


  render() {
    return (
     <CardAccordion title={"Yazı Tipi Özellikleri"} parent={"accordionProperties"}>
       <div style={{padding:'6px 15px',margin: '0 auto',textAlign: 'left'}}>
         <div className="form-group row">
           <label htmlFor="xPos" className="col-6 col-form-label">Boyut</label>
           <div className="col-6 text-right">
             <div className="input-group input-group text-right">
               <select className={"form-control"} name="size" onChange={this.handleSize.bind(this)} value={this.state.size}>
                 {this.sizes.map(size => <option value={size}>{size}</option>)}
               </select>
               <span className="input-group-addon">px</span>
             </div>
           </div>
         </div>

         <div className="form-group row">
           <label htmlFor="xPos" className="col-6 col-form-label">Tip</label>
           <div className="col-6 text-right">
             <div className="input-group input-group text-right">
               <select
                 className={"form-control"}
                 name="fontFamily"
                 onChange={this.handleSelectChange.bind(this)}
                 value={this.state.fontFamily}
               >
                 <option value="Tahoma">Tahoma</option>
                 <option value="Arial">Arial</option>
                 <option value="Courier new">Courier new</option>
               </select>
             </div>
           </div>
         </div>
         <div className="form-group row">
           <label htmlFor="xPos" className="col-6 col-form-label">Stil</label>
           <div className="col-6 text-right">
             <div className="btn-group d-flex btn-group-sm">
               <button type="button" onClick={() => {this.handleMe({ bold: !this.state.bold });}} className={`btn w-100 ${this.props.activeElement.properties.font.bold ? 'btn-primary' : ''}`}><i className="fa fa-bold"/></button>
               <button type="button" onClick={() => {this.handleMe({ italic: !this.state.italic });}}  className={`btn w-100 ${this.props.activeElement.properties.font.italic ? 'btn-primary' : ''}`}><i className="fa fa-italic"/></button>
               <button type="button" onClick={() => {this.handleMe({ underline: !this.state.underline });}}  className={`btn w-100 ${this.props.activeElement.properties.font.underline ? 'btn-primary' : ''}`}><i className="fa fa-underline"/></button>
             </div>
           </div>
         </div>
       </div>
     </CardAccordion>
    );
  }
}
const mapStateToProps = state => {
  return {
    activeElement: state.activeElement.element,
  };
};
export default connect(mapStateToProps, { setProperty })(Font);
