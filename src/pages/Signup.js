import React from "react";
import Warp from "../elements/Warp";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import styled from "styled-components";


const Signup = (props) => {
	const dispatch = useDispatch();

	const [id, setId] = React.useState('');
	const [user_name, setUserName] = React.useState('');
	const [pwd, setPwd] = React.useState('');
	const [pwd_check, setPwdCheck] = React.useState('');


	const signup = () => {

		if(id === "" || pwd === "" || user_name === "") {
			return;
		}

		if(pwd !== pwd_check) {
			return;
		}

		dispatch(userActions.signupFB(id, pwd, user_name));
	}

	return (
		<React.Fragment>
	
			<Div>

				<Warp padding="16px 0px">
					<Grid container style={{justifyContent:"center"}} spacing={1} alignItems="flex-end">
						<Grid item>
							<AlternateEmailIcon />
						</Grid>
						<Grid item>
							<TextField id="input-with-icon-grid" label="이메일" onChange={e=>{setId(e.target.value)}} />
						</Grid>
					</Grid>
				</Warp>

				<Warp padding="16px 0px">
					<Grid container style={{justifyContent:"center"}} spacing={1} alignItems="flex-end">
						<Grid item>
							<AccountCircle />
						</Grid>
						<Grid item>
							<TextField id="input-with-icon-grid" label="닉네임" onChange={e=>{setUserName(e.target.value)}} />
						</Grid>
					</Grid>
				</Warp>

				<Warp padding="16px 0px">
					<Grid container style={{justifyContent:"center"}} spacing={1} alignItems="flex-end">
						<Grid item>
							<LockIcon />
						</Grid>
						<Grid item>
							<TextField id="input-with-icon-grid" label="비밀번호" type="password" onChange={e=>{setPwd(e.target.value)}} />
						</Grid>
					</Grid>
				</Warp>

				<Warp padding="16px 0px">
					<Grid container style={{justifyContent:"center"}} spacing={1} alignItems="flex-end">
						<Grid item>
							<LockIcon />
						</Grid>
						<Grid item>
							<TextField id="input-with-icon-grid" label="비밀번호 확인" type="password" onChange={e=>{setPwdCheck(e.target.value)}} />
						</Grid>
					</Grid>
				</Warp>

			</Div>

				<Warp padding="16px 0px">
					<Button variant="contained" style={{width:"200px", background:"#c5cae9"}} onClick={() => {signup();}}>
						회원가입
					</Button>
				</Warp>

		
		</React.Fragment>
	)
}

export default Signup;

const Div = styled.div`
	/* border: 2px solid #e1e2e1; */
	border-radius: 20px;
	background: #f3fcff;
	width: 80%;
	margin: auto;
	/* padding: 10px */
`;