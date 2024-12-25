
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
import Footer from "../component/Footer";
import LoadingBox from "../component/loadingBox";
import SelectComponent from "../component/selectComponent";
import { blogTypeLoadAction } from "../Redux/actions/blogTypeAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { modeReducer } from "../Redux/reducer/themeModeReducer";
import { RemoveCircle } from "@mui/icons-material";
import face from "../images/face.mp4";
import { ChatBot } from "../component/ChatBot";
import SearchInputEl from "../component/searchInputEl";
import logo from '../images/logo2.png';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';

const Home = () => {
  const { userInfo : user } = useSelector(state => state.userProfile);
  const { blogs, setUniqueLocation, pages, loading } = useSelector(
    (state) => state.loadBlog); // useSelector is a hook from react-redux that allows you to extract data from the Redux store state, using a selector function.
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [cat, setCat] = React.useState("");
  const { keyword, location } = useParams();
  const mode = useSelector((state) => state.mode.mode);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [progress, setProgress] = React.useState(0);

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center'  }}>
        <Box sx={{ width: '100%', mr: 1, ml:1 }}>
          <LinearProgress variant="determinate" {...props}  sx={{height:'20px', marginTop:'10px', borderRadius: 5,}}/>
        </Box>
      </Box>
    );
  }


  const [answers, setAnswers] = useState({});
