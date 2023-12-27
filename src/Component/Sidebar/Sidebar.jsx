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
import { useLocation, NavLink } from "react-router-dom";

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
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const isRouteActive = (path) => {
    return location.pathname === path;
  };
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Typography
          sx={{
            marginRight: "80px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#B6E696",
          }}
        >
          KORPPI
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon className="fs-2" />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {routes.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "block", fontSize: "50px" }}
            className={isRouteActive(text.path) ? "active" : ""}
            active
          >
            <NavLink
              className={`text-decoration-none text-black `}
              to={text.path}
            >
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
                    justifyContent: "center",
                    marginTop: "20px",
                    color: "#B6E696",
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: open ? 1 : 0,
                    marginTop: "20px",
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
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
