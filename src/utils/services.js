import axios from "axios";

const Spotify = require("node-spotify-api");
const API_KEY = process.env.REACT_APP_API_KEY;
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const apiParam = "&key=";
const queryParam = "&q=";
const gifEndpoint = "https://api.giphy.com/v1/gifs/";
const gifCategory = "search";
const apiKey = "?api_key=";
const searchKey = "&q=";
const quoteEndpoint = "https://quotes.rest/quote/random?language=en&limit=1";
const spotify = new Spotify({
	id: process.env.REACT_APP_SPOTIFY_ID,
	secret: process.env.REACT_APP_SPOTIFY_SECRET,
});
const youtubeEndpoint = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1";

export const getYoutubeVideo = async queryTerm => {
    const response = await axios.get(
        youtubeEndpoint + queryParam + queryTerm + apiParam + YOUTUBE_API_KEY
      );
      return response.data;
};

export const getQuote = async () => {
	const response = await axios.get(quoteEndpoint);
	return response.data;
};

export const getGif = async (searchTerm) => {
	const response = await axios.get(
		gifEndpoint + gifCategory + apiKey + API_KEY + searchKey + searchTerm
	);
	return response.data;
};

export const getSong = async (searchTerm) => {
	return await spotify.search({ type: "track", query: searchTerm, limit: 1 });
};
