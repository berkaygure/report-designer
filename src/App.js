// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { loadSettings } from './redux/actions';
import { Header } from './components';
import Container from './components/Container';
import Footer from './components/Footer';

type Props = {
  initializeApp: () => void,
  tools: [],
  activeElement: { properties: {} }
};

class App extends React.Component<Props> {
  componentDidMount = () => {
    const { initializeApp } = this.props;
    initializeApp();
  };

  render = () => {
    const { tools, activeElement } = this.props;
    return (
      <div className="flex flex-col h-full flex-1">
        <Header />
        <Container tools={tools} activeElement={activeElement} />
        <Footer />
      </div>
    );
  };
}

const mapStateToProp = state => ({
  tools: state.appReducers.tools,
  activeElement: state.appReducers.activeElement
});

const mapDispatchToProps = {
  initializeApp: loadSettings
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(withNamespaces()(App));
