import { Schema } from "mongoose";
import crypto from "crypto";
import { IUser } from "./user";

export const methods = (schema: Schema<IUser>) => {
    schema.methods.isPasswordValid = async function (password: string) {
        return new Promise((res, rej) => {
            crypto.pbkdf2(
                password,
                this.salt,
                1000,
                64,
                "sha512",
                (err, derivedKey) => {
                    if (err) rej(err);
                    res(this.password === derivedKey.toString("hex"));
                }
            );
        });
    };
};
