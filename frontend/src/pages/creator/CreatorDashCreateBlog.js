import { Box, MenuItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { blogTypeLoadAction } from "../../Redux/actions/blogTypeAction";
import { registerAblogAction } from "../../Redux/actions/blogAction";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  title: yup.string("Enter a blog title").required("title is required"),
  description: yup
    .string("Enter a description")
    .min(6, "Description should be of minimum 6 characters length")
    .required("Description is required"),
  location: yup
    .string("Enter a location")
    .required("Location is required"),
    image: yup
    .string("Enter an image link")
    .required("Image link is required"),
  blogType: yup
    .string("Enter a Category")
    .required("Category is required"),
});

const CreatorDashCreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { singleJob, loading }  = useSelector(state => state.singleJob)

  //job type
  useEffect(() => {
    dispatch(blogTypeLoadAction());
  }, []);

  const { blogType } = useSelector((state) => state.blogTypeAll);
  console.log(blogType);
  const { userInfo: user } = useSelector((state) => state.userProfile);
  const { mode } = useSelector((state) => state.mode);
  // console.log("User ID ==============>>>>>>>>>>>>>>>>>>>>", user._id);

  // const createAJob = () => {
  //     dispatch(creatorJobAction({
  //         title: singleJob && singleJob.title,
  //         description: singleJob && singleJob.description,
  //         salary: singleJob && singleJob.salary,
  //         location: singleJob && singleJob.location
  //     }))
  // }

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      location: "",
      image: "",
      blogType: "",
      user: user && user._id,
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
        console.log("Submitting form:", values); // Check if form values are correct
      dispatch(registerAblogAction(values));
      actions.resetForm();
      navigate('/admin/category')
    },
  });

  return (
    <>
      <Box
        // sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}
        className="h-[100%] flex items-center justify-center pt-2"
      >
        <Box
        onSubmit={formik.handleSubmit}
        component="form"
          className={`relative flex p-[24px] border-[1px] w-[55%] rounded-2xl ${
            mode === "dark"
              ? "border-gray-600 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"
              : "border-black bg-white"
          }`}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
            
            className='form_style border-style'
          >
            <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
              Register a Blog
            </Typography>

            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="title"
              label="Title"
              name="title"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="description"
              name="description"
              label="Description"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="image"
              name="image"
              label="Image Link"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Image Link"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />

            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="location"
              name="location"
              label="Location"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />

            <TextField
              sx={{ mb: 3, text: "black" }}
              fullWidth
              className="px-2 my-2 text-black"
              variant="outlined"
              name="blogType"
              id="blogType"
              select
              label="Category"
              value={formik.values.blogType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.blogType && Boolean(formik.errors.blogType)}
              helperText={formik.touched.blogType && formik.errors.blogType}
            >
              <MenuItem key={""} value={""}></MenuItem>

              {blogType &&
                blogType.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.blogTypeName}
                  </MenuItem>
                ))}
            </TextField>

            <Button fullWidth variant="contained" type="submit">
              Create blog
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreatorDashCreateBlog;
