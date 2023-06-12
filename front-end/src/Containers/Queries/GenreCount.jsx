
import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { genreCount, higherThanAverage } from "../../api/simple";


const GenreCount = () => {
    const [stars, setStars] = useState([]);
    const [drct, setDrct] = useState("");
    const [open, setOpen] = useState(false);
    const handleStars = () => {
        console.log("response");
        console.log(drct)
        const data = { genreCount: drct }
        if (drct.length > 0) {
            genreCount(data).then(response => {
                console.log(response)
                setStars(response.data)
            }).then(
                setOpen(true)
            );
        }
    }

    const handleDialog = () => {
        setOpen(false);
        console.log(stars.length);
    }


    const director = (event) => {
        setDrct(event.target.value);
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                alignContent: "center",
                flexDirection: "row",
                backgroundColor: "#faf9d4",
                minWidth: "100vw",
                marginTop: 6,
            }} >
                <TextField label="Enter Minimum Rating" value={drct} onChange={director} sx={{
                    minWidth: "60vw",
                    marginRight: 4

                }} />
                <Button onClick={handleStars} variant="contained" sx={{
                    backgroundColor: "#152e12"
                    ,minWidth: "30vw", 
                }}>
                    Number of movies rated {drct}
                </Button>

            </Box>
            <Dialog open={open} onClose={handleDialog} sx={{
                color: "#faf9d4",
            }}>
                <DialogTitle>Movie count rated higher than {drct} in each genre </DialogTitle>
                <DialogContent>
                    {stars.map((star, index) => (
                        <Box key={index} sx={{
                            // display: "flex",
                            flexDirection: "row",
                            border: "1px solid",
                            borderRadius: 10,
                            padding: 2
                        }}>
                            <Typography variant="body1" sx={{

                            }}>
                                {star.genre}

                            </Typography>
                            <Typography>
                                {star.movieCount}
                            </Typography>
                        </Box>
                    ))}
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default GenreCount;