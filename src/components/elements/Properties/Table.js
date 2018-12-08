import React, { Component } from "react";
import { connect } from "react-redux";
import ColorPicker from "rc-color-picker";
import { setProperty } from "../../../redux/actions";
import CardAccordion from "../../shared/CardAccordion";

class Table extends Component {
  constructor(props) {
    super(props);
    this.sizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];

    this.state = {
      border: this.props.activeElement.properties.border,
      borderStyle: {
        color: this.props.activeElement.properties.borderStyle.color,
        style: this.props.activeElement.properties.borderStyle.style,
        size: this.props.activeElement.properties.borderStyle.size
      },
      zebra: this.props.activeElement.properties.zebra,
      zebraStyle: this.props.activeElement.properties.zebraStyle,
      header: this.props.activeElement.properties.header,
      columns: this.props.activeElement.properties.columns,
      showHeader: this.props.activeElement.properties.showHeader,
      activeCol: undefined
    };

    const that = this;
    this.props.activeElement.columns.map(col => {
      if (col.style !== undefined) {
        const key = col.id;
        that.state = {
          ...that.state,
          columns: {
            ...that.state.columns,
            [key]: {
              ...col.style
            }
          }
        };
      }

      return null;

    });

    this.handleMe = this.handleMe.bind(this);
  }

  setColumnProperties(prop) {
    if (this.state.columns[this.state.activeCol] !== undefined) {
      this.setState(
        {
          columns: {
            ...this.state.columns,
            [this.state.activeCol]: {
              ...this.state.columns[this.state.activeCol],
              ...prop
            }
          }
        },
        function() {
          this.handleMe();
        }
      );
    }
  }

  changeSutunProp(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    if (this.state.columns[value] === undefined) {
      this.setState({
        columns: {
          ...this.state.columns,
          [value]: {
            font: "Tahoma",
            size: 11,
            align: "left",
            bold: false,
            italic: false,
            underline: false
          }
        }
      });
    }
    this.setState({
      activeCol: value
    });
  }

  handleSize(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const settings = {
      size: value
    };
    this.setState({ ...settings });
    this.handleMe(settings);
  }

  handleMe() {
    const prop = {
      id: this.props.activeElement.id,
      properties: {
        ...this.props.activeElement.properties,
        ...this.state
      }
    };
    this.props.setProperty(prop);
  }

  change(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (target.type === "checkbox") {
      this.setState(
        {
          [name]: target.checked
        },
        function() {
          this.handleMe();
        }
      );
    } else {
      this.setState(
        {
          borderStyle: {
            ...this.state.borderStyle,
            [name]: value
          }
        },
        function() {
          this.handleMe();
        }
      );
    }
  }

  changeBorderColor(colors) {
    this.setState(
      {
        borderStyle: {
          ...this.state.borderStyle,
          color: colors.color
        }
      },
      function() {
        this.handleMe();
      }
    );
  }

  changeZebraColor1(colors) {
    this.setState(
      {
        zebraStyle: {
          ...this.state.zebraStyle,
          color1: colors.color
        }
      },
      function() {
        this.handleMe();
      }
    );
  }

  changeZebraColor2(colors) {
    this.setState(
      {
        zebraStyle: {
          ...this.state.zebraStyle,
          color2: colors.color
        }
      },
      function() {
        this.handleMe();
      }
    );
  }

  changeZebraFont1(colors) {
    this.setState(
      {
        zebraStyle: {
          ...this.state.zebraStyle,
          fontColor1: colors.color
        }
      },
      function() {
        this.handleMe();
      }
    );
  }

  changeZebraFont2(colors) {
    this.setState(
      {
        zebraStyle: {
          ...this.state.zebraStyle,
          fontColor2: colors.color
        }
      },
      function() {
        this.handleMe();
      }
    );
  }

  changeBackColor(colors) {
    this.setState(
      {
        header: {
          ...this.state.header,
          backColor: colors.color
        }
      },
      function() {
        this.handleMe();
      }
    );
  }

  changeForeColor(colors) {
    this.setState(
      {
        header: {
          ...this.state.header,
          foreColor: colors.color
        }
      },
      function() {
        this.handleMe();
      }
    );
  }

  changeSutun(colors) {
    this.setState(
      {
        header: {
          ...this.state.header,
          foreColor: colors.color
        }
      },
      function() {
        this.handleMe();
      }
    );
  }

  render() {
    return (
      <div>
        <CardAccordion
          title={"Tabloyu Biçimlendir"}
          parent={"accordionProperties"}
        >
          <div
            style={{
              padding: "15px 15px",
              margin: "0 auto",
              textAlign: "left"
            }}
            ref={ul => {
              this.cols = ul;
            }}
          >
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  name="border"
                  checked={this.state.border}
                  onChange={this.change.bind(this)}
                />{" "}
                Kenarlık Kullan
              </label>
            </div>
            {this.state.border ? (
              <div>
                <div className="form-group row">
                  <label htmlFor="borderStyle" className="col-6 col-form-label">
                    Kenarlık Stili
                  </label>
                  <div className="col-6 text-right">
                    <select
                      id={"borderStyle"}
                      className={"form-control"}
                      onChange={this.change.bind(this)}
                      name="style"
                    >
                      <option value="solid">Düz</option>
                      <option value="dashed">Çizgili</option>
                      <option value="dotted">Noktalı</option>
                      <option value="double">Çift</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="borderStyle" className="col-6 col-form-label">
                    Kenarlık rengi
                  </label>
                  <div className="col-6 text-right">
                    <ColorPicker
                      color={this.state.borderStyle.color}
                      onChange={this.changeBorderColor.bind(this)}
                    />
                  </div>
                </div>
              </div>
            ) : null}
            <div className="checkbox">
              <label
                data-toggle="tooltip"
                data-placement="top"
                title="Tek sayılı satırlarda 1. renk etkili olacak, çift sayılı satırlarda 2. renk etkili olacaktır."
              >
                <input
                  type="checkbox"
                  name="zebra"
                  checked={this.state.zebra}
                  onChange={this.change.bind(this)}
                />{" "}
                Zebra Stili Kullan
              </label>
            </div>
            {this.state.zebra ? (
              <div>
                <div className="form-group row">
                  <label htmlFor="borderStyle" className="col-6 col-form-label">
                    Zebra dolgu rengi (Birincil)
                  </label>
                  <div className="col-6 text-right">
                    <ColorPicker
                      color={this.state.zebraStyle.color1}
                      onChange={this.changeZebraColor1.bind(this)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="borderStyle" className="col-6 col-form-label">
                    Zebra yazı rengi (Birincil)
                  </label>
                  <div className="col-6 text-right">
                    <ColorPicker
                      color={this.state.zebraStyle.fontColor2}
                      onChange={this.changeZebraFont1.bind(this)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="borderStyle" className="col-6 col-form-label">
                    Zebra dolgu rengi (İkincil)
                  </label>
                  <div className="col-6 text-right">
                    <ColorPicker
                      color={this.state.zebraStyle.color2}
                      onChange={this.changeZebraColor2.bind(this)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="borderStyle" className="col-6 col-form-label">
                    Zebra yazı rengi (İkincil)
                  </label>
                  <div className="col-6 text-right">
                    <ColorPicker
                      color={this.state.zebraStyle.fontColor2}
                      onChange={this.changeZebraFont2.bind(this)}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </CardAccordion>
        <CardAccordion title={"Tablo Başlığı"} parent={"accordionProperties"}>
          <div
            style={{
              padding: "15px 15px",
              margin: "0 auto",
              textAlign: "left"
            }}
          >
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  name="showHeader"
                  checked={this.state.showHeader}
                  onChange={this.change.bind(this)}
                />{" "}
                Başlık bilgisini göster
              </label>
            </div>

            {this.state.showHeader ? (
              <div>
                <div className="form-group row">
                  <label htmlFor="borderStyle" className="col-6 col-form-label">
                    Dolgu Rengi
                  </label>
                  <div className="col-6 text-right">
                    <ColorPicker
                      color={this.state.header.backColor}
                      onChange={this.changeBackColor.bind(this)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="borderStyle" className="col-6 col-form-label">
                    Yazı Rengi
                  </label>
                  <div className="col-6 text-right">
                    <ColorPicker
                      color={this.state.header.foreColor}
                      onChange={this.changeForeColor.bind(this)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="borderStyle" className="col-6 col-form-label">
                    Yazı Fontu
                  </label>
                  <div className="col-6 text-right">
                    <select
                      className={"form-control"}
                      name="header_size"
                      onChange={e => {
                        const settings = {
                          header: {
                            ...this.state.header,
                            size: e.target.value
                          }
                        };
                        this.setState({ ...settings }, function() {
                          this.handleMe();
                        });
                      }}
                      // onChange={this.handleSize.bind(this)}
                      value={this.state.header.size}
                    >
                      {this.sizes.map(size => (
                        <option value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="borderStyle" className="col-6 col-form-label">
                    Yazı Tipi
                  </label>
                  <div className="col-6 text-right">
                    <select
                      className={"form-control"}
                      name="header_family"
                      onChange={e => {
                        const settings = {
                          header: {
                            ...this.state.header,
                            font: e.target.value
                          }
                        };
                        this.setState({ ...settings }, function() {
                          this.handleMe();
                        });
                      }}
                      value={this.state.header.font}
                    >
                      <option value="Tahoma">Tahoma</option>
                      <option value="Arial">Arial</option>
                      <option value="Courier new">Courier new</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </CardAccordion>
        <CardAccordion
          title={"Tablo Sütun Ayarları"}
          parent={"accordionProperties"}
        >
          <div
            style={{
              padding: "15px 15px",
              margin: "0 auto",
              textAlign: "left"
            }}
          >
            <div className="form-group row">
              <label htmlFor="borderStyle" className="col-6 col-form-label">
                İlgili Sütun
              </label>
              <div className="col-6 text-right">
                <select
                  className={"form-control"}
                  onChange={this.changeSutunProp.bind(this)}
                  value={this.state.activeCol}
                  name="style"
                >
                  <option
                    selected={this.state.activeCol === undefined}
                    value="-1"
                  >
                    Seçiniz
                  </option>
                  {this.props.activeElement.columns.map(col => (
                    <option
                      selected={this.state.activeCol === col.id}
                      value={col.id}
                    >
                      {col.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {this.state.columns[this.state.activeCol] !== undefined ? (
              <div>
                {this.state.columns[this.state.activeCol].align !==
                undefined ? (
                  <div className="form-group row">
                    <label
                      htmlFor="borderStyle"
                      className="col-6 col-form-label"
                    >
                      Hizalama
                    </label>
                    <div className="col-6 text-right">
                      <div className="btn-group d-flex btn-group-sm">
                        <button
                          type="button"
                          onClick={() => {
                            this.setColumnProperties({ align: "left" });
                          }}
                          className={`btn w-100 ${
                            this.state.columns[this.state.activeCol].align ===
                            "left"
                              ? "btn-primary"
                              : ""
                          }`}
                        >
                          <i className="fa fa-align-left" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            this.setColumnProperties({ align: "center" });
                          }}
                          className={`btn w-100 ${
                            this.state.columns[this.state.activeCol].align ===
                            "center"
                              ? "btn-primary"
                              : ""
                          }`}
                        >
                          <i className="fa fa-align-center" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            this.setColumnProperties({ align: "right" });
                          }}
                          className={`btn w-100 ${
                            this.state.columns[this.state.activeCol].align ===
                            "right"
                              ? "btn-primary"
                              : ""
                          }`}
                        >
                          <i className="fa fa-align-right" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
                {this.state.columns[this.state.activeCol].size !== undefined ? (
                  <div className="form-group row">
                    <label
                      htmlFor="borderStyle"
                      className="col-6 col-form-label"
                    >
                      Yazı Fontu
                    </label>
                    <div className="col-6 text-right">
                      <select
                        name="size"
                        className={"form-control"}
                        onChange={e => {
                          this.setColumnProperties({ size: e.target.value });
                        }}
                        // onChange={this.handleSize.bind(this)}
                        value={this.state.columns[this.state.activeCol].size}
                      >
                        {this.sizes.map(size => (
                          <option value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : null}

                {this.state.columns[this.state.activeCol].font !== undefined ? (
                  <div className="form-group row">
                    <label
                      htmlFor="borderStyle"
                      className="col-6 col-form-label"
                    >
                      Yazı Tipi{" "}
                    </label>
                    <div className="col-6 text-right">
                      <select
                        name="fontFamily"
                        className={"form-control"}
                        onChange={e => {
                          console.log(e.target.value);
                          this.setColumnProperties({ font: e.target.value });
                        }}
                        value={this.state.columns[this.state.activeCol].font}
                      >
                        <option value="Tahoma">Tahoma</option>
                        <option value="Arial">Arial</option>
                        <option value="Courier new">Courier new</option>
                      </select>
                    </div>
                  </div>
                ) : null}

                {this.state.columns[this.state.activeCol].bold !== undefined ||
                this.state.columns[this.state.activeCol].italic !== undefined ||
                this.state.columns[this.state.activeCol].underline !==
                  undefined ? (
                  <div className="form-group row">
                    <label
                      htmlFor="borderStyle"
                      className="col-6 col-form-label"
                    >
                      Yazı Stili
                    </label>
                    <div className="col-6 text-right">
                      <div className="btn-group d-flex btn-group-sm">
                        <button
                          type="button"
                          onClick={() => {
                            const state = this.state.columns[
                              this.state.activeCol
                            ].bold;
                            this.setColumnProperties({ bold: !state });
                          }}
                          className={`btn w-100 ${
                            this.state.columns[this.state.activeCol].bold
                              ? "btn-primary"
                              : ""
                          }`}
                        >
                          <i className="fa fa-bold" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const state = this.state.columns[
                              this.state.activeCol
                            ].italic;
                            this.setColumnProperties({ italic: !state });
                          }}
                          className={`btn w-100 ${
                            this.state.columns[this.state.activeCol].italic
                              ? "btn-primary"
                              : ""
                          }`}
                        >
                          <i className="fa fa-italic" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const state = this.state.columns[
                              this.state.activeCol
                            ].underline;
                            this.setColumnProperties({ underline: !state });
                          }}
                          className={`btn w-100 ${
                            this.state.columns[this.state.activeCol].underline
                              ? "btn-primary"
                              : ""
                          }`}
                        >
                          <i className="fa fa-underline" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </CardAccordion>
      </div>
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
)(Table);
