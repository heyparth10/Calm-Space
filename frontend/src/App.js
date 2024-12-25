import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
// import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./pages/Login";
import UserDashboard from "./pages/user/userDashboard";
import UserRoute from "./component/userRoute";
import AdminRoute from "./component/adminRoute";
import CreatorRoute from "./component/creatorRoute";
import Layout from "./pages/global/Layout";
import { ProSidebarProvider } from "react-pro-sidebar";
import UserBlogHistory from "./pages/user/userBlogsHistory";
import userInfoDashboard from "./pages/user/userInfoDashboard";
import adminDashboard from "./pages/admin/adminDashboard";
import SingleBlog from "./pages/SingleBlog";
import DashUsers from "./pages/admin/DashUsers";
import DashBlogs from "./pages/admin/DashBlogs";
import Register from './pages/Register';
import DashCategory from './pages/admin/DashCategory';
import DashCreateBlog from './pages/admin/DashCreateBlog';
import DashCreateCategory from './pages/admin/DashCreateCategory';
import DashCreateUser from './pages/admin/DashCreateUser';

import { createTheme } from '@mui/material/styles';
import { themeColors } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import About from "./pages/About";
import CreatorDashboard from "./pages/creator/CreatorDashboard";
import CreatorDashApplicants from "./pages/creator/CreatorDashApplicants";
import CreatorDashCategory from "./pages/creator/CreatorDashCategory";
import CreatorDashCreateBlog from "./pages/creator/CreatorDashCreateBlog";
import CreatorDashCreateCategory from "./pages/creator/CreatorDashCreateCategory";
import CreatorDashCreateUser from "./pages/creator/CreatorDashCreateUser";
import CreatorBlogsHistory from "./pages/creator/CreatorBlogsHistory";
import CreatorSingleBlog from "./pages/creator/CreatorSingleBlog";
import DashUpdateCategory from "./pages/admin/DashUpdateCategory";
import UserGraphicGuide from "./pages/user/userGraphicGuide";
import UserGraphicGuideVideo from "./pages/user/userGraphicGuideVideo";
import UserPremiumStripePayment from "./component/UserPremiumStripePayment";
import Anxiety from "./pages/Anxiety";



//HOC
const UserDashboardHOC = Layout(UserDashboard); //instead of userdashboard we will see userdashboardHOC
const UserBlogHistoryHOC = Layout(UserBlogHistory); //instead of userdashboard we will see userdashboardHOC
const UserGraphicGuideHOC = Layout(UserGraphicGuide); //instead of userdashboard we will see userdashboardHOC
const UserGraphicGuideVideoHOC = Layout(UserGraphicGuideVideo); //instead of userdashboard we will see userdashboardHOC
const UserPremiumStripePaymentHOC = Layout(UserPremiumStripePayment); //instead of userdashboard we will see userdashboardHOC

const UserInfoDashboardHOC = Layout(userInfoDashboard); //instead of userdashboard we will see userdashboardHOC
// ADMIN
const AdminDashboardHOC = Layout(adminDashboard); //instead of userdashboard we will see userdashboardHOC
const DashUsersHOC = Layout(DashUsers); //instead of userdashboard we will see userdashboardHOC

const DashBlogsHOC = Layout(DashBlogs); 
const DashCategoryHOC = Layout(DashCategory)
const DashCreateBlogHOC = Layout(DashCreateBlog)

const DashCreateCategoryHOC = Layout(DashCreateCategory)
const DashUpdateCategoryHOC = Layout(DashUpdateCategory)
const DashCreateUserHOC = Layout(DashCreateUser)
// CREATOR
const CreatorDashboardHOC = Layout(CreatorDashboard); //instead of userdashboard we will see userdashboardHOC
const CreatorDashApplicantsHOC = Layout(CreatorDashApplicants); //instead of userdashboard we will see userdashboardHOC

