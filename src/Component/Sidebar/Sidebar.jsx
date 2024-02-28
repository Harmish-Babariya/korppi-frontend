import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Divider,
  List,
  ListItemText,
  ListItemButton,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Dashboardpage from "../../Pages/Dashboard/DashboardPage";
import Send from "../../Pages/Dashboard/Send/Send";
import Contacts from "../../Pages/Dashboard/Contacts/Contacts";
import Genrate from "../../Pages/Dashboard/Generate";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
import { theme } from "../../Theme/Theme";
import Industry from "../../Admin/industry";
import DashboardIcon from "../../../src/assets/img/dashboard.png";
import Categray from "../../../src/assets/img/category.png";
import SendIcon from "../../../src/assets/img/send.png";
import UserPlas from "../../../src/assets/img/profile-add.png";
import Company from "../../Admin/company";
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, settingsOpen }) => ({
  width: settingsOpen ? `calc(100% - ${drawerWidth}px)` : drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const Sidebar = ({ open, setOpen, show, setShow }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userDatails = useSelector((state) => state.login.userDatails);
  const [admin, setAdmin] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    userDatails && userDatails.isAdmin
      ? setRoutes(adminRoutes) & setAdmin(true)
      : setRoutes(clientRoute) & setAdmin(false);
  }, [userDatails]);
  const clientRoute = [
    {
      name: "Dashboard",
      icon: <img src={DashboardIcon} alt="DashboardIcon" />,
      path: "/dashboard",
      element: <Dashboardpage />,
    },
    {
      name: "Generate",
      icon: <img src={Categray} alt="CategrayIcon" />,
      path: "/dashboard/generate",
      element: <Genrate />,
    },
    {
      name: "Send",
      icon: <img src={SendIcon} alt="SendIcon" />,
      path: "/dashboard/send",
      element: <Send />,
    },
    {
      name: "Contacts",
      icon: <img src={UserPlas} alt="UserPlasIcon" />,
      path: "/dashboard/contacts",
      element: <Contacts />,
    },
  ];
  const adminRoutes = [
    {
      name: "Dashboard",
      icon: <img src={DashboardIcon} alt="DashboardIcon" />,
      path: "/dashboard",
      element: <Dashboardpage />,
    },
    {
      name: "Industry",
      icon: <img src={Categray} alt="CategrayIcon" />,
      path: "/admin/industry",
      element: <Industry />,
    },
    {
      name: "Client",
      icon: <img src={UserPlas} alt="UserPlasIcon" />,
      path: "/admin/client",
      element: <Company />,
    },
  ];
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDashboad = () => {
    navigate("/dashboard");
  };
  const isRouteActive = (path) => {
    return location.pathname === path;
  };
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Drawer
      className="h-100"
      variant="permanent"
      open={open}
      settingsOpen={settingsOpen}
    >
      <DrawerHeader sx={{ color: "#083d38" }}>
        <Typography
          onClick={handleDashboad}
          sx={{
            marginRight: "65px",
            cursor: "pointer",
            fontSize: "25px",
            fontWeight: "bold",
            color: `${theme.palette.primary.main}`,
            letterSpacing: "2px",
          }}
        >
          Korppi
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon
              sx={{ color: `${theme.palette.primary.main}` }}
              className="fs-2"
            />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {open && <span className="ms-4 fw-bold"> Main Menu</span>}

        {routes?.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
              backgroundColor: `${
                isRouteActive(text.path) ? theme.palette.primary.main : ""
              }`,
            }}
          >
            <NavLink
              style={{
                textDecoration: "none",
                color: `${isRouteActive(text.path) ? "#ffff" : "#000000"}`,
              }}
              to={text.path}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  alignContent: "center",
                  px: 2.5,
                }}
                className="mx-auto my-auto"
              >
                <ListItemIcon
                  sx={{
                    filter: `${isRouteActive(text.path) ? "invert(1)" : ""}`,
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    marginLeft: "8px",
                    color: `${
                      isRouteActive(text.path)
                        ? "#ffff"
                        : theme.palette.primary.main
                    }`,
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: open ? 1 : 0,
                    padding: "8px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  primary={text.name}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            display: "",
            marginTop: admin ? "350px" : "290px",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              marginLeft: "8px",
              justifyContent: "center",
              // color: `${theme.palette.primary.main}`,
            }}
          >
            <ExitToAppRoundedIcon className="fs-3" />
          </ListItemIcon>
          <ListItemText
            sx={{
              opacity: open ? 1 : 0,
              padding: "7px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
            primary={"Log Out"}
            onClick={() => handleLogOut()}
          />
        </ListItemButton>
      </List>
      <Divider />
      {/* <List>
        <ListItemButton>
          <NavLink
            to="/contact"
            className="text-decoration-none"
          >
            <ListItemText
              primary="Contact Us"
              sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
            />
          </NavLink>
        </ListItemButton> 
        <ListItemButton>
          <NavLink
            to="/faq"
            className="text-decoration-none"
          >
            <ListItemText
              primary="FAQ"
              sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
            />
          </NavLink>
        </ListItemButton>
      </List> */}
    </Drawer>
  );
};

export default Sidebar;
