import React from "react";

import Warp from "../elements/Warp";
import Image from "../elements/Image";
import Text from "../elements/Text";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Upload from "../shared/Upload";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';





const PostWrite = (props) => {
	// const classes = useStyles();
	const dispatch = useDispatch();
	const is_login = useSelector((state) => state.user.is_login);
	const preview = useSelector((state) => state.image.preview);
	const post_list = useSelector((state) => state.post.list);

 // console.log(props.match.params.id) //id값
 // 주소창을 보고 id값을 가져와요.
	const post_id = props.match.params.id;
	// post id를 가지고 수정모드인지, 작성 모드인지 구분해줍니다.
	const is_edit = post_id? true : false;

	const { history } = props;

 // 수정모드라면? 게시글 정보를 가져와요!
  // 미리 어느정도 정보를 넣어주기 위해서 가져오는 거예요 :)
  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;


	const [contents, setContents] = React.useState(_post ? _post.contents : "");

	React.useEffect(() => {
		// 수정모드인데, 게시글 정보가 없으면? 경고를 띄우고 뒤로 가게 합니다.
		if(is_edit && !_post) {
			window.alert("포스트 정보가 없어요");
			history.goBack();

			return;
		}
		if(is_edit) {
			dispatch(imageActions.setPreview(_post.image_url));
		}
	}, []);

//   글 내용을 바꿔주는 함수
	const changeContents = (e) => {
		setContents(e.target.value);
	}

//   게시글을 추가하는 함수
	const addPost = () => {
		dispatch(postActions.addPostFB(contents, layout_type));
	}

	//   게시글을 수정하는 함수
	const editPost = () => {
		dispatch(postActions.editPostFB(post_id, {contents: contents}));
	}

// layout_type을 정하는 부분입니다!
	const [layout_type, setLayoutType] = React.useState("a");

  const changeLayoutType = (event) => {
    setLayoutType(event.target.value);
  };


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
				<Text size="36px" bold> {is_edit ? "게시글 수정" : "게시글 작성"} </Text>
				<Upload></Upload>

			</Warp>

			<Warp>
				<Warp padding="16px">
					<Text margin="0px" size="24px" bold>미리보기</Text>
				</Warp>
				<Image shape="rectangle" src={preview ? preview : ''} />
			</Warp>

			<Warp padding="16px 16px 8px 16px">
				<TextField onChange={changeContents} id="outlined-multiline-static" label="글 작성" value={contents}
				multiline rows={3} placeholder="내용을 작성하세요" variant="outlined" style={{width:"90%"}}/>

			</Warp>
	


			<Warp padding="8px 16px 16px 16px">
				<FormControl > 
        <InputLabel id="demo-simple-select-helper-label">레이아웃 타입</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={layout_type}
          onChange={changeLayoutType}
        >
          <MenuItem value={"a"}>a: 텍스트 위, 이미지 아래</MenuItem>
          <MenuItem value={"b"}>b: 텍스트 좌측, 이미지 우측</MenuItem>
          <MenuItem value={"c"}>c: 텍스트 우측, 이미지 좌측</MenuItem>
        </Select>
        <FormHelperText>a, b, c 중 하나를 골라주세요.</FormHelperText>
      </FormControl>
      </Warp>
		
			{is_edit? 
				(<Button variant="contained" style={{width:"200px", background:"#c5cae9", margin:"16px"}} onClick={editPost} >
					게시글 수정
				</Button>)
				: 
				(<Button variant="contained" style={{width:"200px", background:"#c5cae9", margin:"16px"}} onClick={addPost} >
				게시글 작성
				</Button>)
			}

		</React.Fragment>
	)
}

export default PostWrite;

//	className={classes.formControl}