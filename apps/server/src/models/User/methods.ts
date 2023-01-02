import { Schema } from "mongoose";
import crypto from "crypto";
import { IUser } from "./user";

export const methods = (schema: Schema<IUser>) => {
    schema.methods.isPasswordValid = function (password: string) {
        const hash = crypto
            .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
            .toString();
        return this.password === hash;
    };
};
