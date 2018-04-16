import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, TouchableHighlight, Text } from 'react-native';


export default class FormConnexion extends React.Component {
    onButtonPress(){
        this.props.navigation.navigate('Inscription');
    };
    render() {
        return (
            <View style={styles.container2}>

                <TextInput
                    placeholder="Adresse e-mail"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Mot de passe"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
                
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Connexion</Text>
                </TouchableOpacity>

                <TouchableHighlight onPress={this.onButtonPress.bind(this)} style={styles.buttonContainer2}>
                    <Text style={styles.buttonText}>Inscription</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
