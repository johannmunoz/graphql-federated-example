import {
  CreateUserInput,
  CreateUserResponse,
  User,
} from '../../generated/graphql-types';
import { AddDocTo } from '../../utils/db-commands';
import { GetDocFrom, GetDocsFrom } from '../../utils/db-queries';

export class UsersService {
  async getUser(id: string): Promise<User> {
    const user = await GetDocFrom<User>((db) => db.doc(`users/${id}`));
    return user;
  }
  async getAllUsers(): Promise<User[]> {
    const users = await GetDocsFrom<User>((db) => db.collection('users'));
    return users;
  }

  async createUser(input: CreateUserInput): Promise<CreateUserResponse> {
    try {
      const newUser = { email: input.email, name: input.name } as User;
      const user = await AddDocTo<User>(
        (db) => db.collection('users'),
        newUser
      );
      return {
        code: '200',
        success: true,
        message: '',
        user: user,
      } as CreateUserResponse;
    } catch (error) {
      console.log(error);
      return {
        code: '500',
        success: false,
        message: 'Error creating user',
      } as CreateUserResponse;
    }
  }
}
