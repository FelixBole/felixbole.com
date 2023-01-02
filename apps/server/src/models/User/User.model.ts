import { Schema } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user";

export const schema = new Schema<IUser, UserModel, IUserMethods>({
    name: {
        type: String,
        required: true,
        min: [2, "Name too short !"],
        max: [30, "Name too long !"],
    },

    email: {
        type: String,
        required: true,
        min: [5, "Invalid email length !"],
        unique: true,
    },

    password: {
        type: String,
        required: true,
        min: [8, "Password too short !"],
        max: [20, "Password too long !"],
    },

    salt: {
        type: String,
    },

    stats: {
        wins: {
            solo: {
                type: Number,
                default: 0,
            },
            multiplayer: {
                type: Number,
                default: 0,
            },
        },

        highScore: {
            solo: {
                type: Number,
                default: 0,
            },
            multiplayer: {
                type: Number,
                default: 0,
            },
        },

        gamesPlayed: {
            solo: {
                type: Number,
                default: 0,
            },

            multiplayer: {
                type: Number,
                default: 0,
            },
        },
    },

    schema_version: { type: String, default: "1" },
});
