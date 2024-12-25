
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

const CardElement = ({
  company,
  blogTitle,
  description,
  image,
  category,
  location,
  id,
  creatorId,
  isCreator,
}) => {
  const { palette } = useTheme();
  const { mode } = useSelector((state) => state.mode);

  const url = isCreator ? `/creator/blog/${id}` : `/blog/${id}`;
  return (
    <div className="hover:shadow-lg hover:shadow-blue-100 duration-300 ease-in-out text-white">
      <div
        className={`text-white p-2 my-2 rounded-md ${
          mode === "dark"
            ? "bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r hover:bg-gradient-to-tr hover:from-gray-900 hover:to-gray-600 hover:bg-gradient-to-r duration-300 ease-in-out text-white"
            : "bg-[#d9ebdd] text-black"
        }`}
        sx={{ minWidth: 275, mb: 3, mt: 3 }}
      >
        <CardContent className="flex justify-between">
          <div>
            <Typography
              variant="h4"
              component="div"
              className={`pl-4 ${
                mode === "dark" ? "text-sky-400" : "text-black"
              }`}
              // sx={{color: "whitesmoke"}}
            >
              {company}
            </Typography>

            <Typography
              variant="h6"
              component="div"
              className={`pl-4 ${
                mode === "dark" ? "text-white" : "text-black"
              }`}
              // sx={{color: "whitesmoke"}}
            >
              {blogTitle}
            </Typography>
            <Typography
              className={`pl-4 ${
                mode === "dark" ? "text-white" : "text-black"
              }`}
              // sx={{ mb: 1.5 ,color: "whitesmoke"}}
            >
              {category}
            </Typography>
            <Typography
              variant="body2"
              className={`pl-4 ${
                mode === "dark" ? "text-white" : "text-black"
              }`}
              // sx={{color: "whitesmoke"}}
            >
              Description:{" "}
              {description
                ? description.split(" ").slice(0, 15).join(" ") + "..."
                : ""}
            </Typography>
          </div>
          <div>
            <img src={image} className="h-32 w-32 absolute right-10 rounded-md"/>
          </div>
          {/* <Typography
            className={`${mode === "dark" ? "text-white" : "text-black"}`}
            // sx={{ fontSize: 15, color: "whitesmoke", fontWeight: 500 }} gutterBottom
          >
            <IconButton>
              <LocationOnIcon
                className={`${mode === "dark" ? "text-white" : "text-black"}`}
                // sx={{ color: "whitesmoke", fontSize: 18 }}
              />
            </IconButton>{" "}
            {location}
          </Typography> */}
        </CardContent>
        <CardActions className="ml-6">
          {/* <Button disableElevation variant='contained' size="small" startIcon={<AddIcon />}><Link style={{ textDecoration: "none", color: "white", boxShadow: 0 }} to={`${url}`}>More Details</Link></Button> */}
          <Button
            disableElevation
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            sx={{ backgroundColor: "green", color: "white" }}
          >
            <Link
              style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
              to={`${url}?category=${category}&location=${location}&desc=${description}&title=${blogTitle}&creatorId=${creatorId}&image=${image}`}
            >
              More Details
            </Link>
          </Button>
        </CardActions>
      </div>
    </div>
  );
};

export default CardElement;

