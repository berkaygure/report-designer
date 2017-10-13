import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from '../../../../redux/actions';
import './Table.css';

const style = {
  element: {
    width: 100,
    height: 100,
    cursor: 'move',
    overflow: 'hidden',
    position: 'absolute',
  },
  common: {
    textAlign: 'left',
  },
};
class Table extends Component {


  componentDidMount(){

  }
  componentWillUpdate() {

    this.$el = $(this.el);
    this.$el.find('tr:eq(0) td').resizable({
      containment: '#table',
    });
  }


  componentDidUpdate() {
    //$('.table-col').resizable({ containment: '#table'});


    this.$el.find('tr:eq(0) td').resizable({ containment: '#table',});
    this.$el.find('tr:eq(0) td').resizable('destroy');
    this.$el.find('tr:eq(0) td').resizable({ containment: '#table',});
  }



  render() {
    const tableStyle = {};
    let columnCommandSytle = {};
    let headerStyle = {};
    if (this.props.element.id !== -1)
    {
      const properties = this.props.element.properties;

      headerStyle = {
          backgroundColor : properties.header.backColor,
          color : properties.header.foreColor,
          fontSize : properties.header.size,
          font : properties.header.font,
      };

      if (properties.border) {
        tableStyle.border = `${properties.borderStyle.size} ${properties.borderStyle.style} ${properties.borderStyle.color} `;
        columnCommandSytle.border = `${properties.borderStyle.size} ${properties.borderStyle.style} ${properties.borderStyle.color} `;
      } else {
        tableStyle.border = 'none';
        columnCommandSytle.border = 'none';
      }


    }

    const rows = [];
    for (let i = 0; i < Math.ceil(this.props.element.h / 10); i += 1) {
        const properties = this.props.element.properties;

        if(properties.zebra){
          if(i % 2 === 0){
            columnCommandSytle = {
              ...columnCommandSytle,
              backgroundColor:properties.zebraStyle.color1,
              color : properties.zebraStyle.fontColor1,
            }
          }else{
            columnCommandSytle = {
              ...columnCommandSytle,
              backgroundColor:properties.zebraStyle.color2,
              color : properties.zebraStyle.fontColor2
            }
          }

        }

      rows.push(
        <tr style={ columnCommandSytle}>
          {this.props.columns
            .filter(x => x.show === true)
            .sort((x, y) => x.order > y.order)
            .map(col => {
              let style = undefined;
                if(properties.columns[col.id] !==undefined){
                  style = properties.columns[col.id]
                }
                if(style !== undefined){
                  return (
                    <td className={'table-col'} style={{...columnCommandSytle,
                      ...{
                        fontFamily: style.font,
                        fontSize:  style.size,
                        textAlign : style.align,
                        fontWeight:  style.bold?'bolder':'normal',
                        fontStyle: style.italic?'italic':'normal',
                        textDecoration: style.underline?'underline':'none',
                      }
                    }}>{col.value}</td>
                  )
                }else{
                  return (
                    <td className={'table-col'} style={columnCommandSytle}>{col.value}</td>
                  )
                }
            })}
        </tr>,
      );
    }
    const properties = this.props.element.properties;

    return (
      <table

        cellSpacing={0}
        cellPadding={0}
        style={{
          width: '100%',
          ...tableStyle,
        }}
        ref={el => {
          this.el = el;
        }}
      >
        {this.props.element.properties.showHeader ?
          (
            <tr style={headerStyle}>
              {this.props.columns
                .filter(x => x.show === true)
                .sort((x, y) => x.order > y.order)
                .map(col => {

                  let style = undefined;
                  if(properties.columns[col.id] !==undefined){
                    style = properties.columns[col.id]
                  }
                  if(style !== undefined){
                    return (
                      <th className={'table-col'} style={{...headerStyle,
                        ...{
                          textAlign : style.align,
                          fontWeight:  style.bold?'bolder':'normal',
                          textDecoration: style.underline?'underline':'none',
                        }
                      }}>{col.title}</th>
                    )
                  }else{
                    return (
                      <th className={'table-col'} style={headerStyle}>{col.title}</th>
                    )
                  }
                })}
            </tr>
          ) : null
        }

        {rows}
      </table>
    );
  }
}
const mapStateToProps = state => {
  return {
    columns: state.elements.elements.find(x => x.element_type === 'table').columns,
    activeElement: state.activeElement.element,
  };
};
export default connect(mapStateToProps)(Table);
