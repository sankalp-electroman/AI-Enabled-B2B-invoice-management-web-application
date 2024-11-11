import React from "react";
import { ReactComponent as HRCLogo } from "../../images/hrc-logo.svg";
import { ReactComponent as ABCLogo } from "../../images/abc.svg";
import "./Header.css";

const Header = () => {
	return (
		<nav className="navbar">
			<HRCLogo className="logo" id="hrc" />
			<ABCLogo className="logo" id="abc" />
		</nav>
	);
};

export default Header;
