import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ListView, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Toolbar from '../components/Toolbar/toolbar2';
import * as firebase from 'firebase';

export default class UserCommunity extends React.Component {
    static navigationOptions = {
        title: 'UserCommunity',
        header:null
    };

    constructor() {
        super();
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.state = {
            ref:'',
            name: '',
            monnaie: '',
            count: '',
            description:'',
            solde:'',
            modalVisible:false,
            communitiesDataSource: ds
        }
        const user = firebase.auth().currentUser
        const userId = user.uid
        this.usercommunitiesRef = this.getRef().child('users/'+userId+'/Communities');

        this.renderRow = this.renderRow.bind(this);
       // this.join = this.join.bind(this);
    }

    getRef() {
        return firebase.database().ref();
    }

    componentWillMount() {
        this.getuserCommunities(this.usercommunitiesRef);
    }
    componentDidMount() {
        this.getuserCommunities(this.usercommunitiesRef);
    }

    getuserCommunities(usercommunitiesRef) {

        usercommunitiesRef.on('value', (snap) => {
            let Communities = [];
            snap.forEach((child) => {
                Communities.push({
                    Name: child.val().Name,
                    Monnaie: child.val().Monnaie,
                    _key: child.key,
                    Count: child.val().Count,
                    Description:child.val().Description,
                    Solde:child.val().Solde
                })
            });
            this.setState({
                communitiesDataSource: this.state.communitiesDataSource.cloneWithRows(Communities)
            });
        })

    }
    check(community){
        const coKey = community._key
        //const ref = firebase.database().ref().child('communities').child(coKey)
        this.setState({
            name: community.Name.toString(),
            monnaie: community.Monnaie.toString(),
            count: community.Count.toString(),
            description: community.Description.toString(),
            solde: community.Solde.toString(),
            //ref : ref.toString()
            ref:coKey.toString()
        })
        this.setModalVisible(true)
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }

    renderRow(community) {
        return (
            <View style={styles.containerButtons}>
            <TouchableOpacity onPress={() => {
                this.check(community)
            }}>
                <View style={styles.button1}>
                    <Text style={styles.buttonText}>
                        {community.Name}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>

            <Toolbar title="ItemLister" />
            <ListView
                dataSource={this.state.communitiesDataSource}
                renderRow={this.renderRow}
            />
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => { }}
            >
                <View style={styles.container2}>
                    <Text style={styles.title}>{this.state.name}</Text>
                    <View>
                        <Text style={styles.label}>Monnaie: </Text>
                        <Text style={styles.basicText}>{this.state.monnaie}</Text>
                        <Text style={styles.label}>Votre solde: </Text>
                        <Text style={styles.basicText}>{this.state.solde}</Text>
                        <Text style={styles.label}>Description: </Text>
                        <Text style={styles.basicText}>{this.state.description}</Text>
                        <TouchableOpacity
                            onPress = {() => {
                                this.props.navigation.navigate('Needed',this.state.ref)
                                this.setModalVisible(false)
                            }}
                            style={styles.buttonContainer2}
                        >
                            <Text style={styles.buttonText}> Services demandés </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Offered',this.state.ref)
                                this.setModalVisible(false)
                            }}
                            style={styles.buttonContainer2}
                        >
                            <Text style={styles.buttonText}> Services proposés </Text>
                        </TouchableOpacity>
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
    );
}
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(7, 153, 146)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container2: {
        flex: 1,
        backgroundColor: '#686de0',
        justifyContent: 'center',
        alignItems: 'center',
        padding:20
    },
    buttonContainer: {
        backgroundColor: '#95afc0',
        paddingVertical: 15,
        marginTop: 30
    },
    buttonContainer2: {
        backgroundColor: '#30336b',
        paddingVertical: 15,
        marginTop: 30
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
        marginTop: 15,
        fontSize: 15,
        fontWeight: 'bold',
        textDecorationLine:'underline'
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
        justifyContent: 'space-between'
    },
    button1: {
        backgroundColor: '#22a6b3',
        paddingVertical: 15,
        marginBottom: 20,
        width: 150,
        marginRight: 15
    },
    button2: {
        backgroundColor: '#e58e26',
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

