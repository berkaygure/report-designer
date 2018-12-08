import React from 'react';
import { Provider } from 'react-redux';
import ReportDesigner from './ReportDesigner';
import store from './redux/store';

const App = () => (
    <Provider store={ store }>
        <ReportDesigner />
    </Provider>
)

export default App;
