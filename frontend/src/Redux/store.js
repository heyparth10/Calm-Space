
import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk'; // Thunk middleware for Redux 

import { composeWithDevTools } from 'redux-devtools-extension'; // Redux DevTools Extension
import { loadBlogReducer, loadBlogSingleReducer, registerAblogReducer } from './reducer/blogReducer';
import { createBlogTypeReducer, loadBlogTypeReducer } from './reducer/blogTypeReducer';
import { allUserReducer, creatorBlogReducer, deleteUserReducer, getSingleApplicantReducer, userApplyBlogReducer, 
         userReducerLogout, userReducerProfile, userReducerSignIn, userReducerSignUp } from './reducer/userReducer';
import { modeReducer } from './reducer/themeModeReducer';

//combine reducers
const reducer = combineReducers({
    loadBlog: loadBlogReducer,
    blogTypeAll: loadBlogTypeReducer,
    signIn: userReducerSignIn,
    signup : userReducerSignUp,
    logOut : userReducerLogout,
    userProfile : userReducerProfile,
    singleBlog: loadBlogSingleReducer,
    userBlogApplication : userApplyBlogReducer,
    allUsers : allUserReducer,
    mode : modeReducer,
    registerBlog : registerAblogReducer,
    createBlogType : createBlogTypeReducer,
    deleteUser : deleteUserReducer,
    creatorlogCHistory : creatorBlogReducer,
    getSingleApplicant : getSingleApplicantReducer 

});


//initial state
let initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null //get user info from local storage //if user info is in local storage then parse it to json else null
    },
    mode : "dark"
};


const middleware = [thunk]; 
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))); //create store //composeWithDevTools(applyMiddleware(...middleware)) is for redux devtools extension //applyMiddleware(...middleware) is for thunk middleware

 export default store; //export store