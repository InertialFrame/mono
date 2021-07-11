
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    username: string;
}

export interface IQuery {
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
}

export interface ISubscription {
    userCreated(): User | Promise<User>;
}

export interface User {
    id: string;
    username: string;
}

type Nullable<T> = T | null;
