import { createAction, handleActions } from "redux-actions";
import {produce} from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";

import { actionCreators as imageActions} from "./image";


const SET_POST = "SET_POST" //리덕스에 넣기
const ADD_POST = "ADD_POST"

const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));

const initialState = {
	list: [],
}

const initialPost = {
	// id: 0,
	// user_info: {
	// 	user_name: 'jinsik',
	// 	user_profile: 'https://filminvalle.com/wp-content/uploads/2019/10/User-Icon.png'
	// },
	image_url: 'https://hddesktopwallpapers.in/wp-content/uploads/2015/09/wheat-field-picture.jpg',
	contents: "",
	like_cnt: 0,
	insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
}


//미들웨어
const addPostFB = (contents="") => {
	return function (dispatch, getState, {history}) {
		//  파이어스토어에서 콜렉션부터 잡아줍니다.
		const postDB = firestore.collection("post");
		
		// 게시글 작성자 (로그인한 유저겠죠!) 정보를 가져와요.
		const _user = getState().user.user; //스토어의 user.user정보
		
		// 유저 정보를 꾸려주고,
		const user_info = {
			user_name: _user.user_name,
			user_id: _user.uid,
			user_profile: _user.user_profile
		};

		// 게시글 정보도 꾸려줘요.
		const _post = {
			...initialPost,
			contents: contents,
			insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
		};

		// 이미지도 가져옵니다.
		const _image = getState().image.preview;
		console.log(_image);

		// 이미지 업로드 먼저! (이미지 업로드가 실패하면 게시글도 업로드 하지 않게!)
		const _upload = storage.ref(`images/${user_info.user_id}_${new Date().getTime()}`).putString(_image, "data_url")
		_upload.then(snapshot => {
			snapshot.ref.getDownloadURL().then(url => {
				console.log(url);

				return url;
			}).then(url => {
				// 파이어스토에 넣기
				postDB.add({...user_info, ..._post, image_url: url}).then((doc) => {
					// 리덕스에 넣기
						let post = {user_info, ..._post, id: doc.id, image_url: url};
						dispatch(addPost(post))
						history.replace("/");
						
 						// 프리뷰는 이제 null로 바꿔줍니다!
						dispatch(imageActions.setPreview(null));
					})
					.catch((err) => {
						window.alert("앗! 포스트 작성에 문제가 있어요!", err);
						console.log("post 작성에 실패했어요!", err);
					});
			})
			.catch((err) => {
				window.alert("앗! 이미지 업로드에 문제가 있어요!", err);
				console.log("앗! 이미지 업로드에 문제가 있어요!", err);
			});
		})		
	}
}



const getPostFB = () => {
	return function(dispatch, getState, {history}) {
		const postDB = firestore.collection("post");

		postDB.get().then((docs) => {
			let post_list = [];
			docs.forEach((doc) => {
				//initialPost와 데이터 형식 맞추기 (리덕스에서 받아올 값)
				let _post = doc.data();

				// Object는 키값들을 배열로 만들어 준다 ['like_cnt', 'contents', ...]
				let post = Object.keys(_post).reduce((acc, cur) => {

					if(cur.indexOf("user_") !== -1) {
						return {
							...acc, 
							user_info: {...acc.user_info, [cur]: _post[cur]}
						};
					}
					return {...acc, [cur]: _post[cur]};
				}, {id: doc.id, user_info: {}});

				// let _post = {
				// 	id: doc.id,
				// 	...doc.data()
				// };

				// let post = {
				// 	id: doc.id,
				// 	user_info: {
				// 		user_name: _post.user_name,
				// 		user_profile: _post.user_profile, 
				// 		user_id: _post.user_id,
				// 	},
				// 	image_url: _post.image_url,
				// 	contents: _post.contents,
				// 	like_cnt: _post.like_cnt,
				// 	insert_dt: _post.insert_dt,
				// };

				post_list.push(post);
			})

			console.log(post_list);
			dispatch(setPost(post_list));
		})
	}
}


// 리듀서
export default handleActions({
	[SET_POST]: (state, action) => produce(state, (draft) => {
		draft.list = action.payload.post_list;
	}),

	[ADD_POST]: (state, action) => produce(state, (draft) => {
		draft.list.unshift(action.payload.post);
	}),
}, initialState)

const actionCreators = {
	setPost, addPost, getPostFB, addPostFB
}

export {actionCreators}