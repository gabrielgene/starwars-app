import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useStoreApplicationContext} from '@context/storeApplication';
import Loading from '@components/Loading';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ParamList = {
  People: {name: string; idx: number};
};

type LoginPassRouteProp = RouteProp<ParamList, 'People'>;

export default function People() {
  const {setOptions} = useNavigation();
  const {toggleFavorite, peopleList} = useStoreApplicationContext();
  const route = useRoute<LoginPassRouteProp>();
  const {name, idx} = route.params;

  const currentPeople = peopleList[idx];

  useEffect(() => {
    setOptions({title: name});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (peopleList.length === 0) {
    return <Loading loading />;
  }

  const {
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    favorite,
  } = currentPeople;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View>
          <Text style={styles.text}>Height: {height}</Text>
          <Text style={styles.text}>Mass: {mass}</Text>
          <Text style={styles.text}>Hair Color: {hair_color}</Text>
          <Text style={styles.text}>Skin Color: {skin_color}</Text>
          <Text style={styles.text}>Eye Color: {eye_color}</Text>
          <Text style={styles.text}>Birth Year: {birth_year}</Text>
          <Text style={styles.text}>Gender: {gender}</Text>
        </View>
        <TouchableOpacity
          testID="ToogleFavorite"
          onPress={() => toggleFavorite(idx)}
          style={styles.favorite}>
          <Icon
            testID="Icon"
            name="death-star-variant"
            size={30}
            color={favorite ? '#ffe301' : '#fefefe8c'}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272b30',
    flex: 1,
    padding: 14,
  },
  text: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
    color: '#fefefe',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#32383e',
    marginTop: 20,
    padding: 30,
    paddingTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  favorite: {
    padding: 8,
  },
});
