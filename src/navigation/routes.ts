/** @format */

function routeConfig(key: string) {
  return {
    key,
    name: key,
  };
}

export default {
  peopleList: routeConfig('PeopleList'),
  people: routeConfig('People'),
};
