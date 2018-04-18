import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ListView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Toolbar from '../components/Toolbar/toolbar';
import * as firebase from 'firebase';

export default class Join extends React.Component {
    static navigationOptions = {
        title: 'Join',
    };

    constructor() {
        super();
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.state = {
            name: '',
            monnaie: '',
            count: '',
            communitiesDataSource: ds
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
                    Count: child.val().Count
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
        const newCount = Count+1
        const ref = firebase.database().ref().child('users').child(userId).child('Communities')
        ref.push({
            Name: Name.toString(),
            Monnaie: Monnaie.toString(),
            Solde: 0,
            Count : newCount
        })

        firebase.database().ref().child('communities').child(coKey).update(
            {
                Name: Name.toString(),
                Monnaie: Monnaie.toString(),
                Solde: 0,
                Count : newCount
            }
        )

        firebase.database().ref().child('communities').child(coKey).child('Membre/' + Count).set(
            {
                id : userId.toString(),
                email : user.email.toString()
            })

    }

    renderRow(community) {
        return (
            <TouchableOpacity onPress={() => {
                this.join(community)
            }}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>
                        {community.Name}
                    </Text>
                </View>
            </TouchableOpacity>
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
    buttonContainer: {
        backgroundColor: 'rgb(248, 194, 145)',
        paddingVertical: 15,
        marginBottom: 20,
        width: 200
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700'
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 30,
        fontSize: 36,
        fontWeight: 'bold'
    },
})
