
import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { allMoviesDirectedBy, genreCount, higherThanAverage } from "../../api/simple";


const AllMoviesDirectedBy = () => {
    const [stars, setStars] = useState([]);
    const [drct, setDrct] = useState("");
    const [open, setOpen] = useState(false);
    const handleStars = () => {
        console.log("response");
        console.log(drct)
        const data = { director: drct }
        if (drct.length > 0) {
            allMoviesDirectedBy(data).then(response => {
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
                <TextField label="Director Name" value={drct} onChange={director} />
                <Button variant='contained' onClick={handleStars}>
                    All Movies Directed By
                </Button>

            </Box>
            <Dialog open={open} onClose={handleDialog} sx={{
                color: "#faf9d4",
            }}>
                <DialogTitle>All Movies Directed By {drct}</DialogTitle>
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
                                fontSize: 16
                            }}>
                                {star.primaryTitle}

                            </Typography>
                            <Typography>
                                {star.startYear}
                            </Typography>
                        </Box>
                    ))}
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default AllMoviesDirectedBy;