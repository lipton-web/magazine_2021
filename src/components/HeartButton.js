import React from "react";

import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const HeartButton = (props) => {

	const icon_url = props.is_like ? <FavoriteIcon /> : <FavoriteBorderIcon />

	return (
		<React.Fragment>
				<IconButton onClick={props._onClick}> {icon_url} </IconButton>
		</React.Fragment>
	);
};

export default HeartButton;