/** @format */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import People from '@screens/People';
import PeopleList from '@screens/PeopleList';
import routes from './routes';

const AppStack = createStackNavigator();

function AppStackNavigator() {
  return (
    <AppStack.Navigator mode="modal">
      <AppStack.Screen
        name={routes.peopleList.name}
        component={PeopleList}
        options={{headerShown: false}}
      />
      <AppStack.Screen name={routes.people.name} component={People} />
    </AppStack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
}
