import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, TextInput, Modal, ListView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import Connexion from './connexion';
import Toolbar from '../components/Toolbar/toolbar4';


export default class Offered extends React.Component {
    static navigationOptions = {
        title: 'Offered',
        header: null,
    };
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.state = {
            coRef: this.props.navigation.state.params,
            intitule: '',
            somme: '',
            description: '',
            serviceOfferedDataSource: ds,
            solde: '',
            modalVisible: false,
        }

        // this.neededServicesref = this.state.coRef.child('Services').child('Demandes');
        this.offeredServicesref = this.getRef().child('communities').child(this.state.coRef).child('Services').child('Propositions')

        this.renderRow = this.renderRow.bind(this);
        this.do = this.do.bind(this);
    }

    getRef() {
        return firebase.database().ref();
    }

    componentWillMount() {
        this.getOfferedServices(this.offeredServicesref);
    }
    componentDidMount() {
        this.getOfferedServices(this.offeredServicesref);
    }
    getOfferedServices(offeredServicesref) {

        offeredServicesref.on('value', (snap) => {
            let services = [];
            snap.forEach((child) => {
                services.push({
                    Intitule: child.val().Intitule,
                    Somme: child.val().Somme,
                    _key: child.key,
                    Description: child.val().Description,
                })
            });
            this.setState({
                serviceOfferedDataSource: this.state.serviceOfferedDataSource.cloneWithRows(services)
            });
        })

    }

    showService(offeredService) {
        this.setState({
            intitule: offeredService.Intitule.toString(),
            somme: offeredService.Somme.toString(),
            description: offeredService.Description.toString()
        })
        this.setModalVisible(true)
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }

    do(offeredService) {
        const servKey = offeredService._key
        const user = firebase.auth().currentUser
        const userId = user.uid
        const somme = offeredService.Somme
        const ref = firebase.database().ref().child('communities').child(this.state.coRef).child('Services').child('Propositions').child(servKey)

        const userSoldeRef = firebase.database().ref().child('users').child(userId).child('Communities').child(this.state.coRef).child('Solde')
        const creatorServiceRef = firebase.database().ref().child('communities').child(this.state.coRef).child('Services').child('Propositions').child(servKey).child('Creator')
        creatorServiceRef.once("value").then(snapshot => {
            if (userId == snapshot.val()) { alert('Vous ne pouvez effectuer ce service, vous en êtes le créateur') }
            else {

                userSoldeRef.once("value").then(snapshot => {

                    this.setState({
                        solde: snapshot.val()
                    })

                    if (this.state.solde >= somme) {
                        firebase.database().ref().child('users').child(userId).child('Communities').child(this.state.coRef).update({
                            Solde: this.state.solde - somme
                        })
                        ref.remove()
                    }
                    else {
                        alert("Votre solde est insuffisant pour régler ce service.")
                    }

                })
            }
        })
    }
    renderRow(offeredService) {
        return (
            <View>
                <View style={styles.containerButtons}>
                    <TouchableOpacity onPress={() => {
                        this.showService(offeredService)
                    }}>
                        <View style={styles.button1}>
                            <Text style={styles.buttonText}>
                                {offeredService.Intitule}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.do(offeredService)
                    }}>
                        <View style={styles.button2}>
                            <Text style={styles.buttonText}> Moi ! </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }





    render() {
        // const coKey = this.props.navigation.state.params
        return (
            <View style={styles.container}>

                <Toolbar title="ItemLister" />
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('createOffered', this.state.coRef)
                    }}
                    style={styles.buttonContainer}
                >
                    <Text style={styles.buttonText}> Crée ta proposition ! </Text>
                </TouchableOpacity>
                <ListView
                    dataSource={this.state.serviceOfferedDataSource}
                    renderRow={this.renderRow}

                />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { }}
                >
                    <View style={styles.container2}>
                        <Text style={styles.title}>{this.state.intitule}</Text>


                        <View>
                            <Text style={styles.label}>Description: </Text>
                            <Text style={styles.basicText}>{this.state.description}</Text>
                            <Text style={styles.label}>Somme: </Text>
                            <Text style={styles.basicText}>{this.state.somme}</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(false)
                                }}
                                style={styles.buttonContainer}
                            >
                                <Text style={styles.buttonText}> Retour </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4834d4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        flex: 1,
        backgroundColor: '#686de0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    buttonContainer: {
        backgroundColor: '#95afc0',
        paddingVertical: 15,
        marginTop: 40
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 20,
        fontSize: 36,
        fontWeight: 'bold'
    },
    label: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    basicText: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
        fontSize: 12,
    },
    containerButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    button1: {
        backgroundColor: '#30336b',
        paddingVertical: 15,
        marginBottom: 20,
        width: 150,
        marginRight: 15
    },
    button2: {
        backgroundColor: '#130f40',
        paddingVertical: 15,
        marginBottom: 20,
        width: 50,
        marginLeft: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
})
