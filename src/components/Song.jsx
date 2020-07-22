/** @format */

import React, { Component } from "react";
import "./component.scss";

export default class Song extends Component {
	render() {
		const { song, mute } = this.props;
		if (!song) return null;
		const randomSongUrl = song.preview_url;
		new Audio(randomSongUrl);

		return (
			<div className='song'>
				<p>{song.name + " by " + (song.artists && song.artists[0].name)}</p>
				{randomSongUrl && !mute && <audio autoPlay src={randomSongUrl} />}
			</div>
		);
	}
}
