/** @format */

import React, { Component } from "react";
import "./component.scss";

// Buttons in order with their icon and menu name
const buttonList = [
	{ className: "fas fa-images fa-2x", menuName: "gif" },
	{ className: "fab fa-youtube fa-2x", menuName: "video" },
	{ className: "fas fa-music fa-2x", menuName: "song" },
	{ className: "fas fa-quote-right fa-2x", menuName: "quote" },
];

export default class Buttons extends Component {
	constructor(props) {
		super(props);
		this.state = {
			secondaryMenuOpen: false,
			secondaryMenuTopic: "",
			userSearchOpen: false,
			userSearchTerm: "",
			randomFunction: null,
		};
	}

	updateSecondaryMenu = (topic, reset = false) => {
		const { secondaryMenuOpen, secondaryMenuTopic } = this.state;
		const menuOpen = secondaryMenuTopic === topic ? !secondaryMenuOpen : true;
		if (!reset) {
			this.setState({ secondaryMenuOpen: menuOpen, secondaryMenuTopic: topic });
		} else {
			this.setState({ secondaryMenuOpen: false, secondaryMenuTopic: "" });
		}
	};

	handleSecondaryMenu = (menuName) => {
		const {
			updateRandomGif,
			updateRandomVideo,
			updateRandomQuote,
			updateRandomSong,
		} = this.props;
		switch (menuName) {
			case "gif":
				updateRandomGif();
				break;
			case "video":
				updateRandomVideo();
				break;
			case "song":
				updateRandomSong();
				break;
			case "quote":
				updateRandomQuote();
				break;
			default:
				break;
		}
	};

	render() {
		const {
			secondaryMenuOpen,
			userSearchOpen,
			secondaryMenuTopic,
		} = this.state;
		const { handleChange, reset } = this.props;

		return (
			<div className='button-container'>
				<div className='primary-container'>
					{buttonList.map((buttonInfo) => {
						return (
							<button
								className={buttonInfo.className}
								onClick={() => this.updateSecondaryMenu(buttonInfo.menuName)}
								key={buttonInfo.menuName}
							/>
						);
					})}
					<button
						className='fas fa-toilet-paper fa-2x'
						onClick={() => reset("", true)}
					/>
				</div>
				{secondaryMenuOpen && (
					<div className='secondary-container'>
						<button
							className='fas fa-question fa-2x'
							onClick={() => this.handleSecondaryMenu()}
						/>
						{userSearchOpen && (
							<input
								type='text'
								onChange={(e) => handleChange(e)}
								placeholder={`type here to search for a ${secondaryMenuTopic}`}
							/>
						)}
						<button
							className={`fas ${
								userSearchOpen ? "fa-search" : "fa-pencil-alt"
							} fa-2x`}
							onClick={() => this.setState({ userSearchOpen: !userSearchOpen })}
						/>
					</div>
				)}
			</div>
		);
	}
}
