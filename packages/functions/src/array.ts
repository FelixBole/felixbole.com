export const shuffle = (arr: string[]) => {
	return arr.sort((a, b) => 0.5 - Math.random());
};
