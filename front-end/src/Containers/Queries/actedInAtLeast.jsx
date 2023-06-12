import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { actedInAtLeast } from "../../api/simple";


const ActedInAtLeast = () => {
    const [stars, setStars] = useState([]);
    const [nmbr, setNmbr] = useState("");
    const [by, setBy] = useState("");
    const [open, setOpen] = useState(false);
    let counter = 0;

    const handleStars = () => {
        console.log("response");
        console.log(nmbr)
        const data = { birthYear: by, playnum: nmbr }
        if (nmbr.length > 0) {
            actedInAtLeast(data).then(response => {
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


    const numb = (event) => {
        setNmbr(event.target.value);
    }
    const biry = (event) => {
        setBy(event.target.value);
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                marginTop: 6,
                alignContent: "center",
                flexDirection: "column",
                backgroundColor: "#faf9d4",
                minWidth: "100vw",
            }} >
                <Box sx={{
                    display: 'flex',
                    flexDirection: "row",
                    // justifyContent: "space-evenly",
                    minWidth: "100vw",
                }}>
                    <TextField sx={{ width: "50vw" }} label="birthyear" value={by} onChange={biry} />
                    <TextField sx={{ width: "50vw" }} label="num" value={nmbr} onChange={numb} />
                </Box>
                <Button onClick={handleStars} sx={{
                }}>
                    Search Stars From Directors
                </Button>

            </Box>
            <Dialog open={open} onClose={handleDialog} sx={{
                color: "#faf9d4",
            }}>
                <DialogTitle>Born After {by}</DialogTitle>
                <DialogContent>
                    {stars.map((star, index) => {
                        if (counter < 30) {
                            console.log(counter);
                            counter++;
                            return (
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
                            )
                        }
                    }
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default ActedInAtLeast;