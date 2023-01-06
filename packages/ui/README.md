# UI Library

As I can't manage to get vite to add inline styles from scss modules, apps using this lib need to import the style.css from dist/style.css to get the styling from the library components.

## DX

For comfort when developing with stories, comment out the excludes of tsconfig.json to avoid vscode errors in stories.tsx files.