// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Schema } from 'mongoose';
import UserSchema from '../model/user.schema';
import { User } from '../types/user.types';

class UserDao {
  userSchema: Schema;

  constructor() {
    this.userSchema = UserSchema;
  }

  validEmail = async (user: { _id?: string; email?: string }) => {
    const { email } = user;
    const dbUser = await this.searchUser({ email });
    if (
      // eslint-disable-next-line no-underscore-dangle
      (user?._id &&
        // eslint-disable-next-line no-underscore-dangle
        dbUser?._id &&
        // eslint-disable-next-line no-underscore-dangle
        dbUser?._id.toString() !== user._id.toString()) ||
      // eslint-disable-next-line no-underscore-dangle
      (!user?._id && dbUser)
    )
      throw new Error('There is already a registered user with this email.');
  };

  searchUser = (filter: User): Promise<User> => this.userSchema.findOne(filter);

  getUser = (id: string): Promise<any> => this.userSchema.findOne({ _id: id });

  getUsers = (): Promise<User[]> => this.userSchema.find();

  createUser = async (newUser: User): Promise<User> => {
    await this.validEmail(newUser);
    const obUser = new UserSchema(newUser);
    await obUser.save();
    return obUser;
  };

  updateUser = async (obUser: User, id: string): Promise<User> => {
    const user = await this.getUser(id);
    if (!user) throw new Error('There is not a registered user with this id.');
    user.firstName = obUser.firstName;
    user.middleName = obUser.middleName;
    user.lastName = obUser.lastName;
    user.email = obUser.email;
    user.secundaryEmail = obUser.secundaryEmail;
    user.phoneNumber = obUser.phoneNumber;
    user.secundaryPhoneNumber = obUser.secundaryPhoneNumber;
    user.homeAddress = obUser.homeAddress;
    user.city = obUser.city;
    user.password = obUser.password;
    await this.validEmail(user);
    await user.save();

    return user;
  };

  deleteUser = (id: string): Promise<void> =>
    this.userSchema.deleteOne({ _id: id });
}

export { UserDao };

export default new UserDao();
