import React, { useState } from "react";
import PlayedInDirector from "./PlayedInDirector";
import Navbar from "../../Layouts/Navbar";
import PlayedInBoth from "./PlayedInBoth";
import { Box, Typography } from "@mui/material";


const queries = () => {

    return (
        <Box sx={{
            paddingTop: '80px',
            display: 'flex',
            alignContent: "center",
            flexDirection: "column",
            backgroundColor: "#faf9d4",
            minHeight: "100vh",
            minWidth: "100vw",
        }}>
            <Navbar />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    justifyContent: "space-between"
                }}
            >
                <PlayedInDirector />
                <PlayedInBoth />
            </Box>
        </Box>
    )
};

export default queries;