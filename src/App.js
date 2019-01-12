import React from 'react';
import Editor from './components/Editor/Editor';
import { Header, ToolGroup, PropertiesPanel } from './components';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGavel,
  faBuilding,
  faEnvelope,
  faPhone,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { loadSettings } from './redux/actions';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

library.add(faGavel);
library.add(faBuilding);
library.add(faEnvelope);
library.add(faPhone);
library.add(faCalendarAlt);

class App extends React.Component {
  componentDidMount = () => {
    this.props.initializeApp();
  };

  render = () => (
    <div className="flex flex-col h-full flex-1">
      <Header />
      <div className="w-full flex flex-1 justify-between">
        <div className="bg-grey-lightest p-3 shadow w-1/4">
          {this.props.tools &&
            this.props.tools.map((tool, i) => (
              <ToolGroup
                key={i}
                title={tool.title}
                collapse={true}
                tools={tool.items}
                description={tool.description}
              />
            ))}
        </div>
        <div className="bg-grey-lightest  p-3 w-full overflow-y-scroll">
          <Editor width={672} height={950} />
        </div>
        <PropertiesPanel
          properties={this.props.activeElement ? this.props.activeElement.properties : null}
        />
      </div>
      <footer className="w-full text-center border-t border-grey-lighter p-4 bg-grey-lightest text-sm">
        report-designer version 2.0
      </footer>
    </div>
  );
}

App.propTypes = {
  initializeApp: PropTypes.func.isRequired,
  tools: PropTypes.array,
  activeElement: PropTypes.object
};

const mapStateToProp = (state, props) => {
  return {
    tools: state.appReducers.tools,
    activeElement: state.appReducers.activeElement
  };
};
const mapDispatchToProps = {
  initializeApp: loadSettings
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(withNamespaces()(App));
