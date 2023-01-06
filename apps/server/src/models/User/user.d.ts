import { Model, HydratedDocument, Types } from "mongoose";
import { AllSchemas } from "../models";

type SoloMultiStats = {
    solo: number;
    multiplayer: number;
};

type UserStats = {
    wins: SoloMultiStats;
    highScore: SoloMultiStats;
    gamesPlayed: SoloMultiStats;
};

export type PublicUserSchema = {
    _id: Types.ObjectId;
    name: string;
    avatar: string[][];
    stats: UserStats;
};

export interface IUser extends AllSchemas {
    name: string;
    password: string;
    avatar: string[][];
    salt: string;
    stats: UserStats;
}

export interface IUserMethods {
    isPasswordValid(password: string): boolean;
    publicSchema(): PublicUserSchema;
}

export interface UserModel extends Model<IUser, object, IUserMethods> {
    createUser(
        name: string,
        password: string
    ): Promise<HydratedDocument<IUser, IUserMethods>>;
}
