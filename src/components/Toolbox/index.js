import React, { Component }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Toolbox extends Component {
    render() {
        return (
            <div className="tools-menu">
                <section className="panel">
                    <div className="panel-header">
                        <button className="app-btn">
                            <FontAwesomeIcon color="#707070" icon="chevron-left" fixedWidth/>
                        </button>
                        <span>Toolbox</span>
                        <button className="app-btn">
                            <FontAwesomeIcon color="#707070" icon="cog" fixedWidth/>
                        </button>
                    </div>
                    <div className="panel-body">
                        <nav>
                            <ul>
                                <li>
                                    <button className="app-btn">
                                        <button className="tool-btn app-btn">
                                            <FontAwesomeIcon size="lg" color="#C4C4C4" icon="mouse-pointer" fixedWidth/>
                                            <span>Pointer</span>
                                        </button>
                                    </button>
                                </li>
                                <li>
                                    <button className="app-btn">
                                        <button className="tool-btn app-btn">
                                            <FontAwesomeIcon size="lg" color="#C4C4C4" icon="font" fixedWidth/>
                                            <span>Text</span>
                                        </button>
                                    </button>
                                </li>
                                <li>
                                    <button className="app-btn">
                                        <button className="tool-btn app-btn">
                                            <FontAwesomeIcon size="lg" color="#C4C4C4" icon="table" fixedWidth/>
                                            <span>Table</span>
                                        </button>
                                    </button>
                                </li>
                                <li>
                                    <button className="app-btn">
                                        <button className="tool-btn app-btn">
                                            <FontAwesomeIcon size="lg" color="#C4C4C4" icon="image" fixedWidth/>
                                            <span>Image</span>
                                        </button>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </section>
                <section className="panel">
                    <div className="panel-header">
                        <button className="app-btn">
                            <FontAwesomeIcon color="#707070" icon="chevron-left" fixedWidth/>
                        </button>
                        <span>
                                Layers
                        </span>
                        <button className="app-btn">
                            <FontAwesomeIcon color="#707070" icon="cog" fixedWidth/>
                        </button>
                    </div>
                    <div className="panel-body">
                        <nav>

                        </nav>
                    </div>
                </section>
            </div>
        );
    }
}

export default Toolbox;