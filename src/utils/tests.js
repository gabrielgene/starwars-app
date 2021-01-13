/**
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useStoreApplicationContext} from '@context/storeApplication';
import {render} from '@testing-library/react-native';

export function LoadPeople({children}) {
  const {loadPeople} = useStoreApplicationContext();
  useEffect(() => {
    loadPeople();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export function renderWithNavigation(screens = {}) {
  const AppStack = createStackNavigator();

  const AppStackNavigator = () => (
    <AppStack.Navigator mode="modal">
      {Object.values(screens).map((v) => (
        <AppStack.Screen
          key={v.name}
          name={v.name}
          component={v.comp}
          options={v.options}
          initialParams={v.initialParams}
        />
      ))}
    </AppStack.Navigator>
  );

  return {
    ...render(
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>,
    ),
  };
}
