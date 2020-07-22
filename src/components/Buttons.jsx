/** @format */

import React, { Component } from "react";
import "./component.scss";
var classNames = require("classnames");

// Buttons in order with their icon and menu name
let buttonList = [
	{ className: "fas fa-images fa-2x", menuName: "gif", active: false },
	{ className: "fab fa-youtube fa-2x", menuName: "video", active: false },
	{ className: "fas fa-music fa-2x", menuName: "song", active: false },
	{ className: "fas fa-quote-right fa-2x", menuName: "quote", active: false },
];

export default class Buttons extends Component {
	constructor(props) {
		super(props);
		this.state = {
			secondaryMenuOpen: false,
			secondaryMenuTopic: "",
			userSearchOpen: false,
			query: "",
			randomFunction: null,
		};
	}

	componentDidUpdate() {
		const { open } = this.props;
		const { secondaryMenuOpen } = this.state;
		if (!open && secondaryMenuOpen) this.updateSecondaryMenu("", true);
	}

	updateSecondaryMenu = (topic, reset = false) => {
		const { secondaryMenuOpen, secondaryMenuTopic } = this.state;
		const menuOpen = secondaryMenuTopic === topic ? !secondaryMenuOpen : true;
		if (!reset) {
			this.setState({
				secondaryMenuOpen: menuOpen,
				secondaryMenuTopic: topic,
			});
		} else {
			console.log("before", buttonList);
			buttonList.forEach((button) => (button.active = false));
			this.setState({
				secondaryMenuOpen: false,
				secondaryMenuTopic: "",
			});
		}
	};

	handleSecondaryMenu = (random = false) => {
		if (random) this.setState({ query: "" });
		const { secondaryMenuTopic, query } = this.state;
		const {
			updateGif,
			updateRandomVideo,
			updateRandomQuote,
			updateRandomSong,
		} = this.props;
		switch (secondaryMenuTopic) {
			case "gif":
				updateGif(query);
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

	handleSearch = () => {
		const { userSearchOpen, query } = this.state;
		if (userSearchOpen && query !== "") this.handleSecondaryMenu(false);
		else this.setState({ userSearchOpen: !userSearchOpen });
	};

	handleChange = (event) => {
		this.setState({ query: event.target.value });
	};

	render() {
		const {
			secondaryMenuOpen,
			userSearchOpen,
			secondaryMenuTopic,
			query,
		} = this.state;
		const { reset, open } = this.props;

		return (
			<div className='button-container'>
				<div className='primary-container'>
					{buttonList.map((buttonInfo) => {
						buttonInfo.active = buttonInfo.menuName === secondaryMenuTopic;
						return (
							<button
								className={classNames(buttonInfo.className, {
									" active": buttonInfo.active,
								})}
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
				{secondaryMenuOpen && open && (
					<div className='secondary-container'>
						<button
							className='fas fa-question fa-2x'
							onClick={() => this.handleSecondaryMenu(true)}
						/>
						{userSearchOpen && (
							<input
								type='text'
								value={query}
								onChange={this.handleChange}
								placeholder={`type here to search for a ${secondaryMenuTopic}`}
							/>
						)}
						<button
							className={`fas ${
								userSearchOpen ? "fa-arrow-right" : "fa-pencil-alt"
							} fa-2x`}
							onClick={this.handleSearch}
						/>
						{userSearchOpen && <div className='third-container'></div>}
					</div>
				)}
			</div>
		);
	}
}
