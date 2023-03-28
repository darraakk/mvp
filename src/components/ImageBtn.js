import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Modal,
  Stack,
  Button,
  Divider,
  TextField,
  Typography,
  ImageListItem,
} from "@mui/material";
import FormData from "form-data";
import { getAccount, makePayment } from "./stellar";

export default function ImageBtn({ parentStateSetter, wallet }) {
  // for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // for image
  const imgRef = useRef();
  const [fileImg, setFileImg] = useState(null);
  const [preview, setPreview] = useState();
  const handleChange = (event) => {
    console.log(event.target.files);
    setFileImg(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };
  useEffect(() => {
    parentStateSetter(preview);
  }, [parentStateSetter, preview])

  // for payment
  useEffect(() => {
    const fetchDetails = async () => {
      await getAccount(wallet?.publicKey);
    };
    fetchDetails();
  }, [wallet]);

  const handlePeyent = async () => {
    await makePayment(wallet?.secretKey);
  };

  // for upload image to ipfs
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", fileImg);
    const metadata = JSON.stringify({
      name: "First NFT",
    });
    formData.append("pinataMetadata", metadata);
    const options = JSON.stringify({
      cidVersion: 0,
      wrapWithDirectory: false,
    });
    formData.append("pinataOptions", options);
    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            pinata_api_key: "a07829202cfffc03f899",
            pinata_secret_api_key:
              "dc284168a7009f288704a2b4598cd7a8a16fb292389b2f98778a6b3bafcbf2e5",
            // Authorization: JWT
            // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyOWRhNmJkYy02YmRjLTRkOTgtYjMzYS1kM2U5ODQ2ZjVmNzkiLCJlbWFpbCI6ImFyYWRiYXNzaXJhdDE4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhMDc4MjkyMDJjZmZmYzAzZjg5OSIsInNjb3BlZEtleVNlY3JldCI6ImRjMjg0MTY4YTcwMDlmMjg4NzA0YTJiNDU5OGNkN2E4YTE2ZmIyOTIzODliMmY5ODc3OGE2YjNiYWZjYmYyZTUiLCJpYXQiOjE2Nzk1NjU5NDh9.JYmyA6HP2LKcjn0Q9n5ZA5HilQbaeWzU2zh3Eny_aMU
          },
        }
      );
      console.log("Upload Successful!\n", response.data);
    } catch (error) {
      console.log(error.message, error);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} variant="contained" sx={{ width: 200 }}>
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
            minWidth: 400,
            maxWidth: 1200,
            maxHeight: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: 2,
            p: 4,
          }}
        >
          <Grid>
            <Typography id="modal-modal-title" variant="h4">
              Change Image
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
                <Grid sx={{ display: "flex", alignItems: "center", m: 1 }}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Browse</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      type="file"
                      variant="outlined"
                      ref={imgRef}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid sx={{ display: "flex", alignItems: "center", m: 1 }}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Public Key</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid sx={{ display: "flex", alignItems: "center", m: 1 }}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Price</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      type="number"
                      variant="outlined"
                      onInput={(event) =>
                        (event.target.value = event.target.value.slice(0, 12))
                      }
                    />
                  </Grid>
                </Grid>
                <Grid sx={{ display: "flex", alignItems: "center", m: 1 }}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Secret Key</Typography>
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
                <Stack direction="row" spacing={2} sx={{ margin: 1 }}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      handleUpload();
                      handlePeyent();
                    }}
                  >
                    Change Image
                  </Button>
                </Stack>
              </Grid>
              {preview && (
                <>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ bgcolor: "black" }}
                  />
                  <Grid
                    display="flex"
                    justifyContent="center"
                    sx={{ width: 600, maxHeight: 350, marginLeft: 1 }}
                  >
                    <ImageListItem>
                      <img src={preview} alt="NFT" />
                    </ImageListItem>
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
