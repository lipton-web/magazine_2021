import './App.css';
import React from 'react';

import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'; //스토어 history 사용하려고
import { history } from './redux/configureStore'; //스토어 history 사용하려고

import PostList from './pages/PostList';
import Login from './pages/Login';
import Header from './components/Header';
import Signup from './pages/Signup';
import Warp from "./elements/Warp"

import { useDispatch } from 'react-redux';
import { actionCreators as userActions} from './redux/modules/user';

import {apiKey} from "./shared/firebase"
import PostWrite from './pages/PostWrite';
import PostDetail from './pages/PostDetail';
import Notification from './pages/Notification';

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;  //세션저장소 키 가져오기
	const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    // 세션 있나 없나 체크
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <div className="App">
      <Warp>
        <Header/>
        <Route path = "/" exact component={PostList} />
        <Route path = "/login" exact component={Login} />
        <Route path = "/signup" exact component={Signup} />
        <Route path = "/write" exact component={PostWrite} />
        <Route path = "/write/:id" exact component={PostWrite} />
        <Route path = "/post/:id" exact component={PostDetail} />
        <Route path = "/noti" exact component={Notification} />
      </Warp>
    </div>
  );
}

export default App;
