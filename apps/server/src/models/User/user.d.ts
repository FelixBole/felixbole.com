import { Model, HydratedDocument } from "mongoose";
import { AllSchemas } from "../models";

export interface IUser extends AllSchemas {
    name: string;
    password: string;
    avatar: string[][];
    salt: string;
    stats: {
        wins: {
            solo: number;
            multiplayer: number;
        };
        highScore: {
            solo: number;
            multiplayer: number;
        };
        gamesPlayed: {
            solo: number;
            multiplayer: number;
        };
    };
}

export interface IUserMethods {
    isPasswordValid(password: string): boolean;
}

export interface UserModel extends Model<IUser, object, IUserMethods> {
    createUser(
        name: string,
        password: string
    ): Promise<HydratedDocument<IUser, IUserMethods>>;
}
