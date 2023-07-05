export interface User {
  id: string;
  name: {
    first: string,
    last: string
  }
  login: string;
  token: string;
}
