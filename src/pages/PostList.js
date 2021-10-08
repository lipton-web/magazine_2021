import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import Warp from "../elements/Warp";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = (props) => {
	const {history} = props;

	const dispatch = useDispatch();
	const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
	const paging = useSelector((state) => state.post.paging);

	// console.log(post_list);

	React.useEffect(() => {
		//  게시글이 2개 미만일 때는 getPostFB를 호출해서 목록을 불러옵니다.
		if(post_list.length < 2){
			dispatch(postActions.getPostFB());
		}
	}, []);


	return (
		<React.Fragment>
			<Warp bg={"#EFF6FF"} padding="10px 0px">
			{/* <Post/> */}
			<InfinityScroll
				callNext={() => {
					dispatch(postActions.getPostFB(paging.next));
				}}
				is_next={paging.next ? true : false}
				loading={is_loading}
			>
				{post_list.map((p, idx) => {

					if(p.user_info.user_id === user_info?.uid){

						return (																		
							<Warp bg="#fff" margin="10px 0px" key={p.id} _onClick={()=>{history.push(`/post/${p.id}`)}}>
								<Post {...p} is_me />
							</Warp>
							);

					}else{
						return (
							<Warp bg="#fff" margin="10px 0px" key={p.id} _onClick={()=>{history.push(`/post/${p.id}`)}}>
								<Post {...p}  />
							</Warp>
							);
					}				
				})}
			</InfinityScroll>
			</Warp>
		</React.Fragment>
	)
}

export default PostList;