const [isdisable, setIsDisable] = useState(true)
const [open, setOpen] = React.useState(false);
const [predictedAnswer, setPredictedAnswer] = React.useState("");


  const clearFilter = () => {
    <Link to={`/`}></Link>;
  };

  useEffect(() => {
    dispatch(blogLoadAction(page, keyword, cat, location));
  }, [page, keyword, cat, location]);

  useEffect(() => {
    dispatch(blogTypeLoadAction());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
  };

  const questions = [
    {
      id: 1,
      question: "How often have you been feeling nervous, anxious, or on edge?.",
    },
    {
      id: 2,
      question: "How often have you been unable to stop or control worrying?.",
    },
    {
      id: 3,
      question: "How often have you been worrying too much about different things?"
    },
    {
      id: 4,
      question: "How often have you had trouble relaxing?.",
    },
    {
      id: 5,
      question: "How often have you been so restless that it's hard to sit still?.",
    },
    {
      id: 6,
      question: "How often have you felt little interest or pleasure in doing things?.",
    },
    {
      id: 7,
      question: "How often have you felt down, depressed, or hopeless?.",
    },
    {
      id: 8,
      question: "How often have you had trouble falling or staying asleep, or sleeping too much?",
    },
    {
      id: 9,
      question: "How often have you felt tired or had little energy?",
    },
    {
      id: 10,
      question: "How often have you felt bad about yourself",
    },
    // Add more questions as needed
  ];
  useEffect(()=>{
    setIsDisable(Object.keys(answers).length!==questions.length);
    const answeredQuestions = Object.keys(answers).length;
    const totalQuestions = questions.length;
    const progressPercentage = (answeredQuestions / totalQuestions) * 100;
    setProgress(progressPercentage);
  },[answers, questions.length]);
  
  const handleRadioChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const predictDisorder = (answersArray) => {
    if (answersArray.length !== 10) {
      throw new Error('Invalid number of answers. Expected 10.');
    }

    const anxietyScore = answersArray.slice(0, 5).reduce((acc, curr) => acc + curr, 0);
    const depressionScore = answersArray.slice(5, 10).reduce((acc, curr) => acc + curr, 0);

    if (anxietyScore > depressionScore) {
      return 'Anxiety';
    } else if (depressionScore > anxietyScore) {
      return 'Depression';
    } else if (anxietyScore === depressionScore && anxietyScore > 10) {
      return 'Possible mixed anxiety and depressive disorder';
    } else {
      return 'Further assessment needed';
    }
  };

  const handleSubmit = () => {
    console.log("hgsdhgJOPASDIOIAspppp", answers)
    const answersArray = Object.values(answers);
    const predictionResult = predictDisorder(answersArray);
    setPredictedAnswer(predictionResult);
    setOpen(true);
    
  };

  const topics = [
    { name: 'Anxiety', link: '/anxiety' },
    { name: 'Depression', link: '/depression' },
    { name: 'Stress', link: '/stress' },
    { name: 'PTSD & Trauma', link: '/ptsd-trauma' },
    { name: 'Sleep', link: '/sleep' },
    { name: 'Bipolar Disorder', link: '/bipolar-disorder' },
    { name: 'Suicide', link: '/suicide' },
    { name: 'Addiction', link: '/addiction' },
  ];

  return (
    <>
      <Box
        className="bg-[#121212] min-h-[100vh]"
        sx={{ bgcolor: "#faf", minHeight: "100vh" }}
      >
        <Navbar
          className={`${mode === "dark" ? "bg-gray-800" : "bg-[#fffefc]"}`}
          />
          {/* <div className={`h-12 w-full px-40 ${mode === "light" ? 'bg-[#fffefc]' : "bg-gray-700"}`}> */}
            {/* <img src={logo} className={`h-12 w-60 ${mode === "light" ? 'bg-[#fffefc]' : "bg-gray-700"}`}/> */}
          {/* </div> */}
        <Header />
        <div className={`${mode === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <Box className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
          <h1 tyle={{color:'olive'}} className="text-2xl font-bold mb-4 font-sans md:font-serif font-light">Our Mission</h1>
          <h1 tyle={{color:'olive'}} className="text-5xl font-bold mb-4 font-sans md:font-serif font-light">We <i>empower</i> you with the knowledge <br />and skills you need to strengthen <br/>your mental health & well-being</h1>
      </Box>
        </div>
        <div>
        <div className={` font-sans md:font-serif font-light text-center py-16 ${mode === "light" ? "bg-[#e1ebe2]" : "bg-[#18191A]"}`}>
      <h2 className={`mb-6 text-5xl ${mode === "light" ? "text-black" : "text-white"}`}>Find the help you need today</h2>
      <p className="mb-10 text-lg">Pick a topic below that you’d like to explore:</p>
      <div className="flex flex-wrap justify-center gap-4">
        {topics.map((topic, index) => (
          <Link
            key={index}
            to={topic.link}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white rounded-full border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {topic.name}
          </Link>
        ))}
      </div>
    </div>
        </div>

        <div className={`pt-1 ${mode === "light" ? "bg-white" : "bg-gray-700"}`}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header" 
          sx={{textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}
        >
          Take the Survey
        </AccordionSummary>
        <AccordionDetails>
        <question>
<Box sx={{ maxWidth: '4xl', mx: 'auto', p: 4, textAlign: 'center' }}>
<Paper elevation={3} sx={{marginLeft:'200px', marginRight:'200px'}}>
<LinearProgressWithLabel value={progress} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{paddingTop:"10px", fontFamily: "sans-serif"}} >
          How are you feeling Today?
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Using the key below, answer the questions based on how strongly you agree or disagree with the statement.
        </Typography>

        {questions.map((question) => (
          <Box key={question.id} sx={{ mb: 4 }}>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              {question.id}. {question.question}
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                onChange={(e) => handleRadioChange(question.id, e.target.value)}
              >
                <p className="text-green-500 mr-6 mt-2">Low</p>
                {[1, 2, 3, 4, 5].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={String(value)}
                    control={<Radio />}
                    label={String(value)}
                  />
                ))}
                <p className="text-red-500 ml-6 mt-2">High</p>
              </RadioGroup>
            </FormControl>
          </Box>
        ))}

        <Button disabled={isdisable} variant="contained" onClick={handleSubmit} sx={{ mb: 5 }}>
          Submit
        </Button>

        </Paper>
      </Box>
    
    </question> 
        </AccordionDetails>
      </Accordion>
      </div>



        <div className={`${mode === "dark" ? "bg-gray-800" : "bg-[#fbf8f4]"}`}>
        <div className="pt-6">
        <SearchInputEl/>
        </div>
          <Stack
            direction={{ xs: "column", sm: "row", backgroundColor:"[#fbf8f4]" }}
            spacing={{ xs: 1, sm: 2, md: 0 }}
          >
            <Box className={`${mode === "light" ? "bg-[#fbf8f4]" : ""}`} sx={{ flex: 2, p:2 }}>
              <Card className={`${mode === "light" ? "bg-[#fbf8f4]" : ""}`} sx={{ minWidth: 150, mb: 3, mt: 1, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography
                  className={`${mode === "light" ? "text-black" : "text-white"}`}
                    sx={{  fontWeight: 600 }}
                    component="h4"
                  >
                    Filter Blog by Category
                  </Typography>
                </Box>
                <SelectComponent
                className={`${mode === "light" ? "text-black" : "text-white"}`}
                  handleChangeCategory={handleChangeCategory}
                  cat={cat}
                />
              {/* </Card> */}

              {/* jobs by location */}
              {/* <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}> */}
                {/* <Box sx={{ pb: 2, pt:2 }}>
                  <Typography
                    component="h4"
                    className={`${mode === "light" ? "text-black" : "text-white"}`}
                    sx={{ fontWeight: 600 }}
                  >
                    Filter blog by location
                  </Typography>
                  <MenuList className={`${mode === "light" ? "text-black" : "text-white"}`}>
                    {setUniqueLocation &&
                      setUniqueLocation.map((location, i) => (
                        <MenuItem key={i}>
                          <ListItemIcon>
                            <LocationOnIcon
                            className={`${mode === "light" ? "text-black" : "text-white"}`}
                              sx={{
                                fontSize: 18,
                              }}
                              />
                          </ListItemIcon>
                          <Link to={`/search/location/${location}`}>
                            {location}
                          </Link>
                        </MenuItem>
                      ))}
                      {setUniqueLocation && (
                        <MenuItem>
                          <ListItemIcon>
                            <RemoveCircle
                            className={`${mode === "light" ? "text-black" : "text-white"}`}
                              sx={{
                                fontSize: 18,
                              }}
                            />
                          </ListItemIcon>
                          <Link to={`/`}> Clear Filter </Link>
                        </MenuItem>
                      )}
                  </MenuList>
                </Box> */}
              </Card>
            </Box>
            <Box className={`${mode === "light" ? "bg-[#fbf8f4]" : ""}`} sx={{ flex: 5, p: 2 }}>
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
                blogs.map((blog, i) => (
                  <CardElement
                    key={i}
                    id={blog._id}
                    company={blog.company}
                    image={blog.image}
                    blogTitle={blog.title}
                    description={blog.description}
                    category={
                      blog.blogType ? blog.blogType.blogTypeName : "No category"
                    }
                    creatorId = {blog.user._id}
                    location={blog.location}
                  />
                ))
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
        {/* <ChatBot /> */}
      </Box>
      <Footer className="w-screen"/>


      <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your Results are here!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Prediction Result : {predictedAnswer} Need not to Worry! We are here to Help!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:"white"}}>Go Back</Button>
          <Button onClick={handleClose} autoFocus sx={{color:"white"}}>
            {user ? <Link to={'/user/graphicGuide'}>This may be helpful</Link> : <Link to={'/login'}>Log In to get more help</Link>}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

    </>
  );
};

export default Home;

