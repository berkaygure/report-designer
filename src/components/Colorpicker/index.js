// @flow
import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

type Props = {
  color: string,
  onChangeCompleted: (color: {}, event: {}) => {}
};

type State = {
  color: string,
  showPicker?: boolean,
  completed?: boolean
};

export default class Colorpicker extends Component<Props, State> {
  state = {
    color: '#fff',
    showPicker: false,
    completed: false
  };

  static defaultProps = {
    showPicker: false,
    completed: false
  };

  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCompleted = this.handleChangeCompleted.bind(this);
  }

  componentDidMount = () => {
    const { color } = this.props;
    this.setState({
      color
    });

    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    const { showPicker, completed } = this.state;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && showPicker && completed) {
      this.setState(prev => ({ ...prev, showPicker: false }));
    }
  }

  handleChange(color, event) {
    this.setState(prev => ({ ...prev, color: color.hex, completed: false }));
  }

  handleChangeCompleted(color, event) {
    this.setState(prev => ({ ...prev, color: color.hex, completed: true }));
    const { onChangeCompleted } = this.props;

    onChangeCompleted(color, event);
  }

  render() {
    const { color, showPicker } = this.state;
    return (
      <div ref={this.setWrapperRef} style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => this.setState(prev => ({ ...prev, showPicker: !prev.showPicker }))}
          style={{
            display: 'inline-block',
            padding: 10,
            backgroundColor: color,
            border: 'thin solid #333'
          }}
        />
        {showPicker ? (
          <div style={{ position: 'absolute', zIndex: 100, left: -100 }}>
            <SketchPicker
              color={color}
              onChange={this.handleChange}
              onChangeComplete={this.handleChangeCompleted}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
