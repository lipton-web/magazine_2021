import React from "react";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Warp from "../elements/Warp";
import Image from "../elements/Image";
import Text from "../elements/Text";
import HeartButton from "./HeartButton";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';



// 게시글 1개 뷰를 담당합니다.
// layout_type에 따라 각각 타입에 맞는 레이아웃을 그려줄거예요.
// layout_type : a, b, c
//  - a : 텍스트가 위, 이미지가 아래인 레이아웃
//  - b : 텍스트가 좌측, 이미지가 우측인 레이아웃
//  - c : 텍스트가 우측, 이미지가 좌측인 레이아웃
// image_url : 이미지 주소
// like_cnt : 좋아요 갯수
// insert_dt : 작성일시
// user_info: 유저 정보 (딕셔너리 / user_name, user_id, user_profile를 가지고 있어요.)
// is_like : 지금 로그인한 사용자가 좋아요를 눌렀는 지 아닌 지
// is_me : 지금 로그인한 사용자가 작성자인지 아닌 지 판단해요.
// id : 게시글 id
// contents : 게시글 내용

const Post = (props) => {
	const dispatch = useDispatch();
//  console.log(props.layout_type)
	return (
		<React.Fragment>
			<Warp>

				<Warp is_flex >
					<Warp is_flex width="auto" margin="5px">
						<Image shape="circle" src={props.src} />
						<Text bold>{props.user_info.user_name}</Text>
					</Warp>

					<Warp is_flex width="auto">	
						<Text margin="10px">{props.insert_dt}</Text>	
						
						{props.is_me && (
							<React.Fragment>
								<Warp is_flex width="auto">
									{/* 수정버튼 */}
									<IconButton color="primary" onClick={(e)=>{e.preventDefault(); e.stopPropagation(); history.push(`/write/${props.id}`)}} > 
										<EditOutlinedIcon /> 
									</IconButton>
									{/* 삭제버튼 */}
									<IconButton aria-label="delete" onClick={(e)=>{e.preventDefault(); e.stopPropagation(); dispatch(postActions.deletePostFB(props.id))}}> 
										<DeleteIcon /> 
									</IconButton> 
								</Warp>	
							</React.Fragment>	
						)}	
					</Warp>	
							
				</Warp>

				{/* layout type이 a일 때 */}
				{props.layout_type === "a" && (
					<React.Fragment>
						<Warp padding='5px'>
							<Text margin="0">{props.contents}</Text>
						</Warp>

						<Warp>
							<Image shape="rectangle" src={props.image_url} />
						</Warp>
					</React.Fragment>
				)}

				{/* layout type이 b일 때 */}
				{props.layout_type === "b" && (
					<React.Fragment>
						<Warp is_flex>
							<Warp padding='5px' width="50%">
								<Text margin="0">{props.contents}</Text>
							</Warp>
							<Image shape="rectangle" src={props.image_url} />
						</Warp>
					</React.Fragment>
				)}

				{/* layout type이 c일 때 */}
				{props.layout_type === "c" && (
					<React.Fragment>
						<Warp is_flex>
							<Image shape="rectangle" src={props.image_url} />
							<Warp padding='5px' width="50%">
								<Text margin="0">{props.contents}</Text>
							</Warp>		
						</Warp>
					</React.Fragment>
				)}



				<Warp is_flex padding='5px'>
					<Text margin="12px" bold>좋아요 {props.like_cnt}개</Text>
					<HeartButton
            _onClick={(e) => {
              //  이벤트 캡쳐링과 버블링을 막아요!
              e.preventDefault();
              e.stopPropagation();
              dispatch(postActions.toggleLikeFB(props.id));
            }}
            is_like={props.is_like}
          ></HeartButton>
				</Warp>

			</Warp>
		</React.Fragment>
	)
}

// 부모에서 프롭스 못받을때 오류나 화면 깨짐 방지
Post.defaultProps = {
	id: null,
	user_info: {
		user_id: "",
		user_name: 'lipton',
		user_profile: 'https://filminvalle.com/wp-content/uploads/2019/10/User-Icon.png'
	},
	image_url: 'https://hddesktopwallpapers.in/wp-content/uploads/2015/09/wheat-field-picture.jpg',
	contents: '배경 내용이 들어가요',
	like_cnt: 10,
	layout_type: "a",
	insert_dt: '2021-09-30 10:00:00',
	is_like: false,
	is_me: false,
}

export default Post;