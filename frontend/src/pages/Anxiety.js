import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import {
  Box,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  ListItemIcon,
  MenuItem,
  MenuList,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { blogLoadAction } from "../Redux/actions/blogAction";
import { Link, useParams } from "react-router-dom";
import CardElement from "../component/cardElement";
import LoadingBox from "../component/loadingBox";
import SelectComponent from "../component/selectComponent";
import { blogTypeLoadAction } from "../Redux/actions/blogTypeAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { modeReducer } from "../Redux/reducer/themeModeReducer";
import { RemoveCircle } from "@mui/icons-material";
import face from "../images/face.mp4";
import Footer from "../component/Footer";
import { ChatBot } from "../component/ChatBot";
import SearchInputEl from "../component/searchInputEl";
import logo from "../images/logo2.png";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";

const Anxiety = () => {
  const { userInfo: user } = useSelector((state) => state.userProfile);
  const { blogs, setUniqueLocation, pages, loading } = useSelector(
    (state) => state.loadBlog
  ); // useSelector is a hook from react-redux that allows you to extract data from the Redux store state, using a selector function.
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [cat, setCat] = React.useState("");
  const { keyword, location } = useParams();
  const mode = useSelector((state) => state.mode.mode);

  const clearFilter = () => {
    <Link to={`/`}></Link>;
  };

  useEffect(() => {
    dispatch(blogLoadAction(page, keyword, cat, location));
  }, [page, keyword, cat, location]);

  useEffect(() => {
    dispatch(blogTypeLoadAction());
  }, []);

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
  };

  return (
    <Box
      className="bg-[#121212] min-h-[100vh]"
      sx={{ bgcolor: "#faf", minHeight: "100vh" }}
    >
      <Navbar
        className={`${mode === "dark" ? "bg-gray-800" : "bg-[#fffefc]"}`}
      />
      <div>
        <div className={`${mode === "dark" ? "bg-gray-800" : "bg-[#fbf8f4]"}`}>
          <div className="pt-6">
            <div className="absolute left-4">
            <Button sx={{ borderRadius: '0 4px 4px 0', backgroundColor: "green", paddingX: '100px', fontSize: '20px'}} className='rounded-r-md' variant="contained" type="submit" >
                    A N X I E T Y
                </Button>
            </div>
            <SearchInputEl />
          </div>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
              backgroundColor: "[#fbf8f4]",
            }}
            spacing={{ xs: 1, sm: 2, md: 0 }}
          >
            <Box
              className={`${mode === "light" ? "bg-[#fbf8f4]" : ""}`}
              sx={{ flex: 5, p: 2 }}
            >
              {loading ? (
                <LoadingBox />
              ) : blogs && blogs.length === 0 ? (
                <>
                  <Box
                    sx={{
                      minHeight: "350px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h2>No result found!</h2>
                  </Box>
                </>
              ) : (
                blogs &&
                blogs.map(
                  (blog, i) =>
                    blog.blogType.blogTypeName == "Anxiety" && (
                      <CardElement
                        key={i}
                        id={blog._id}
                        company={blog.company}
                        image={blog.image}
                        blogTitle={blog.title}
                        description={blog.description}
                        category={
                          blog.blogType
                            ? blog.blogType.blogTypeName
                            : "No category"
                        }
                        creatorId={blog.user._id}
                        location={blog.location}
                      />
                    )
                )
              )}
              <Stack spacing={2}>
                <Pagination
                  page={page}
                  count={pages === 0 ? 1 : pages}
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
            </Box>
          </Stack>
        </div>
      </div>
      <Footer className="w-screen"/>

    </Box>

  );
};

export default Anxiety;
