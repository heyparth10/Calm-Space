
import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { createBlogTypeAction } from '../../Redux/actions/blogTypeAction';
import { useNavigate } from 'react-router-dom';



const validationSchema = yup.object({

    blogTypeName: yup
        .string('Enter a Category')
        .required('Category is required'),
});


const DashCreateCategory = () => {

    const { user } = useSelector(state => state.userProfile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user: user && user._id,
            blogTypeName: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(createBlogTypeAction(values))
            //alert(JSON.stringify(values, null, 2));
            //navigate back
            navigate('/admin/category')
            actions.resetForm();
        },
    });


    return (
        <>

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Create a Category
                        </Typography>
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="blogTypeName"
                            label="category"
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


                        <Button fullWidth variant="contained" type='submit' >Create category</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}


export default DashCreateCategory