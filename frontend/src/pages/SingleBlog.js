import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Footer from "../component/Footer";
import LoadingBox from "../component/loadingBox";
import Navbar from "../component/Navbar";
import { blogLoadSingleAction } from "../Redux/actions/blogAction";
import Button from "@mui/material/Button";
import { userApplyBlogAction } from "../Redux/actions/userAction";
import greenSpeaker from "../images/greenSpeaker.jpg";
import gamlaCode from "../images/gamlaCoding.jpg";
import bg from "../images/bg.jpg";
import { useLocation } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
// import './singleJob.css'

const SingleBlog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { mode } = useSelector((state) => state.mode);
  // const [searchParams] = useSearchParams();
  // const creatorId = searchParams.get('creatorId');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Retrieve the query parameters
  const category = searchParams.get("category");
  const locationParam = searchParams.get("location");
  const desc = searchParams.get("desc");
  const title = searchParams.get("title");
  const creatorId = searchParams.get("creatorId");
  const image = searchParams.get("image");

  // Use the retrieved data
  useEffect(() => {
    console.log("Category:", category);
    console.log("Location:", locationParam);
    console.log("Description:", desc);
    console.log("Title:", title);
    console.log("Creator ID:", creatorId);
    console.log("Image:", image);
  }, [category, locationParam, desc, title, creatorId, image]);
  return (
    <div>
        <Navbar />
        <Box >
            <Box>
              <div
                className={`w-screen px-20 `}
              >
                <div
                  className={`px-4 pb-4 mt-12 rounded-lg relative ${
                    mode === "light"
                      ? " bg-green-200  min-w-screen"
                      : " h-full bg-gradient-to-r to-[#000000] from-[#434343] min-h-full"
                  }`}
                >
                  <div className="flex justify-center rounded-3xl w-full">
                    <div className="rounded-full mr-20">
                      <img
                        src={image}
                        alt="job"
                        className="absolute -top-10 w-24 h-24 object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div
                    className={`mt-4 absolute ${
                      mode === "light" ? "text-black" : "text-sky-400"
                    }`}
                  >
                    <Link to={"/creator/blogs"}>
                      <IoArrowBackOutline className="animate-bounce text-xl" />
                    </Link>
                  </div>
                  <div className="w-full flex justify-center mt-20">
                    <div>
                      <p
                        className={`text-2xl font-semibold ${
                          mode === "light" ? "text-gray-700" : "text-sky-400"
                        }`}
                      >
                        Blog Details
                      </p>
                    </div>
                  </div>
                  <div className="p-4 m-8 flex-row text-white flex justify-center">
                    <div className="flex space-x-2">
                      <p
                        className={`text-2xl font-semibold ${
                          mode === "light" ? "text-gray-700" : "text-sky-400"
                        }`}
                      >
                        {title}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center">
                      <p
                        className={`text-2xl font-semibold ${
                          mode === "light" ? "text-gray-700" : "text-sky-400"
                        }`}
                      >
                        {category}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <p
                      className={`text-lg ${
                        mode === "light" ? "text-gray-700" : "text-sky-400"
                      }`}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex absolute bottom-0 w-full "></div>
              <div>
                <Footer className="w-full bg-green-400" />
              </div>
            </Box>
        </Box>
      {/* <Footer className="absolute bottom-0"/> */}
    </div>
  );
};

export default SingleBlog;
