import { getRandomColor } from "./utils/colors";

export const getPossibleColors = (colorArr: string[], differentColors: number) => {
    const possibleColors: string[] = [];
    const tmpColorArr = [...colorArr];
    for (let i = 0; i < differentColors; i++) {
        if (i === tmpColorArr.length - 1) continue;
        const idx = Math.floor(Math.random() * tmpColorArr.length);
        possibleColors.push(tmpColorArr[idx]);
        tmpColorArr.splice(idx, 1);
    }
    return possibleColors;
};

export const generateAvatarArray = (colorArr: string[], x: number, y: number, differentColors: number) => {
    const possibleColors = getPossibleColors(colorArr, differentColors);
    const avatar: string[][] = [];

    for (let i = 0; i < x; i++) {
        avatar[i] = [];
        for (let j = 0; j < y; j++) {
            avatar[i][j] = getRandomColor(possibleColors);
        }
    }

    return avatar;
};
