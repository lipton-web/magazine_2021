import React from "react";

import Warp from "../elements/Warp"

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
	const dispatch = useDispatch();
	
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

	const login = () => {
		if(id === "" || pwd === ""){
			window.alert("아이디 혹은 비밀번호가 공란입니다. 입력해주세요.")
			return;
		}

		dispatch(userActions.loginFB(id, pwd)); //히스토리와 로그인 액션 사용하기
}

	return (
			// <div style={{
			// 	display:"flex",
			// 	flexDirection: "column",
			// 	}}>
		<React.Fragment>
			<Warp padding="16px 0px">
				<TextField id="filled-basic" label="이메일" variant="filled" onChange={e => {setId(e.target.value)}} />
			</Warp>

			<Warp padding="16px 0px">
				<TextField id="filled-basic" label="비밀번호" variant="filled" type="password" onChange={e => {setPwd(e.target.value)}} />
			</Warp>

			<Warp padding="16px 0px">
				<Button variant="contained" style={{width:"200px", background:"#c5cae9"}} onClick={() => {login()}}>
					로그인
				</Button>
			</Warp>
		</React.Fragment>
	)
}

export default Login;


// const Grid = styled.div`
// 	display: flex;
// 	flex
// `;