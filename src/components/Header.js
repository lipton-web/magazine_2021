import React, { useEffect } from "react";
import { deleteCookie, getCookie  } from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { apiKey } from "../shared/firebase";



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const Header = (props) => {
	const classes = useStyles(); //matarial ui
	const dispatch = useDispatch();
	const is_login = useSelector((state) => state.user.is_login);
	
	const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;  //세션저장소 키 가져오기
	const is_session = sessionStorage.getItem(_session_key) ? true : false;

	console.log(is_session);

	if (is_login && is_session) {
		return (
			<div className={classes.root}>
				<Button variant="outlined">내정보</Button>
				<Button variant="outlined" color="primary" onClick={() => {history.push("/login")}}>
					알림
				</Button>
				<Button variant="outlined" color="secondary" onClick={() => {dispatch(userActions.logoutFB())}}>
					로그아웃
				</Button>
			</div>
		)
	}


	return (
		<div className={classes.root}>
			{/* <Button variant="outlined">내정보</Button> */}
      <Button variant="outlined" color="primary" onClick={() => {history.push("/login")}}>
				로그인
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => {history.push("/signup")}}>
        회원가입
      </Button>
		</div>

	)
}

export default Header;