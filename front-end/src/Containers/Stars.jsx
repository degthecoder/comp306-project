import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Navbar from "../Layouts/Navbar";
import { getStarts } from "../api/simple";


const Stars = () => {
    const [stars, setStars] = useState([]);
    const [drct, setDrct] = useState("");
    const handleStars = () => {
        console.log("response");
        console.log(drct)
        const data = {director: drct}
        if (drct.length > 0) {
            getStarts(data).then(response => {
                console.log(response)

                setStars(response.data);
            }
            );
        }
    }

    const director = (event) => {
        setDrct(event.target.value);
    }

    return (
        <div>
            <Navbar />
            <Box sx={{
                paddingTop: '80px',
                display: 'flex',
                alignContent: "center",
                flexDirection: "column",
                backgroundColor: "#faf9d4",
                minHeight: "100vh",
                minWidth: "100vw",
            }} >
                <TextField label="Enter the director" value={drct} onChange={director}/>
                <Button onClick={handleStars} sx={{
                }}>
                    Search Stars From Directors
                </Button>
                {stars.length > 0 ? stars.map((star, index) => (
                    <Box sx={{
                        display: "flex",
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
                )) : <> </>}


            </Box>
        </div>
    )
};

export default Stars;