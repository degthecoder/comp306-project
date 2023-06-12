import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { postPlayedInBoth } from "../../api/simple";


const PlayedInBoth = () => {
    const [stars, setStars] = useState([]);
    const [drct, setDrct] = useState("");
    const [drct2, setDrct2] = useState("");
    const [open, setOpen] = useState(false);

    const handleStars = () => {
        console.log("response");
        console.log(drct)
        console.log(drct2)
        const data = { director1: drct, director2: drct2 }
        if (drct.length > 0) {
            postPlayedInBoth(data).then(response => {
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
    const director2 = (event) => {
        setDrct2(event.target.value);
    }

    return (
        <div>
            <Box sx={{
                paddingTop: 10,
                display: 'flex',
                alignContent: "center",
                flexDirection: "column",
                minWidth: "100vw",
            }} >
                <Box sx={{
                    display: 'flex',
                    flexDirection: "row",
                    // justifyContent: "space-evenly",
                    minWidth: "100vw",
                }}>
                    <TextField sx={{width: "50vw"}} label="Enter first director" value={drct} onChange={director} />
                    <TextField sx={{width: "50vw"}} label="Enter second director" value={drct2} onChange={director2} />
                </Box>
                <Button variant="contained" onClick={handleStars} sx={{
                    backgroundColor: "#152e12"
                }}>
                    Search Stars From Directors
                </Button>

            </Box>
            <Dialog open={open} onClose={handleDialog} sx={{
                color: "#faf9d4",
            }}>
                <DialogTitle>Stars in movies directed by {drct} and {drct2}</DialogTitle>
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

export default PlayedInBoth;