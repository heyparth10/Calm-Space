import { CREATE_BLOG_TYPE_FAIL, CREATE_BLOG_TYPE_REQUEST, CREATE_BLOG_TYPE_RESET, CREATE_BLOG_TYPE_SUCCESS, EDIT_BLOG_TYPE_FAIL, EDIT_BLOG_TYPE_REQUEST, EDIT_BLOG_TYPE_RESET, EDIT_BLOG_TYPE_SUCCESS, BLOG_TYPE_LOAD_FAIL, BLOG_TYPE_LOAD_REQUEST, BLOG_TYPE_LOAD_RESET, BLOG_TYPE_LOAD_SUCCESS } from "../constants/blogTypeConstants";


export const loadBlogTypeReducer = (
    state = { blogType: [] },
    action //initial state is empty array
  ) => {
    switch (action.type) {
      case BLOG_TYPE_LOAD_REQUEST: //if request is made, loading is true
        return { loading: true };
      case BLOG_TYPE_LOAD_SUCCESS: //if request is successful, loading is false and jobs are returned
        return {
          loading: false,
          blogType: action.payload.blogT
        };
  
      case BLOG_TYPE_LOAD_FAIL: //if request is successful, loading is false and jobs are returned
        return {
          loading: false,
          error: action.payload,
        };
  
      case BLOG_TYPE_LOAD_RESET: //if request is successful, loading is false and jobs are returned
        return {};
      default:
        return state;
    }
  };
  
  
  // create job type reducer
export const createBlogTypeReducer = (state = {}, action) => {
  switch (action.type) {
      case CREATE_BLOG_TYPE_REQUEST:
          return { loading: true }
      case CREATE_BLOG_TYPE_SUCCESS:
          return {
              loading: false,
              blogType: action.payload,
          }
      case CREATE_BLOG_TYPE_FAIL:
          return { loading: false, error: action.payload }
      case CREATE_BLOG_TYPE_RESET:
          return {}
      default:
          return state;
  }

}

// Edit Blog Type Reducer 
export const editBlogTypeReducer = (state = {}, action) => {
  switch (action.type) {
      case EDIT_BLOG_TYPE_REQUEST:
          return { loading: true }
      case EDIT_BLOG_TYPE_SUCCESS:
          return {
              loading: false,
              blogType: action.payload,
          }
      case EDIT_BLOG_TYPE_FAIL:
          return { loading: false, error: action.payload }
      case EDIT_BLOG_TYPE_RESET:
          return {}
      default:
          return state;
  }

} 