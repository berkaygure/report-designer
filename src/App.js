import React, {Component} from 'react';
import {Provider} from 'react-redux';
import ReportDesigner from './ReportDesigner';
import store from './redux/store';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <Provider store={store}>
                <ReportDesigner />
            </Provider>
        );
    }
}

export default App;
