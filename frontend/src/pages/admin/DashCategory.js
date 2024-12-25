
import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Modal, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  blogTypeDeleteAction,
  blogTypeLoadAction,
} from "../../Redux/actions/blogTypeAction";

import moment from "moment";

const DashCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(blogTypeLoadAction());
  }, []);

  const { blogType, loading } = useSelector((state) => state.blogTypeAll);
  let data = [];
  data = blogType !== undefined && blogType.length > 0 ? blogType : [];

  //delete by job id
  const deleteBlogCategoryById = (_id) => {
    console.log(_id);
    dispatch(blogTypeDeleteAction(_id));
    navigate("/admin/category");
  };

  //display a modal if loading is true
  useEffect(() => {
    if (loading) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [loading]);

  const columns = [
    {
      field: "blogTypeName",
      headerName: "Job Title",
      width: 250,
      editable: true,
    },
    {
      field: "_id",
      headerName: "Category_ID",
      width: 250,
      editable: true,
    },
    {
      field: "Actions",
      width: 200,
      renderCell: (values) => (
        <Box className="flex justify-space-between">
          <button variant="contained">
            <Link
              className="text-white px-4 py-1 mr-1 hover:text-purple-500 hover:scale-110 duration-300 ease-in-out rounded-xl border-1 bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700"
              to={`/admin/category/update/${values.row._id}/${values.row.blogTypeName}`}
            >
              Edit
            </Link>
          </button>
          <button
            className=" hover:text-purple-500 px-4 py-1 rounded-xl hover:scale-110 duration-300 ease-in-out border-1 bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700 ml-1"
            onClick={(e) => deleteBlogCategoryById(values.row._id)}
            variant="contained"
            color="error"
          >
            Delete
          </button>
        </Box>
      ),
    },
  ];

  return (
    <Box className="pl-6 pt-6 pr-4">
      <div className="text-white pb-3 text-2xl">Blogs Category</div>
      <div className="pb-2 flex justify-end">
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          <Link className="text-white" to="create">
            Create Category
          </Link>
        </Button>
      </div>
      <div className="bg-none">
        <Box className="h-400 w-[100%]">
          <DataGrid
            getRowId={(row) => row._id}
            sx={{
              "& .MuiTablePagination-displayedRows": {
                color: "white",
              },
              color: "white",
              [`& .${gridClasses.row}`]: {
                // bgcolor: (theme) =>
                // theme.palette.mode === 'light' ? grey[200] : grey[900],
                // theme.palette.secondary.main
              },
              button: {
                color: "#ffffff",
              },
            }}
            rows={data}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[3]}
            checkboxSelection
            // components={{ Toolbar: GridToolbarExport }}
          />
        </Box>
      </div>
      <Modal open={showModal} aria-labelledby="processing-modal-title">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      </Modal>
    </Box>
  );
};

export default DashCategory;

