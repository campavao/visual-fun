import React, { Component } from "react";
import "./App.scss";
import { getRandomGif, getRandomSong, getRandomNumber } from "./utils/actions";
import Song from "./components/Song";
const movieQuote = require("popular-movie-quotes");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomGif: null,
      randomQuote: null,
      randomSong: null,
      query: "",
      mute: false
    };
  }

  componentDidMount() {
    this.initialize();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  initialize = () => {
    this.updateRandomGif();
    this.updateRandomQuote();
    this.updateRandomSong();
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      console.log(new Date());
      this.initialize();
    }, 30000);
  };

  updateRandomGif = () => {
    getRandomGif().then(res => {
      console.log(res.data);

      let randomGifStyle = {
        backgroundImage:
          "url(" +
          res.data[getRandomNumber(res.data.length)].images.original.url +
          ")",
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
        backgroundPosition: "top"
      };
      this.setState({ randomGifStyle: randomGifStyle });
    });
  };

  updateRandomQuote = () => {
    const randomQuote = movieQuote.getRandomQuote();
    this.setState({ randomQuote: randomQuote });
  };

  updateRandomSong = e => {
    if (e) {
      e.preventDefault();
    }
    const { query, mute } = this.state;
    if (mute) return;
    let song = null;
    getRandomSong(query).then(res => {
      if (res && res.tracks && res.tracks.items) {
        song = res.tracks.items[0];
      }
      console.log(res);
      if (!song.preview_url) {
        return this.updateRandomSong(e);
      } else {
        this.setState({ randomSong: song });
      }
    });
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  toggleMute = () => {
    this.setState({ mute: !this.state.mute });
  };

  render() {
    const { randomQuote, randomGifStyle, randomSong, mute } = this.state;
    return (
      <div className="main-container" style={randomGifStyle}>
        <div className="body-container">
          {randomQuote && <h3 className="quote-container">{randomQuote}</h3>}
          <Song song={randomSong} mute={mute} />
          <button className="mute" onClick={() => this.toggleMute()}>
            {mute ? "unmute" : "mute"}
          </button>
          <div className="button-container">
            <button onClick={() => this.updateRandomGif()}>new gif</button>
            <button onClick={() => this.updateRandomQuote()}>new quote</button>
            <button className="reset" onClick={() => this.initialize()}>
              reset
            </button>
          </div>
          <form
            className="song-query-container"
            onSubmit={e => this.updateRandomSong(e)}
          >
            <input
              type="text"
              value={this.state.query}
              onChange={e => this.handleChange(e)}
            />
            <input type="submit" value="FIND" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
