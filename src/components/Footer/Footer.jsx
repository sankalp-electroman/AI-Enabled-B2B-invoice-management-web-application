import React from "react";
import "./Footer.css";

const HRC_PRIVACY_POLICY_URL = "https://www.highradius.com/privacy-policy/";

const year = new Date().getFullYear();

const Footer = () => {
	return (
		<footer className="footer">
			<p className="footer-text">
				<a href={HRC_PRIVACY_POLICY_URL}>Privacy Terms</a> |
				<span>
					&copy; <span id="curreny_year">{year}</span> Copyright Highradius
					Corporation. All rights reserved.
				</span>
			</p>
		</footer>
	);
};

export default Footer;
