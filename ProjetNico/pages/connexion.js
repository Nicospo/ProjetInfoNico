import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableHighlight, TextInput, TouchableOpacity, Component } from 'react-native';
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
      password: ''
    })
  }

  onButtonPress() {
    this.props.navigation.navigate('Inscription');
  };

  loginUser = (email, password) => {


    //identification
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => { this.props.navigation.navigate('Main') })

      //Affiche le type d'erreur 
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == 'auth/invalid-email') {
          alert("Saisie d'email invalide !")
        }
        else if (errorCode == 'auth/user-not-found') {
          alert("Cet utilisateur n'existe pas")

        }
        else if (errorCode == 'auth/wrong-password') {
          alert("Mot de passe incorrect")
        }
        else {
          alert("La connexion a échoué")

        }
      });
  }



  /*       firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
          this.props.navigation.navigate('Main') 
      }
      .catch((error)=>
      {
        const errorCode = error.code;
        if (errorCode == 'auth/invalid-email') {
           alert("Cet email ne correspond pas à celui d'un utilisateur")
        } 
        else if (errorCode == 'auth/user-not-found'){
           alert( "Cet utilisateur n'existe pas")
        }
        else if(errorCode == 'auth/wrong-password'){
            alert("Mot de passe incorrect")
        }
      })
    )
    } */

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

          <TouchableOpacity
            onPress={() => this.loginUser(this.state.email, this.state.password)}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Connexion</Text>
          </TouchableOpacity>

          <TouchableHighlight onPress={this.onButtonPress.bind(this)} style={styles.buttonContainer2}>
            <Text style={styles.buttonText}>Inscription</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
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
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    marginBottom: 20
  },
  buttonContainer2: {
    backgroundColor: '#82ccdd',
    paddingVertical: 15,
    marginTop: 40
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700'
  }
});
