import React from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import Loading from '@components/Loading';
import PeopleItem from '@components/PeopleItem';
import {useStoreApplicationContext} from '@context/storeApplication';

export default function PeopleList() {
  const {peopleList, loadPeople, loading} = useStoreApplicationContext();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.list}
        data={peopleList}
        renderItem={({item: {name, favorite}, index}) => (
          <PeopleItem name={name} favorite={favorite} idx={index} />
        )}
        keyExtractor={(item) => item.name}
        onEndReached={loadPeople}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => <Loading loading={loading} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272b30',
    flex: 1,
  },
  flatList: {
    marginTop: 16,
  },
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    backgroundColor: '#333',
    marginTop: 20,
    padding: 30,
  },
  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});
