import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UsersGuard } from './users.guard';
import { UsersService } from './users.service';
import { User, CreateUserInput } from '../app/graphql';

const pubSub = new PubSub();

@Resolver('User')
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query('users')
	@UseGuards(UsersGuard)
	async getUsers() {
		return this.usersService.findAll();
	}

	@Query('user')
	async findOneById(@Args('id') id: string): Promise<User | undefined> {
		return this.usersService.findOneById(id);
	}

	@Mutation('createUser')
	async create(@Args('createUserInput') args: CreateUserInput): Promise<User> {
		console.log('args:', args);
		const createdUser = await this.usersService.create(args);
		pubSub.publish('catCreated', { userCreated: createdUser });
		return createdUser;
	}

	@Subscription('userCreated')
	catCreated() {
		return pubSub.asyncIterator('userCreated');
	}
}
