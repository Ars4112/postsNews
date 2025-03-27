import { v4 } from "uuid";

const words = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit"];

if (localStorage.getItem("newsList") === null) {
	const arrayList = generateListArray(8);
	localStorage.setItem("newsList", JSON.stringify(arrayList));
}

function generateRandomSentence(wordCount: number) {
	let sentence = "";
	for (let i = 0; i < wordCount; i++) {
		sentence += words[Math.floor(Math.random() * words.length)] + " ";
	}
	return sentence.trim();
}

function createNewsList(i: number): NewsList {
	return {
		id: v4(),
		title: `news ${i}`,
		text: generateRandomSentence(200),
	};
}

function generateListArray(count: number): NewsList[] {
	return Array.from({ length: count }, (_, index) => createNewsList(index + 1));
}

export type NewsList = {
	id: string;
	title: string;
	text: string;
};
