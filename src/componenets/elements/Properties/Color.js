import React, {Component} from 'react';
import {connect} from 'react-redux';
import ColorPicker from 'rc-color-picker';
import {setProperty} from '../../../redux/actions';
import CardAccordion from "../../shared/CardAccordion";

class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foreColor: this.props.activeElement.properties.colors.foreColor,
      backColor: this.props.activeElement.properties.colors.backColor,
    };
    this.handleMe = this.handleMe.bind(this);
  }

  handleMe() {
    const prop = {
      id: this.props.activeElement.id,
      properties: {
        ...this.props.activeElement.properties,
        colors: {
          foreColor: this.state.foreColor,
          backColor: this.state.backColor,
        },
      },
    };

    this.props.setProperty(prop);
  }

  changeTexbox(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });

    this.handleMe();
  }

  changeForeColor(colors) {
    this.setState({
      foreColor: colors.color,
    });
    this.handleMe();
  }

  changeBackColor(colors) {
    this.setState({
      backColor: colors.color,
    });
    this.handleMe();
  }

  render() {
    return (
      <CardAccordion title={"Renkler"} parent={"accordionProperties"}>
        <div style={{padding: '6px 15px', margin: '0 auto', textAlign: 'left'}}>

          <div style={{padding: '6px 15px', margin: '0 auto', textAlign: 'left'}}>
            <div className="form-group row">
              <label htmlFor={'foreColor'} className="col-4 col-form-label">Yazı</label>
              <div className="col-8">
                <div className="input-group input-group-sm">
                  <input
                    id={'foreColor'}
                    name="foreColor"
                    type="text"
                    className="form-control"
                    onBlur={e => this.handleMe()}
                    value={this.state.foreColor}
                  />
                  <span className="input-group-addon">
                     <ColorPicker color={this.state.foreColor} onChange={this.changeForeColor.bind(this)}/>
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor={'backColor'} className="col-4 col-form-label">Dolgu</label>
              <div className="col-8">
                <div className="input-group input-group-sm">
                  <input
                    id={'backColor'}
                    name="backColor"
                    type="text"
                    className="form-control"
                    onBlur={e => this.handleMe()}
                    value={this.state.backColor}
                  />
                  <span className="input-group-addon">
                     <ColorPicker color={this.state.backColor} onChange={this.changeBackColor.bind(this)}/>
                  </span>
                </div>
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
export default connect(mapStateToProps, {setProperty})(Color);
