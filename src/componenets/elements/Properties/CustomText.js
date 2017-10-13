import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProperty } from '../../../redux/actions';
import CardAccordion from "../../shared/CardAccordion";

class CustomText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: this.props.activeElement.properties.content,
    };
    this.handleMe = this.handleMe.bind(this);
    this.changeTexbox = this.changeTexbox.bind(this);
  }

  handleMe() {
    const that = this;
    const prop = {
      id: this.props.activeElement.id,
      properties: {
        ...this.props.activeElement.properties,
        content: that.state.content,
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

  render() {
    return (
      <CardAccordion title={"İçeriği Düzenle"} parent={"accordionProperties"}>
        <div style={{padding:'6px 15px',margin: '0 auto',textAlign: 'left'}}>
          <div className="form-group">
            <textarea
              onChange={this.changeTexbox.bind(this)}
              onBlur={e => this.handleMe()}
              name="content" id="content" cols="30" rows="5" className={'form-control'}>{this.state.content}</textarea>
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
export default connect(mapStateToProps,  { setProperty })(CustomText);
