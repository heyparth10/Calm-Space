import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CardElement from "../../component/cardElement";
import nojobimage from "../../images/nojobimage.png"
import { Tilt } from 'react-tilt'
import yellowbg from "../../images/yellowbg.jpg"
import greenbg from "../../images/greenbg.jpg"
import cloud from "../../images/cloud.png"
import yoga from "../../images/yoga.png"
import bird from "../../images/bird2.gif"
import breathe from "../../images/breathe.gif"
import breathe2 from "../../images/breathe2.gif"
import breathe3 from "../../images/breathe3.gif"
import timeryoga from "../../images/timeryoga.png"
import { FaForward } from "react-icons/fa";
import Footer from "../../component/Footer";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from "react-router-dom";

// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const UserGraphicGuide = () => {
  const { userInfo : user } = useSelector(state => state.userProfile);
  const {mode} = useSelector(state => (state.mode));

  const [timer, setTimer] = useState(60); // Timer starts at 60 seconds
  const [isActive, setIsActive] = useState(false); // State to track if timer is active

  const [value, setValue] = React.useState(0);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setActiveStep(0);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    let interval;

    // Start the timer when isActive becomes true
    if (isActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1); // Decrement the timer by 1 every second
        if (timer === 0) {
          setIsActive(false); // When the timer reaches 0, stop it
        }
      }, 1000);
    } else {
      clearInterval(interval); // Clear the interval when the timer is not active
    }

    // Clear the interval when the component unmounts or when isActive changes
    return () => clearInterval(interval);
  }, [isActive]);

   // Function to handle the click event on the Icon
   const handleIconClick = () => {
    setIsActive(true); // Set isActive to true to start the timer
  };
  
  console.log(user);
  console.log(user?.blogHistory.length);
  console.log(user?.blogHistory?.length);
  return (
    <>
      <Box >
        <Box>
          <div className="w-[205vh] relative overflow-clip">
            <img src={cloud} className="absolute -left-10 top-[68vh] h-32 w-64" />
            <img src={cloud} className="absolute -right-10 top-5 h-32 w-64" />
            {mode === "light" ?  
            <img src={greenbg} className="object-cover w-full h-[240vh]" /> :
            <img src="https://wallpapers.com/images/high/dark-gradient-rpa97mj9dhic8raf.webp" className="object-cover w-full h-[240vh]" /> 
            }
            <div className="flex absolute font-semibold space-x-4 text-5xl left-24 top-20">
              <p className={`${mode === "light" ? "text-[#43413f]" : "text-white"}`}>Choose from a series of Exercises </p>
            </div>
            <div className="absolute right-0 top-2">
              <img src={bird} className="h-[90vh] w-[90vh]"/>
            </div>
            <div className="flex absolute left-16 pl-10 font-semibold space-x-4 text-2xl right-[35%] top-40">
              <p className="text-[#8B4513]">Guided meditations to help you manage life’s <br/> more challenging moments.</p>
            </div>
            <div className="flex absolute left-20 pl-6 space-x-4 text-lg right-[35%] top-64 w-[86vh] text-justify">
              <p className="text-[#8B4513]">Select from our range of tailored exercises designed to alleviate anxiety, offering a pathway to tranquility and emotional balance. Rediscover joy and vitality with exercises crafted to combat depression, guiding you towards a brighter outlook on life. Conquer sleeplessness with our specialized exercises, promoting deep relaxation and rejuvenating rest for a refreshed mind and body.</p>
            </div>


            <div className="flex bg-black w-full absolute top-[110vh]">
              <div className="relative w-full">
              <div className="absolute -top-10 w-full">
                <div className="w-full relative">
              <div className="w-full flex justify-center mb-4">
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Breathing Exercise" {...a11yProps(0)} />
                <Tab label="Anxiety" {...a11yProps(1)} />
                {/* <Tab label="Sleeplessness" {...a11yProps(2)} /> */}
                </Tabs>
                </div>
              </div>
            <div className="border-2 h-[95vh] mx-4 rounded-lg shadow-lg shadow-green-300">
            <CustomTabPanel value={value} index={0} >
        <div>
                <Stepper activeStep={activeStep} className="pt-10 mx-40 text-black">
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
                </Stepper>
                {activeStep === 0 ? ( //Personal Details
                    <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <div className="absolute top-10 left-24 flex w-full">
                    <div className="border-2 shadow-xl shadow-green-300 rounded-lg w-full">
                      <img src={breathe} className="h-[60vh] w-[100vh] rounded-lg" />
                    </div>
                    <div className="flex left-16 w-full justify-center pl-10 font-semibold space-x-4 right-24 text-4xl ">
                      <p className="text-[#808000] absolute right-[34vh]">Breathing Exercise 1</p>
                    </div>
                    </div>
                    <div className="flex absolute w-full justify-center pl-10 space-x-4 right-24 text-lg top-32">
                      <p className="text-green-800 absolute right-0 w-[62vh] text-justify ">Begin by finding a quiet and comfortable space to sit or lie down. Close your eyes and take a deep breath in through your nose, feeling your chest and belly expand. Hold for a moment, then exhale slowly through your mouth, letting go of any tension. Repeat this deep breathing pattern for several minutes, focusing solely on the rhythm of your breath. Allow each inhale to bring calmness and each exhale to release stress. Gradually, you'll feel a sense of relaxation washing over you, leaving you feeling more centered and at peace.</p>
                    </div>
                  </Box>
                ) : activeStep === 1 ? ( //Education
                <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  position: "relative",
                }}
              >
                <div className="absolute top-10 left-24 flex w-full">
                <div className="border-2 shadow-xl shadow-green-300 rounded-lg w-full">
                  <img src={breathe2} className="h-[60vh] w-[100vh] rounded-lg" />
                </div>
                <div className="flex left-16 w-full justify-center pl-10 font-semibold space-x-4 right-24 text-4xl ">
                  <p className="text-[#808000] absolute right-[34vh]">Breathing Exercise 2</p>
                </div>
                </div>
                <div className="flex absolute w-full justify-center pl-10 space-x-4 right-24 text-lg top-32">
                  <p className="text-green-800 absolute right-0 w-[62vh] text-justify ">Begin by finding a quiet and comfortable space to sit or lie down. Close your eyes and take a deep breath in through your nose, feeling your chest and belly expand. Hold for a moment, then exhale slowly through your mouth, letting go of any tension. Repeat this deep breathing pattern for several minutes, focusing solely on the rhythm of your breath. Allow each inhale to bring calmness and each exhale to release stress. Gradually, you'll feel a sense of relaxation washing over you, leaving you feeling more centered and at peace.</p>
                </div>
              </Box>
                ) : activeStep === 2 ? (                   //Experience
                    <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  position: "relative",
                }}
              >
                <div className="absolute top-10 left-24 flex w-full">
                <div className="border-2 shadow-xl shadow-green-300 rounded-lg w-full">
                  <img src={breathe3} className="h-[60vh] w-[100vh] rounded-lg" />
                </div>
                <div className="flex left-16 w-full justify-center pl-10 font-semibold space-x-4 right-24 text-4xl ">
                  <p className="text-[#808000] absolute right-[34vh]">Breathing Exercise 3</p>
                </div>
                </div>
                <div className="flex absolute w-full justify-center pl-10 space-x-4 right-24 text-lg top-32">
                  <p className="text-green-800 absolute right-0 w-[62vh] text-justify ">Begin by finding a quiet and comfortable space to sit or lie down. Close your eyes and take a deep breath in through your nose, feeling your chest and belly expand. Hold for a moment, then exhale slowly through your mouth, letting go of any tension. Repeat this deep breathing pattern for several minutes, focusing solely on the rhythm of your breath. Allow each inhale to bring calmness and each exhale to release stress. Gradually, you'll feel a sense of relaxation washing over you, leaving you feeling more centered and at peace.</p>
                </div>
              </Box>
                ) :                                     //Timer
                (
                  <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <div className="flex left-16 w-full justify-center font-semibold space-x-4 right-24 text-4xl mt-20">
                  <p className="text-[#808000] absolute left-[32vh]">Now, it's time for you to <br/> try it yourself</p>
                </div>
                <div className="flex absolute -right-64 w-full justify-center font-semibold space-x-4 top-20 text-4xl">
                  <div className="mx-10">
                  <img src={timeryoga} className="h-[62vh] w-[62vh] absolute left-80 ml-52 shadow-lg shadow-green-300 hover:shadow-violet-300 duration-300 ease-in-out -top-11 "/>
                  <CountdownCircleTimer
                  className="hover:dhadow-lg hover:shadow-violet-300 duration-300 ease-in-out"
                  isPlaying
                  duration={60}
                  size={400}
                  onUpdate={(remainingTime) => {
                    setTimer(remainingTime);
                  }
                  }
                  trailColor="#d9d9d9"
                  onComplete={() => {
                    return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
                  }}
                  colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                  colorsTime={[60, 45, 30, 15]}
                  >
                      {({ remainingTime }) => remainingTime}
                  </CountdownCircleTimer>
                  </div>
    </div>
                </Box>
                )}

              <div className="w-[160vh] absolute top-[90vh] left-40 flex justify-between items-center">
                <div className="flex justify-between w-full">
                  <button color="inherit" disabled={activeStep === 0} onClick={handleBack} className="font-semibold border-2 rounded-lg hover:scale-105 duration-300 ease-in-out text-lg hover:shadow-2xl hover:shadow-violet-500 px-2">
                    Back
                  </button>
                  <button onClick={handleNext} disabled={activeStep === 3} className="font-semibold border-2 rounded-lg hover:scale-105 duration-300 ease-in-out text-lg hover:shadow-2xl hover:shadow-violet-500 px-2">
                    Next
                  </button>
              </div>
              </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
        <div>
                <Stepper activeStep={activeStep} className="pt-10 mx-40 text-black">
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
                </Stepper>
                {activeStep === 0 ? ( //Personal Details
                    <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <div className="absolute top-10 left-24 flex w-full">
                    <div className="border-2 shadow-xl shadow-green-300 rounded-lg w-full h-[60vh]">
                      <img src="https://i.pinimg.com/originals/bb/62/46/bb6246c85c65ddd0b35f8e6a817cb256.gif" className="h-[46vh] w-[70vh] rounded-lg mt-20 ml-20" />
                    </div>
                    <div className="flex left-16 w-full justify-center pl-10 font-semibold space-x-4 right-24 text-4xl ">
                      <p className={`${mode==="light" ? "text-[#808000]" : "text-[#f0f051]"} absolute right-[34vh]`}>Try Journalism</p>
                    </div>
                    </div>
                    <div className="flex absolute w-full justify-center pl-10 space-x-4 right-24 text-lg top-32">
                      <p className={` ${mode==="light" ? "text-green-800" : "text-green-300"} absolute right-0 w-[62vh] text-justify `}>Journaling may help reduceTrusted Source stress and anxiety and provide a positive outlet for your thoughts and emotions.

A 2018 studyTrusted Source noted that expressive writing or therapeutic writing can benefit people managing chronic health conditions, including but not limited to mental health conditions like depression.

They noted that regular journaling may be linked to a higher quality of life, more proactive self-care behaviors, and other healthful behaviors, such as taking prescribed medications.

You can also try a guided journal if you’d prefer more targeted, expressive writing.</p>
                    </div>
                  </Box>
                ) : activeStep === 1 ? ( //Education
                <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  position: "relative",
                }}
              >
                <div className="absolute top-10 left-24 flex w-full">
                <div className="border-2 shadow-xl shadow-green-300 rounded-lg w-full">
                  <img src={breathe2} className="h-[60vh] w-[100vh] rounded-lg" />
                </div>
                <div className="flex left-16 w-full justify-center pl-10 font-semibold space-x-4 right-24 text-4xl ">
                  <p className="text-[#808000] absolute right-[34vh]">Breathing Exercise 2</p>
                </div>
                </div>
                <div className="flex absolute w-full justify-center pl-10 space-x-4 right-24 text-lg top-32">
                  <p className={`absolute right-0 w-[62vh] text-justify ${mode==="light" ? "text-green-800" : "text-green-300"}`}>Begin by finding a quiet and comfortable space to sit or lie down. Close your eyes and take a deep breath in through your nose, feeling your chest and belly expand. Hold for a moment, then exhale slowly through your mouth, letting go of any tension. Repeat this deep breathing pattern for several minutes, focusing solely on the rhythm of your breath. Allow each inhale to bring calmness and each exhale to release stress. Gradually, you'll feel a sense of relaxation washing over you, leaving you feeling more centered and at peace.</p>
                </div>
              </Box>
                ) : activeStep === 2 ? (                   //Experience
                    <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  position: "relative",
                }}
              >
                <div className="absolute top-10 left-24 flex w-full">
                <div className="border-2 shadow-xl shadow-green-300 rounded-lg w-full">
                  <img src={breathe3} className="h-[60vh] w-[100vh] rounded-lg" />
                </div>
                <div className="flex left-16 w-full justify-center pl-10 font-semibold space-x-4 right-24 text-4xl ">
                  <p className="text-[#808000] absolute right-[34vh]">Breathing Exercise 3</p>
                </div>
                </div>
                <div className="flex absolute w-full justify-center pl-10 space-x-4 right-24 text-lg top-32">
                  <p className="text-green-800 absolute right-0 w-[62vh] text-justify ">Begin by finding a quiet and comfortable space to sit or lie down. Close your eyes and take a deep breath in through your nose, feeling your chest and belly expand. Hold for a moment, then exhale slowly through your mouth, letting go of any tension. Repeat this deep breathing pattern for several minutes, focusing solely on the rhythm of your breath. Allow each inhale to bring calmness and each exhale to release stress. Gradually, you'll feel a sense of relaxation washing over you, leaving you feeling more centered and at peace.</p>
                </div>
              </Box>
                ) :                                     //Timer
                (
                  <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <div className="flex left-16 w-full justify-center font-semibold space-x-4 right-24 text-4xl mt-20">
                  <p className="text-[#808000] absolute left-[32vh]">Now, it's time for you to <br/> try it yourself</p>
                </div>
                <div className="flex absolute -right-64 w-full justify-center font-semibold space-x-4 top-20 text-4xl">
                  <div className="mx-10">
                  <img src={timeryoga} className="h-[66vh] w-[66vh] absolute left-80 ml-48 shadow-lg shadow-green-300 hover:shadow-violet-300 duration-300 ease-in-out -top-11 "/>
                  <CountdownCircleTimer
                  className="hover:dhadow-lg hover:shadow-violet-300 duration-300 ease-in-out"
                  isPlaying
                  duration={60}
                  size={400}
                  onUpdate={(remainingTime) => {
                    setTimer(remainingTime);
                  }
                  }
                  trailColor="#d9d9d9"
                  onComplete={() => {
                    return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
                  }}
                  colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                  colorsTime={[60, 45, 30, 15]}
                  >
                      {({ remainingTime }) => remainingTime}
                  </CountdownCircleTimer>
                  </div>
    </div>
                </Box>
                )}

              <div className="w-[160vh] absolute top-[90vh] left-40 flex justify-between items-center">
              <div className="flex justify-between w-full">
                  <button disabled={activeStep === 0} onClick={handleBack} className="font-semibold border-2 rounded-lg hover:scale-105 duration-300 ease-in-out text-lg hover:shadow-2xl hover:shadow-violet-500 px-2">
                    Back
                  </button>
                  <button onClick={handleNext} disabled={activeStep === 3} className="font-semibold border-2 rounded-lg hover:scale-105 duration-300 ease-in-out text-lg hover:shadow-2xl hover:shadow-violet-500 px-2">
                    Next
                  </button>
              </div>
              </div>
             
                </div>
            </CustomTabPanel>
            </div>
                
                
                </div>
              </div>
            </div>
            <div className="w-full absolute bottom-10 flex justify-center space-x-1">
                <p className="text-xl ">Still not Satisfied? Talk to our experts</p>
                {/* <Link to={'/user/premiumStripePayment'}><p className="text-xl text-red-600 font-bold hover:text-violet-400 duration-300 ease-in-out">HERE</p></Link> */}
                <a href="https://buy.stripe.com/test_6oE7vk0sAen25FK144" className="text-xl text-red-600 font-bold hover:text-violet-400 duration-300 ease-in-out">HERE</a>
              </div>
           
          </div>
        </Box>
          
        <Box>
            {
                user && 
                user?.blogHistory?.map((history, i) => ( 
                    <div className={`${mode === 'light' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...' : 'bg-black'}`}>  
                   <CardElement className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."
                            key={i}
                            id = {history.id}
                            blogTitle = {history.title}
                            description={history.description}
                            category={history.category}
                            location={history.location} 
                    />   
                    </div> 
                // <h3>{history.title}</h3>
                )) 
            }
        </Box> 
      </Box>
      <Footer />
    </>
  );
};

export default UserGraphicGuide;
