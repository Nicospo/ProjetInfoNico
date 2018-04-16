import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, TouchableHighlight, Text } from 'react-native';


export default class FormInscription extends React.Component {
    render() {
        return (
            <View style={styles.container}>

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
                <TextInput
                    placeholder="Confirmer le mot de passe"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
                
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Je m'inscris !</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700'
    }
});
