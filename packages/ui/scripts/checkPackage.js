import p from '../package.json';

if (p.main.includes('src')) {
    console.warn(
        'aborting build because trying to build while package.json main is not set to point to the built directory. Expected dist/index.cjs.js \n\n',
    );
    process.exitCode = 1;
}
