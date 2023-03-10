import React from "react";
import {
  Box,
  Grid,
  ImageListItem,
  Button,
  Stack,
  Modal,
  Typography,
  TextField,
} from "@mui/material";

function SecondModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} variant="outlined">
        Change image
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Change image
            </Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="row"
            >
              <Grid
                container
                item
                display="flex"
                justifyContent="center"
                direction="column"
                sx={{ px: 5 }}
                xs={6}
              >
                <TextField
                  id="outlined-basic"
                  label="Browse"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Public Key"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Private Key"
                  variant="outlined"
                />
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" disabled>
                    Change Image
                  </Button>
                </Stack>
              </Grid>
              <Grid item display="flex" justifyContent="center" xs={6}>
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    border: "5px solid #000",
                    boxShadow: 24,
                  }}
                >
                  <ImageListItem>
                    <img src="photo_1_2023-02-01_01-40-10.png" alt="nft" />
                  </ImageListItem>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <Box sx={{ width: 500, height: 450, border: "2px solid #000" }}>
        <ImageListItem>
          <img src="photo_1_2023-02-01_01-40-10.png" alt="nft" />
        </ImageListItem>
      </Box>
      <Stack direction="row" spacing={2}>
        <Button onClick={handleOpen} variant="outlined">
          Buy NFT
        </Button>
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
              width: 800,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Grid>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Buy NFT
              </Typography>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="row"
              >
                <Grid
                  container
                  item
                  display="flex"
                  justifyContent="center"
                  direction="column"
                  sx={{ px: 5 }}
                  xs={6}
                >
                  <TextField
                    id="outlined-basic"
                    label="Public Key"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Private Key"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    label="XDR"
                    variant="outlined"
                  />
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" disabled>
                      Place Bid
                    </Button>
                    <Button variant="outlined" disabled>
                      Sell NFT
                    </Button>
                  </Stack>
                </Grid>
                <Grid item display="flex" justifyContent="center" xs={6}>
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      border: "5px solid #000",
                      boxShadow: 24,
                    }}
                  >
                    <ImageListItem>
                      <img src="photo_1_2023-02-01_01-40-10.png" alt="nft" />
                    </ImageListItem>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <SecondModal />
        <Button variant="outlined" disabled>
          Finance NFT buyer
        </Button>
      </Stack>
    </Grid>
  );
}
