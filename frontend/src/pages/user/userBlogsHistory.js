import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CardElement from "../../component/cardElement";
import nojobimage from "../../images/nojobimage.png"
import { Tilt } from 'react-tilt'
import yellowbg from "../../images/yellowbg.jpg"
import cloud from "../../images/cloud.png"
import yoga from "../../images/yoga.png"
import { FaForward } from "react-icons/fa";
import Footer from "../../component/Footer";
import { Link } from "react-router-dom";

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          500,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}


const UserBlogHistory = () => {
  const { userInfo : user } = useSelector(state => state.userProfile);
  const {mode} = useSelector(state => (state.mode));
  
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
            <img src={yellowbg} className="object-cover w-full h-[300vh]" />
            <div className="flex absolute left-[14%] font-semibold space-x-4 text-5xl right-[350%] top-20">
              <p className="text-[#8B4513]">Let's </p>
              <p className="text-[#8B4513]">Meditate</p>
            </div>
            <div className="absolute right-80 top-16">
              <img src="https://static.wixstatic.com/media/565794_a1974bdfc6d147c99633f4c435b0cd18~mv2.png/v1/fill/w_313,h_584,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/WShankara%20-%20Mobile%20Wallpaper%20-%20Digital%20Art%207.png" />
            </div>
            <div className="flex absolute left-16 pl-10 font-semibold space-x-4 text-2xl right-[35%] top-40">
              <p className="text-[#8B4513]">Guided meditations to help you manage life’s <br/> more challenging moments.</p>
            </div>
            <div className="flex absolute left-20 pl-6 space-x-4 text-lg right-[35%] top-64">
              <p className="text-[#8B4513]">Guided meditation is a practice where an individual is verbally <br/> guided through a session to achieve relaxation, mindfulness, <br/> and inner peace. It often involves visualization, deep breathing, <br/> and body awareness techniques. </p>
            </div>
            <div className="flex">
              <audio controls className="absolute top-[55vh] w-[74vh] left-20 ml-4" src="//assets.ctfassets.net/v3n26e09qg2r/79Xqbwtxnhvo6kWfJ4VqJk/ff35c4c2dce513b8781a90e1ebf684ca/pack_basics_level_2_s1_20m_en_20140709.mp3"/>
            </div>

            <div className="flex bg-black w-full absolute top-[120vh]">
              <div className="relative w-full">
                <div className="absolute top-0 w-full">
                  <div className="flex absolute right-28 pr-10 font-semibold space-x-4 text-3xl text-justify w-[80vh] ">  
                    <p className="text-[#8B4513]">Explore the CALMness and Essence of Guided Meditation</p>
                  </div>
                  <div className="flex absolute right-28 pr-10 space-x-4 text-lg top-28 w-[80vh]">  
                    <p className="text-[#8B4513] text-justify">Embark on a transformative meditation journey, immersing yourself in serene images and clear directions to guide each breath and movement, fostering deep relaxation and inner connection. 
                    Through visual guidance and precise instructions, allow yourself to seamlessly flow into a state of peace and mindfulness, embracing the essence of meditation in every moment.
                    </p>
                  </div>
                  <div className="absolute -top-44 left-20">
                    <img src={yoga} className="h-[80vh] w-[80vh]" />
                    </div>
                    <div className="absolute right-[50vh] top-[50vh]">
                    <Link to={'/user/graphicGuide'}><button className={`border-2 flex flex-row bg-green-200 px-4 rounded-xl hover:scale-110 duration-300 ease-in-out ${mode === "dark" ? "text-black" : "text-black"}`}>
                      
                        Take a Tour <FaForward className="mt-1.5 ml-2 animate-bounce"/>
                      
                      </button>
                      </Link>
                    </div>

                </div>
              </div>
            </div>

            <div className="flex bg-black w-full absolute top-[210vh]">
              <div className="relative w-full">
                <div className="absolute top-0 w-full">
                  <div className="flex absolute -top-8 left-20 font-semibold space-x-4 text-3xl text-justify w-[80vh] ">  
                    <p className="text-[#8B4513]">Explore the CALMness and Essence of Guided Meditation</p>
                  </div>
                  <div className="flex absolute left-20 space-x-4 text-lg top-24 w-[80vh]">  
                    <p className="text-[#8B4513] text-justify">Unwind and find your center through our captivating video lecture meditations. Let the screen be your gateway to a serene state of mind.
                    Take these video lectures to immerse yourself in calmness and find your inner peace amidst life's chaos. Let each session be a journey to serenity.
                    </p>
                  </div>
                  <div className="absolute right-28 pr-10 -top-52">
                    <img src="https://skyogafoundation.org/assets/images/silence.gif" className="h-[80vh] w-[80vh]" />
                    </div>
                    <div className="absolute left-[42vh] top-[44vh]">
                    <Link to={'/user/graphicGuideVideo'}><button className="border-2 flex bg-green-200 px-3 rounded-xl hover:scale-110 duration-300 ease-in-out">
                        Take a Tour <FaForward className="mt-1.5 ml-2 animate-bounce"/>
                      </button>
                      </Link>
                    </div>

                </div>
              </div>
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

export default UserBlogHistory;
