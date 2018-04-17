import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Creation from './createCommunity';
import Join from './joinCommunity';
import Profile from './profile';
import Connexion from './connexion';
import Inscription from './inscription';
import Communities from './userCommunity';

const Tabs = TabNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {

            tabBarLabel: 'Mon Profil',
            tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />

        }
    },
    Join: {
        screen: Join,
        navigationOptions: {
            tabBarLabel: 'Rejoindre une Co',
            tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />

        }
    },
    Creation: {
        screen: Creation,
        navigationOptions: {
            tabBarLabel: 'Créer votre Co',
            tabBarIcon: ({ tintColor }) => <Icon name="add" size={35} color={tintColor} />,

        }
    },
    Communities:{
        screen: Communities,
        navigationOptions: {
            tabBarLabel: 'Vos Co-z',
            tabBarIcon: ({ tintColor }) => <Icon name="supervisor-account" size={35} color={tintColor} />

        }
    }
},
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom'
    }
)

export default class Main extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Tabs />
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
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
        marginBottom: 60
    }
});
