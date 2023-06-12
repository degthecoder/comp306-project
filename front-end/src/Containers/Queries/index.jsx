import React, { useState } from "react";
import PlayedInDirector from "./PlayedInDirector";
import Navbar from "../../Layouts/Navbar";
import PlayedInBoth from "./PlayedInBoth";
import { Box, Typography } from "@mui/material";
import ActedInAtLeast from "./actedInAtLeast";
import HigherThanAverage from "./HigherThanAverage";
import DirectorsWithLowerRating from "./DirectorsWithLowerRating";
import OneMovieBetween from "./OneMovieBetween";
import GenreCount from "./GenreCount";
import AllMoviesDirectedBy from "./AllMoviesDirectedBy";
import DirectedAllGenres from "./DirectedAllGenres";
import AverageRating from "./AverageRating";
import AllMoviesOfAStar from "./AllMoviesOfAStar";
import GetCastOfTheMovie from "./GetCastOfTheMovie";
import AllMoviesReleasedIn from "./AllMoviesReleasedIn";


const Directors = () => {

    return (
        <Box sx={{
            paddingTop: '80px',
            display: 'flex',
            alignContent: "center",
            flexDirection: "column",
            backgroundColor: "#faf9d4",
            minHeight: "100vh",
            minWidth: "100vw",
        }}>
            <Navbar />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    justifyContent: "space-between"
                }}
            >
                <PlayedInDirector />
                <PlayedInBoth />
                <ActedInAtLeast />
                <HigherThanAverage />
                <DirectorsWithLowerRating />
                <OneMovieBetween />
                <GenreCount />
                <AllMoviesOfAStar />
                <GetCastOfTheMovie />
                <AllMoviesReleasedIn />
                <AllMoviesDirectedBy />
                <DirectedAllGenres />
                <AverageRating />
            </Box>
        </Box>
    )
};

export default Directors;