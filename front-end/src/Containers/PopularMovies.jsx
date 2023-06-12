import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../Layouts/Navbar";
import { getMostVoted } from "../api/simple";


const PopularMovies = () => {
    const [stars, setStars] = useState([]);


    useEffect(() => {
        if (stars.length == 0) {
            console.log(stars.length)
            getMostVoted().then(response => {
                setStars(response.data);
            }).then(console.log("Here are the ", stars))
        }
    }, [stars]);


    const renderStars = () => {
            return (
                stars.map((star, index) => (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        border: "1px solid",
                        borderRadius: 10,
                        padding: 2
                    }}>
                        <Typography key={index} variant="body1" sx={{

                        }}>
                            {star.primaryTitle}
                        </Typography>
                    </Box>
                ))
            )
    };

    return (
        <div>
            <Navbar />
            <Box sx={{
                padding: 2,
                paddingTop: '64px',
                display: 'flex',
                flexDirection: "column",
                alignContent: "center",
                backgroundColor: "#faf9d4",
                minHeight: "100vh",
                minWidth: "100vw",
            }}>
                <Typography variant="h1" sx={{
                    fontSize: 40,
                    padding:2,
                }}>
                    Most Popular Movies
                </Typography>
                {
                    stars.map((star, index) => (
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            border: "1px solid",
                            borderRadius: 3,
                            padding: 2
                        }}>
                            <Typography key={index} variant="body1" sx={{
    
                            }}>
                                {star.primaryTitle}
                            </Typography>
                        </Box>
                    ))
                }
            </Box>
        </div>
    )
};

export default PopularMovies;