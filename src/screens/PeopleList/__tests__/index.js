import React from 'react';
import {Text} from 'react-native';
import {fireEvent, waitFor} from '@testing-library/react-native';
import StoreApplicationProvider from '@context/storeApplication';
import {useRoute} from '@react-navigation/native';

import PeopleList from '../';

import {renderWithNavigation} from '../../../utils/tests';

const MOCK = {
  next: 'http://swapi.dev/api/people/?page=2',
  results: [
    {
      name: 'Luke',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    },
    {
      name: 'C-3PO',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      favorite: true,
    },
  ],
};

jest.mock('../../../services/getAllPeople', () => {
  return () => Promise.resolve(MOCK);
});

function FakePeopleScreen() {
  const route = useRoute();
  const {name, idx} = route.params;
  return (
    <>
      <Text>FakeParamName_{name}</Text>
      <Text>FakeParamIdx_{idx}</Text>
    </>
  );
}

function PeopleListWithContext() {
  return (
    <StoreApplicationProvider>
      <PeopleList />
    </StoreApplicationProvider>
  );
}

function renderPeopleListStack() {
  return renderWithNavigation({
    PeopleList: {
      comp: PeopleListWithContext,
      name: 'PeopleList',
    },
    People: {
      comp: FakePeopleScreen,
      name: 'People',
    },
  });
}

describe('PeopleList', () => {
  test('should behave properly', async () => {
    const {queryByText, getByTestId, queryByTestId} = renderPeopleListStack();
    await waitFor(() => {
      expect(getByTestId('PeopleItem_Luke')).not.toBeNull();
      expect(getByTestId('PeopleItem_C-3PO')).not.toBeNull();

      expect(getByTestId('Favorite_C-3PO')).not.toBeNull();
      expect(queryByTestId('Favorite_Luke')).toBeNull();

      fireEvent.press(getByTestId('PeopleItem_Luke'));
      expect(queryByText('FakeParamName_Luke')).not.toBeNull();
      expect(queryByText('FakeParamIdx_0')).not.toBeNull();
    });
  });
});
