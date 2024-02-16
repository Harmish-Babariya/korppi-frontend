import React, { useEffect, useState } from "react";
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
import Dashboardpage from "../../Pages/Dashboard/DashboardPage";
import Send from "../../Pages/Dashboard/Send/Send";
import Contacts from "../../Pages/Dashboard/Contacts/Contacts";
import Genrate from "../../Pages/Dashboard/Generate";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { theme } from "../../Theme/Theme";
import Industry from "../../Admin/industry";
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
  const userDatails = useSelector((state) => state.login.userDatails); 
  const [admin, setAdmin] = useState(false);
  const [routes, setRoutes] = useState([
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
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
  ]);
  useEffect(() => {
    location.pathname.includes("admin")
      ? setRoutes(adminRoutes) & setAdmin(true)
      : null;
  }, []);
  const adminRoutes = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
      element: <Dashboardpage />,
    },
    {
      name: "Industry",
      icon: <OutboxIcon />,
      path: "/admin/industry",
      element: <Industry />,
    },
    {
      name: "Client",
      icon: <MailIcon />,
      path: "/admin/client",
      element: <Company />,
    },
  ];
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
      <DrawerHeader sx={{ color: "#083d38" }}>
        <Typography
          sx={{
            marginRight: "65px",
            fontSize: "25px",
            fontWeight: "bold",
            color: `${theme.palette.primary.main}`,
            letterSpacing: "2px",
          }}
        >
          KORPPI
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
        {routes?.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "block" }}
            className={isRouteActive(text.path) ? "bg-dark-subtle " : ""}
          >
            <NavLink
              className={({ isActive }) =>
                `text-decoration-none ${
                  isActive ? "text-black fw-bold" : "text-black "
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
                    color: `${theme.palette.primary.main}`,
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
            marginTop: admin ? "370px" : "310px",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              marginLeft: "8px",
              justifyContent: "center",
              color: `${theme.palette.primary.main}`,
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
