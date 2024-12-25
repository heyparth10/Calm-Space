
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, InputBase, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const validationSchema = yup.object({
    search: yup
        .string('Enter your search query')
        .required('this field can not be empty'),
});

const SearchInputEl = () => {

    const navigate = useNavigate();
    const {mode} = useSelector((state) => state.mode);

    const onSubmit = (values, actions) => {
        //alert(values.search);
        const { search } = values;
        if (search.trim()) {
            navigate(`/search/${search}`);
        } else {
            navigate('/');
        }
        actions.resetForm();
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            search: '',
        },

        validationSchema: validationSchema,
        onSubmit
    });

    return (

        <form onSubmit={handleSubmit} style={{ width: '80%'}} className='flex justify-center ml-72 '>
            <Box 
            className='flex w-[70%] justify-center'
            sx={{textAlign:'right'}}
            >
                <InputBase className={`p-2 ${mode === 'dark' ? 'bg-gray-900' : 'bg-[#e0f6de]'} }`} 
                // sx={{ bgcolor: 'white', padding: '10px' }}
                    fullWidth={true}
                    id="search"
                    name="search"
                    label="search"
                    placeholder='Search for Topics'
                    value={values.search}
                    onChange={handleChange}
                    error={touched.search && Boolean(errors.search)}
                // helperText={touched.search && errors.search}
                />
                <Button sx={{ borderRadius: '0 4px 4px 0', backgroundColor: "green"}} className='rounded-r-md' variant="contained" type="submit" disabled={isSubmitting}>
                    Search
                </Button>
                <Box sx={{ textAlign:'center'}}>   
                </Box>
              

            </Box>
            <Box component='span' sx={{ color: 'orange' }}>{touched.search && errors.search}</Box>
        </form>

    );
};


export default SearchInputEl;