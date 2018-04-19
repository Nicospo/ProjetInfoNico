import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, TextInput, Modal, ListView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import Connexion from './connexion';
import Toolbar from '../components/Toolbar/toolbar3';


export default class Needed extends React.Component {
    static navigationOptions = {
        title: 'Needed',
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
            serviceNeededDataSource: ds,
            solde: 0,
            modalVisible: false,
        }

        // this.neededServicesref = this.state.coRef.child('Services').child('Demandes');
        this.neededServicesref = this.getRef().child('communities').child(this.state.coRef).child('Services').child('Demandes')
        this.renderRow = this.renderRow.bind(this);
        this.do = this.do.bind(this);
    }

    getRef() {
        return firebase.database().ref();
    }

    componentWillMount() {
        this.getNeededServices(this.neededServicesref);
    }
    componentDidMount() {
        this.getNeededServices(this.neededServicesref);
    }
    getNeededServices(neededServicesref) {

        neededServicesref.on('value', (snap) => {
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
                serviceNeededDataSource: this.state.serviceNeededDataSource.cloneWithRows(services)
            });
        })

    }
    showService(neededService) {
        this.setState({
            intitule: neededService.Intitule.toString(),
            somme: neededService.Somme.toString(),
            description: neededService.Description.toString()
        })
        this.setModalVisible(true)
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }

    do(neededService) {
        const servKey = neededService._key
        const user = firebase.auth().currentUser
        const userId = user.uid
        const somme = neededService.Somme
        const ref = firebase.database().ref().child('communities').child(this.state.coRef).child('Services').child('Demandes').child(servKey)
        ref.remove()
        const userSoldeRef = firebase.database().ref().child('users').child(userId).child('Communities').child(this.state.coRef).child('Solde')

        userSoldeRef.once("value").then(snapshot => { 

             this.setState({
                solde : snapshot.val()
            }),
            firebase.database().ref().child('users').child(userId).child('Communities').child(this.state.coRef).update({
                Solde: this.state.solde+somme
            })
        })

    }
/*     renderSolde = () => {
        const user = firebase.auth().currentUser
        const userId = user.uid
        const soldeRef = firebase.database().ref().child('users').child(userId).child('Communities')
        const ref = this.state.coRef
        var that = this
        soldeRef.on('value', (snap) => {
            snap.forEach((child) => {
                if('0' == ref){
                that.setState={
                     solde : child.val().Solde
                }
                }
            });
        })
    } */
    /*     getSolde(userSoldeRef) {
    
            userSoldeRef.on('value', (snap) => {
                let soldes;
                snap.forEach((child) => {
                    soldes=child.val().Solde     
                    })
                ;
                this.setState(
                {
                    solde : soldes.toString()
                }
            )
            })
    
        } */
    renderRow(neededService) {
        return (
            <View>
                <View style={styles.containerButtons}>
                    <TouchableOpacity onPress={() => {
                        this.showService(neededService)
                    }}>
                        <View style={styles.button1}>
                            <Text style={styles.buttonText}>
                                {neededService.Intitule}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.do(neededService)
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
                <ListView
                    dataSource={this.state.serviceNeededDataSource}
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
