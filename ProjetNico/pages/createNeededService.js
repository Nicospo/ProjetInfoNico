import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ListView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';


export default class createNeeded extends React.Component {
    static navigationOptions = {
        title: 'createNeeded',
        header: null
    };
    constructor(props) {
        super(props)
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = ({
            coRef: this.props.navigation.state.params,
            intitule: '',
            somme: null,
            description: '',
            solde: 0,
            neededDataSource: ds
        })
        this.neededRef = this.getRef().child('communities').child(this.state.coRef).child('Services').child('Demandes');

    }

    getRef() {
        return firebase.database().ref();
    }


    addNeeded() {
        const intitule = this.state.intitule
        const somme = this.state.somme
        const description = this.state.description
        const user = firebase.auth().currentUser
        const userId = user.uid
        const userSoldeRef = firebase.database().ref().child('users').child(userId).child('Communities').child(this.state.coRef).child('Solde')

        if (intitule != '') {
            if (description != '') {
                if ((isNaN(somme)) || (somme == null)) {
                    alert("La somme rentrée n'est pas un numéro")
                }
                else {
                    userSoldeRef.once("value").then(snapshot => {

                        this.setState({
                            solde: snapshot.val()
                        })
                        const creatorServiceRef = firebase.database().ref().child('communities').child(this.state.coRef).child('Creator')

                        creatorServiceRef.once("value").then(snapshot => {
                            if (userId == snapshot.val()) {
                                const ref = firebase.database().ref().child('communities').child(this.state.coRef).child('Services').child('Demandes').push({
                                    Intitule: intitule.toString(),
                                    Somme: parseInt(somme),
                                    Description: description.toString(),
                                    Creator: user.uid.toString()
                                })
                                alert("Votre service a été crée, et générera de l'argent")
                                this.props.navigation.navigate('Needed', this.state.coRef)

                            }
                            else {
                                if (this.state.solde >= somme) {
                                    const ref = firebase.database().ref().child('communities').child(this.state.coRef).child('Services').child('Demandes').push({
                                        Intitule: intitule.toString(),
                                        Somme: parseInt(somme),
                                        Description: description.toString(),
                                        Creator: user.uid.toString()
                                    })
                                    alert('Votre demande a bien été créée !')
                                    this.props.navigation.navigate('Needed', this.state.coRef)
                                }
                                else {
                                    alert("Vous n'avez pas l'argent que vous proposez.")
                                }
                            }
                        })
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
                    <Text style={styles.title}>Crée ta demande</Text>
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
                        onPress={this.addNeeded.bind(this)}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Je la crée !</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('Needed', this.state.coRef)
                        }}
                        style={styles.buttonContainer2}
                    >
                        <Text style={styles.buttonText}> Retour </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#60a3bc',
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
        backgroundColor: '#1e3799',
        paddingVertical: 15,
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700'
    },
    buttonContainer2: {
        backgroundColor: '#95afc0',
        paddingVertical: 15,
        marginTop: 20
    },
});
