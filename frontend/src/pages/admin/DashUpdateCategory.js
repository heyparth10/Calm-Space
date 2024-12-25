
import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { editBlogTypeAction } from '../../Redux/actions/blogTypeAction';
import { useNavigate, useParams } from 'react-router-dom';



const validationSchema = yup.object({

    blogTypeName: yup
        .string('Enter a Category')
        .required('Category is required'),
});


const DashUpdateCategory = () => {

    const { id, blogTypeName } = useParams(); // Get the jobType ID from the URL params
    console.log("id--->", id)
    const { user } = useSelector(state => state.userProfile);
    console.log("user--->", user)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            user: user && user._id,
            blogTypeName: blogTypeName | '', // Initialize the form with the fetched jobTypeName
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(editBlogTypeAction(id, values.blogTypeName));
            navigate('/admin/category')
            actions.resetForm();
        },
    });


    return (
        <>

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", position:'relative' }}>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Edit the Category
                        </Typography>
                         {/* Display the current jobTypeName */}
                         <Typography variant="subtitle1" sx={{ pb: 1, position:'absolute', left:"2px", top:"6vh" }}>
                            Current Category Name: {blogTypeName}
                        </Typography>
                        <TextField sx={{ mb: 3, mt: 3}}
                            fullWidth
                            id="blogTypeName"
                            label="Update Category"
                            name='blogTypeName'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="category name"
                            value={formik.values.blogTypeName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.blogTypeName && Boolean(formik.errors.blogTypeName)}
                            helperText={formik.touched.blogTypeName && formik.errors.blogTypeName}
                        />


                        <Button fullWidth variant="contained" type='submit' >Submit Changes</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}


export default DashUpdateCategory