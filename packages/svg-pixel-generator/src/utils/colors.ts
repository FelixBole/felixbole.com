export const colors = ['#042A2B', '#5eb1bf', '#CDEDF6', '#EF7B45', '#D84727'];

export const getRandomColor = (colorArray: string[]) => {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}