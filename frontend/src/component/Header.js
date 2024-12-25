
import React from 'react'
import jobbg from '../images/jobbg.jpg'
// import SearchInputEl from './searchInputEl'
import matrixVideo from '../images/matrixVideo.mp4'
import back2 from '../images/back2.mp4'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Header = () => {
  const {mode}  = useSelector((state) => state.mode);
  return (
    <div  className={`  relative overflow-clip h-200 ${mode === "light" ? "bg-[#f5f3eb]" : "bg-gray-800"}`}>

        {/* <SearchInputEl/> */}

        <header className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h1 className="text-[#808000] mt-[20px] text-7xl font-bold mb-4 font-sans md:font-serif font-light">Your <i>trusted</i> guide to <br/> mental health & wellness</h1>
        <p className=" text-xl mb-6 font-sans md:font-serif">Start improving your mental health and well-being today. </p>
        {/* <Link to="/learn-more" className="bg-green-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-600">Learn more</Link> */}
        
        <img style={{borderRadius:'200px', height:'400px', maxWidth:'1900px'}} src="https://www.helpguide.org/wp-content/uploads/2023/02/helpguide-1.jpg" alt="Mental Health" className="mt-6  max-w-lg rounded-md shadow-lg" />
      </header>
    </div>
  )
}


export default Header