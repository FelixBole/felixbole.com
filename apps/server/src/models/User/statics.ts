import { Schema, HydratedDocument } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user";

export const statics = (schema: Schema<IUser, UserModel, IUserMethods>) => {
    schema.static(
        "createUser",
        async function createUser(name: string, password: string) {
            const u: HydratedDocument<IUser, IUserMethods> = new this({
                name,
                password,
            });
            await u.save();
            return u;
        }
    );
};
