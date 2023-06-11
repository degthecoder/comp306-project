import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/stars");

    };

    return (
        <AppBar sx={{
            backgroundColor: "#152e12"
        }}>
            <Toolbar sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: "100px",
                marginLeft: "100px",
            }}>
                <Box sx={{ backgroundColor: "" }} onClick={handleClick}>
                    <Typography sx={{
                        color: "#faf9d4 ",
                        fontSize: 20,
                        fontFamily: "-apple-system",
                        userSelect: "none"
                    }}>
                        Search
                    </Typography>
                </Box>
                <Box sx={{ backgroundColor: "" }} onClick={handleClick}>
                    <Typography sx={{ color: "#faf9d4 ", fontSize: 20, fontFamily: "-apple-system", userSelect: "none" }}>
                        Movies
                    </Typography>
                </Box>
                <Box sx={{ backgroundColor: "" }} onClick={handleClick}>
                    <Typography sx={{ color: "#faf9d4 ", fontSize: 20, fontFamily: "-apple-system", userSelect: "none" }}>
                        Filter
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );

}

export default Navbar;
