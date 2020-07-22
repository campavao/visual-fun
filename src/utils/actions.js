import wordList from "./words";
import { getGif, getQuote, getYoutubeVideo, getSong } from "./services";

export const getRandomGif = () => {
	const searchTerm = getRandomWord();
	return getGif(searchTerm);
};

export const getRandomQuote = () => {
	return getQuote();
};

export const getRandomSong = () => {
  const searchTerm = getRandomWord();
	return getSong(searchTerm);
}

export const getRandomYoutubeVideo = () => {
	return getYoutubeVideo(getRandomWord());
};

const getRandomWord = () => {
	const randomEntryNum = getRandomNumber(wordList.length);
	return wordList[randomEntryNum];
};

export const getRandomNumber = (max) => {
	return Math.floor(Math.random() * Math.floor(max));
};
