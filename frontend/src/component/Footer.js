
import { Box } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter'
import { YouTube } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Footer = () => {
    const {mode} = useSelector((state) => state.mode);
    // const { palette } = useTheme();
    return (
        <>
            {/* <Box 
            className = {bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black h-[70px] flex justify-center items-center w-full}
            // sx={{ height: '70px', bgcolor: palette.secondary.midNightBlue, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                <p className='text-white'>© 2021 Job Portal. All rights reserved.</p>
            </Box> */}

<footer className='bg-[#012f2c]'> 
      <div style={{paddingLeft:'130px' ,paddingRight:'130px'}} className={`container w-[300vh] mx-auto px-4 py-8 grid grid-cols-2 font-sans md:font-serif md:grid-cols-4 gap-2 bg-[#012f2c] ${mode === 'dark' ? 'text-white' : "text-white"}`}>
        <div>
          <h2 className="font-bold text-xl mb-3">About Us</h2>
          <ul>
            <li className="mb-1"><a href="/team" className="hover:text-gray-300">Meet Our Team</a></li>
            {/* <li className="mb-1"><a href="/story" className="hover:text-gray-300">Our Story</a></li>
            <li className="mb-1"><a href="/council" className="hover:text-gray-300">Advisory Council</a></li> */}
            <li >
            <FacebookIcon sx={{marginRight:'5px'}} />
            <TwitterIcon sx={{marginRight:'5px'}} />
            <InstagramIcon sx={{marginRight:'5px'}} />
            <YouTube sx={{marginRight:'5px'}} />
            <PinterestIcon sx={{marginRight:'5px'}} />
            <LinkedInIcon />
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-3">Resources</h2>
          <ul>
            <li className="mb-1"><a href="/harvard-health" className="hover:text-gray-300">Health Blogs</a></li>
            <li className="mb-1"><a href="/meditation" className="hover:text-gray-300">Meditation</a></li>
            <li className="mb-1"><a href="/newsletter" className="hover:text-gray-300">Newsletter</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-3">Get In Touch</h2>
          <ul>
            <li className="mb-1"><a href="/contact" className="hover:text-gray-300">Contact Us</a></li>
            <li className="mb-1">IET Davv</li>
            <li>Los Angeles CA 90071</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-3">Join Our Newsletter</h2>
          <form action="#">
            <input type="email" placeholder="Email Address" className="px-3 py-2 mb-2 w-full" />
            <button type="submit" className="px-6 py-2 bg-green-600 hover:bg-green-700 w-full">Sign Up</button>
          </form>
          <hr style={{marginTop:'5px'}}/>
          <h2 className="font-bold text-xl mb-3 mt-4">Mental Health Helplines</h2>
          <p>Are you or someone you know in crisis? Find helplines and other resources around the world.</p>
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 mt-2">Get Help</button>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center bg-[#012f2c] text-white">
        <span>&copy; {new Date().getFullYear()} Calm Space. All rights reserved.</span>
      </div>
    </footer>
        </>
    )
}


export default Footer