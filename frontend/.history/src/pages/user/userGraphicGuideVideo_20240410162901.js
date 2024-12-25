import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CardElement from "../../component/cardElement";
import nojobimage from "../../images/nojobimage.png";
import { Tilt } from "react-tilt";
import yellowbg from "../../images/yellowbg.jpg";
import greenbg from "../../images/greenbg.jpg";
import cloud from "../../images/cloud.png";
import yoga from "../../images/yoga.png";
import bird from "../../images/bird2.gif";
import breathe from "../../images/breathe.gif";
import breathe2 from "../../images/breathe2.gif";
import breathe3 from "../../images/breathe3.gif";
import timeryoga from "../../images/timeryoga.png";
import { FaForward } from "react-icons/fa";
import Footer from "../../component/Footer";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ReactPlayer from "react-player";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Tab from "@mui/material/Tab";
import { updateVideoProgressAction } from "../../Redux/actions/userAction";
import CircularDeterminate, {
  CircularProgressWithLabel,
} from "./circularProgress";
import CircularWithValueLabel from "./circularProgress";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import { PieChart } from "@mui/x-charts/PieChart";

const defaultOptions = {
  reverse: true, // reverse the tilt direction
  max: 10, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 100, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const UserGraphicGuideVideo = () => {
  const { userInfo: user } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);

  const [timer, setTimer] = useState(60); // Timer starts at 60 seconds
  const [isActive, setIsActive] = useState(false); // State to track if timer is active

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [progress, setProgress] = useState(0);

  const [videoUrls, setVideoUrls] = useState([
    "https://www.youtube.com/watch?v=xv-ejEOogaA",
    "https://www.youtube.com/watch?v=inpok4MKVLM",
    "https://www.youtube.com/watch?v=JEoxUG898qY",
    // 'https://www.youtube.com/watch?v=m3-O7gPsQK0',
  ]);

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

  // useEffect(() => {
  //   // Update video progress when the component unmounts
  //   return () => {
  //     updateProgress();
  //   };
  // }, []);

  // Calculate progress percentage
  useEffect(() => {
    // Count the number of completed videos
    const completedVideosCount =
      user?.videoHistory?.filter((video) => video.isCompleted).length || 0;
    // Calculate progress percentage
    const newProgress = (completedVideosCount / videoUrls.length) * 100;
    console.log(
      completedVideosCount,
      videoUrls.length,
      newProgress,
      user,
      "qweqweqweqweqweqwe"
    );
    setProgress(newProgress);
    console.log(progress);
  }, [user?.videoProgress, videoUrls.length, user]);

  const handleVideoProgress = (url) => {
    // Dispatch action to update video progress when a video is watched
    const isCompleted = true;
    dispatch(updateVideoProgressAction(url, isCompleted, user._id));
  };

  useEffect(() => {
    let interval;

    // Start the timer when isActive becomes true
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1); // Decrement the timer by 1 every second
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

  //tilt
  const styles = {
    card: {
      innerWidth: "full",
      innerHeight: "full",
      outerWidth: "full",
      outerHeight: "full",
      transition: "transform 3s",
    },
  };

  console.log(user);
  console.log(user?.blogHistory.length);
  console.log(user?.blogHistory?.length);
  return (
    <>
      <Box>
        <Box>
          <div className="w-[205vh] relative overflow-clip">
            <img
              src={cloud}
              className="absolute -left-10 top-[68vh] h-32 w-64"
            />
            <img src={cloud} className="absolute -right-10 top-5 h-32 w-64" />
            <img src={greenbg} className="object-cover w-full h-[240vh]" />
            <div className="flex absolute font-semibold space-x-4 text-5xl right-[36%] top-20">
              <p className="text-[#8B4513]">
                Choose from a series of Video Exercises{" "}
              </p>
            </div>
            <div className="absolute right-0 top-2">
              <img src={bird} className="h-[90vh] w-[90vh]" />
            </div>
            <div className="flex absolute left-16 pl-10 font-semibold space-x-4 text-2xl right-[35%] top-40">
              <p className="text-[#8B4513]">
                Guided meditations to help you manage life’s <br /> more
                challenging moments.
              </p>
            </div>
            <div className="flex absolute left-20 pl-6 space-x-4 text-lg right-[35%] top-64 w-[86vh] text-justify">
              <p className="text-[#8B4513]">
                Select from our range of tailored exercises designed to
                alleviate anxiety, offering a pathway to tranquility and
                emotional balance. Rediscover joy and vitality with exercises
                crafted to combat depression, guiding you towards a brighter
                outlook on life. Conquer sleeplessness with our specialized
                exercises, promoting deep relaxation and rejuvenating rest for a
                refreshed mind and body.
              </p>
            </div>

            <div className="flex bg-black w-full absolute top-[140vh]">
              <div className="relative w-full">
                <div className="absolute top-0 w-full">
                  <div>
                    <Stepper activeStep={activeStep} className="pt-10 mx-40">
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
                          <div className="border-2 shadow-xl shadow-green-300 rounded-lg w-[52vh] mt-[140vh]">
                            <ReactPlayer
                              url={videoUrls[0]}
                              playing="true"
                              light={
                                <img
                                  src="https://puffy.com/cdn/shop/articles/how-to-meditate-3_1024x.jpg?v=1639635327"
                                  alt="Thumbnail"
                                />
                              }
                              controls="true"
                              width="40%"
                              height="40%"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "60vh",
                                height: "60vh",
                              }}
                              className="h-[30vh] w-[30vh]"
                              onProgress={() =>
                                handleVideoProgress(videoUrls[0])
                              }
                            />
                          </div>
                          <div className="flex left-16 w-full justify-center pl-10 font-semibold space-x-4 right-24 text-4xl ">
                            <p className="text-[#808000] absolute right-[34vh]">
                              Benefits of Meditation
                            </p>
                            {/* <p>Progress: {progress}%</p> */}
                          </div>
                        </div>
                        <div className="flex absolute w-full justify-center pl-10 space-x-4 right-24 text-lg top-32">
                          <p className="text-green-800 absolute right-0 w-[62vh] text-justify ">
                            Meditation offers a profound sense of calmness,
                            reducing stress and anxiety levels while fostering
                            mental clarity and emotional resilience. By
                            cultivating mindfulness, meditation enhances overall
                            well-being, promoting better focus, sleep quality,
                            and inner peace. Regular meditation practice can
                            also improve attention span and cognitive function,
                            enhancing productivity and creativity in daily life.
                            Moreover, it fosters a deeper connection with
                            oneself and promotes a greater sense of compassion
                            towards others.
                          </p>
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
                          <div className="border-2 shadow-xl shadow-green-300 rounded-lg w-[52vh] mt-[140vh]">
                            <ReactPlayer
                              url={videoUrls[1]}
                              playing="true"
                              light={
                                <img
                                  src="https://manhattanmentalhealthcounseling.com/wp-content/uploads/2019/07/4-Meditation-Techniques-that-Can-Improve-Awareness-and-Mental-Health-1024x656.jpeg"
                                  alt="Thumbnail"
                                />
                              }
                              controls="true"
                              width="40%"
                              height="40%"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "60vh",
                                height: "60vh",
                              }}
                              className="h-[30vh] w-[30vh]"
                              onProgress={() =>
                                handleVideoProgress(videoUrls[1])
                              }
                            />
                          </div>
                          <div className="flex left-16 w-full justify-center pl-10 font-semibold space-x-4 right-24 text-4xl ">
                            <p className="text-[#808000] absolute right-[34vh]">
                              Breathing Exercise 2
                            </p>
                          </div>
                        </div>
                        <div className="flex absolute w-full justify-center pl-10 space-x-4 right-24 text-lg top-32">
                          <p className="text-green-800 absolute right-0 w-[62vh] text-justify ">
                            Meditation offers a profound sense of calmness,
                            reducing stress and anxiety levels while fostering
                            mental clarity and emotional resilience. By
                            cultivating mindfulness, meditation enhances overall
                            well-being, promoting better focus, sleep quality,
                            and inner peace. Regular meditation practice can
                            also improve attention span and cognitive function,
                            enhancing productivity and creativity in daily life.
                            Moreover, it fosters a deeper connection with
                            oneself and promotes a greater sense of compassion
                            towards others.
                          </p>
                        </div>
                      </Box>
                    ) : activeStep === 2 ? ( //Experience
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
                          <div className="border-2 shadow-xl shadow-green-300 rounded-lg w-[52vh] mt-[140vh]">
                            <ReactPlayer
                              url={videoUrls[2]}
                              playing="true"
                              light={
                                <img
                                  src="https://cdn.tinybuddha.com/wp-content/uploads/2016/01/Man-Meditating.jpg"
                                  alt="Thumbnail"
                                />
                              }
                              controls="true"
                              width="40%"
                              height="40%"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "60vh",
                                height: "60vh",
                              }}
                              className="h-[30vh] w-[30vh]"
                              onProgress={() =>
                                handleVideoProgress(videoUrls[2])
                              }
                            />
                          </div>
                          <div className="flex left-16 w-full justify-center pl-10 font-semibold space-x-4 right-24 text-4xl ">
                            <p className="text-[#808000] absolute right-[34vh]">
                              Breathing Exercise 3
                            </p>
                          </div>
                        </div>
                        <div className="flex absolute w-full justify-center pl-10 space-x-4 right-24 text-lg top-32">
                          <p className="text-green-800 absolute right-0 w-[62vh] text-justify ">
                            Meditation offers a profound sense of calmness,
                            reducing stress and anxiety levels while fostering
                            mental clarity and emotional resilience. By
                            cultivating mindfulness, meditation enhances overall
                            well-being, promoting better focus, sleep quality,
                            and inner peace. Regular meditation practice can
                            also improve attention span and cognitive function,
                            enhancing productivity and creativity in daily life.
                            Moreover, it fosters a deeper connection with
                            oneself and promotes a greater sense of compassion
                            towards others.
                          </p>
                        </div>
                      </Box>
                    ) : (
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
                          <p className="text-[#808000] absolute left-[20vh]">
                            Now, Relax and Meditate <br />
                            for 60 seconds
                          </p>
                        </div>
                        {/* <div className="flex left-16 w-full justify-center font-semibold space-x-4 right-24 text-4xl mt-32">
                  <h1 className="text-[#808000] absolute right-[84vh]">{timer}</h1>
                  { isActive ? <button onClick={() => setIsActive(false)} className="text-[#808000] absolute right-[84vh] mt-10">Stop Timer</button> : // If the timer is active, show the "Stop Timer" button
                  <button onClick={handleIconClick} className="text-[#808000] absolute right-[84vh] mt-10">Start Timer</button> 
                  }
    </div> */}
                        <div className="flex absolute -right-64 w-full justify-center font-semibold space-x-4 top-20 text-4xl">
                          <div className="mx-10">
                            <img
                              src={timeryoga}
                              className="h-[66vh] w-[68vh] absolute left-80 ml-56 shadow-lg shadow-green-300 hover:shadow-violet-300 duration-300 ease-in-out -top-11 "
                            />
                            <CountdownCircleTimer
                              className="hover:dhadow-lg hover:shadow-violet-300 duration-300 ease-in-out"
                              isPlaying
                              duration={60}
                              size={430}
                              onUpdate={(remainingTime) => {
                                setTimer(remainingTime);
                              }}
                              trailColor="#d9d9d9"
                              onComplete={() => {
                                return { shouldRepeat: true, delay: 1.5 }; // repeat animation in 1.5 seconds
                              }}
                              colors={[
                                "#004777",
                                "#F7B801",
                                "#A30000",
                                "#A30000",
                              ]}
                              colorsTime={[60, 45, 30, 15]}
                            >
                              {({ remainingTime }) => remainingTime}
                            </CountdownCircleTimer>
                          </div>
                        </div>
                      </Box>
                    )}

                    <div className="w-[160vh] absolute top-[84vh] left-40 flex justify-between items-center">
                      <div className="flex justify-between w-full">
                        <button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className="font-semibold border-2 rounded-lg hover:scale-105 duration-300 ease-in-out text-lg hover:shadow-2xl hover:shadow-violet-500 px-2"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={activeStep === 3}
                          className="font-semibold border-2 rounded-lg hover:scale-105 duration-300 ease-in-out text-lg hover:shadow-2xl hover:shadow-violet-500 px-2"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></Box>
        <div>
          <div className="flex justify-center items-center absolute top-[100vh]">
            <div className="relative">
              <card className="w-[180vh] h-[40vh] p-4 rounded-lg absolute left-24 bg-gradient-to-l from-[#174138] to-[#00bf8f]">
                {/* <Tilt options={defaultOptions}> */}
                  <card className="hover:shadow-lg hover:shadow-violet-300 hover:scale-105 duration-300 ease-in-out w-[60vh] h-[36vh] absolute left-4 z-20 rounded-lg bg-gradient-to-r from-[#174138] to-[#00bf8f]">
                    <div className="relative">
                      <div className="flex absolute top-[38%] left-[10%]">
                        <p className="text-white">PROGRESS</p>
                      </div>
                      <div className="flex justify-center items-center h-[23vh] scale-150">
                        <div className="scale-150">
                          <div className="scale-150">
                            <p className="absolute top-0 opacity-0">
                              {progress}
                            </p>
                            <CircularWithValueLabel value={100} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </card>
                {/* </Tilt> */}
                <card className="hover:shadow-lg hover:shadow-violet-300 hover:scale-105 duration-300 ease-in-out w-[60vh] h-[36vh] absolute left-[64vh] z-20 rounded-lg bg-gradient-to-r from-[#174138] to-[#00bf8f]">
              <div className="absolute left-[50% z-50 w-[60vh] h-[40vh]"> 
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 5, label: "series A" },
                        { id: 1, value: 5, label: "series B" },
                        { id: 2, value: 10, label: "series C" },
                        { id: 3, value: 15, label: "series D" },
                        { id: 4, value: 30, label: "series E" },
                      ],
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      endAngle: 180,
                      cx: 150,
                      cy: 150,
                    },
                  ]}
                />
              </div>
              </card>
              </card>
            </div>
          </div>
        </div>

        <Box>
          {user &&
            user?.blogHistory?.map((history, i) => (
              <div
                className={`${
                  mode === "light"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."
                    : "bg-black"
                }`}
              >
                <CardElement
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."
                  key={i}
                  id={history.id}
                  blogTitle={history.title}
                  description={history.description}
                  category={history.category}
                  location={history.location}
                />
              </div>
              // <h3>{history.title}</h3>
            ))}
        </Box>
        <div className="w-full absolute top-[240vh] flex justify-center space-x-1">
                <p className="text-xl ">Still not Satisfied? Talk to our experts</p>
                {/* <Link to={'/user/premiumStripePayment'}><p className="text-xl text-red-600 font-bold hover:text-violet-400 duration-300 ease-in-out">HERE</p></Link> */}
                <a href="https://buy.stripe.com/test_6oE7vk0sAen25FK144" className="text-xl text-red-600 font-bold hover:text-violet-400 duration-300 ease-in-out">HERE</a>
                </div>
                <div className="w-full absolute top-[240vh] flex justify-center space-x-1">
                <a href="http://localhost:3001/" className="text-xl text-red-600 font-bold hover:text-violet-400 duration-300 ease-in-out">Take Live Guidance from Experts</a>
                </div>


      </Box>
      <Footer />
    </>
  );
};

export default UserGraphicGuideVideo;
