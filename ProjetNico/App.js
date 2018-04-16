import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';
import {StackNavigator} from 'react-navigation'



export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const AppNavigator = StackNavigator({
  Connexion :{screen : Connexion},
  Inscription : {screen : Inscription}
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
