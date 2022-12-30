# VSCode Backend Setup 2022

Starting 2022, I will be doing a repo with my prefered configuration at the end of each year.
This year, project is setup to work with an [express](https://expressjs.com) server with tooling such as [typescript](https://www.typescriptlang.org/), [eslint](https://eslint.org/), [prettier](https://prettier.io/), testing with [mocha](https://mochajs.org/), [chai](https://www.chaijs.com/) and [supertest](https://www.npmjs.com/package/supertest), and a custom git-hooks automatically installed during the postinstall script of package.json.

This project is completely agnostic of how you configure the app/server and only focuses on the initial tooling and configuration setup for a proper DX.

## Package manager

Switched to [pnpm](https://pnpm.io) as a preferred option this year.

## Testing

Running `mocha` along with `chai` for assertions and `supertest` for API testing.

## Tooling

Running Typescript along with eslint and prettier configurations setup to work together. The .vscode settings help keep everything in place for the latter 2 to work together without errors being thrown all around the IDE. eslint extends from airbnb with just a couple custom rules to suit my needs.

## Git hooks

Avoiding the use of husky to have a better control of what we can do within the pre-commit hook.

# Installation

```bash
git clone git@github.com:FelixBole/backend-ts-project.git
cd backend-ts-project
pnpm i
```

If pnpm is not installed, you can install it using npm

```bash
npm i -g pnpm
```
