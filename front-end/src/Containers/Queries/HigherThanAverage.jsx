
import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { higherThanAverage } from "../../api/simple";


const HigherThanAverage = () => {
    const [stars, setStars] = useState([]);
    const [drct, setDrct] = useState("");
    const [open, setOpen] = useState(false);
    const handleStars = () => {
        console.log("response");
        console.log(drct)
        const data = { director: drct }
        if (drct.length > 0) {
            higherThanAverage(data).then(response => {
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
                marginTop: 6,
            }} >
                <TextField label="Enter Director Name" value={drct} onChange={director} />
                <Button onClick={handleStars} variant="contained" sx={{
                    backgroundColor: "#152e12"
                }}>
                    Higher Than Average
                </Button>

            </Box>
            <Dialog open={open} onClose={handleDialog} sx={{
                color: "#faf9d4",
            }}>
                <DialogTitle>Stars played in movies which rated higher than average of the director {drct}</DialogTitle>
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

export default HigherThanAverage;