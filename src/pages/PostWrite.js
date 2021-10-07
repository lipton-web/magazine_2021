import React from "react";

import Warp from "../elements/Warp";
import Image from "../elements/Image";
import Text from "../elements/Text";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";


import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Upload from "../shared/Upload";






const PostWrite = (props) => {
	// const classes = useStyles();
	const dispatch = useDispatch();
	const is_login = useSelector((state) => state.user.is_login);
	const preview = useSelector((state) => state.image.preview);

	const { history } = props;

	const [contents, setContents] = React.useState("");

	const changeContents = (e) => {
		setContents(e.target.value);
	}

	const addPost = () => {
		dispatch(postActions.addPostFB(contents));
	}



	if(!is_login) {
		return (
			<Warp margin="100px 0px" padding="16px">
				<Text size="32px" bold>로그인 후<br/>글을 쓸 수 있어요!</Text>
				<Button variant="contained" style={{width:"200px", background:"#c5cae9"}} onClick={()=>{history.replace('/login')}}>
					로그인 하기
				</Button>
			</Warp>
		)
	}

	return (
		<React.Fragment>
			<Warp padding="16px">
				<Text size="36px" bold>게시글 작성</Text>
				<Upload></Upload>

			</Warp>

			<Warp>
				<Warp padding="16px">
					<Text margin="0px" size="24px" bold>미리보기</Text>
				</Warp>
				<Image shape="rectangle" src={preview ? preview : ''} />
			</Warp>

			<Warp padding="16px">
				<TextField onChange={changeContents} id="outlined-multiline-static" label="글 작성" 
				multiline rows={3} placeholder="내용을 작성하세요" variant="outlined" style={{width:"80%"}}/>

			</Warp>
	
			<Button variant="contained" style={{width:"200px", background:"#c5cae9"}} onClick={addPost} >
				게시글 작성
			</Button>
			

		</React.Fragment>
	)
}

export default PostWrite;