import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Editor from './components/Editor/Editor';

const ReportDesigner = () => (
    <div>
        <Editor width={ 672 } height={ 950 }/>
    </div>
)

export default ReportDesigner;