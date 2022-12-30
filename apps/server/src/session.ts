import { RequestHandler } from "express";
import session, { MemoryStore } from "express-session";

type SessionSetup = {
    store: MemoryStore;
    sessionParser: RequestHandler;
};

export const setupSessionParser = (): SessionSetup => {
    const store = new MemoryStore();
    const sessionParser = session({
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
        store: store, // TODO Change the store to mongostore and check repercussions in websocket manual session regen
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            secure: false, // Necessary when working with different ports for server & client
        },
    });

    return { sessionParser, store };
};
