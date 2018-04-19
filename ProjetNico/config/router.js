import React from 'react';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Connexion from '../pages/connexion';
import Inscription from '../pages/inscription';
import Profile from '../pages/profile';
import Join from '../pages/joinCommunity';
import Creation from '../pages/createCommunity';
import Communities from '../pages/userCommunity';
import Main from '../pages/main';
import {AppNavigator} from'../App';
import Needed from'../pages/servicesNeeded';
import Offered from '../pages/servicesOffered';
import createNeeded from '../pages/createNeededService';
import createOffered from'../pages/createOfferedService';

export const CommunitiesNavigator = StackNavigator({
    Communities:{
        screen:Communities
    },
    Needed:{
        screen:Needed
    },
    Offered:{
        screen:Offered
    },
    createNeeded:{
        screen:createNeeded
    },
    createOffered:{
        screen:createOffered
    }
    
})
export const Tabs = TabNavigator({
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
        screen: CommunitiesNavigator,
        navigationOptions: {
            tabBarLabel: 'Vos Co-z',
            tabBarIcon: ({ tintColor }) => <Icon name="supervisor-account" size={35} color={tintColor} />
        }
    }
},
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        header:null
    }
)