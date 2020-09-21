import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";

const Share = ({ shareUrl }) => {
	return (
		<div>
			<FacebookShareButton url={shareUrl}>
				<FacebookIcon logoFillColor="white" />
			</FacebookShareButton>
		</div>
	);
};

export default Share;
