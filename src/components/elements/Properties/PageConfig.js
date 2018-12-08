import React, { Component } from "react";
import { connect } from "react-redux";
import { changeBg } from "../../../redux/actions";
import CardAccordion from "../../shared/CardAccordion";

class PageConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tmpBg: []
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const that = this;
    const reader = new FileReader();

    reader.onloadend = e => {
      that.props.changeBg({
        tmpBg: [reader.result]
      });
    };
  }

  render() {
    return (
      <CardAccordion title={"Sayfa Ayarları"} parent={"accordionProperties"}>
        <div
          style={{ padding: "6px 15px", margin: "0 auto", textAlign: "left" }}
        >
          <div className="form-group">
            <label htmlFor="xPos" className="col-form-label">
              Arkaplan
            </label>
            <input
              ref={file => (this.file = file)}
              type="file"
              name="user[image]"
              multiple="true"
              onChange={this.onChange}
            />
          </div>
        </div>
      </CardAccordion>
    );
  }
}
export default connect(
  null,
  { changeBg }
)(PageConfig);
