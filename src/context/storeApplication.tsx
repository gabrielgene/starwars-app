/** @format */

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from 'react';
import queryString from 'query-string';
import getAllPeople, {PeopleType} from '@services/getAllPeople';

type PeopleListType = Array<PeopleType>;

interface StoreApplicationContext {
  peopleList: PeopleListType;
  toggleFavorite: (peopleIdx: number) => void;
  loading: boolean;
  loadPeople: () => void;
}

export const StoreApplicationContext = createContext<StoreApplicationContext>({
  peopleList: [],
  toggleFavorite: () => {},
  loading: false,
  loadPeople: () => {},
});

export default function StoreApplicationProvider(props: PropsWithChildren<{}>) {
  const [state, setState] = useState<PeopleListType>([]);
  const [nextPage, setNextPage] = useState<string | string[]>('1');
  const [loading, setLoading] = useState<boolean>(false);

  function toggleFavorite(peopleIdx: number) {
    const newState = [...state];
    newState[peopleIdx].favorite = !newState[peopleIdx].favorite;
    setState([...newState]);
  }

  async function loadPeople() {
    setLoading(true);
    const {next, results} = await getAllPeople(nextPage);
    // next = http://swapi.dev/api/people/?page=2
    if (next) {
      setNextPage(Object.values(queryString.parse(next))[0] || '');
    }
    setState([...state, ...results]);
    setLoading(false);
  }

  useEffect(() => {
    loadPeople();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StoreApplicationContext.Provider
      value={{peopleList: state, toggleFavorite, loading, loadPeople}}>
      {props.children}
    </StoreApplicationContext.Provider>
  );
}

export function useStoreApplicationContext() {
  return useContext(StoreApplicationContext);
}
