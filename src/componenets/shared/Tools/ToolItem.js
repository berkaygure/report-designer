import React, { Component } from 'react';
import 'jquery-ui-dist/jquery-ui';
import $ from 'jquery';
import './ToolItem.css';

class ToolItem extends Component {

  componentDidMount() {
    this.$btn = $(this.btn);
    this.$btn.draggable({
      helper: 'clone',
      appendTo: 'body',
      start(event, ui) {
        $(ui.helper).css({ width: '250px', backgroundColor: 'whitesmoke' });
      },
    });
  }
  render() {
    return (
      <div
        data-props={JSON.stringify(this.props.tool)}
        className="tool-items"
        style={{ zIndex: 100000 }}
        ref={btn => {this.btn = btn; }}>
        {this.props.tool.title}
      </div>
    );
  }
}

export default ToolItem;
