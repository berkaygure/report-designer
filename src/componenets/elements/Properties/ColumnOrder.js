import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { changeColumn, updateColumnOrder } from '../../../redux/actions';
import CardAccordion from "../../shared/CardAccordion";


class ColumnOrder extends Component {

  componentDidMount() {
    this.$cols = $(this.cols);
    const that = this;

    this.$cols.sortable({
      items: 'div.table-column-element:not(.disabled)',
      update(event, ui) {
        const result = $(this).sortable('toArray', { attribute: 'value' });
        const arr = [];
        for (let i = 0; i < result.length; i += 1) {
          arr.push({
            id: result[i],
            order: i,
          });
        }
        console.log(arr);

        that.props.updateColumnOrder(arr);
      },
    });
  }

  componentDidUpdate() {
    this.$cols = $(this.cols);
    const that = this;
    this.$cols.sortable({
      items: 'div.table-column-element:not(.disabled)',
      update(event, ui) {
        const result = $(this).sortable('toArray', { attribute: 'value' });
        const arr = [];
        for (let i = 0; i < result.length; i += 1) {
          arr.push({
            id: result[i],
            order: i,
          });
        }
        console.log(arr);
        that.props.updateColumnOrder(arr);
      },
    });
  }


  render() {
    return (
      <CardAccordion title={"Sütunlar"} parent={"accordionProperties"}>
        <div style={{padding:'6px 15px',margin: '0 auto',textAlign: 'left'}} ref={ul => {this.cols = ul;}}>
          {this.props.tableColumns.map(col => (
            <div value={col.id} className={col.show === true ? 'table-column-element' : 'table-column-element disabled'}>
              <div className="checkbox">
                <label>
                  <span className="ui-icon ui-icon-arrowthick-2-n-s" />
                  <input type="checkbox" onChange={() => this.props.changeColumn({ id: col.id, column: { show: !col.show } })} checked={col.show} />
                  &nbsp;{col.title}
                </label>
              </div>
            </div>
          ))}
        </div>
      </CardAccordion>

    )
  }
};
const mapStateToProps = state => {
  return {
    tableColumns: state.elements.elements.find(x => x.element_type === 'table').columns,
  };
};
export default connect(mapStateToProps,{ changeColumn, updateColumnOrder })(ColumnOrder);
