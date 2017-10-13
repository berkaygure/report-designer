import React, {Component} from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import './Paper.css';
import './Ruler.css';
import HRuler from "./HRuler";
import VRuler from "./VRuler";
import { addItem, changePostion, activeElements } from "../../../redux/actions/index";
import Element from '../Elements/Element';
import TableElement from '../Elements/TableElement';

class Paper extends Component {

  constructor(props) {
    super(props);
    
    this.drag = this.drag.bind(this);

  }

  componentDidMount() {
    const that = this;
    this.$paper = $(this.paper);
    this.$paper.droppable({
      accept: '.tool-items',
      drop(event, ui) {
        const droppedToolProperties = $(ui.draggable).data('props');
        const droppedPositionX = event.pageX - $(this).offset().left - event.offsetX;
        const droppedPositionY = event.pageY - $(this).offset().top - event.offsetY;
        const newElement = {
          id: that.props.elements.length + 1,
          x: droppedPositionX,
          y: droppedPositionY,
          ...droppedToolProperties
        };
        that.props.addItem(newElement);
      }
    });
  }

  componentWillUnmount() {
    this.$paper.droppable('destroy');
  }
  onActivePage() {
    this.props.activeElements({id: -1, x: 0, y: 0, properties: {}});
  }
  computePageSize(){
    if(this.props.paper.orientation === 'h'){
      return {
        width: this.props.paper.h,
        height: this.props.paper.w
      };
    }else{
      return {
        width: this.props.paper.w,
        height: this.props.paper.h
      };
    }

  }

  drag(pos, size) {
    const element = {
      ...this.props.activeElement,
      x:pos.left,
      y:pos.top,
      w:size.w,
      h:size.h
    };

    this.props.changePostion(element);
  }

  render(){
    const pageSize = this.computePageSize();
    const pageConfig = {
      ...pageSize,
      backgroundImage : 'url('+this.props.paper.tmpBg+')',
    };
    return (
      <div className="paperWrapper" style={{width: pageConfig.width, height: pageConfig.height}}>
        <HRuler followerX={this.props.activeElement.x} followerWidth={this.props.activeElement.w} show={this.props.activeElement.id > 0} width={pageConfig.width} />
        <VRuler followerY={this.props.activeElement.y} followerHeight={this.props.activeElement.h} show={this.props.activeElement.id  > 0 } height={pageConfig.height} />
        <div id="paper"  onClickCapture={this.onActivePage.bind(this)} ref={paper => {this.paper = paper;}} className='paper' style={pageConfig}>
          {this.props.elements.map((e, index) =>
            e.element_type === 'table' ? (
              <TableElement
                key={`table${index}`}
                index={index}
                element={e}
                onDrag={this.drag}
                ref={element => {
                  this.element = element;
                }}
              />
          ) : (
              <Element
                key={`element${index}`}
                index={index}
                element={e}
                onDrag={this.drag}
                ref={element => {this.element = element;}}/>
            )
          )}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    activeElement: state.activeElement.element,
    elements: state.elements.elements,
    app: state.application.app,
    paper: state.paper
  }
};
export default connect(mapStateToProps,{addItem, changePostion, activeElements})(Paper);