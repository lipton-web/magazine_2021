import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Post from "./modules/post";
import Image from "./modules/image";

export const history = createBrowserHistory(); //리덕스에서 히스토리 사용(서버와 통신할 때 일반 히스토리는 데이터를 완료하기 전에 페이지를 전환)

const rootReducer = combineReducers({
  user: User,
  post: Post,
  image: Image,
	router: connectRouter(history), //히스토리와 라우터 연결, 스토어에 히스토리 저장
});

const middlewares = [thunk.withExtraArgument({history:history})]; //미들웨어에서 히스토리 사용

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// 리덕스 데브 툴즈 설정
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

//미들웨어 묶기
const enhancer = composeEnhancers(
	applyMiddleware(...middlewares)
);

// 스토어 만들기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();