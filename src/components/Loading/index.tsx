import React, {PropsWithChildren} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

export default function Loading(props: PropsWithChildren<{loading: boolean}>) {
  if (props.loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ffe301" />
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  loading: {
    alignSelf: 'center',
    backgroundColor: '#272b30',
    marginVertical: 20,
  },
});
