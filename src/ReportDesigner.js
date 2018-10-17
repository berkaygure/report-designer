import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Editor from './components/Editor/Editor';
import Toolbox from './components/Toolbox';
import Properties from './components/Properties';

import {
    faChevronLeft,
    faCog,
    faPlay,
    faLayerGroup,
    faToolbox,
    faMousePointer,
    faFont,
    faTable,
    faImage,
    faProjectDiagram
}  from '@fortawesome/free-solid-svg-icons';

library.add(
    fab,
    faChevronLeft,
    faCog, faPlay,
    faLayerGroup,
    faToolbox,
    faMousePointer,
    faFont,
    faTable,
    faImage,
    faProjectDiagram
);

class ReportDesigner extends Component {
    render() {
        return (
            <div className="app">
                <Toolbox />
                <div className="designer-area">
                    <div className="designer-title">
                        Designer Title
                    </div>
                    <div className="editor-container">
                        <Editor width={ 672 } height={ 950 }/>
                    </div>
                </div>
                <Properties />
            </div>
        );
    }
}

export default ReportDesigner;