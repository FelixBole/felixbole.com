import "express-session";

declare module "express-session" {
    interface SessionData {
        userId?: string;
        name?: string;
        avatar?: string[][];
    }
}
