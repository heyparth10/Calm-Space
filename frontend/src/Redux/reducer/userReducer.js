
import { ALL_USER_LOAD_FAIL, ALL_USER_LOAD_REQUEST, ALL_USER_LOAD_RESET, ALL_USER_LOAD_SUCCESS, POST_APPLICANT_PROGRESS_FAIL, POST_APPLICANT_PROGRESS_REQUEST, POST_APPLICANT_PROGRESS_RESET, POST_APPLICANT_PROGRESS_SUCCESS, UPDATE_VIDEO_PROGRESS_FAIL, UPDATE_VIDEO_PROGRESS_REQUEST, UPDATE_VIDEO_PROGRESS_RESET, UPDATE_VIDEO_PROGRESS_SUCCESS } from "../constants/userConstant"
import { CREATOR_BLOG_FAIL, CREATOR_BLOG_REQUEST, CREATOR_BLOG_RESET, CREATOR_BLOG_SUCCESS, GET_APPLICANT_FAIL, GET_APPLICANT_REQUEST, GET_APPLICANT_RESET, GET_APPLICANT_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_RESET, USER_DELETE_SUCCESS, USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_RESET, USER_LOAD_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_RESET, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_RESET, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_RESET, USER_SIGNUP_SUCCESS } from "../constants/userConstant"


export const userReducerSignIn = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true, userInfo: null, isAuthenticated: false }
            case USER_SIGNIN_SUCCESS:        
                return {
                    loading : false,
                    userInfo : action.payload,
                    isAuthenticated : true
                }
            case USER_SIGNIN_FAIL:
                return {loading : false, userinfo : null, isAuthenticated : false, error : action.payload}
            case USER_SIGNIN_RESET:
                return {}
            default : 
                return state;            
    }
}


export const userReducerLogout = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGOUT_REQUEST:
            return { loading: true }
            case USER_LOGOUT_SUCCESS:        
                return {
                    loading : false,
                    userInfo : action.payload,
                }
            case USER_LOGOUT_FAIL:
                return {loading : false, error : action.payload}
            case USER_LOGOUT_RESET:
                return {}
            default : 
                return state;            
    }
}

// sign up reducer
export const userReducerSignUp = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true }
        case USER_SIGNUP_SUCCESS:
            return {
                loading: false,
                userSignUp: action.payload,
            }
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload }
        case USER_SIGNUP_RESET:
            return {}
        default:
            return state;
    }
}

//user profile
export const userReducerProfile = (state = {user : null}, action) => {
    switch (action.type) {
        case USER_LOAD_REQUEST:
            return { loading: true, user: null }
            case USER_LOAD_SUCCESS:        
                return {
                    loading : false,
                    userInfo : action.payload.user,
                }
            case USER_LOAD_FAIL:
                return {loading : false, user:null, error : action.payload}
            case USER_LOAD_RESET:
                return {}
            default : 
                return state;            
    }
}


//user apply job reducer
export const userApplyBlogReducer = (state = {user : null}, action) => {
    switch (action.type) {
        case USER_LOAD_REQUEST:
            return { loading: true, user: null }
            case USER_LOAD_SUCCESS:        
                return {
                    loading : false,
                    userInfo : action.payload.user,
                }
            case USER_LOAD_FAIL:
                return {loading : false, user:null, error : action.payload}
            case USER_LOAD_RESET:
                return {}
            default : 
                return state;            
    }
}


//all users reducer
export const allUserReducer = (state = {users : []}, action) => {
    switch (action.type) {
        case ALL_USER_LOAD_REQUEST:
            return { loading: true, users: [] }
            case ALL_USER_LOAD_SUCCESS:        
                return {
                    loading : false,
                    users : action.payload.users,
                }
            case ALL_USER_LOAD_FAIL:
                return {loading : false, users:[], error : action.payload}
            case ALL_USER_LOAD_RESET:
                return {}
            default : 
                return state;            
    }
}


//creator blog reducer
export const creatorBlogReducer = (state = {users : []}, action) => {
    switch (action.type) {
        case CREATOR_BLOG_REQUEST:
            return { loading: true, users: [] }
            case CREATOR_BLOG_SUCCESS:        
                return {
                    loading : false,
                    users : action.payload.users,
                }
            case CREATOR_BLOG_FAIL:
                return {loading : false, users:[], error : action.payload}
            case CREATOR_BLOG_RESET:
                return {}
            default : 
                return state;            
    }
}

//delete user reducer
export const deleteUserReducer = (state = { /* initial state */ }, action) => {
    switch (action.type) {
      // ... (other cases)
  
      case USER_DELETE_REQUEST:
        return { ...state, loadingDelete: true };
  
      case USER_DELETE_SUCCESS:
        return {
          ...state,
          loadingDelete: false,
          successDelete: true,
          deletedUserId: action.payload,
        };
  
      case USER_DELETE_FAIL:
        return {
          ...state,
          loadingDelete: false,
          errorDelete: action.payload,
        };
  
      case USER_DELETE_RESET:
        return {
          ...state,
          successDelete: false,
          deletedUserId: null,
          errorDelete: null,
        };
  
      default:
        return state;
    }
  };

  //GET_APPLICANT_INFO_REDUCER
    export const getSingleApplicantReducer = (state = { /* initial state */ }, action) => {
        switch (action.type) {
        // ... (other cases)
    
        case GET_APPLICANT_REQUEST:
            return { ...state, loading: true };
    
        case GET_APPLICANT_SUCCESS:
            return {
            ...state,
            loading: false,
            success: true,
            applicantsData: action.payload,
            };
    
        case GET_APPLICANT_FAIL:
            return {
            ...state,
            loading: false,
            error: action.payload,
            };
    
        case GET_APPLICANT_RESET:
            return {
            ...state,
            success: false,
            applicantInfo: null,
            error: null,
            };
    
        default:
            return state;
        }

    };


    //update VideoProgress of user reducer
    const initialState = {
        loading: false,
        error: null,
        success: false,
    };
    
    export const userReducer = (state = initialState, action) => {
        switch (action.type) {
            case UPDATE_VIDEO_PROGRESS_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: null,
                    success: false,
                };
            case UPDATE_VIDEO_PROGRESS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    error: null,
                    success: true,
                };
            case UPDATE_VIDEO_PROGRESS_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                    success: false,
                };
            default:
                return state;
        }
    };