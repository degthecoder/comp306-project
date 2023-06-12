import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { higherThanAverage, oneMovieBetween } from "../../api/simple";


const OneMovieBetween = () => {
    const [stars, setStars] = useState([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const [open, setOpen] = useState(false);
    const handleStars = () => {
        const data = { start: start, end: end }
        if (end.length > 0) {
            oneMovieBetween(data).then(response => {
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


    const end2 = (event) => {
        setEnd(event.target.value);
    }

    const start2 = (event) => {
        setStart(event.target.value);
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                alignContent: "center",
                flexDirection: "column",
                backgroundColor: "#faf9d4",
                minWidth: "100vw",
                marginTop: 6,
            }} >
                <Box sx={{
                    display: 'flex',
                    flexDirection: "row",
                    // justifyContent: "space-evenly",
                    minWidth: "100vw",
                }}>
                    <TextField sx={{ width: "50vw" }} label="Start Year" value={start} onChange={start2} />
                    <TextField sx={{ width: "50vw" }} label="End Year" value={end} onChange={end2} />
                </Box>
                <Button onClick={handleStars} sx={{
                }}>
                    Enter Dates
                </Button>
            </Box>
            <Dialog open={open} onClose={handleDialog} sx={{
                color: "#faf9d4",
            }}>
                <DialogTitle>Between {start} and {end} </DialogTitle>
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
                                {star.primaryName}
                            </Typography>
                        </Box>
                    ))}
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default OneMovieBetween;