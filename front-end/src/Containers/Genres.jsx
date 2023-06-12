import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import Navbar from "../Layouts/Navbar";
import { getAllGenres, getBestOfGenres } from "../api/simple";


const Genres = () => {
    const [genreList, setGenreList] = useState([]);
    const [bestOfGenre, setBestOfGenre] = useState([]);
    const [open, setOpen] = useState(false);
    const [genre, setGenre] = useState("");

    useEffect(() => {
        if (genreList.length == 0) {
            console.log(genreList.length)
            getAllGenres().then(response => {
                setGenreList(response.data);
            }).then(console.log("Here are the ", genreList))
        }
    }, [genreList]);


    const handleDialog = () => {
        setOpen(false);
        console.log(genreList.length);
    }

    const openGenre = (gen) => {
        setGenre(gen);
        const data = { genre: gen };
        console.log(genre);

        getBestOfGenres(data).then(response => {
            setBestOfGenre(response.data)
            console.log(response);
        }
        ).then(setOpen(true))
    }


    const renderStars = () => {
        return (
            genreList.map((star, index) => (
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
                    padding: 2,
                }}>
                    All genres
                </Typography>
                {
                    genreList.map((genr, index) => (
                        <Box key={index} sx={{
                            display: "flex",
                            flexDirection: "column",
                            border: "1px solid",
                            borderRadius: 3,
                            padding: 2
                        }}>
                            <Typography key={index} variant="body1" sx={{

                            }}>
                                {genr.genre}
                            </Typography>
                            <Button variant='contained' onClick={() => openGenre(genr.genre)}>
                                List Genre
                            </Button>
                        </Box>
                    ))
                }
            </Box>
            <Dialog open={open} onClose={handleDialog} sx={{
                color: "#faf9d4",
            }}>
                <DialogTitle>Best of {genre}</DialogTitle>
                <DialogContent>
                    {bestOfGenre.map((bofg, index) => (
                        <Box sx={{
                            // display: "flex",
                            flexDirection: "row",
                            border: "1px solid",
                            borderRadius: 10,
                            padding: 2
                        }}>
                            <Typography key={index} variant="body1" sx={{
                                fontSize:20
                            }}>
                                {bofg.primaryTitle}
                            </Typography>
                            <Typography key={index} variant="body1" sx={{

                            }}>
                                {bofg.averageRating}
                            </Typography>
                            <Typography key={index} variant="body1" sx={{

                            }}>
                                {bofg.startYear}
                            </Typography>
                        </Box>
                    ))}
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default Genres;