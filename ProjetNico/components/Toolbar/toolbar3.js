import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';


export default class ToolBar extends React.Component {

    render() {
        return (
            <View style={styles.navbar} >
                <Text style={styles.navbarTitle}>Les demandes</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        alignItems: 'center',
        backgroundColor: '#079992',
        borderBottomColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 1,
        justifyContent: 'center',
        height: 70,
        flexDirection: 'row',
        marginTop: 70
    },
    navbarTitle: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
        fontSize: 36,
        fontWeight: 'bold'
    },
    toolbar: {
        backgroundColor: '#fff',
        height: 22
    }
});
