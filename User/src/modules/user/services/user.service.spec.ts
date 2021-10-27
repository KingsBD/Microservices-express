import { mocked } from 'ts-jest/utils';
import { UserService } from './user.service';

jest.mock('../dao/user.dao', () => {
  const userDao = { searchUser: jest.fn() };
  const mB = jest.fn(() => userDao);
  return { UserDao: mB };
});

describe('UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    service = new UserService();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should mock searchUser', async () => {
    mocked(service.userDao).searchUser.mockImplementationOnce(() => 'test');
    expect(await service.searchUser({ id: '1' })).toBe('test');
  });
});
