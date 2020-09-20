
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
}

export class LoginUserInput {
    email: string;
    password: string;
}

export class CreateTweetInput {
    text?: string;
    image?: string;
}

export abstract class IQuery {
    abstract user(id: string): User | Promise<User>;

    abstract users(query?: string): User[] | Promise<User[]>;

    abstract following(): User[] | Promise<User[]>;

    abstract followers(): User[] | Promise<User[]>;

    abstract tweet(id: string): Tweet | Promise<Tweet>;

    abstract profile(): User | Promise<User>;

    abstract homeTweets(offset?: number, limit?: number): Tweet[] | Promise<Tweet[]>;

    abstract userTweets(id: string, offset?: number, limit?: number): Tweet[] | Promise<Tweet[]>;
}

export abstract class IMutation {
    abstract signup(data: CreateUserInput): User | Promise<User>;

    abstract login(data: LoginUserInput): AuthPayload | Promise<AuthPayload>;

    abstract createTweet(data: CreateTweetInput): Tweet | Promise<Tweet>;

    abstract deleteTweet(id: string): Tweet | Promise<Tweet>;

    abstract updateTweetLike(id: string): Tweet | Promise<Tweet>;

    abstract updateFollowing(id: string): User | Promise<User>;
}

export class User {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar?: string;
    tweets?: Tweet[];
    following?: User[];
    followers?: User[];
    likedTweets?: Tweet[];
    createdAt: string;
    updatedAt: string;
}

export class Tweet {
    id: string;
    text?: string;
    image?: string;
    likes: number;
    author: User;
    fans?: User[];
    createdAt: string;
    updatedAt: string;
}

export class AuthPayload {
    token: string;
    user: User;
}
