import axios from 'axios';
import { CREATE_BLOG_TYPE_FAIL, CREATE_BLOG_TYPE_REQUEST, CREATE_BLOG_TYPE_SUCCESS, DELETE_BLOG_TYPE_FAIL, EDIT_BLOG_TYPE_REQUEST, EDIT_BLOG_TYPE_SUCCESS, BLOG_TYPE_LOAD_FAIL, BLOG_TYPE_LOAD_REQUEST, BLOG_TYPE_LOAD_SUCCESS } from '../constants/blogTypeConstants';
import { toast } from 'react-toastify';

// const backend_api = process.env.REACT_APP_BACKEND_API;

export const blogTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: BLOG_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`${backend_api}/api/type/blogs`);
        dispatch({ 
            type: BLOG_TYPE_LOAD_SUCCESS, 
            payload: data 
        });
    } catch (error) {
        dispatch({
            type: BLOG_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// create jobs category
export const createBlogTypeAction = (blogtype) => async (dispatch) => {
    dispatch({ type: CREATE_BLOG_TYPE_REQUEST })

    try {
        const { data } = await axios.post("/api/type/create", blogtype)
        dispatch({
            type: CREATE_BLOG_TYPE_SUCCESS,
            payload: data
        })
        toast.success("Blog type created successfully");


    } catch (error) {
        dispatch({
            type: CREATE_BLOG_TYPE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}

//EditJ BlogtType Action 
export const editBlogTypeAction = (blogTypeID, newBlogTypeName) => async (dispatch) => {
    dispatch({ type: EDIT_BLOG_TYPE_REQUEST })

    try {
        const { data } = await axios.put(`/api/type/update/${blogTypeID}`,
        {
            blogtypeID: blogTypeID,
            blogTypeName: newBlogTypeName
        })
        console.log("data ===================>>>>>>>>>>>>>>>>>>>> ", blogTypeID, newBlogTypeName)
        dispatch({
            type: EDIT_BLOG_TYPE_SUCCESS,
            payload: data
        })
        toast.success("Blog type updated successfully");
    }

    catch (error) {
        dispatch({
            type: CREATE_BLOG_TYPE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}

//Delete JobType Action
export const blogTypeDeleteAction = (blogTypeID) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/type/delete/${blogTypeID}`);
        toast.success("Blog type deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_BLOG_TYPE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}