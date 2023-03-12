import React from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Button,
  Stack,
  Modal,
  Typography,
  TextField,
} from "@mui/material";

export default function BuyBtn() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button onClick={handleOpen} variant="contained" sx={{ width: 200 }}>Buy NFT</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1200,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: 2,
            p: 4,
          }}
        >
          <Grid>
            <Typography id="modal-modal-title" variant="h4">Buy NFT</Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="row"
            >
              <Grid
                container
                display="flex"
                justifyContent="center"
                direction="column"
                sx={{ px: 5 }}
                xs={6}
              >
                <Grid
                  fullWidth
                  sx={{ display: "flex", alignItems: "center", m: 1 }}
                >
                  <Grid xs={3}>
                    <Typography variant="h6">Public Key</Typography>
                  </Grid>
                  <Grid xs={9}>
                    <TextField fullWidth variant="outlined" />
                  </Grid>
                </Grid>
                <Grid
                  fullWidth
                  sx={{ display: "flex", alignItems: "center", m: 1 }}
                >
                  <Grid xs={3}>
                    <Typography variant="h6">Price</Typography>
                  </Grid>
                  <Grid xs={9}>
                    <TextField fullWidth variant="outlined" />
                  </Grid>
                </Grid>
                <Grid
                  fullWidth
                  sx={{ display: "flex", alignItems: "center", m: 1 }}
                >
                  <Grid xs={3}>
                    <Typography variant="h6">Private Key</Typography>
                  </Grid>
                  <Grid xs={9}>
                    <TextField fullWidth variant="outlined" />
                  </Grid>
                </Grid>
                <Grid
                  fullWidth
                  sx={{ display: "flex", alignItems: "center", m: 1 }}
                >
                  <Grid xs={3}>
                    <Typography variant="h6">XDR</Typography>
                  </Grid>
                  <Grid xs={9}>
                    <TextField fullWidth variant="outlined" />
                  </Grid>
                </Grid>
                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  spacing={1}
                  sx={{ margin: 1 }}
                >
                  <Grid item xs={6}>
                    <Button fullWidth variant="contained">Place Bid</Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button fullWidth variant="contained">Sell NFT</Button>
                  </Grid>
                </Stack>
              </Grid>
              <Grid item display="flex" justifyContent="center" xs={6}>
                <Box
                  sx={{
                    width: 800,
                    height: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    borderRadius: 2,
                    padding: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    variant="outlined"
                    sx={{ margin: 1 }}
                  />
                  <TextField
                    fullWidth
                    disabled
                    variant="outlined"
                    sx={{ margin: 1 }}
                  />
                  <TextField
                    fullWidth
                    disabled
                    variant="outlined"
                    sx={{ margin: 1 }}
                  />
                  <TextField
                    fullWidth
                    disabled
                    variant="outlined"
                    sx={{ margin: 1 }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
