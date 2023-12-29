import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import DashboardIcon from "@mui/icons-material/Dashboard";
import OutboxIcon from "@mui/icons-material/Outbox";
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
import Dashboardpage from "../../Pages/Dashboard/Dashboardpage/Dashboardpage";
import Send from "../../Pages/Dashboard/Send/Send";
import Contacts from "../../Pages/Dashboard/Contacts/Contacts";
import Genrate from "../../Pages/Dashboard/Genrate/Genrate";
import SettingsIcon from "@mui/icons-material/Settings";
import Settings from "../../Pages/Dashboard/Settings/Settings";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

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
})(({ theme, open }) => ({
  width: drawerWidth,
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
const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const routes = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard/dashboardpage",
      element: <Dashboardpage />,
    },
    {
      name: "Generate",
      icon: <MailIcon />,
      path: "/dashboard/generate",
      element: <Genrate />,
    },
    {
      name: "Send",
      icon: <OutboxIcon />,
      path: "/dashboard/send",
      element: <Send />,
    },
    {
      name: "Contacts",
      icon: <ContactPageIcon />,
      path: "/dashboard/contacts",
      element: <Contacts />,
    },
  ];
  const settings = {
    name: "Settings",
    icon: <SettingsIcon />,
    path: "/dashboard/settings",
    element: <Settings className="fs-1" />,
  };
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const isRouteActive = (path) => {
    return location.pathname === path;
  };
  const handleLogOut = () => {
    navigate("/login");
  };
  return (
    <Drawer className="h-100" variant="permanent" open={open}>
      <DrawerHeader sx={{ backgroundColor: "#81ACA8", color: "white" }}>
        <Typography
          sx={{
            marginRight: "65px",
            fontSize: "25px",
            fontWeight: "bold",
            color: "white",
            letterSpacing:"2px"

          }}
        >
          KORPPI
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon sx={{ color: "white" }} className="fs-2" />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {routes.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "block" }}
            className={isRouteActive(text.path) ? "bg-dark-subtle " : ""}
          >
            <NavLink
              className={({ isActive }) =>
                `text-decoration-none ${
                  isActive ? "text-success fw-bold" : "text-black "
                } `
              }
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
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    marginLeft: "8px",
                    color: "#81ACA8",
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
          key={settings.name}
          sx={{ display: "block", marginTop: "250px" }}
          className={isRouteActive(settings.path) ? "bg-dark-subtle" : ""}
          active
        >
          <NavLink
            className={({ isActive }) =>
              `text-decoration-none ${
                isActive ? "fs-2 fw-bolder text-black" : "text-black"
              } `
            }
            to={settings.path}
          >
            <ListItemButton
              sx={{
                minHeight: 0,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  marginLeft: "8px",
                  justifyContent: "center",
                  color: "#81ACA8",
                }}
              >
                {settings.icon}
              </ListItemIcon>
              <ListItemText
                sx={{
                  opacity: open ? 1 : 0,
                  padding: "8px",

                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                primary={settings.name}
              />
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              marginLeft: "8px",
              justifyContent: "center",
              color: "#81ACA8",
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
    </Drawer>
  );
};

export default Sidebar;
