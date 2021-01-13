import React from 'react';
import {fireEvent, waitFor} from '@testing-library/react-native';
import StoreApplicationProvider from '@context/storeApplication';

import People from '../';
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
    },
  ],
};

jest.mock('../../../services/getAllPeople', () => {
  return () => Promise.resolve(MOCK);
});

function PeopleWithContext() {
  return (
    <StoreApplicationProvider>
      <People />
    </StoreApplicationProvider>
  );
}

function renderPeopleStack() {
  return renderWithNavigation({
    People: {
      comp: PeopleWithContext,
      name: 'People',
      initialParams: {name: 'Luke', idx: 0},
    },
  });
}

describe('People', () => {
  test('should behave properly', async () => {
    const {getByText, getByTestId} = renderPeopleStack();

    await waitFor(() => {
      expect(getByText('Height: 172')).not.toBeNull();
      expect(getByText('Mass: 77')).not.toBeNull();
      expect(getByText('Hair Color: blond')).not.toBeNull();
      expect(getByText('Skin Color: fair')).not.toBeNull();
      expect(getByText('Eye Color: blue')).not.toBeNull();
      expect(getByText('Birth Year: 19BBY')).not.toBeNull();
      expect(getByText('Gender: male')).not.toBeNull();

      expect(getByTestId('Icon')).toHaveStyle({color: '#fefefe8c'});
      fireEvent.press(getByTestId('ToogleFavorite'));
      expect(getByTestId('Icon')).toHaveStyle({color: '#ffe301'});
    });
  });
});
