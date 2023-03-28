import React, { useState, useCallback } from "react";
import {
  Box,
  Grid,
  Stack,
  Button,
  // Popover,
  Typography,
  ImageListItem,
} from "@mui/material";
// import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import BuyBtn from "./BuyBtn";
import ImageBtn from "./ImageBtn";
import AccountForm from "./AccountForm";

export default function Home() {
  // fow show image
  const [show, setShow] = useState();
  const wrapperSetShow = useCallback(val => {
    setShow(val);
  }, [setShow]);

  return (
    <React.Fragment>
      <Grid
        sx={{
          position: "fixed",
          top: "25px",
          right: "25px",
        }}
      >
        <AccountForm />
      </Grid>
      <Grid
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: "fixed",
          top: "25px",
          flexWrap: "wrap",
          bgcolor: "#d4d1cb",
          borderRadius: 2,
          padding: 1,
        }}
      >
        <Typography id="modal-modal-title" variant="h4" sx={{ color: "black" }}>
          Home Page
        </Typography>
      </Grid>
      {/* <PopupState variant="popover" popupId="demo-popup-popover"> */}
        {/* {(popupState) => ( */}
          <Grid
            container
            display="flex"
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              flexWrap: "wrap",
              margin: 2,
            }}
          >
            <Box
              sx={{
                bgcolor: "background.paper",
                border: "2px solid #000",
                borderRadius: 2,
              }}
            >
              <ImageListItem
                sx={{ width: "500px", height: "500px" }}
                // {...bindTrigger(popupState)}
              >
                <img src={show} alt="NFT" />
              </ImageListItem>
              {/* <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                sx={{ mt: 1 }}
              > */}
                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  spacing={1}
                  sx={{ padding: 1 }}
                >
                  <Grid item xs={4}>
                    <BuyBtn />
                  </Grid>
                  <Grid item xs={4}>
                    <ImageBtn 
                      parentState={show}
                      parentStateSetter={wrapperSetShow}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="outlined" disabled fullWidth>
                      Finance NFT buyer
                    </Button>
                  </Grid>
                </Stack>
              {/* </Popover> */}
            </Box>
          </Grid>
        {/* )} */}
      {/* </PopupState> */}
    </React.Fragment>
  );
}
