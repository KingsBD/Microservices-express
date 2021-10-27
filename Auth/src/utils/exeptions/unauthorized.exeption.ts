export default class UnauthorizedExeption extends Error {
  constructor() {
    super('Unauthorized');
  }
}
