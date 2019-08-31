import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {Form, Item, Input, Label, Button} from 'native-base';

export default class EditContactScreen extends Component  {

  constructor(props){
    super(props);
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: "",
      key: ""
    }
  }

  static navigationOptions = {
    title: "Edit Contact"
  }

  componentDidMount(){
    const {navigation} = this.props;
    navigation.addListener("willFocus", () => {
      var key = navigation.getParam("key", "");
      this.getContact(key);
    })
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
    .then(contactJsonString => {
      var contact = JSON.parse(contactJsonString);
      contact["key"] = key;
      this.setState(contact);
    })
    .catch(error => {
      console.log(error);
    })
  }

  updateContact = async key => {
    if(
      this.state.fname != "" &&
      this.state.lname != "" &&
      this.state.phone != "" &&
      this.state.email != "" &&
      this.state.address != ""

      ){
        var contact = {
          fname: this.state.fname,
          lname: this.state.lname,
          phone: this.state.phone,
          email: this.state.email,
          address: this.state.address,
        };

        await AsyncStorage.mergeItem(key, JSON.stringify(contact))
        .then( () => {
          this.props.navigation.goBack();
        })
        .catch(error => {
          console.log(error);
        })
      }
  }

    render(){
        return (
          <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss;
          }}
        >
          <ScrollView style={styles.container}>
            <Form>
              <Item style={styles.inputItem}>
                <Label>First Name</Label>
                <Input 
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={fname => this.setState({fname})}
                  value={this.state.fname}
                /> 
              </Item>
              <Item style={styles.inputItem}>
                <Label>Last Name</Label>
                <Input 
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={lname => this.setState({lname})}
                  value={this.state.lname}
                /> 
              </Item>
              <Item style={styles.inputItem}>
                <Label>Phone</Label>
                <Input 
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={phone => this.setState({phone})}
                  value={this.state.phone}
                /> 
              </Item>
              <Item style={styles.inputItem}>
                <Label>Email</Label>
                <Input 
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={email => this.setState({email})}
                  value={this.state.email}
                /> 
              </Item>
              <Item style={styles.inputItem}>
                <Label>Address</Label>
                <Input 
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={address => this.setState({address})}
                  value={this.state.address}
                /> 
              </Item>
              <Button 
                style={styles.button}
                full
                rounded
                onPress={() => {
                  this.updateContact(this.state.key);
                }}
              >
                <Text style={styles.buttonText}>Update</Text>
              </Button>
            </Form>
            <View style={styles.empty}></View>
          </ScrollView>
        </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  empty: {
    height: 500,
    backgroundColor: "#FFF"
  }
});
