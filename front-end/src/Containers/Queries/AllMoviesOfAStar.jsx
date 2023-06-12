
import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { allMoviesOfAStar } from "../../api/simple";


const AllMoviesOfAStar = () => {
    const [stars, setStars] = useState([]);
    const [drct, setDrct] = useState("");
    const [open, setOpen] = useState(false);
    const handleStars = () => {
        console.log("response");
        console.log(drct)
        const data = { star: drct }
        if (drct.length > 0) {
            allMoviesOfAStar(data).then(response => {
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
                <TextField label="Enter Star Name" value={drct} onChange={director} sx={{
                    minWidth: "60vw",
                    marginRight: 4
                }} />
                <Button onClick={handleStars} variant="contained" sx={{
                    backgroundColor: "#152e12",
                    minWidth: '30vw'
                }}>
                    All Movies of {drct}
                </Button>

            </Box>
            <Dialog open={open} onClose={handleDialog} sx={{
                color: "#faf9d4",
            }}>
                <DialogTitle>All movies of {drct}</DialogTitle>
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
                                fontSize: 20
                            }}>
                                {star.primaryTitle}
                            </Typography>

                            <Typography key={index} variant="body1" sx={{

                            }}>
                                {star.startYear}
                            </Typography>
                        </Box>
                    ))}
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default AllMoviesOfAStar;