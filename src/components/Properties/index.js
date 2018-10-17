import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Properties extends Component {
    render() {
        return (
            <div className="properties-window">
                <div className="application-menu">
                    <button className="app-btn">
                        <FontAwesomeIcon color="#707070" icon="play" fixedWidth/>
                    </button>
                    <button className="app-btn">
                        <FontAwesomeIcon color="#2294E3" icon="layer-group" fixedWidth/>
                    </button>
                    <button className="app-btn">
                        <FontAwesomeIcon color="#2294E3" icon="toolbox" fixedWidth/>
                    </button>
                    <button className="app-btn">
                        <FontAwesomeIcon color="#2294E3" icon="project-diagram" fixedWidth/>
                    </button>

                </div>
            </div>
        );
    }
}

export default Properties;