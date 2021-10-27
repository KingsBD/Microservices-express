// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  id: String,
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  secundaryEmail: String,
  phoneNumber: String,
  secundaryPhoneNumber: String,
  homeAddress: String,
  city: String,
  password: String,
});

export default model('user', userSchema);
