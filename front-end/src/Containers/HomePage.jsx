import React from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../Layouts/Navbar";


const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Box sx={{
                paddingTop: '64px',
                display: 'flex',
                alignContent: "center",
                backgroundColor: "#faf9d4",
                minHeight: "100vh",
                minWidth: "100vw",
            }}>
                <Typography>
                    Hello
                </Typography>
            </Box>
        </div>
    )
};

export default HomePage;