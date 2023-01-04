# Workspace monolithic repository example

This project is meant to show an example structure of a workspace using and sharing different packages accross different apps. May these be tooling, ui libraries, function libraries to then be used by different apps.

Inspired by : https://www.youtube.com/watch?v=x1YstBqmYxA

# Uses

pnpm (recommended) as it allows for module re-use instead of reinstalling modules in every sub-package

```bash
npm i -g pnpm
```

## Setting up

To init : create the [pnpm-workspace.yaml file](./pnpm-workspace.yaml) to identify where the workspace should be looking for elements

[apps](./apps) folder containing full-on applications

[packages](./packages) folder containing different functionnality libs, ui libs, shared tooling etc

## Using packages from workspace in apps or other packages

In a package.json file for the app or the package, include the dependancy to the name of the module and set is as follows

```json
{
	"dependencies": {
		"MODULE_NAME": "workspace:*"
	}
}
```

This will look for the package from within the workspace if contained within the declared directories in the [pnpm-workspace.yaml file](./pnpm-workspace.yaml). It will then "install" the package in the node_modules by symlink instead of duplicating the package iniside the target node_modules thus, saving disk-space.

## Commands

From within a workspace, it is easy to run commands without leaving the root of the workspace. If we have an app called `front` in the apps folder and have a script called dev in its package.json we can run

```bash
pnpm --filter front dev
```

The same goes for installing dependencies, running

```bash
pnpm --filter front i
```

will install all dependencies for the `front` app.

## Running scripts in parralel

You can run scripts in parralel withing the same workspace to run multiple packages and apps at the same time.

This is useful for example to work on a UI lib at the same time as a frontend app that would use this library.

The following command runs dev recursively in all packages and apps that have the command

```bash
pnpm -r --parallel run dev
```

## [Turbo](https://turbo.build/)

Still trying to understand this but it can do some fancy stuff such as not running a command (like format / build / lint etc) on projects that haven't been changed by caching them, making it faster as well as avoiding to change stuff that shouldn't be changed.

This could come in handy during a CI pipeline tests check to run tests only on the modified project.


	"turbo": {
		"pipeline": {
			"dev": {
				"cache": false,
			}
		},
		"build": {
			"dependsOn": [
				"^build"
			],
			"outputs": [

			]
		}
	},