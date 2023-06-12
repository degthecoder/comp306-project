import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { getStarts } from "../../api/simple";


const PlayedInDirector = () => {
    const [stars, setStars] = useState([]);
    const [drct, setDrct] = useState("");
    const [open, setOpen] = useState(false);
    const handleStars = () => {
        console.log("response");
        console.log(drct)
        const data = { director: drct }
        if (drct.length > 0) {
            getStarts(data).then(response => {
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
                flexDirection: "column",
                backgroundColor: "#faf9d4",
                minWidth: "100vw",
            }} >
                <TextField label="Enter the director" value={drct} onChange={director} />
                <Button onClick={handleStars} variant="outlined">
                    Search Stars From Director
                </Button>

            </Box>
            <Dialog open={open} onClose={handleDialog} sx={{
                color: "#faf9d4",
            }}>
                <DialogTitle>Stars in movies directed by {drct}</DialogTitle>
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
                                {star.primaryName} in {star.primaryTitle}
                            </Typography>
                        </Box>
                    ))}
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default PlayedInDirector;