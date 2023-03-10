import React from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Button,
  Stack,
  Modal,
  Typography,
  TextField,
} from '@mui/material';

export default function BuyBtn() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
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
                <TextField
                  id="outlined-basic"
                  label="XDR"
                  variant="outlined"
                  sx={{margin: 1}}
                />
                <Stack direction="row" spacing={5} sx={{margin: 1}}>
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
                    width: 800,
                    height: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    padding: 2,
                  }}
                >
                  <TextField fullWidth id="outlined-basic" label="" variant="outlined" sx={{margin: 1}}/>
                  <TextField fullWidth id="outlined-basic" label="" variant="outlined" sx={{margin: 1}}/>
                  <TextField fullWidth id="outlined-basic" label="" variant="outlined" sx={{margin: 1}}/>
                  <TextField fullWidth id="outlined-basic" label="" variant="outlined" sx={{margin: 1}}/>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
