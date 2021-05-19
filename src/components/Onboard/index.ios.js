import React, { Component } from 'react';
import {
  StatusBar,      // Allows to hide the satatus bar
} from 'react-native';
import Screens from './Screens';

export default class Onboarding extends Component {
  componentDidMount() {
    // Hide the status bar
    StatusBar.setHidden(true);
  }
  render() {
    return (
      <Screens />
    );
  }
}