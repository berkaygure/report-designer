import React, { Component } from "react";
import { connect } from "react-redux";
import { setProperty } from "../../../redux/actions";
import CardAccordion from "../../shared/CardAccordion";

class Alignment extends Component {
  constructor(props) {
    super(props);
    this.handleMe = this.handleMe.bind(this);
  }
  handleMe(position) {
    const prop = {
      id: this.props.activeElement.id,
      properties: {
        ...this.props.activeElement.properties,
        align: position
      }
    };
    this.props.setProperty(prop);
  }

  render() {
    return (
      <CardAccordion title={"Hizalama"} parent={"accordionProperties"}>
        <div style={{ padding: 6, margin: "0 auto", textAlign: "center" }}>
          <div className="btn-group d-flex btn-group-sm">
            <button
              type="button"
              onClick={() => {
                this.handleMe("left");
              }}
              className={`btn w-100 ${
                this.props.activeElement.properties.align === "left"
                  ? "btn-primary"
                  : ""
              }`}
            >
              <i className="fa fa-align-left" />
            </button>
            <button
              type="button"
              onClick={() => {
                this.handleMe("center");
              }}
              className={`btn w-100 ${
                this.props.activeElement.properties.align === "center"
                  ? "btn-primary"
                  : ""
              }`}
            >
              <i className="fa fa-align-center" />
            </button>
            <button
              type="button"
              onClick={() => {
                this.handleMe("right");
              }}
              className={`btn w-100 ${
                this.props.activeElement.properties.align === "right"
                  ? "btn-primary"
                  : ""
              }`}
            >
              <i className="fa fa-align-right" />
            </button>
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
  { setProperty }
)(Alignment);
