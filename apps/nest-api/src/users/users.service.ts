import { Injectable } from '@nestjs/common';
import { User, CreateUserInput } from '../app/graphql';

@Injectable()
export class UsersService {
	private readonly users: User[] = [{ id: '1', username: 'Jon' }];

	findAll(): User[] {
		return this.users;
	}

	findOneById(id: string): User | undefined {
		return this.users.find((user: User) => user.id === id);
	}

	async create(args: CreateUserInput): Promise<User> {
		return {
			id: `${this.users.length}`,
			...args,
		};
	}
}
