import axios from 'axios';
import { BLOG_LOAD_REQUEST, BLOG_LOAD_SUCCESS, BLOG_LOAD_FAIL, BLOG_LOAD_SINGLE_REQUEST, BLOG_LOAD_SINGLE_SUCCESS, BLOG_LOAD_SINGLE_FAIL, REGISTER_BLOG_REQUEST, REGISTER_BLOG_SUCCESS, REGISTER_BLOG_FAIL, DELETE_BLOG_FAIL } from '../constants/blogConstants';
import { toast } from 'react-toastify';

const backend_api = process.env.REACT_APP_BACKEND_API;

export const blogLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    dispatch({ type: BLOG_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`${backend_api}api/blogs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`);
        // console.log(this.data);
        dispatch({ 
            type: BLOG_LOAD_SUCCESS, 
            payload: data 
        });
    } catch (error) {
        dispatch({
            type: BLOG_LOAD_FAIL,
            payload: error.response.data?.error
        });
    }
}

//single job action
export const blogLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: BLOG_LOAD_SINGLE_REQUEST });
    try {
        console.log("halwaasasaa", id);
        const res = await axios.get(`${backend_api}api/blog/${id}`);
        console.log("response === >", res);
        const data = res.data;
        // console.log("job === >", job);
        dispatch({ 
                type: BLOG_LOAD_SINGLE_SUCCESS, 
                payload: data
        });
        // console.log(data.job);
        // const { job } = data;
        // console.log(job);
        // const {jobTypeName} = job.jobType;
        // const {_id, company, title, description, salary, location, user, createdAt, updatedAt, available, availableTill} = job;
        // console.log(jobTypeName);
        // // dispatch({ 
        // //     type: JOB_LOAD_SINGLE_SUCCESS, 
        // //     payload: data 
        // // });
        // dispatch({ 
        //     type: JOB_LOAD_SINGLE_SUCCESS, 
        //     payload: {
        //         job: {
        //                 _id,
        //                 company,
        //                 title,
        //                 description,
        //                 salary,
        //                 location,
        //                 user,
        //                 available,
        //                 availableTill,
        //                 createdAt,
        //                 updatedAt,
        //                 jobTypeName
        //             }
        //         }       
        //     }
        //     );
    } catch (error) {
        dispatch({
            type: BLOG_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}

// register job action
export const registerAblogAction = (blog) => async (dispatch) => {
    dispatch({ type: REGISTER_BLOG_REQUEST })

    try {
        const { data } = await axios.post(`${backend_api}/api/blog/create`, blog)
        dispatch({
            type: REGISTER_BLOG_SUCCESS,
            payload: data
        })
        toast.success("Blog created successfully");


    } catch (error) {
        dispatch({
            type: REGISTER_BLOG_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}

//Delete Blog Action
export const blogDeleteAction = (blogID) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${backend_api}/api/blog/delete/${blogID}`);
        toast.success("Blog deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_BLOG_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}

//delete blog action
// export const deleteBlogAction = (id) => async (dispatch) => {
//     try {
//         await axios.delete(`/api/blog/delete/${id}`);
//         toast.success("Blog deleted successfully");
//     } catch (error) {
//         toast.error(error.response.data.error);
//     }
// }