# Set Game Functions

This module is a helper module containing logic for the game of SET.

## Compatibility

This module was configured to work both with commonjs and es modules.

package.json specifies two different type of exports depending on import or require, and dist has the according mjs / cjs dirs in relation.

A fixup bash script is run after build to add package.json files into the mjs/cjs directories only to set the type: "module" or "commonjs" so that this can be ommitted from the parent package.json