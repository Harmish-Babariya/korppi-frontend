import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar/Sidebar";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink, useLocation,useNavigate } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
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

const cardroute = (
  <>
    <CardContent className="h-100  p-2 ">
      <Typography sx={{ fontSize: 20 }} color="text.secondary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
        cumque a ullam quia debitis dignissimos ea sequi minus perspiciatis
        molestias, nemo nobis, eos animi. Ipsum soluta quis praesentium quasi
        explicabo lotem bdsjdbfjbkjdbfkjbdshbfdshbhbkdbkbfkdbk kd sdbch b nk
        cjbisndnc heeeeeeeeeeeeeeeeeeeees
      </Typography>
    </CardContent>
  </>
);

const Navbar = () => {
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [path, setPath] = useState([]);
  const location = useLocation();
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
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
  console.log(prop)
prop === "Profile" ? navigate("/dashboard/profile"):""
prop === "Logout" ? navigate("/login"):""
prop === "Dashboard" ? navigate("/dashboard/dashboardpage"):""

}
  return (
    <div>
      <Box sx={{ display: "flex", p: 0, mr: 0 }}>
        <AppBar
          position="fixed"
          open={open}
          sx={{ backgroundColor: "#B6E696" }}
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
              <MenuIcon className="fs-3" />
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
                },
              }}
            >
              {open ? "" : "KORPPI"}
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ marginLeft: "auto" }}>
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
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={()=>handleUser(setting)}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Sidebar open={open} setOpen={setOpen} />
        <div className="w-100  m-3 mt-5">
          <div
            style={{ marginTop: "3%" }}
            className="w-100 h-auto card rounded-2 shadow "
          >
            <nav aria-label="breadcrumb ">
              <ol className="d-flex justify-content-start align-content-center  breadcrumb">
                <li className="px-2 mt-2 breadcrumb-item">
                  <HomeIcon className="text-secondary fs-3" />
                </li>
                {path.map((item, index) => (
                  <li key={index} className="breadcrumb-item mt-2 ">
                    <NavLink
                      to={`/dashboard/${item}`}
                      className="text-decoration-none text-black fw-bold breadcrumb-item-color"
                       >
                      {item}
                    </NavLink>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

  <Dashboard/>
        </div>
      </Box>
    </div>
  );
};

export default Navbar;
