import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { config } from './firebase/constants';
import Main from './pages/main';
import { Tabs } from './config/router';

const firebaseApp = firebase.initializeApp(config);

export default class App extends React.Component {
  constructor(props) {
    super(props)

    console.disableYellowBox = true;
  }


  render() {
    return (
      <AppNavigator />
    );
  }
};

export const AppNavigator = StackNavigator({
  Connexion: {
    screen: Connexion
  },
  Inscription: {
    screen: Inscription
  },
  Main: {
    screen: Tabs
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

