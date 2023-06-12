import React from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../Layouts/Navbar";


const HomePage = (data) => {



    return (
        <div>
            <Navbar />
            <Box sx={{
                padding: 10,
                paddingTop: '64px',
                display: 'flex',
                flexDirection: "column",
                alignContent: "center",
                backgroundColor: "#faf9d4",
                minHeight: "100vh",
                maxWidth: "100vw",
                // justifyContent: "space-between"
            }}>

                <Box sx={{
                    display: "flex",
                    alignItems: 'center'
                }}>
                    <Typography
                        variant="h2"
                        sx={{
                            color: "#152e12"
                        }}
                    >
                        Welcome to Movie Search Trivia
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginTop: 10,
                        padding: 2,
                        borderRadius: 2,
                        backgroundColor: "#152e12"
                    }}
                >
                    <Typography sx={{
                        color: "#faf9d4"
                    }}>
                        Authors:
                    </Typography>
                    <Typography sx={{
                        color: "#faf9d4"
                    }}>
                        Duha Emir Ganioğlu
                    </Typography>

                    <Typography sx={{
                        color: "#faf9d4"
                    }}>
                        Yeşim Hızır
                    </Typography>

                    <Typography sx={{
                        color: "#faf9d4"
                    }}>
                        Bora Köken
                    </Typography>


                    <Typography sx={{
                        color: "#faf9d4"
                    }}>
                        Mert Balçık
                    </Typography>
                    <Typography sx={{
                        color: "#faf9d4"
                    }}>
                        Tuna Önal
                    </Typography>

                    <Typography sx={{
                        color: "#faf9d4"
                    }}>
                        Zindan Kurt
                    </Typography>

                </Box>
            </Box>
        </div>
    )
};

export default HomePage;