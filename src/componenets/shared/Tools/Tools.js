import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToolItem from "./ToolItem";
import './Tools.css';

class Tools extends Component {


  render(){
    return (
      <nav className="col-sm-3 col-md-2 sidebar">
        <div id="accordion" className="accordion">
          <div className="card m-b-0">
            {this.props.tools.toolGroups.map((group,i) => (
              <div key={`tools${i}`}>
                <div className="card-header collapsed" data-toggle="collapse" data-parent="#accordion" href={`#collapse${i}`}>
                  <a className="card-title">
                    {group.title}
                  </a>
                </div>
                <div id={`collapse${i}`} className="card-block collapse">
                  {this.props.tools.tools.filter(e => e.group === group.id).map((tool, j) => {
                    if(tool.element_type !== 'table') {
                      return (
                        <ToolItem key={`tool${j}`} tool={tool} />
                      );
                    }else {
                      if (!this.props.tableDropped) {
                        return (
                          <ToolItem key={`tool${j}`} tool={tool}/>
                        )
                      }
                    }
                  })}
                </div>
              </div>
            ))}

          </div>
        </div>
      </nav>
    );
  }

}
const mapStateToProps = state => {
  return {
    tools : state.tools,
    tableDropped: state.elements.tableDropped,
    tableColumns: state.elements.elements.find(x => x.element_type === 'table'),

  }
}
export default connect(mapStateToProps)(Tools);