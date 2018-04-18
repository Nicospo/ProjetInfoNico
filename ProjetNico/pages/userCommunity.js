import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ListView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Toolbar from '../components/Toolbar/toolbar2';
import * as firebase from 'firebase';

export default class UserCommunity extends React.Component {
    static navigationOptions = {
        title: 'UserCommunity',
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
                    Count: child.val().Count
                })
            });
            this.setState({
                communitiesDataSource: this.state.communitiesDataSource.cloneWithRows(Communities)
            });
        })

    }
    check(community){
        console.log(community)
    }

    renderRow(community) {
        return (
            <TouchableOpacity onPress={() => {
                this.check(community)
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
        backgroundColor: 'rgb(7, 153, 146)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        backgroundColor: 'rgb(56, 173, 169)',
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
