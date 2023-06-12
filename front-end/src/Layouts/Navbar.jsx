import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();

    const handlePopularMovies = () => {
        navigate("/popularMovies");
    };

    const handleQueries = () => {
        navigate("/queries");
    };

    const handleHomePage = () => {
        navigate("/");
    };

    const handleGenres = () => {
        navigate("/genres");
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
                <Box sx={{ backgroundColor: "" }} onClick={handleHomePage}>
                    <Typography sx={{
                        color: "#faf9d4 ",
                        fontSize: 20,
                        fontFamily: "-apple-system",
                        userSelect: "none"
                    }}>
                        HomePage
                    </Typography>
                </Box>
                <Box sx={{ backgroundColor: "" }} onClick={handleQueries}>
                    <Typography sx={{
                        color: "#faf9d4 ",
                        fontSize: 20,
                        fontFamily: "-apple-system",
                        userSelect: "none"
                    }}>
                        Filter By Director
                    </Typography>
                </Box>
                <Box sx={{ backgroundColor: "" }} onClick={handlePopularMovies}>
                    <Typography sx={{
                        color: "#faf9d4 ",
                        fontSize: 20,
                        fontFamily: "-apple-system",
                        userSelect: "none"
                    }}>
                        Popular Movies
                    </Typography>
                </Box>
                <Box sx={{ backgroundColor: "" }} onClick={handleGenres}>
                    <Typography sx={{
                        color: "#faf9d4 ",
                        fontSize: 20,
                        fontFamily: "-apple-system",
                        userSelect: "none"
                    }}>
                        Genres
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );

}

export default Navbar;
