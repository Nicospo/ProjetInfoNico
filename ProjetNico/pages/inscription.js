import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableHighlight, Component } from 'react-native';
import FormInscription from './formInscription';

export default class Connexion extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Co-mmunitiz</Text>
          <Image style={styles.logo}
            source={require('../img/group.png')}
          />
        </View>
        <View style={styles.formContainer}>
          <FormInscription />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#78e08f',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 36,
    fontWeight: 'bold'
  }
});
