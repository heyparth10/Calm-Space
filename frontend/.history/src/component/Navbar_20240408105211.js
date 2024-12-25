
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from 'react-redux';
import { userLogOutAction } from "../Redux/actions/userAction";
import { toggleActionTheme } from "../Redux/actions/themeAction";
import { DarkMode, LightMode} from '@mui/icons-material';
import logo2 from './logo2.png';

const pages = ["HOME", "Mental Health", "Health & Wellness", "Children and family"];
const settings = ["Dashboard", "Login", "Logout"];

const Navbar = () => {
  //show / hide Login Button
  const { userInfo } = useSelector(state => state.signIn);
  const {mode} = useSelector((state) => state.mode);
  const user = useSelector(state => state.userProfile.userInfo);

  const dispatch = useDispatch(); //triggers the action
  const navigate = useNavigate();
  // const { palette } = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //log out user
  const logOutUser = () => {
     dispatch(userLogOutAction());
     window.location.reload(true);
     setTimeout(() => {
       navigate('/');
     }, 500)
  }

  return (
    <div position="static" 
    // sx={{ bgcolor : palette.primary.main }}
    className={`${mode === 'dark' ? 'bg-gray-900' : 'bg-[#fffefc]'}`}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex", color:"gray" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "gray",
              textDecoration: "none",
            }}
          >
            CalmState
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography  textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            CALM SPACE
          </Typography>
          <img src={logo2} alt="logo" className="h-10 w-60 absolute -left-10 top-3 z-40 text-white" />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", justifyContent:'right', backgroundColor:"[#fffefc]"} }}>
            <button
              className="hover:scale-110 text-[19px] ease-in-out duration-300 rounded-md p-2"
              onClick={handleCloseNavMenu}
              // sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to="/" className={`${mode === 'dark' ? "text-white" : "text-white"}, font-sans md:font-serif`} 
              // style={{ color: "white", textDecoration: "none" }}
              >
                Home
              </Link>
            </button>
            <button
              className="hover:scale-110 text-[19px] ease-in-out duration-300 rounded-md p-2"
              onClick={handleCloseNavMenu}
               sx={{ marginLeft:'50px'}}
            >
              <Link to="/" className={`${mode === 'dark' ? "text-white" : "text-white"}, font-sans md:font-serif`} 
              // style={{ color: "white", textDecoration: "none" }}
              >
                Health & wellness
              </Link>
            </button>
            <button
              className="hover:scale-110 text-[19px] ease-in-out duration-300 rounded-md p-2"
              onClick={handleCloseNavMenu}
              // sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to="/" className={`${mode === 'dark' ? "text-white" : "text-white"}, font-sans md:font-serif`} 
              // style={{ color: "white", textDecoration: "none" }}
              >
                Mental Health
              </Link>
            </button>
            <button
              className="hover:scale-110 text-[19px] ease-in-out duration-300 rounded-md p-2"
              onClick={handleCloseNavMenu}
              // sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to="/" className={`${mode === 'dark' ? "text-white" : "text-white"}, font-sans md:font-serif`} 
              // style={{ color: "white", textDecoration: "none" }}
              >
                Meditation
              </Link>
            </button>
            { !userInfo && 
            <button
              className="hover:scale-110 text-[19px] ease-in-out duration-300 rounded-md p-2"
              onClick={handleCloseNavMenu}
              // sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to="/register" className={`${mode === 'dark' ? "text-white" : "text-white"}, font-sans md:font-serif`} 
              // style={{ color: "white", textDecoration: "none" }}
              >
                Register
              </Link>
            </button>
            }
          </Box>

          {/* toggle dark theme */}
          <IconButton sx={{ mr: 4 }} onClick={() => dispatch(toggleActionTheme())}>
                        {mode === "dark" ? (
                            <DarkMode sx={{ color: "#ffffff", fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: "black", fontSize: "25px" }} />
                        )}
                    </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >{userInfo && userInfo.role === 1 && mode === "dark" ?
                            <MenuItem onClick={handleCloseUserMenu}>
                                <div textAlign="center"><Link style={{ textDecoration: "none", color: "whitesmoke" }} to="/admin/dashboard">Admin Dashboard</Link></div>
                                </MenuItem> 
                                : userInfo && userInfo.role === 1 && mode === "light" ?
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <div textAlign="center"><Link style={{ textDecoration: "none", color: "dark" }} to="/admin/dashboard">Admin Dashboard</Link></div>
                                    </MenuItem> 
                                    : userInfo && userInfo.role === 0 && mode === "dark" ?
                                <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none", color: "whitesmoke" }} to="/user/dashboard">User Dashboard</Link></Typography>
                            </MenuItem> : 
                                userInfo && userInfo.role === 0 && mode === "light" ?
                                <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none", color: "black" }} to="/user/dashboard">User Dashboard</Link></Typography>
                                </MenuItem>
                            : userInfo && userInfo.role === 2 && mode === "dark"?
                                <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none", color: "whitesmoke" }} to="/creator/dashboard">Creator Dashboard</Link></Typography>
                            </MenuItem> : 
                            userInfo && userInfo.role === 2 && mode === "light" ?
                            <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center"><Link style={{ textDecoration: "none", color: "black" }} to="/creator/dashboard">Creator Dashboard</Link></Typography>
                          </MenuItem>
                            :<></>
}

                            {
                                !userInfo && mode === "dark" ? 
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none", color: "whitesmoke" }} to="/login">Log In</Link></Typography>
                            </MenuItem>
                                          :
                                          !userInfo && mode === "light" ? 
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none", color: "black" }} to="/login">Log In</Link></Typography>
                            </MenuItem>
                                          : ( mode === "dark" ?
                            <MenuItem onClick={logOutUser}>
                                <Typography style={{ textDecoration: "none", color: "whitesmoke" }} textAlign="center">Log Out</Typography>
                            </MenuItem> : mode === "light" ?
                            <MenuItem onClick={logOutUser}>
                              <Typography style={{ textDecoration: "none", color: "black" }} textAlign="center">Log Out</Typography>
                            </MenuItem> : <></>
                                          )
}
                                { mode === "dark" ? 
                                <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none", color: "whitesmoke" }} to="/about">About</Link></Typography>
                            </MenuItem>
                             :
                             <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none", color: "black" }} to="/about">About</Link></Typography>
                            </MenuItem>
}
                            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </div>
  );
  }
export default Navbar;

