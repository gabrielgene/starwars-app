import swapi from './swapi';

export type PeopleType = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  favorite: boolean;
};

type AllPeople = {
  next: string;
  results: Array<PeopleType>;
};

export default async function getAllPeople(
  page: string | string[],
): Promise<AllPeople> {
  const result = await swapi.get(`/people/?page=${page}`);
  return result.data;
}
