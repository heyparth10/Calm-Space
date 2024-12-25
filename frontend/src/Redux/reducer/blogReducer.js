import { swap } from "formik";
import {
  CREATOR_BLOG_LOAD_FAIL,
  CREATOR_BLOG_LOAD_REQUEST,
  CREATOR_BLOG_LOAD_RESET,
  CREATOR_BLOG_LOAD_SUCCESS,
  BLOG_LOAD_FAIL,
  BLOG_LOAD_REQUEST,
  BLOG_LOAD_RESET,
  BLOG_LOAD_SINGLE_FAIL,
  BLOG_LOAD_SINGLE_REQUEST,
  BLOG_LOAD_SINGLE_RESET,
  BLOG_LOAD_SINGLE_SUCCESS,
  BLOG_LOAD_SUCCESS,
  REGISTER_BLOG_FAIL,
  REGISTER_BLOG_REQUEST,
  REGISTER_BLOG_RESET,
  REGISTER_BLOG_SUCCESS,
} from "../constants/blogConstants";

export const loadBlogReducer = (
  state = { blogs: [] },
  action //initial state is empty array
) => {
  switch (action.type) {
    case BLOG_LOAD_REQUEST: //if request is made, loading is true
      return { loading: true };
    case BLOG_LOAD_SUCCESS: //if request is successful, loading is false and jobs are returned
    console.log(action.payload, "action.payload")
      return {
        loading: false,
        success: action.payload.success,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
        setUniqueLocation: action.payload.setUniqueLocation,
        blogs: action.payload.blogs,
      };

    case BLOG_LOAD_FAIL: //if request is successful, loading is false and jobs are returned
      return {
        loading: false,
        error: action.payload,
      };

    case BLOG_LOAD_RESET: //if request is successful, loading is false and jobs are returned
      return {};
    default:
      return state;
  }
};

// //creator
// export const creatorLoadJobReducer = (
//   state = { jobs: [] },
//   action //initial state is empty array
// ) => {
//   switch (action.type) {
//     case CREATOR_JOB_LOAD_REQUEST: //if request is made, loading is true
//       return { loading: true };
//     case CREATOR_JOB_LOAD_SUCCESS: //if request is successful, loading is false and jobs are returned
//       return {
//         loading: false,
//         success: action.payload.success,
//         page: action.payload.page,
//         pages: action.payload.pages,
//         count: action.payload.count,
//         setUniqueLocation: action.payload.setUniqueLocation,
//         jobs: action.payload.jobs,
//       };

//     case CREATOR_JOB_LOAD_FAIL: //if request is successful, loading is false and jobs are returned
//       return {
//         loading: false,
//         error: action.payload,
//       };

//     case CREATOR_JOB_LOAD_RESET: //if request is successful, loading is false and jobs are returned
//       return {};
//     default:
//       return state;
//   }
// };


//single job 
export const loadBlogSingleReducer = (
  state = { blog: {} },
  action //initial state is empty array
) => {
  console.log(action, state);
  switch (action.type) {
    case BLOG_LOAD_SINGLE_REQUEST: //if request is made, loading is true
      return { loading: true };
    case BLOG_LOAD_SINGLE_SUCCESS: //if request is successful, loading is false and jobs are returned
      return {
        loading: false,
        success: action.payload.success,
        blog: action.payload.blog,
      };

    case BLOG_LOAD_SINGLE_FAIL: //if request is successful, loading is false and jobs are returned
      return {
        loading: false,
        error: action.payload,
      };

    case BLOG_LOAD_SINGLE_RESET: //if request is successful, loading is false and jobs are returned
      return {};
    default:
      return state;
  }
};

//Registered Job
export const registerAblogReducer = (state = {}, action) => {
  switch(action.type) {
    case REGISTER_BLOG_REQUEST:
      return { loading : true }
    case REGISTER_BLOG_SUCCESS:
      return { 
        loading : false,
      blog : action.payload, 
    }
    case REGISTER_BLOG_FAIL:
      return { loading : false, error : action.payload }
      case REGISTER_BLOG_RESET:
        return {}
        default:
          return state;
  }
}