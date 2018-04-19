import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Tabs from '../config/router';


export default class Main extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Tabs />
        );
    }
}
