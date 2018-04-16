import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';

export default class App extends React.Component {
  render() {
    return (
      <Connexion />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
