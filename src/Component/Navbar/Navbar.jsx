import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar/Sidebar";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { ListItemIcon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import Settings from "../CompanySettings/Settings";
import { theme } from "../../Theme/Theme";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = (props) => {
  const settings = [
    {
      name: "Profile",
      icon: <PersonIcon />,
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
    },
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "Logout",
      icon: <ExitToAppRoundedIcon />,
    },
  ];
  const [path, setPath] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const location = useLocation();
  const navigate = useNavigate();

  const { open, setOpen } = props;
  const [anchorElUser, setAnchorElUser] = useState(null);
  useEffect(() => {
    setPath(location.pathname.split("/").slice(2));
  }, [location.pathname]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleUser = (prop) => {
    prop === "Profile" ? navigate("/dashboard/profile") : "";
    prop === "Logout" ? navigate("/login") : "";
    prop === "Dashboard" ? navigate("/dashboard") : "";
  };
  return (
    <div>
      <Box sx={{ display: "flex", p: 0, mr: 0 }}>
        <AppBar
          position="fixed"
          open={open}
          sx={{ backgroundColor: "#ffffff" }}
          color="secondary"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon
                style={{ color: `${theme.palette.primary.main}` }}
                className="fs-3"
              />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                  fontSize: "25px",
                  fontWeight: "bold",
                  marginLeft: "-22px",
                  letterSpacing: "2px",
                  color: `${theme.palette.primary.main}`,
                },
              }}
            >
              {open ? "" : "KORPPI"}
            </Typography>
            <Search
              style={{ color: `${theme.palette.primary.main}` }}
              className="bg-body-tertiary"
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ marginLeft: "auto" }}>
              <Link onClick={handleShow}>
                <SettingsIcon className="me-2 fs-3 text-secondary" />
              </Link>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Korppi" src="/static/images/avatar/2.jpg" />
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
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        color: "#083d38",
                      }}
                    >
                      {setting.icon}
                    </ListItemIcon>
                    <Typography
                      textAlign="center"
                      onClick={() => handleUser(setting.name)}
                    >
                      {setting.name}
                    </Typography>
                    <hr />
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {show ? <Settings show={show} setShow={setShow} /> : ""}
    </div>
  );
};

export default Navbar;
