import React, { Component } from "react";
import { connect } from "react-redux";
import { changePostion } from "../../../redux/actions";
import CardAccordion from "../../shared/CardAccordion";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xPos: 0,
      yPos: 0
    };
  }

  componentWillReceiveProps() {
    this.setState({
      xPos: (this.props.activeElement.x / 32).toFixed(2),
      yPos: (this.props.activeElement.y / 32).toFixed(2)
    });
  }

  changeXPos(e) {
    this.setState({ xPos: e.target.value });
  }
  updateElementXPos(e) {
    this.props.activeElement.x = e.target.value * 32;
    this.props.changePostion(this.props.activeElement);
  }

  changeYPos(e) {
    this.setState({ yPos: e.target.value });
  }
  updateElementYPos(e) {
    this.props.activeElement.y = e.target.value * 32;
    this.props.changePostion(this.props.activeElement);
  }

  render() {
    return (
      <CardAccordion title={"Konumlama"} parent={"accordionProperties"}>
        <div
          style={{ padding: "6px 15px", margin: "0 auto", textAlign: "left" }}
        >
          <div className="form-group row">
            <label htmlFor="xPos" className="col-6 col-form-label">
              Soldan
            </label>
            <div className="col-6">
              <div className="input-group input-group">
                <input
                  value={this.state.xPos}
                  onChange={e => this.changeXPos(e)}
                  onBlur={e => this.updateElementXPos(e)}
                  className="form-control form-control"
                  type="text"
                  id="xPos"
                />
                <span className="input-group-addon" id="basic-addon1">
                  cm
                </span>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="yPos" className="col-6 col-form-label">
              Üstten
            </label>
            <div className="col-6">
              <div className="input-group input-group">
                <input
                  onChange={e => this.changeYPos(e)}
                  onBlur={e => this.updateElementYPos(e)}
                  value={this.state.yPos}
                  className="form-control form-control"
                  type="text"
                  id="yPos"
                />
                <span className="input-group-addon" id="basic-addon1">
                  cm
                </span>
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
    activeElement: state.activeElement.element
  };
};
export default connect(
  mapStateToProps,
  { changePostion }
)(Location);
