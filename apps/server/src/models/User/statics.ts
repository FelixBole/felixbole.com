import { Schema, HydratedDocument } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user";

export const statics = (schema: Schema<IUser, UserModel, IUserMethods>) => {
    schema.static(
        "createUser",
        async function createUser(
            name: string,
            email: string,
            password: string
        ) {
            const u: HydratedDocument<IUser, IUserMethods> = new this({
                name,
                email,
                password,
            });
            await u.save();
            return u;
        }
    );
};
