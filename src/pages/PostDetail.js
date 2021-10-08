import React from "react";
import Post from "../components/Post"

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";



const PostDetail = (props) => {
	const dispatch = useDispatch();
	const id = props.match.params.id;

	// console.log(id)
	const user_info = useSelector((state) => state.user.user);
	const post_list = useSelector(store => store.post.list);
	const post_idx = post_list.findIndex(p => p.id === id);
	const post = post_list[post_idx];

	React.useEffect(() => {

		// 만약 게시글이 없으면?
    if (post) {
      return;
    }
		 // 파이어스토어에서 이 게시글 1개 정보만 가져와요!
		 dispatch(postActions.getOnePostFB(id));
	}, []);

	return (
		<React.Fragment>
			{/* 주소가 잘못 되었을 경우 대비 */}
		 {post && (
        <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}
		</React.Fragment>
	)
}

export default PostDetail;