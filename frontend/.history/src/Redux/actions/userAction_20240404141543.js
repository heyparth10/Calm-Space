
import axios from 'axios';
import { CREATOR_BLOG_FAIL, CREATOR_BLOG_REQUEST, CREATOR_BLOG_SUCCESS, GET_APPLICANT_FAIL, GET_APPLICANT_PROGRESS_REQUEST, GET_APPLICANT_REQUEST, GET_APPLICANT_SUCCESS, POST_APPLICANT_PROGRESS_FAIL, POST_APPLICANT_PROGRESS_REQUEST, POST_APPLICANT_PROGRESS_SUCCESS, UPDATE_VIDEO_PROGRESS_FAIL, UPDATE_VIDEO_PROGRESS_REQUEST, UPDATE_VIDEO_PROGRESS_SUCCESS, USER_APPLY_BLOG_FAIL, USER_APPLY_BLOG_REQUEST, USER_APPLY_BLOG_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from '../constants/userConstant';
import { toast } from 'react-toastify';
import { ALL_USER_LOAD_FAIL, ALL_USER_LOAD_REQUEST, ALL_USER_LOAD_SUCCESS } from '../constants/blogConstants';

const backend_api = process.env.REACT_APP_BACKEND_API;

export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post(`/api/signin`, user);
        console.log("DATA ----->>>" , data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({ 
            type: USER_SIGNIN_SUCCESS, 
            payload: data 
        });
        toast.success('Login Successful!');
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

// user sign up action
export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {

        // Modify the user data to include the role field
        const userData = {
            ...user,
            role: user.role || 0, // Default to role 0 (user) if not specified
        };

        const { data } = await axios.post(`/api/signup`, userData);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Registered Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//logout action
export const userLogOutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        const { data } = await axios.get(`/api/logout`);
        localStorage.removeItem('userInfo');
        dispatch({ 
            type: USER_LOGOUT_SUCCESS, 
            payload: data 
        });
        toast.success('Logged Out Successful!');
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//user profile action
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
        console.log("TOKEN:", token);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            }
        };

        const { data } = await axios.get(`/api/me`, config);
        dispatch({ 
            type: USER_LOAD_SUCCESS, 
            payload: data 
        });
    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// creator blog action
export const creatorBlogAction = (blog) => async (dispatch) => {
    dispatch({ type : CREATOR_BLOG_REQUEST });
    try{
        const { data } = await axios.post(`/api/creator/blogcreatorhistory`, blog);

        dispatch({
            type : CREATOR_BLOG_SUCCESS,
            payload : data
        });
        toast.success("Applied Successfull for this Blog!");
    } catch (error)
    {
        dispatch({
            type : CREATOR_BLOG_FAIL,
            payload : error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//user apply blog action
export const userApplyBlogAction = (blog) => async (dispatch) => {
    dispatch({ type : USER_APPLY_BLOG_REQUEST });
    console.log("blog -> ",blog);
    try{
        const { data } = await axios.post(`/api/user/bloghistory`, blog);
        console.log(data);
        dispatch({
            type : USER_APPLY_BLOG_SUCCESS,
            payload : data
        });
        toast.success("Applied Successfully for this Blog!");
    } catch (error)
    {
        dispatch({
            type : USER_APPLY_BLOG_FAIL,
            payload : error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//all user action
export const allUserAction = () => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/allusers`);
        dispatch({ 
            type: ALL_USER_LOAD_SUCCESS, 
            payload: data 
        });
    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// User delete action
export const userDeleteAction = (_id) => async (dispatch) => {
    dispatch({ type: USER_DELETE_REQUEST });
  
    try {
      // Use Axios to send a DELETE request to the specified URL
      await axios.delete(`${backend_api}/api/admin/user/delete/${_id}`);
      
      // Dispatch the success action with the user ID
      dispatch({ type: USER_DELETE_SUCCESS, payload:_id });
      toast.success('User deleted successfully!');
    } catch (error) {
        console.log(error);
      dispatch({ type: USER_DELETE_FAIL, payload: error.response.data.error });
      toast.error(error.response.data.error);
    }
  };

  // admin create user action
export const createUserSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post(`/api/signup`, user);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Registered Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//getApplicantAction
export const getApplicantAction = () => async (dispatch) => {
    dispatch({ type: GET_APPLICANT_REQUEST });
    try {
        const { data } = await axios.get(`/api/creator/getApplicantInfo`);
        console.log(data);
        dispatch({ 
            type: GET_APPLICANT_SUCCESS, 
            payload: data 
        });
    } catch (error) {
        dispatch({
            type: GET_APPLICANT_FAIL,
            payload: error.response.data?.error
        });
    }

}

//update videoProgress of user
export const updateVideoProgressAction = (url, isCompleted, userId) => async (dispatch) => {
    dispatch({ type: UPDATE_VIDEO_PROGRESS_REQUEST });
    console.log(userId,"asasdassasdasdasasassa");
    try {
        const { data } = await axios.post(`/api/user/updateVideoProgress`, { url, isCompleted, userId });
        dispatch({ 
            type: UPDATE_VIDEO_PROGRESS_SUCCESS, 
            payload: data 
        });
    } catch (error) {
        dispatch({
            type: UPDATE_VIDEO_PROGRESS_FAIL,
            payload: error.response.data?.error || 'Something went wrong',
        });
    }
};