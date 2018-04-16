import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import PageCreation from './createCommunity';
import PageJoin from './joinCommunity';
//import PageMoto from './motos';
import PageProfile from './profile';
//import PageGPS from './gps';
//import PageDetailMoto from './detailMoto';
import PageConnexion from './connexion';
import PageInscription from './inscription';
//import PageMotoEssai from './motoEssai'
//import PageGPSEssai from './gpsEssai'

const communitiesNavigator = StackNavigator({
    Communities : {
        screen: PageJoin,
        navigationOptions:  
            {
                headerLeft: null
            }
        },
    },
    {
        initialRouteName: 'Community',
    }
); 

const profileNavigator = StackNavigator({
    Connexion : {
        screen: PageConnexion,
        navigationOptions:  
            {
                headerLeft: null
            }
        },
        Inscription : {
        screen: PageInscription,
        },

    },
    {
        initialRouteName: 'Connexion',
    }
); 



//Export par défaut si probleme
export const TabNavUserLogged =  TabNavigator({
    Communities : { 
        screen : communitiesNavigator,
        navigationOptions:  
            {
                header: null
            }
    },
    Creation : {
        screen : PageCreation,
        navigationOptions: ({ navigation }) => ({
            headerLeft:null,
            tabBarOnPress: () => navigation.navigate("Création", { date: new Date() })
            })
        },        
    Profile : {
        screen : PageProfile,
        navigationOptions: {
            headerLeft : null,
        }
    }
    },
    {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconType;
        if (routeName === 'Communities') {
          iconName = 'community';
          iconType = 'font-awesome';
        } else if (routeName === 'Création'){
            iconName = 'creation';
            iconType = 'entypo';
        } else if (routeName === 'Profile') {
          iconName = 'user';
          iconType = 'font-awesome';
        } 
            return <Icon name={iconName} type={iconType} size={25} color={tintColor} />;
      },
    }),


    tabBarOptions: {
      activeTintColor: '#1565c0',
      inactiveTintColor: '#b0bec5',
    },
    
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);


export const TabNavUserNotLogged =  TabNavigator({
    Motos : { 
        screen : PageMotoEssai,
    },
    GPS : {
        screen : PageGPSEssai,
        navigationOptions: ({ navigation }) => ({
            headerLeft:null,
            tabBarOnPress: () => navigation.navigate("GPS", { date: new Date() })
            })
        },        
    Profile : {
        screen : profileNavigator,
        navigationOptions: {
            headerLeft : null,
        }
    }
    },
    {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconType;
        if (routeName === 'Motos') {
          iconName = 'motorcycle';
          iconType = 'font-awesome';
        } else if (routeName === 'GPS'){
            iconName = 'location';
            iconType = 'entypo';
        } else if (routeName === 'Profile') {
          iconName = 'user';
          iconType = 'font-awesome';
        } 
            return <Icon name={iconName} type={iconType} size={25} color={tintColor} />;
      },
    }),


    tabBarOptions: {
      activeTintColor: '#1565c0',
      inactiveTintColor: '#b0bec5',
    },
    
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);