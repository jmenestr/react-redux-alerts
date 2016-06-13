import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as alertActions from './actions'; 

const createAlert = config => WrappedComponent => {
  const { alertName } = config;

  class AlertContainer extends Component {
    componentDidMount() {
      this.props.actions.initializeAlert(alertName);
    }

    componentWillUnmount() {
      this.props.actions.destoryAlert(alertName);
    }
    render() {
      if(!this.props.isVisible) return false;
      return (
        <WrappedComponent />
        );
    }
  }

  const mapStateToProps = state => { isVisible: state.alerts[alertName] };
  const mapDispatchToProps = dispatch => { actions: bindActionCreators(alertActions, dispatch) };
  return connect(mapStateToProps, mapDispatchToProps)(AlertContainer);
};

export default createAlert;
