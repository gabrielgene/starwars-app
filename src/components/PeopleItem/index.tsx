import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import routes from '@navigation/routes';

type PeopleItemType = {
  name: string;
  favorite: boolean;
  idx: number;
};

const PeopleItem: React.FC<PeopleItemType> = ({name, favorite, idx}) => {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigate(routes.people.name, {name, idx})}
      style={styles.listItem}>
      <Text style={styles.text}>{name}</Text>
      {favorite && <Icon name="death-star-variant" size={30} color="#ffe301" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fefefe',
  },
  listItem: {
    backgroundColor: '#32383e',
    marginTop: 20,
    padding: 24,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default React.memo(PeopleItem);
