import { createAction, handleActions } from "redux-actions"; //액션과 리듀서를 편하게 만들어 준다.
import { produce } from "immer"; //불변성 관리 편하게
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";

import {auth} from "../../shared/firebase";
import firebase from "firebase/app";


// 액션
// const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER"; //리덕스에 유저 정보 넣기

// 액션 생성
// const logIn = createAction(LOG_IN, (user) => ({user}));
const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({user}));
const setUser = createAction(SET_USER, (user) => ({user}));

// initialState
const initialState = {
	user: null,
	is_login: false,
};

//유저형식 (이메일, 패스워드, 닉네임)
const user_initial = {
	user_name: 'Lipton',

}





// middleware actions
// const loginAction = (user) => {
// 	return function(dispatch, getState, {history}){ //미들웨어에서 히스토리 사용하기
// 		console.log(history);
// 		dispatch(setUser(user));
// 		history.push('/');
// 	}
// }


const loginFB = (id, pwd) => {
	return function (dispatch, getState, {history}) {

		// setPersistence 메서드를 호출하면 기존의 지속성 유형을 지정하거나 수정할 수 있습니다.
		auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
			
			//사용자가 앱에 로그인하면 다음과 같이 사용자의 이메일 주소와 비밀번호를 signInWithEmailAndPassword에 전달합니다.
			auth.signInWithEmailAndPassword(id, pwd)
			.then((user) => {
				console.log(user);
				dispatch(setUser({
					user_name: user.user.displayName, //user.user.displayName은 닉네임
					id: id, 
					user_profile: "", 
					uid: user.user.uid //uid는 고유값
				})); 
				history.push('/');
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;

				console.log(errorCode, errorMessage);
				window.alert("아이디 또는 비밀번호가 맞지 않습니다!");
			});
		});
	}
}


const signupFB = (id, pwd, user_name) => {
	return function (dispatch, getState, {history}){

		auth.createUserWithEmailAndPassword(id, pwd)

		.then((user) => {
			console.log(user);
			
			// 사용자 정보(닉네임) 가져오기, 사용자의 표시 이름 및 프로필 사진 URL 등의 기본 프로필 정보를 업데이트
			auth.currentUser.updateProfile({
				displayName: user_name, //닉네임 보여주기
			})
			.then(() => {
				dispatch(setUser({ //리덕스에 사용자 정보 넣는다.
					user_name: user_name, 
					id: id, 
					user_profile: '', 
					uid: user.user.uid  //uid는 고유값
				})); 
				history.push('/');
			});
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			
			console.log(errorCode, errorMessage);
			window.alert(errorCode, errorMessage)
		});
	}
}


// 새로고침해도 리덕스에 로그인 확인 가능하게
const loginCheckFB = () => {
	return function (dispatch, getState, {history}) {
		// 현재 로그인한 사용자 가져오기
		auth.onAuthStateChanged((user) => { 
			if(user){
				dispatch(setUser({
					user_name: user.displayName,
					user_profile: '',
					id: user.email,
					uid: user.uid,
				}));
			}else{
				dispatch(logOut())
			}
		})
	}
}


const logoutFB = () => {
	return function (dispatch, getState, {history}) {
		auth.signOut().then(() => {
			dispatch(logOut());
			history.replace('/');
		})
	}
}

//reducer
export default handleActions({
	[SET_USER]: (state,action) => produce(state, (draft) => { //state는 원본값 draft는 원복 복사값
		setCookie("is_login", "success"); //쿠키에 저장
		draft.user = action.payload.user; //payload를 해야 중간값 가져옴
		draft.is_login = true;
	}),
	[LOG_OUT]: (state,action) => produce(state, (draft) => {
		deleteCookie("is_login");
		draft.user = null;
		draft.is_login = false;
	}),
	[GET_USER]: (state,action) => produce(state, (draft) => {

	}),
}, initialState)

//액션 생성 export
const actionCreators = { logOut, getUser, loginFB, signupFB, loginCheckFB, logoutFB, };

export { actionCreators };