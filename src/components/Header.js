import React, { useEffect } from "react";
import { deleteCookie, getCookie  } from "../shared/Cookie";

import Warp from "../elements/Warp";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CreateIcon from '@material-ui/icons/Create';

import { apiKey } from "../shared/firebase";



const Header = (props) => {
	const dispatch = useDispatch();
	const is_login = useSelector((state) => state.user.is_login);
	
	const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;  //세션저장소 키 가져오기
	const is_session = sessionStorage.getItem(_session_key) ? true : false;

	console.log(is_session);

	if (is_login && is_session) {
		return (
			<React.Fragment>
				<Warp is_flex>
					<Button
						variant="contained"
						color="primary"
						endIcon={<CreateIcon />}
						style={{margin:"8px"}}
						onClick={() => {history.push("/write")}}
					>
						글쓰기
					</Button>

					<ButtonGroup variant="text" color="primary" aria-label="text primary button group" 
					style={{padding:"8px", display:"flex", justifyContent:"flex-end"}} >
						<Button>내정보</Button>
						<Button onClick={() => {history.push("/login")}}>알림</Button>
						<Button onClick={() => {dispatch(userActions.logoutFB())}}>로그아웃</Button>
					</ButtonGroup>
				</Warp>
			</React.Fragment>
		)
	}


	return (
		<React.Fragment>
			<ButtonGroup variant="text" color="primary" aria-label="text primary button group" 
				style={{padding:"8px", display:"flex", justifyContent:"flex-end"}} >
					<Button onClick={() => {history.push("/login")}}>로그인</Button>
					<Button onClick={() => {history.push("/signup")}}>회원가입</Button>
			</ButtonGroup>
		</React.Fragment>		
	)
}

export default Header;