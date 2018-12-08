import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Properties.css';
import Alignment from '../../elements/Properties/Alignment';
import Location from '../../elements/Properties/Location';
import Font from '../../elements/Properties/Font';
import Color from '../../elements/Properties/Color';
import CustomText from '../../elements/Properties/CustomText';
import Table from '../../elements/Properties/Table';
import PageConfig from '../../elements/Properties/PageConfig';
import ColumnOrder from '../../elements/Properties/ColumnOrder';

class Properties extends Component {
  render(){
    return (
      <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded properties">
        <div id="accordionProperties" className="accordion">
          {this.props.activeElement.id <  0 ? <PageConfig/> : null}
          {this.props.activeElement.id > -1 ? <Location/> : null}
          {this.props.activeElement.id > -1 && this.props.activeElement.properties.align && this.props.activeElement.element_type !== 'table' ?  <Alignment/> : null}
          {this.props.activeElement.id > -1 && this.props.activeElement.properties.font  ?  <Font/> : null}
          {this.props.activeElement.id > -1 && this.props.activeElement.properties.colors ?  <Color/> : null}
          {this.props.activeElement.id > -1 && this.props.activeElement.element_type === 'custom_text' ?  <CustomText/> : null}
          {this.props.activeElement.id > -1 && this.props.activeElement.element_type === 'table' ?  <Table/> : null}
          {this.props.activeElement.id > -1 && this.props.activeElement.element_type === 'table' && this.props.tableDropped ? <ColumnOrder /> : null}

        </div>
      </nav>

    )

  }

}

const mapStateToProps = state => {
  return {
    activeElement: state.activeElement.element,
    tableDropped: state.elements.tableDropped,
  };
};
export default connect(mapStateToProps)(Properties);