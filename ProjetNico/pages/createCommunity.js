import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ListView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';


export default class Create extends React.Component {
    static navigationOptions = {
        title: 'Create',
    };
    constructor(props) {
        super(props)
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = ({
          name: '',
          monnaie: '',
          communitiesDataSource: ds
        })
        this.communitiesRef = this.getRef().child('communities');

        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
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
                    _key: child.key
                })
            });
            this.setState({
                communitiesDataSource: this.state.communitiesDataSource.cloneWithRows(communities)
            });
        })

    }

    pressRow(community) {
        console.log(community);
    }

    renderRow(community) {
        return (
                <TouchableOpacity onPress={() => {
                    this.pressRow(community)
                }}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>
                            {community.Name}
                        </Text>
                    </View>
                </TouchableOpacity>
        )
    }
      addCommunity(){
        this.communitiesRef.push({Name:this.state.name,Monnaie:this.state.monnaie})
      }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Crée ta communauté</Text>
        </View>
        <View style={styles.container2}>

          <TextInput
            placeholder="Nom de la communauté"
            placeholderTextColor="rgba(255,255,255,0.7)"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(name) => this.setState({ name })}
          />
          <TextInput
            placeholder="Monnaie de la communauté"
            placeholderTextColor="rgba(255,255,255,0.7)"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(monnaie) => this.setState({ monnaie })}
          />

          <TouchableOpacity
            onPress={this.addCommunity.bind(this)}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Je la crée !</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(246, 185, 59)',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
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
    marginBottom: 100
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#fff',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: 'rgb(250, 211, 144)',
    paddingVertical: 15,
    marginBottom: 20
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700'
  }
});
