import React, { useState } from "react";
import {
    Typography,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    useTheme,
    AppBar,
    Toolbar,
    Avatar,
} from "@mui/material";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Notes from "../Pages/Notes";
import Create from "../Pages/Create";

import { firebase } from "../../firbaseConfig";

//  CSS
const drawerWidth = 240;

const classes = (theme) => {
    theme = useTheme();
    return {
        page: {
            backgroundColor: "#f9f9f9",
            width: "100%",
            padding: theme.spacing(3),
        },
        drawer: {
            width: drawerWidth,
            "& .MuiDrawer-paper": {
                width: drawerWidth,
            },
        },
        root: {
            display: "flex",
        },
        title: {
            padding: theme.spacing(2),
        },

        toolbar: theme.mixins.toolbar,
    };
};

const Layout = () => {
    // react hooks

    const [path, setPath] = useState("/Create");
    const [drawerState, setDrawerState] = useState(false);

    // firebase

    const { logOut, currentUser } = firebase();

    // assets for mapimg

    const menuItems = [
        {
            text: "My notes",
            icon: <SubjectOutlined color="secondary" />,
            path: "/Notes",
        },
        {
            text: "Create Notes",
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: "/Create",
        },
    ];

    const appbar = {
        width: "100%",
    };
    //  event handlers

    // console.log(currentUser.uid)

    const [, mm, dd, yy] = Date().split(" ");
    const { page, drawer, root, title, toolbar } = classes();

    function toggleDrawer(anchor, isDrawerOpen) {
        setDrawerState(isDrawerOpen);
    }

    return (
        <div style={root}>
            {/* app bar */}
            <AppBar position="fixed" sx={appbar} elevation={0} color={"secondary"}>
                <Toolbar>
                    <MenuOutlinedIcon
                        onClick={() => setDrawerState(true)}
                        sx={{ marginRight: "20px" }}
                    />
                    <Typography
                        // variant="h6"
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        {`Today is ${dd} of ${mm} ${yy}`}
                    </Typography>

                    <Typography>blacky</Typography>
                    <Avatar src="/vite.svg" sx={{ padding: "20px" }} />
                </Toolbar>
            </AppBar>
            {/* side drawer */}
            <SwipeableDrawer
                open={drawerState}
                sx={drawer}
                anchor="left"
                onClose={() => toggleDrawer("left", false)}
                onOpen={() => toggleDrawer("left", true)}
            >
                <div>
                    <Typography variant="h5" sx={title}>
                        Blacksheep's Notes
                    </Typography>
                </div>

                {/* list / links */}
                <List>
                    {menuItems.map((item) => (
                        <ListItem button key={item.text} onClick={() => setPath(item.path)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}

                    <ListItem button onClick={() => logOut()}>
                        <ListItemIcon>
                            <HomeOutlinedIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={"Logout"} />
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <div style={page}>
                <Toolbar />
                <div
                    style={{
                        paddingTop: "40px",
                        maxWidth: '100%'
                    }}
                >
                    {path == "/Notes" ? <Notes /> : <Create />}
                </div>
            </div>
        </div>
    );
};

export default Layout;
