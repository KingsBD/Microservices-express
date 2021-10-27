export default class ServiceExeption extends Error {
  code: number;

  error: string[];

  constructor(code: number, message: string, error: string[] = []) {
    super(message);
    this.code = code;
    this.error = error;
  }
}
