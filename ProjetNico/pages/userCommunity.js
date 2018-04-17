import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';


export default class Communities extends React.Component {
    static navigationOptions = {
        title: 'Communities',
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>Tes communautés</Text>
                </View>
            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(26, 188, 156)',
    },
    container2: {
        padding: 20,
        marginBottom: 60
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginTop: 20,
        color: '#fff',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: 'rgb(52, 73, 94)',
        paddingVertical: 15,
        marginTop: 40
    },
    buttonContainer2: {
        backgroundColor: 'rgb(192, 57, 43)',
        paddingVertical: 15,
        marginTop: 40
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
      },
      title: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        marginTop:30,
        fontSize: 36,
        fontWeight: 'bold'
      },
    })
