import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, TextInput, Component } from 'react-native';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { config } from '../firebase/constants';




export default class Connexion extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: '',
      confirmPassword: ''
    })
  }
  stringIsEmpty = (string) => {
    if (string !== '') return false;
    else return true;
  }

  stringsAreEquals = (string, string2) => {
    if (string !== string2) return false;
    else return true;
  }

  signUpUser = (email, password, confirmPassword) => {
      if (!this.stringsAreEquals(this.state.password, this.state.confirmPassword)) {
        alert("Les mots de passe ne sont pas identiques.")
        return;
      }
      if (this.stringIsEmpty(password)) {
        alert("Vous n'avez pas entré de mot de passe.")
        return;
      }
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ error: '', loading: false });
          this.props.navigation.navigate('Connexion')
        })
    
    .catch ((error) => {
      const errorCode = error.code;
      if (errorCode == 'auth/invalid-email') {
        alert("Saisie d'email invalide !")

      }
      else if (errorCode == 'auth/email-already-in-use') {
        alert("Cet utilisateur existe déjà")

      }
      else if (errorCode == 'auth/weak-password') {
        alert("La sécurité de votre mot de passe est trop faible. Veuillez avoir au moins 6 caractères")

      }
    })
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Co-mmunitiz</Text>
          <Image style={styles.logo}
            source={require('../img/group.png')}
          />
        </View>
        <View style={styles.container2}>

          <TextInput
            placeholder="Adresse e-mail"
            placeholderTextColor="rgba(255,255,255,0.7)"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor="rgba(255,255,255,0.7)"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(password) => this.setState({ password })}
          />
          <TextInput
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="rgba(255,255,255,0.7)"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(text) => this.setState({ confirmPassword: text })}
          />

          <TouchableOpacity
            onPress={() => this.signUpUser(this.state.email, this.state.password, this.state.confirmPassword)}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Je m'inscris !</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Connexion')}
            style={styles.buttonContainer2}>
            <Text style={styles.buttonText}>Retour</Text>
          </TouchableOpacity>

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
  },
  container2: {
    padding: 20,
    marginBottom: 60
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#fff',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#b8e994',
    paddingVertical: 15,
    marginBottom: 20
  },
  buttonContainer2: {
    backgroundColor: '#rgb(189, 195, 199)',
    paddingVertical: 15,
    marginBottom: 20
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700'
  }
});
