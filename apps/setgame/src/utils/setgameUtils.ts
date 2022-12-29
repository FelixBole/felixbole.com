export const createDeck = () => {
	const possible = ["1", "2", "3"];

	const combinations = (arr: string[], min: number, max: number) => {
		const combination = (arr: string[], depth: number): string[] => {
			if (depth === 1) return arr;
			const result = combination(arr, depth - 1)?.flatMap((val: string) =>
				arr.map((char) => val + char)
			);
			return arr.concat(result);
		};

		return combination(arr, max).filter((val) => val.length >= min);
	};

	const deck = combinations(possible, 4, 4);
	return deck;
};

export const generateRandomCardID = () => {
	const possible = "123";
	let id = "";

	for (let x = 0; x < 4; x++) {
		const rnd = Math.floor(Math.random() * possible.length);
		id += possible[rnd];
	}

	return id;
};

export const generateRandomCardIDs = (amount = 12) => {
	return Array(amount)
		.fill(0)
		.map(() => {
			return generateRandomCardID();
		});
};

export const checkSet = (cards: string[]) => {
	if (cards.length !== 3) throw new Error("Card selection invalid");

	const properties: { [key: number]: Boolean } = {
		0: false,
		1: false,
		2: false,
		3: false,
	};

	for (let i = 0; i < 4; i++) {
		// 4 properties so do this 4 times

		// For each card, take one card and run it through the other 3
		for (const card of cards) {
			// Take prop 1 of card 1
			let currentProperty = card[i];
			let similar = 0;
			let different = 0;

			for (const otherCard of cards) {
				if (card === otherCard) continue;

				// Check
				if (otherCard[i] === currentProperty) similar++;
				else different++;
			}

			// Check property
			if (similar === 2 && different === 0) properties[i] = true;
			if (similar === 0 && different === 2) properties[i] = true;
			if (similar !== 0 && different !== 0) break;
			if (similar !== 2 && different !== 2) break;
		}
	}

	for (const val of Object.values(properties)) {
		if (val === false) return false;
	}
	return true;
};

export const isSet = (cards: string[]) => {
	const allSame = (arr: string[], index: number) => {
		return arr[0][index] === arr[1][index] && arr[1][index] === arr[2][index];
	};

	const allDifferent = (arr: string[], index: number) => {
		return (
			arr[0][index] !== arr[1][index] &&
			arr[1][index] !== arr[2][index] &&
			arr[0][index] !== arr[2][index]
		);
	};

	for (let i = 0; i < 4; i++) {
		if (!allSame(cards, i) && !allDifferent(cards, i)) return false;
		// if (!allDifferent(cards, i)) return false;
	}

	return true;
};

export const findSets = (cards: string[]) => {
	const found: string[][] = [];

	cards.forEach((cardX) => {
		cards.forEach((cardY) => {
			if (cardX === cardY) return;
			cards.forEach((cardZ) => {
				if (cardX === cardZ || cardY === cardZ) return;
				if (isSet([cardX, cardY, cardZ])) found.push([cardX, cardY, cardZ]);
			});
		});
	});

	const sorted = found.map((group) => group.sort());
	const filterMultiDim = (arr: string[][]) => {
		const uniques = [];
		const itemsFound: { [key: string]: boolean } = {};
		for (let i = 0, l = arr.length; i < l; i++) {
			const tmp = JSON.stringify(arr[i]);
			if (itemsFound[tmp]) {
				continue;
			}
			uniques.push(arr[i]);
			itemsFound[tmp] = true;
		}

		return uniques;
	};

	const filtered = filterMultiDim(sorted);

	return filtered;
};