const CreatorBlogsHistoryHOC = Layout(CreatorBlogsHistory); 
const CreatorDashCategoryHOC = Layout(CreatorDashCategory)
const CreatorDashCreateBlogHOC = Layout(CreatorDashCreateBlog)

// const CreatorSingleJobHOC = Layout(CreatorSingleJob)
const CreatorDashCreateCategoryHOC = Layout(CreatorDashCreateCategory)
const CreatorDashCreateUserHOC = Layout(CreatorDashCreateUser)

const App = () => {
  const {mode} = useSelector(state => state.mode);
  const theme = useMemo(()=> createTheme(themeColors(mode)), [mode]) 
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <ProSidebarProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search/location/:location" element={<Home />} />
                <Route path="/search/:keyword" element={<Home />} />{" "}
                {/* for extracting keyword during search for  */}
                <Route path="/login" element={<LogIn />} /> 
                <Route path="/register" element={<Register />} />
                <Route path="/blog/:id" element={<SingleBlog />} />
                <Route path="/blog/anxiety" element={<Anxiety />} />

                <Route path="/about" element={<About />} />
                {/* ADMIN */}
                <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute><DashUsersHOC /></AdminRoute>} />
                <Route path="/admin/blogs" element={<AdminRoute><DashBlogsHOC /></AdminRoute>} />
                <Route path="/admin/category" element={<AdminRoute><DashCategoryHOC /></AdminRoute>} />
                <Route path="/admin/blog/create" element={<AdminRoute><DashCreateBlogHOC /></AdminRoute>} />

                <Route path="/admin/category/create" element={<AdminRoute><DashCreateCategoryHOC /></AdminRoute>} />
                <Route path="/admin/category/update/:id/:jobTypeName" element={<AdminRoute><DashUpdateCategoryHOC /></AdminRoute>} />
                <Route path="/admin/info"element={<AdminRoute><UserInfoDashboardHOC /></AdminRoute>}/>

                {/* CREATOR */}
                <Route path="/creator/dashboard" element={<CreatorRoute><CreatorDashboardHOC /></CreatorRoute>} />
                <Route path="/creator/applicants" element={<CreatorRoute><CreatorDashApplicantsHOC /></CreatorRoute>} />

                <Route path="/creator/blogs" element={<CreatorRoute><CreatorBlogsHistoryHOC /></CreatorRoute>} />
                <Route path="/creator/category" element={<CreatorRoute><CreatorDashCategoryHOC /></CreatorRoute>} />
                <Route path="/creator/blogs/create" element={<CreatorRoute><CreatorDashCreateBlogHOC /></CreatorRoute>} />
                <Route path="/creator/blog/:id" element={<CreatorRoute><CreatorSingleBlog /></CreatorRoute>} />

                <Route path="/creator/category/create" element={<CreatorRoute><CreatorDashCreateCategoryHOC /></CreatorRoute>} />
                <Route path="/creator/user/create" element={<CreatorRoute><CreatorDashCreateUserHOC /></CreatorRoute>} />
                <Route path="/creator/user/create" element={<CreatorRoute><CreatorDashCreateUserHOC /></CreatorRoute>} />
                <Route path="/creator/info"element={<CreatorRoute><UserInfoDashboardHOC /></CreatorRoute>}/>

                {/* USER */}
                <Route path="/user/dashboard"element={<UserRoute><UserDashboardHOC /></UserRoute>}/>

                <Route path="/user/blogs"element={<UserRoute><UserBlogHistoryHOC /></UserRoute>}/>
                <Route path="/user/graphicGuide"element={<UserRoute><UserGraphicGuideHOC /></UserRoute>}/>
                <Route path="/user/graphicGuideVideo"element={<UserRoute><UserGraphicGuideVideoHOC /></UserRoute>}/>
                <Route path="/user/premiumStripePayment"element={<UserRoute><UserPremiumStripePaymentHOC /></UserRoute>}/>

                <Route path="/user/info"element={<UserRoute><UserInfoDashboardHOC /></UserRoute>}/>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ProSidebarProvider>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
};

export default App;
