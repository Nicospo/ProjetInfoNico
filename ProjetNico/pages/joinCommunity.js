import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ListView, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Toolbar from '../components/Toolbar/toolbar';
import * as firebase from 'firebase';

export default class Join extends React.Component {
    static navigationOptions = {
        title: 'Join',
        header: null
    };

    constructor() {
        super();
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.state = {
            name: '',
            monnaie: '',
            count: '',
            description: '',
            communitiesDataSource: ds,
            modalVisible: false,
        }
        this.communitiesRef = this.getRef().child('communities');

        this.renderRow = this.renderRow.bind(this);
        this.join = this.join.bind(this);
    }

    getRef() {
        return firebase.database().ref();
    }

    componentWillMount() {
        this.getCommunities(this.communitiesRef);
    }
    componentDidMount() {
        this.getCommunities(this.communitiesRef);
    }
    getCommunities(communitiesRef) {

        communitiesRef.on('value', (snap) => {
            let communities = [];
            snap.forEach((child) => {
                communities.push({
                    Name: child.val().Name,
                    Monnaie: child.val().Monnaie,
                    _key: child.key,
                    Count: child.val().Count,
                    Description: child.val().Description
                })
            });
            this.setState({
                communitiesDataSource: this.state.communitiesDataSource.cloneWithRows(communities)
            });
        })

    }


    join(community) {
        const coKey = community._key
        const user = firebase.auth().currentUser
        const userId = user.uid
        const email = user.title
        const Name = community.Name
        const Monnaie = community.Monnaie
        const Count = community.Count
        const Description = community.Description
        const newCount = Count + 1
        firebase.database().ref().child('users').child(userId).child('Communities').once('value', function (snapshot) {
            if (snapshot.hasChild(coKey)) {
                alert('Vous faites déjà partie de cette communauté !');
            }

            else {
                const ref = firebase.database().ref().child('users').child(userId).child('Communities').child(coKey)
                ref.set({
                    Name: Name.toString(),
                    Monnaie: Monnaie.toString(),
                    Solde: 0,
                    Count: newCount.toString(),
                    Description: Description.toString()
                })

                firebase.database().ref().child('communities').child(coKey).update(
                    {
                        Name: Name.toString(),
                        Monnaie: Monnaie.toString(),
                        Count: newCount,
                        Description: Description.toString()
                    }
                )

                firebase.database().ref().child('communities').child(coKey).child('Membre/' + Count).set(
                    {
                        id: userId.toString(),
                        email: user.email.toString()
                    })
                    alert('Bravo !')
            }
        })
    }

    showCommunity(community) {
        this.setState({
            name: community.Name.toString(),
            monnaie: community.Monnaie.toString(),
            count: community.Count.toString(),
            description: community.Description.toString(),
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
                    this.showCommunity(community)
                }}>
                    <View style={styles.button1}>
                        <Text style={styles.buttonText}>
                            {community.Name}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.join(community)
                }}>
                    <View style={styles.button2}>
                        <Text style={styles.buttonText}> + </Text>
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
                            <Text style={styles.label}>Nombre de membres: </Text>
                            <Text style={styles.basicText}>{this.state.count}</Text>
                            <Text style={styles.label}>Description: </Text>
                            <Text style={styles.basicText}>{this.state.description}</Text>

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
        backgroundColor: 'rgb(229, 80, 57)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container2: {
        flex: 1,
        backgroundColor: '#ffbe76',
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
        justifyContent: 'space-between'
    },
    button1: {
        backgroundColor: 'rgb(248, 194, 145)',
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
