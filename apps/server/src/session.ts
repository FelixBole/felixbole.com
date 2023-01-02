import { RequestHandler } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

type SessionSetup = {
    store: MongoStore;
    sessionParser: RequestHandler;
};

export const setupSessionParser = (): SessionSetup => {
    const store = MongoStore.create({ mongoUrl: process.env.MONGO_URI });
    const sessionParser = session({
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
        store: store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            secure: false, // Necessary when working with different ports for server & client
        },
    });

    return { sessionParser, store };
};
