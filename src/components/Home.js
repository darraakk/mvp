import React from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  ImageListItem,
  Button,
  Stack,
} from '@mui/material';
import BuyBtn from './BuyBtn';
import ImageBtn from './ImageBtn';

export default function Home() {
  return (
    <Grid
      container
      item
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ flexWrap: "wrap" }}
    >
      <Box sx={{ width: 500, height: 500, border: "2px solid #000", margin: 2 }}>
        <ImageListItem>
          <img src="photo_1_2023-02-01_01-40-10.png" alt="nft" />
        </ImageListItem>
      </Box>
      <Stack direction="row" spacing={2} >
        <BuyBtn />
        <ImageBtn />
        <Button variant="outlined" disabled>
          Finance NFT buyer
        </Button>
      </Stack>
    </Grid>
  );
}
