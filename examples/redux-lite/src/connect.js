import React, { Component } from "react";
import { connect } from "react-redux";

export default function(ActualComponent, mapStateToProps = state => state) {
  class Container extends Component {
    render() {
      return <ActualComponent {...this.props} />;
    }
  }

  const connector = connect(mapStateToProps);
  return connector(ActualComponent);
}
