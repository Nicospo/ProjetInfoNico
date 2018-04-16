import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import Connexion from '../pages/connexion';
import Inscription from '../pages/inscription';

export const Pages = StackNavigator({
    Connexion :{
        screen : Connexion,
    },
    Inscription:{
        screen : Inscription,
    }
})