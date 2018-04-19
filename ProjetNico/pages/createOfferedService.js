import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ListView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';


export default class createOffered extends React.Component {
    static navigationOptions = {
        title: 'createOffered',
        header: null
    };
    constructor(props) {
        super(props)
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = ({
            coRef: this.props.navigation.state.params,
            intitule: '',
            somme: '',
            description: '',
            solde: 0,
            offeredDataSource: ds
        })
        this.offeredRef = this.getRef().child('communities').child(this.state.coRef).child('Services').child('Propositions');

    }

    getRef() {
        return firebase.database().ref();
    }


    addOffered() {
        const intitule = this.state.intitule
        const somme = this.state.somme
        const description = this.state.description
        const user = firebase.auth().currentUser
        const userId = user.uid
        const userSoldeRef = firebase.database().ref().child('users').child(userId).child('Communities').child(this.state.coRef).child('Solde')

        if (intitule != '') {
            if (description != '') {
                if (isNaN(somme)) {
                    alert("La somme rentrée n'est pas un numéro")
                }
                else {
                    const ref = firebase.database().ref().child('communities').child(this.state.coRef).child('Services').child('Propositions').push({
                        Intitule: intitule.toString(),
                        Somme: somme,
                        Description: description.toString(),
                        Creator: user.uid.toString()
                    })
                }
            }
            else {
                alert("Vous n'avez pas rentré de description.")
            }
        }
        else {
            alert("Vous n'avez pas rentré d'intitulé.")
        }


    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>Crée ta proposition</Text>
                </View>
                <View style={styles.container2}>

                    <TextInput
                        placeholder="Intitulé du service"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={(intitule) => this.setState({ intitule })}
                    />
                    <TextInput
                        placeholder="Somme à offrir"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={(somme) => this.setState({ somme })}
                    />
                    <TextInput
                        placeholder="Description du service"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={(description) => this.setState({ description })}
                    />

                    <TouchableOpacity
                        onPress={this.addOffered.bind(this)}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Je la crée !</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(246, 185, 59)',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
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
        marginBottom: 100
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#fff',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: 'rgb(250, 211, 144)',
        paddingVertical: 15,
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700'
    }
});
