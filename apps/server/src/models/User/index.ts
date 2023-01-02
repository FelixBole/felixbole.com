import { model } from "mongoose";
import { schema } from "./User.model";

import { hooks } from "./hooks";
import { methods } from "./methods";
import { statics } from "./statics";
import { IUser, UserModel } from "./user";

hooks(schema);
methods(schema);
statics(schema);

export const User = model<IUser, UserModel>("User", schema);
