declare global {
  interface Array<T> {
    toSorted(compareFn: (a: T, b: T) => number):T[]
  }
}

interface RootObject {
  results: User[];
  info: Info;
}

interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Dob;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface Id {
  name: string;
  value: null | string;
}

interface Dob {
  date: string;
  age: number;
}

interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number | string;
  coordinates: Coordinates;
  timezone: Timezone;
}

interface Timezone {
  offset: string;
  description: string;
}

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface Street {
  number: number;
  name: string;
}

interface Name {
  title: string;
  first: string;
  last: string;
}

export enum SortBy {
  NONE = 'none',
  NAME = 'name',
  LAST = 'last',
  COUNTRY = 'country',
}
