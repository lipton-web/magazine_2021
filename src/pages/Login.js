import React from "react";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";


const Login = (props) => {

	console.log(getCookie("user_pwd"));
// 	const login = () => {
// 		setCookie("user_id", id, 3);
// 		setCookie("user_pwd", pwd, 3);
// }

	return (
		<div>
			로그인
		</div>
	)
}

export default Login;