import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import './Paper.css';
import './Ruler.css';
import HRuler from "./HRuler";
import VRuler from "./VRuler";
import {addItem, changePostion, activeElements, removeItem} from "../../../redux/actions";
import Element from '../Elements/Element';
import TableElement from '../Elements/TableElement';

const C_KEY = 67;
const V_KEY = 86;

class Paper extends Component {


  constructor(props) {
    super(props);

    this.drag = this.drag.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("mousemove", this.moveMouse.bind(this));
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

  handleKeyDown(key) {

    if (key.ctrlKey && (key.which === 83)) {
      key.preventDefault();
      return false;
    }

    if (key.ctrlKey && (key.which === 80)) {
      key.preventDefault();
      return false;
    }

    if (key.keyCode === 27) {
      this.onActivePage();
    } else if (key.keyCode === C_KEY && key.ctrlKey) {
      this.copiedItem = this.props.activeElement;
    } else if (key.keyCode === V_KEY && key.ctrlKey) {
      this.pasteItem();
    } else if (key.keyCode === 46) {
      if (this.props.activeElement.id > -1) {
        this.props.removeItem(this.props.activeElement);
        this.props.activeElements({id: -1, x: 0, y: 0, properties: {}});
      }
    }

    if (key.keyCode === 37) {
      if (this.props.activeElement.id > -1 && this.checkElementInArea(this.props.activeElement)) {
        const elem = {
          ...this.props.activeElement,
          x: this.props.activeElement.x - 1
        };
        this.props.changePostion(elem);
      }
    }
    if (key.keyCode === 39) {
      if (this.props.activeElement.id > -1 && this.checkElementInArea(this.props.activeElement)) {
        const elem = {
          ...this.props.activeElement,
          x: this.props.activeElement.x + 1
        };
        this.props.changePostion(elem);
      }
    }
    if (key.keyCode === 38) {
      key.preventDefault();
      if (this.props.activeElement.id > -1 && this.checkElementInArea(this.props.activeElement)) {
        const elem = {
          ...this.props.activeElement,
          y: this.props.activeElement.y - 1
        };
        this.props.changePostion(elem);
      }
      return false;
    }
    if (key.keyCode === 40) {
      key.preventDefault();
      if (this.props.activeElement.id > -1 && this.checkElementInArea(this.props.activeElement)) {
        const elem = {
          ...this.props.activeElement,
          y: this.props.activeElement.y + 1
        };
        this.props.changePostion(elem);
      }
      return false;
    }
  }

  checkElementInArea(element){
    return (element.x >0 && element.x < this.props.paper.w && element.y > 0 && element.y < this.props.paper.h);
  }

  moveMouse(event) {
    this.mouseLocation = {
      x: event.pageX - $("#paper").offset().left,
      y: event.pageY - $("#paper").offset().top
    };
  }

  pasteItem() {
    if (this.copiedItem !== undefined && this.copiedItem.id > -1 && this.copiedItem.element_type !== 'table') {
      if (this.mouseLocation !== undefined) {
        if (this.mouseLocation.x > 0 && this.mouseLocation.x < this.props.paper.w && this.mouseLocation.y > 0 && this.mouseLocation.y < this.props.paper.h) {
          const newItem = {
            ...this.copiedItem,
            id: this.props.elements.length + 1,
            x: this.mouseLocation.x,
            y: this.mouseLocation.y
          };

          this.props.addItem(newItem);

        }
      }
    }
  }

  computePageSize() {
    if (this.props.paper.orientation === 'h') {
      return {
        width: this.props.paper.h,
        height: this.props.paper.w
      };
    } else {
      return {
        width: this.props.paper.w,
        height: this.props.paper.h
      };
    }

  }

  drag(pos, size) {
    const element = {
      ...this.props.activeElement,
      x: pos.left,
      y: pos.top,
      w: size.w,
      h: size.h
    };

    this.props.changePostion(element);
  }

  render() {
    const pageSize = this.computePageSize();
    const pageConfig = {
      ...pageSize,
      backgroundImage: 'url(' + this.props.paper.tmpBg + ')',
    };
    return (
      <div className="paperWrapper" style={{width: pageConfig.width, height: pageConfig.height}}>
        <HRuler followerX={this.props.activeElement.x} followerWidth={this.props.activeElement.w}
                show={this.props.activeElement.id > 0} width={pageConfig.width}/>
        <VRuler followerY={this.props.activeElement.y} followerHeight={this.props.activeElement.h}
                show={this.props.activeElement.id > 0} height={pageConfig.height}/>
        <div id="paper" onClickCapture={this.onActivePage.bind(this)} ref={paper => {
          this.paper = paper;
        }} className='paper' style={pageConfig}>
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
                ref={element => {
                  this.element = element;
                }}/>
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
export default connect(mapStateToProps, {addItem, changePostion, activeElements, removeItem})(Paper);