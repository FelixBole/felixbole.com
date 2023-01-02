import { Schema } from "mongoose";
import crypto from "crypto";
import { IUser } from "./user";

export const hooks = (schema: Schema<IUser>) => {
    schema.pre("save", function (next) {
        if (this.isModified("password")) {
            this.salt = crypto.randomBytes(16).toString("hex");
            crypto.pbkdf2(
                this.password,
                this.salt,
                1000,
                64,
                "sha512",
                (err, derivedKey) => {
                    if (err) throw err;
                    this.password = derivedKey.toString("hex");
                    next();
                }
            );
        }
    });
};
