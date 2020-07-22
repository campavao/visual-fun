/** @format */

import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./App.scss";
import {
	getRandomGif,
	getRandomSong,
	getRandomNumber,
	getRandomYoutubeVideo,
	getRandomQuote,
} from "./utils/actions";
import { getGif } from "./utils/services";
import Song from "./components/Song";
import Buttons from "./components/Buttons";

const timeStamp = "?t=";

class Mute extends Component {
	render() {
		const { mute, toggleMute } = this.props;
		return (
			<button className='mute' onClick={() => toggleMute()}>
				{mute ? (
					<i className='fas fa-play-circle fa-3x'></i>
				) : (
					<i className='fas fa-pause-circle fa-3x'></i>
				)}
			</button>
		);
	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			randomGif: null,
			randomQuote: null,
			randomSong: null,
			query: "",
			mute: false,
			youtubeLink: { video: null, audio: null },
			videoService: "gif",
			randomIsOn: true,
			sliderOpen: true,
		};
	}

	componentDidMount() {
		const { randomIsOn } = this.state;
		if (randomIsOn) {
			this.randomize();
			this.interval = setInterval(() => {
				this.randomize();
			}, 30000);
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	updateInterval() {
		clearInterval(this.interval);
		this.interval = setInterval(() => {
			this.randomize();
		}, 30000);
	}

	randomize = () => {
		const { videoService } = this.state;
		if (videoService === "gif") {
			this.updateGif();
		} else {
			this.updateRandomVideo();
		}
		this.updateRandomQuote();
		this.updateRandomSong();
	};

	updateRandomVideo = () => {
		this.setState({ videoService: "video" });
		getRandomYoutubeVideo().then((res) => {
			const formattedUrl =
				"https://www.youtube.com/watch?v=" +
				res.items[0].id.videoId +
				timeStamp +
				getRandomNumber(100);
			this.setState({ youtubeLink: formattedUrl });
		});
	};

	updateGif = (query) => {
		this.setState({ videoService: "gif" });
		let gifSearch;
		if (query !== "" && query) {
			gifSearch = getGif(query);
		} else {
			gifSearch = getRandomGif();
		}
		gifSearch.then((res) => {
			const randomGifUrl =
				res.data[getRandomNumber(res.data.length)].images.original.url;

			const randomGifStyle = {
				backgroundImage: "url(" + randomGifUrl + ")",
				backgroundPosition: "center",
			};
			this.setState({
				randomGifStyle: randomGifStyle,
				randomGifUrl: randomGifUrl,
			});
		});
	};

	updateRandomQuote = () => {
		const randomQuote = getRandomQuote();
		this.setState({ randomQuote: randomQuote });
	};

	updateRandomSong = (e) => {
		if (e) {
			e.preventDefault();
		}
		const { query, mute } = this.state;
		if (mute) return;
		let song = null;
		getRandomSong(query).then((res) => {
			if (res && res.tracks && res.tracks.items) {
				song = res.tracks.items[0];
			}
			if (!song.preview_url) {
				return this.updateRandomSong(e);
			} else {
				this.setState({ randomSong: song });
			}
			this.updateInterval();
		});
	};

	toggleMute = () => {
		this.setState({ mute: !this.state.mute });
	};

	handleSliderClose = (status) => {
		this.setState({ sliderOpen: status });
	};

	render() {
		const {
			randomQuote,
			randomGifStyle,
			randomSong,
			mute,
			youtubeLink,
			videoService,
			sliderOpen,
		} = this.state;

		return (
			<div>
				<div className='main-container'>
					{videoService === "gif" && (
						<span className='image-container' style={randomGifStyle} />
					)}
					{videoService === "video" && (
						<ReactPlayer
							url={youtubeLink}
							playing
							className='react-player'
							muted
						/>
					)}
					<div
						className='bottom-slider'
						onMouseEnter={() => this.handleSliderClose(true)}
						onMouseLeave={() => this.handleSliderClose(false)}>
						{randomQuote && <h3 className='quote-container'>{randomQuote}</h3>}
						<Song song={randomSong} mute={mute} />
						<Mute mute={mute} toggleMute={this.toggleMute} />
						<Buttons
							updateGif={this.updateGif}
							updateRandomVideo={this.updateRandomVideo}
							updateRandomQuote={this.updateRandomQuote}
							updateRandomSong={this.updateRandomSong}
							reset={this.randomize}
							open={sliderOpen}
						/>
					</div>
				</div>
				<div className='background' style={randomGifStyle} />
			</div>
		);
	}
}

export default App;
