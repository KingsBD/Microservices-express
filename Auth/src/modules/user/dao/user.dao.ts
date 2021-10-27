// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Schema } from 'mongoose';
import UserSchema from '../model/user.schema';

class UserDao {
  userSchema: Schema;

  constructor() {
    this.userSchema = UserSchema;
  }

  searchUser = (filter: any): Promise<any> => this.userSchema.findOne(filter);

  createBaseUser = async (): Promise<any> => {
    const defaultUser = await this.searchUser({ email: 'test' });
    if (defaultUser) return;
    const obUser = new UserSchema({
      firstName: 'test',
      middleName: 'test',
      lastName: 'test',
      email: 'daniel.reye32@logictran.com',
      secundaryEmail: 'test',
      phoneNumber: '3163426998',
      secundaryPhoneNumber: 'test',
      homeAddress: 'test',
      city: 'test',
      password: 'test',
    });
    await obUser.save();
    return obUser;
  };
}

export { UserDao };

export default new UserDao();
