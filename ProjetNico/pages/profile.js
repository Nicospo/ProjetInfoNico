import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import Connexion from './connexion';


export default class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile',
        header: null,


    };
    constructor(props) {
        super(props)


        state: {
            email: ''
        }
    }

    signOut = () => {
        firebase.auth()
            .signOut()
            .then(() => {
                this.props.navigation.navigate('Connexion')
            })

    }
    render() {
        const user = firebase.auth().currentUser
        const email = user.email

        return (

            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>Profil</Text>
                </View>
                <View style={styles.container2}>

                    <TouchableHighlight
                        style={styles.input}>
                        <Text style={styles.buttonText}>{email}</Text>
                    </TouchableHighlight>

                    <TouchableOpacity
                        onPress={this.signOut.bind(this)}
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
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 15,
        marginTop: 40
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
        marginTop: 30,
        fontSize: 36,
        fontWeight: 'bold'
    },

});
