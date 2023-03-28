import React, {
  useState,
  // useEffect,
  // useCallback
} from "react";
// import axios from "axios";
import {
  Box,
  Grid,
  Modal,
  Button,
  Popover,
  // TextField,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  AccountBalanceWallet,
  // VerifiedUser,
} from "@mui/icons-material";
import { createWallet } from "./stellar";
import Account from "./Account";

export default function AccountForm() {
  // for account modal
  const [openAccount, setopenAccount] = useState(false);
  const handleOpenAccount = () => setopenAccount(true);
  const handleCloseAccount = () => setopenAccount(false);

  // for account popover
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const handlePopoverOpenAccount = (event) => {
    setAnchorElAccount(event.currentTarget);
  };
  const handlePopoverCloseAccount = () => {
    setAnchorElAccount(null);
  };
  const openPopverAccount = Boolean(anchorElAccount);

  // for balance modal
  const [openBalance, setopenBalance] = useState(false);
  const handleOpenBalance = () => setopenBalance(true);
  const handleCloseBalance = () => setopenBalance(false);

  // for balance popover
  const [anchorElBalance, setAnchorElBalance] = useState(null);
  const handlePopoverOpenBalance = (event) => {
    setAnchorElBalance(event.currentTarget);
  };
  const handlePopoverCloseBalance = () => {
    setAnchorElBalance(null);
  };
  const openPopverBalance = Boolean(anchorElBalance);

  // for balance
  const [wallet, setWallet] = useState({
    publicKey: "",
    secretKey: "",
  });

  // for Verified pinata modal
  // const [openVerified, setopenVerified] = useState(false);
  // const handleOpenVerified = () => setopenVerified(true);
  // const handleCloseVerified = () => setopenVerified(false);

  // for Verified pinata popover
  // const [anchorElVerified, setAnchorElVerified] = useState(null);
  // const handlePopoverOpenVerified = (event) => {
  //   setAnchorElVerified(event.currentTarget);
  // };
  // const handlePopoverCloseVerified = () => {
  //   setAnchorElVerified(null);
  // };
  // const openPopverVerified = Boolean(anchorElVerified);

  // for Verified pinata account
  // const [apiKey, setApiKey] = useState();
  // const handleChangeApiKey = (event) => {
  //   setApiKey(event.target.value);
  // };
  // const [secretApiKey, setSecretApiKey] = useState();
  // const handleChangeSecretApiKey = (event) => {
  //   setSecretApiKey(event.target.value);
  // };
  // const [submitting, setSubmitting] = useState();
  // const checkApiKey = useCallback(async () => {
  //   // const checkApi = async () => {
  //   // async function checkApi(){
  //   try {
  //     const response = await axios.get(
  //       "https://api.pinata.cloud/data/testAuthentication",
  //       {
  //         headers: {
  //           pinata_api_key: apiKey,
  //           pinata_secret_api_key: secretApiKey,
  //           // 'Authorization': 'Bearer PINATA_JWT'
  //         },
  //       }
  //     );
  //     console.log(response.data.message, response);
  //     // console.log(response.data);
  //     // console.log(response.data.message);
  //   } catch (error) {
  //     console.log(error.message, error);
  //   }
  //   // }
  // }, [apiKey, secretApiKey]);
  // useEffect(() => {
  //   if (submitting) { // is true initially, and again when button is clicked
  //     checkApiKey().then(() => setSubmitting(false))
  //   };
  // }, [submitting, checkApiKey]);

  return (
    <React.Fragment>
      <Grid>
        <AccountCircle
          onClick={handleOpenAccount}
          sx={{ fontSize: "50px" }}
          aria-owns={openPopverAccount ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpenAccount}
          onMouseLeave={handlePopoverCloseAccount}
        />
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={openPopverAccount}
          anchorEl={anchorElAccount}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverCloseAccount}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>Login</Typography>
        </Popover>
      </Grid>
      <Modal
        open={openAccount}
        onClose={handleCloseAccount}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: 2,
            p: 4,
          }}
        >
          <Grid container justifyContent="center" direction="column">
            <Typography id="modal-modal-title" variant="h4">
              Login
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ my: 1 }}
              onClick={async () => {
                const data = await createWallet();
                if (data?.source_account) {
                  setWallet({
                    ...wallet,
                    publicKey: data.source_account,
                    secretKey: data.secretKey,
                  });
                }
              }}
            >
              Create wallet
            </Button>
            {/* <Typography variant="h5">
              Or do you already have an account?
            </Typography>
            <Typography variant="h6">Public Key</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={wallet.publicKey}
              onChange={(e) =>
                setWallet({
                  ...wallet,
                  publicKey: e.target.value,
                })
              }
            />
            <Typography variant="h6">Private Key</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={wallet.secretKey}
              onChange={(e) =>
                setWallet({
                  ...wallet,
                  secretKey: e.target.value,
                })
              }
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ my: 1 }}
              onClick={async (e) => {
                e.preventDefault();
                if (wallet.privateKey && wallet.publicKey) {
                  if (Account?.balances) {
                    setWallet({
                      ...wallet,
                    });
                  }
                }
              }}
            >
              Submit
            </Button> */}
          </Grid>
        </Box>
      </Modal>
      <Grid>
        <AccountBalanceWallet
          onClick={handleOpenBalance}
          sx={{ fontSize: "50px" }}
          aria-owns={openPopverBalance ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpenBalance}
          onMouseLeave={handlePopoverCloseBalance}
        />
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={openPopverBalance}
          anchorEl={anchorElBalance}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverCloseBalance}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>Balance</Typography>
        </Popover>
      </Grid>
      <Modal
        open={openBalance}
        onClose={handleCloseBalance}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: 2,
            p: 4,
          }}
        >
          <Account wallet={wallet} />
        </Box>
      </Modal>
      {/* <Grid>
        <VerifiedUser
          onClick={handleOpenVerified}
          sx={{ fontSize: "50px" }}
          aria-owns={openPopverVerified ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpenVerified}
          onMouseLeave={handlePopoverCloseVerified}
        />
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={openPopverVerified}
          anchorEl={anchorElVerified}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverCloseVerified}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>Verified PINATA Account</Typography>
        </Popover>
      </Grid>
      <Modal
        open={openVerified}
        onClose={handleCloseVerified}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // width: 350,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: 2,
            p: 4,
          }}
        >
          <Grid container justifyContent="center" direction="column">
            <Typography id="modal-modal-title" variant="h4">
              Verified PINATA Account
            </Typography>
            <Typography variant="h6">API Key</Typography>
            <TextField
              fullWidth
              variant="outlined"
              onChange={handleChangeApiKey}
            />
            <Typography variant="h6">Private API Key</Typography>
            <TextField
              fullWidth
              variant="outlined"
              onChange={handleChangeSecretApiKey}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ my: 1 }}
              onClick={() => setSubmitting(true)}
            >
              Verified PINATA Account
            </Button>
          </Grid>
        </Box>
      </Modal> */}
    </React.Fragment>
  );
}
