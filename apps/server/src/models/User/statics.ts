import { Schema, HydratedDocument } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user";
import { generateAvatarArray, palette } from "svg-pixel-generator";

export const statics = (schema: Schema<IUser, UserModel, IUserMethods>) => {
    schema.static(
        "createUser",
        async function createUser(name: string, password: string) {
            const u: HydratedDocument<IUser, IUserMethods> = new this({
                name,
                password,
                avatar: generateAvatarArray(palette, 5, 5, 2),
            });

            await u.save();
            return u;
        }
    );
};
