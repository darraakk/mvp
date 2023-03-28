import React, { useState } from "react";
import {
  Box,
  Grid,
  Modal,
  Stack,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { createTrustline, buyOffer } from "./stellar";

export default function BuyBtn(wallet) {
  // for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [buyer, setBuyer] = useState({
    publicKey: "",
    price: 0,
  });

  // for bid
  const [bid, setBid] = useState();
  const [list, setList] = useState([]);
  const handleChange = (event) => {
    setBid(event.target.value);
    setBuyer({
      ...buyer,
      price: event.target.value,
    });
  };

  // for buy offer
  const handleClick = async () => {
    setList(list.concat({ bid: bid }));
    await createTrustline(
      wallet?.secretKey,
      buyer?.price
    );
    await buyOffer(
      wallet?.secretKey,
      buyer?.price
    );
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} variant="contained" sx={{ width: 200 }}>
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
            minWidth: 400,
            maxWidth: 1200,
            height: 450,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: 2,
            p: 4,
          }}
        >
          <Grid>
            <Typography id="modal-modal-title" variant="h4">
              Buy NFT
            </Typography>
            <Grid
              container
              fullWidth
              display="flex"
              justifyContent="center"
              alignItems="center"
              direction="row"
              wrap="nowrap"
            >
              <Grid
                container
                display="flex"
                justifyContent="center"
                direction="column"
                sx={{ marginRight: 1 }}
              >
                <Grid
                  fullWidth
                  sx={{ display: "flex", alignItems: "center", m: 1 }}
                >
                  <Grid item xs={3}>
                    <Typography variant="h6">Public Key</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField fullWidth variant="outlined" />
                  </Grid>
                </Grid>
                <Grid
                  fullWidth
                  sx={{ display: "flex", alignItems: "center", m: 1 }}
                >
                  <Grid item xs={3}>
                    <Typography variant="h6">Price</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      type="number"
                      variant="outlined"
                      onChange={handleChange}
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 12))
                      }
                    />
                  </Grid>
                </Grid>
                <Grid
                  fullWidth
                  sx={{ display: "flex", alignItems: "center", m: 1 }}
                >
                  <Grid item xs={3}>
                    <Typography variant="h6">Private Key</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <form>
                      <TextField
                        fullWidth
                        type="password"
                        autoComplete="none"
                        variant="outlined"
                      />
                    </form>
                  </Grid>
                </Grid>
                <Grid
                  fullWidth
                  sx={{ display: "flex", alignItems: "center", m: 1 }}
                >
                  <Grid item xs={3}>
                    <Typography variant="h6">XDR</Typography>
                  </Grid>
                  <Grid item xs={9}>
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
                    <Button fullWidth variant="contained" onClick={handleClick}>
                      Place Bid
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button fullWidth variant="contained">
                      Sell NFT
                    </Button>
                  </Grid>
                </Stack>
              </Grid>
              {bid && (
                <>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ bgcolor: "black" }}
                  />
                  <Grid
                    container
                    display="flex"
                    justifyContent="center"
                    sx={{
                      width: 600,
                      maxHeight: 350,
                      overflowY: "scroll",
                      marginLeft: 1,
                    }}
                  >
                    {list.map((item) => (
                      <Grid
                        container
                        fullWidth
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        direction="column"
                        wrap="nowrap"
                        sx={{ wordWrap: "break-word" }}
                      >
                        <Typography
                          fullWidth
                          sx={{ border: "1px solid #000", m: 1, p: 1 }}
                        >
                          Bid 1 Price {item.bid} User: 1
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
