import React from "react";
import Image from "../elements/Image";
import Text from "../elements/Text";
import Warp from "../elements/Warp";
// import { Grid, Image, Text } from "../elements";

import { history } from "../redux/configureStore";

const Card = (props) => {
  const { image_url, user_name, post_id } = props;

  return (
    <Warp
      _onClick={() => {
        history.push(`/post/${post_id}`);
      }}
      padding="16px"
      is_flex
      bg="#ffffff"
      margin="8px 0px"
    >
      <Warp width="auto" margin="0px 8px 0px 0px">
        <Image size={85} shape="square" src={image_url} />
      </Warp>
      <Warp>
        <Text>
          <b>{user_name}</b>님이 게시글에 댓글을 남겼습니다 :)!
        </Text>
      </Warp>
    </Warp>
  );
};

Card.defaultProps = {
  image_url: "",
  user_name: "",
  post_id: null,
};

export default Card;
