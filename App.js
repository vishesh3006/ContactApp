import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ViewContactScreen from './screens/ViewContactScreen';
import CreateContactScreen from './screens/CreateContactScreen';
import EditContactScreen from './screens/EditContactScreen';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    View: {screen: ViewContactScreen},
    Create: {screen: CreateContactScreen},
    Edit: {screen: EditContactScreen}
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#FFF",
      headerStyle: {
        backgroundColor: "#ba3227"
      },
      headerTitleStyle: {
        color: "#FFF"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);
export default App;
