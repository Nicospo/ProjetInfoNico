import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import {config} from './firebase/constants';
firebase.initializeApp(config);
import Main from './pages/main';


export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const AppNavigator = StackNavigator({
  Connexion: {
    screen: Connexion
    },
  Inscription: {
    screen: Inscription
  },
  Main: {
    screen: Main
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
