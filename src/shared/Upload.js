import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import { storage } from "./firebase";

import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));



const Upload = (props) => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const is_uploading = useSelector(state => state.image.uploading);
  const fileInput = React.useRef();

	const selectFile = (e) => {
		// console.log(e);
		// console.log(e.target);
		// console.log(e.target.files[0]);
		// console.log(fileInput.current.files[0]);

		// 파일 리더 객체를 사용해서 미리보기를 넣어줍니다.
		const reader = new FileReader();
		const file = fileInput.current.files[0];
		//파일 내용 읽기
		reader.readAsDataURL(file);

		reader.onloadend = () => {
      // 파일 리더 객체를 사용해서 미리보기를 넣어줍니다.
    //   아래 주석을 풀고 파일리더 객체가 어떤 식으로 파일을 읽었나 확인해보세요 :) 
    //   console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
	}

	// const uploadFB = () => {
	// 	let image = fileInput.current.files[0];
	// 	const _upload = storage.ref(`images/${image.name}`).put(image);

	// 	_upload.then((snapshot) => {
	// 		console.log(snapshot);

	// 		snapshot.ref.getDownloadURL().then((url) => {
	// 			console.log(url);
	// 		})
	// 	})
	// }
	

		return (
			<React.Fragment>
				<div className={classes.root}>
					<input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file"  onChange={selectFile} ref={fileInput} />
					<label htmlFor="contained-button-file">
						<Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
							사진 선택
						</Button>
					</label>
				</div>
			</React.Fragment>
		)
};


export default Upload;



