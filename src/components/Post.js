import React from "react";


import Warp from "../elements/Warp";
import Image from "../elements/Image";
import Text from "../elements/Text";


const Post = (props) => {

	return (
		<React.Fragment>
			<Warp>

				<Warp is_flex>
					<Warp is_flex>
						<Image shape="circle" src={props.src} />
						<Text bold>{props.user_info.user_name}</Text>
					</Warp>
					<Text>{props.insert_dt}</Text>					
				</Warp>

				<Warp padding='5px'>
					<Text margin="0">{props.contents}</Text>
				</Warp>

				<Warp>
					<Image shape="rectangle" src={props.image_url} />
				</Warp>

				<Warp padding='5px'>
					<Text margin="0" bold>좋아요 {props.like_cnt}개</Text>
				</Warp>

			</Warp>
		</React.Fragment>
	)
}

// 부모에서 프롭스 못받을때 오류나 화면 깨짐 방지
Post.defaultProps = {
	user_info: {
		user_name: 'lipton',
		user_profile: 'https://filminvalle.com/wp-content/uploads/2019/10/User-Icon.png'
	},
	image_url: 'https://hddesktopwallpapers.in/wp-content/uploads/2015/09/wheat-field-picture.jpg',
	contents: '배경 내용이 들어가요',
	like_cnt: 10,
	insert_dt: '2021-09-30 10:00:00',
}

export default Post;