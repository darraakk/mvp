import React from "react";
import axios from "axios";
import {
  Box,
  Grid,
  ImageListItem,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import BuyBtn from "./BuyBtn";
import ImageBtn from "./ImageBtn";

export default function Home() {
  return (
    <Grid
      display="flex"
      direction="column"
      alignItems="center"
      sx={{ flexWrap: "wrap", bgcolor: "#d4d1cb" }}
    >
      <Typography id="modal-modal-title" variant="h2">Home Page</Typography>
      <Box
        sx={{
          width: "600px",
          height: "500px",
          bgcolor: "background.paper",
          border: "2px solid #000",
          borderRadius: 2,
          margin: 2,
        }}
      >
        <ImageListItem>
          <img src="photo_1_2023-02-01_01-40-10.png" alt="nft" />
        </ImageListItem>
      </Box>
      <Stack direction="row" justifyContent="space-evenly" spacing={1}>
        <Grid xs={4}>
          <BuyBtn />
        </Grid>
        <Grid xs={4}>
          <ImageBtn />
        </Grid>
        <Grid xs={4}>
          <Button variant="outlined" disabled fullWidth>
            Finance NFT buyer
          </Button>
        </Grid>
      </Stack>
    </Grid>
  );
}
