
import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { avgRating } from "../../api/simple";


const AverageRating = () => {
    const [stars, setStars] = useState([]);
    const [drct, setDrct] = useState("");
    const [open, setOpen] = useState(false);
    const handleStars = () => {
        console.log("response");
        console.log(drct)
        avgRating().then(response => {
            console.log(response)
            setStars(response.data)
        }).then(
            setOpen(true)
        );
    }

    const handleDialog = () => {
        setOpen(false);
        console.log(stars.length);
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                alignContent: "center",
                flexDirection: "column",
                backgroundColor: "#faf9d4",
                minWidth: "30vw",
                marginTop: 6,
            }} >
                <Button variant='contained' onClick={handleStars} sx={{
                    backgroundColor: "#152e12"
                }}>
                    Show Average Rating of Each Genre
                </Button>

            </Box>
            <Dialog open={open} onClose={handleDialog} sx={{
                color: "#faf9d4",
            }}>
                <DialogTitle>Average Rating of Each Genre</DialogTitle>
                <DialogContent>
                    {stars.map((star, index) => (
                        <Box sx={{
                            // display: "flex",
                            flexDirection: "row",
                            border: "1px solid",
                            borderRadius: 10,
                            padding: 2
                        }}>
                            <Typography key={index} variant="body1" sx={{

                            }}>
                                {star.genre}
                            </Typography>

                            <Typography key={index} variant="body1" sx={{

                            }}>
                                {star.averageRating}
                            </Typography>
                        </Box>
                    ))}
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default AverageRating;