import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';


export default class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>Profil</Text>
                </View>
                <View style={styles.container2}>

                    <TextInput
                        placeholder="Adresse e-mail"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                    //onChangeText={(email) => this.setState({ email })}
                    />
                    <TextInput
                        placeholder="Mot de passe"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                    //    onChangeText={(password) => this.setState({ password })}
                    />
                    <TextInput
                        placeholder="Confirmer le mot de passe"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                    //   onChangeText={(text) => this.setState({ confirmPassword: text })}
                    />

                    <TouchableOpacity
                        //onPress={() => this.signUpUser(this.state.email, this.state.password, this.state.confirmPassword)}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Mettre à jour !</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        //onPress={() => this.props.navigation.navigate('Connexion')}
                        style={styles.buttonContainer2}>
                        <Text style={styles.buttonText}>Déconnexion</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(149, 165, 166)',
    },
    container2: {
        padding: 20,
        marginBottom: 60
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginTop: 20,
        color: '#fff',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: 'rgb(52, 73, 94)',
        paddingVertical: 15,
        marginTop: 40
    },
    buttonContainer2: {
        backgroundColor: 'rgb(192, 57, 43)',
        paddingVertical: 15,
        marginTop: 40
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
      },
      title: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        marginTop:30,
        fontSize: 36,
        fontWeight: 'bold'
      },

});
