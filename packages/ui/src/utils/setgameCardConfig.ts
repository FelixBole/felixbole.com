import { SVG_MAP } from './assetMap';

// First number is icon
// 1: Oval, 2: diamond, 3: wave

// Second is fillMode
// 1: stroke, 2: striped, 3: filled

// third is color
// 1: red, 2: green, 3: blue

const ID_SVG: { [key: string]: any } = {
    '1': SVG_MAP.oval,
    '2': SVG_MAP.diamond,
    '3': SVG_MAP.wave,
} as const;

const ID_FILL_TYPE: IDFillType = {
    '1': 'stroke',
    '2': 'striped',
    '3': 'filled',
} as const;

const ID_COLOR: IDColor = {
    '1': 'red',
    '2': 'green',
    '3': 'blue',
} as const;

export const getConfigFromId = (id: string) => {
    // For stories
    if (typeof id === 'number') id = (id as number).toString() as string;

    const split = id.split('');

    return {
        svg: ID_SVG[split[0]],
        fill: ID_FILL_TYPE[split[1]],
        color: ID_COLOR[split[2]],
    };
};
