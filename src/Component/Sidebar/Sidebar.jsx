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
import { useSelector } from "react-redux";
import { theme } from "../../Theme/Theme";
import Industry from "../../Admin/industry";
import DashboardIcon from "../../../src/assets/img/dashboard.png";
import Categray from "../../../src/assets/img/category.png";
import SendIcon from "../../../src/assets/img/send.png";
import UserPlas from "../../../src/assets/img/profile-add.png";
import FaqIcon from "../../../src/assets/img/FAQ.png";
import PROFILRUSER from "../../../src/assets/img/profileuser.png";
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
      icon: <img src={PROFILRUSER} alt="UserPlasIcon" />,
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
        <ListItem
          disablePadding
          sx={{
            display: "block",
            backgroundColor: `${
              isRouteActive("/dashboard/ContactUsPage")
                ? theme.palette.primary.main
                : ""
            }`,
            marginTop: "140px",
          }}
        >
          <NavLink
            to="/dashboard/ContactUsPage"
            style={{
              textDecoration: "none",
              color: `${
                isRouteActive("/dashboard/ContactUsPage") ? "#ffff" : "#000000"
              }`,
            }}
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
                  filter: `${
                    isRouteActive("/dashboard/ContactUsPage") ? "invert(1)" : ""
                  }`,
                  minWidth: 0,
                  mr: open ? 3 : "",
                  marginLeft: open ? "12px" : "10px",
                  justifyContent: "center",
                }}
              >
                <img
                  src={UserPlas}
                  alt="Contact Icon"
                  style={{ width: "24px", height: "24px" }}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  opacity: open ? 1 : 0,
                  padding: "8px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                primary="Contact Us"
              />
            </ListItemButton>
          </NavLink>
        </ListItem>

        {/* Add ListItem for FAQ Page */}
        <ListItem
          disablePadding
          sx={{
            display: "block",
            backgroundColor: `${
              isRouteActive("/dashboard/FAQ-Page")
                ? theme.palette.primary.main
                : ""
            }`,
          }}
        >
          <NavLink
            to="/dashboard/FAQ-Page"
            style={{
              textDecoration: "none",
              color: `${
                isRouteActive("/dashboard/FAQ-Page") ? "#ffff" : "#000000"
              }`,
            }}
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
                  filter: `${
                    isRouteActive("/dashboard/FAQ-Page") ? "invert(1)" : ""
                  }`,
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  marginLeft: open ? "12px" : "10px",
                  justifyContent: "center",
                }}
              >
                <img
                  src={FaqIcon}
                  alt="FAQ Icon"
                  style={{
                    width: "24px",
                    height: "24px",
                    filter: "opacity(0.7)",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  opacity: open ? 1 : 0,
                  padding: "8px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                primary="FAQ"
              />
            </ListItemButton>
          </NavLink>
        </ListItem>
      </List>
      <List>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            display: "",
            marginTop: admin ? "350px" : "",
          }}
          onClick={handleLogOut}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              marginLeft: "8px",
              justifyContent: "center",
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
          />
        </ListItemButton>
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
