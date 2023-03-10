import React from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  ImageListItem,
  Button,
  Stack,
  Modal,
  Typography,
  TextField,
} from '@mui/material';

export default function ImageBtn() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
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
                    sx={{margin: 1}}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Public Key"
                    variant="outlined"
                    sx={{margin: 1}}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    sx={{margin: 1}}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Private Key"
                    variant="outlined"
                    sx={{margin: 1}}
                  />
                  <Stack direction="row" spacing={2} sx={{margin: 1}}>
                    <Button variant="outlined" disabled>
                      Change Image
                    </Button>
                  </Stack>
                </Grid>
                <Grid item display="flex" justifyContent="center" xs={6}>
                  <Box
                    sx={{
                      width: 800,
                      height: 400,
                      bgcolor: "background.paper",
                      border: "2px solid #000",
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
  