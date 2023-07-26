import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './screens/navigations/TabNavigator';

// Create the drawer navigator

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <TabNavigator/>
    </NavigationContainer>
  );
}








