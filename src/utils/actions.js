import axios from "axios";
import wordList from "./words";
const API_KEY = process.env.REACT_APP_API_KEY;
const gifEndpoint = "https://api.giphy.com/v1/gifs/";
const gifCategory = "trending";
const apiKey = "?api_key=";
const tagKey = "&tag=";
const ratingKey = "&rating=";
const quoteEndpoint = "https://quotes.rest/quote/random?language=en&limit=1";
const Spotify = require("node-spotify-api");

const spotify = new Spotify({
  id: process.env.REACT_APP_SPOTIFY_ID,
  secret: process.env.REACT_APP_SPOTIFY_SECRET
});

export const getRandomGif = async () => {
  const response = await axios.get(
    gifEndpoint + gifCategory + apiKey + API_KEY + tagKey + ratingKey
  );
  return response.data;
};

export const getRandomQuote = async () => {
  const response = await axios.get(quoteEndpoint);
  return response.data;
};

export const getRandomSong = async (query = null) => {
  let searchQuery = query;
  if (!searchQuery) {
    const randomEntryNum = getRandomNumber(wordList.length);
    searchQuery = wordList[randomEntryNum];
  }
  return await spotify.search({ type: "track", query: searchQuery, limit: 1 });
};

export const getRandomNumber = max => {
  return Math.floor(Math.random() * Math.floor(max));
};
