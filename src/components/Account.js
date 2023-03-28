import React, { useState, useEffect } from "react";
import {
  Grid,
  // Button,
  Typography,
  // TextField
} from "@mui/material";
import {
  getAccount,
  // sendFunds
} from "./stellar";

export default function Account({ wallet }) {
  // for balance
  const [loading, setLoading] = useState(false);
  const [walletDetails, setWalletDetails] = useState(null);
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = await getAccount(wallet?.publicKey);
      if (data?.balances) {
        setWalletDetails(data);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [wallet]);

  // for send funds
  // const [destination, setDestination] = useState({
  //   publicKey: "",
  //   amount: 0,
  // });

  return (
    <React.Fragment>
      {loading ? (
        <Typography>Please Wait ...</Typography>
      ) : (
        <Grid sx={{ wordWrap: "break-word" }}>
          <Typography variant="h6">
            Your Balance: {walletDetails?.balances?.[0]?.balance} XLM
          </Typography>
          <Typography variant="h6">
            Wallet Address: {walletDetails?.account_id}
          </Typography>
          {/* <Typography variant="h6">
            Secret Address: {wallet?.secret}
          </Typography>
          <Typography variant="h6">Send Funds</Typography>
            <Typography variant="h6">Public Key</Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{ bgcolor: "#d4d1cb" }}
              onChange={(e) =>
                setDestination({
                  ...destination,
                  publicKey: e.target.value,
                })
              }
            />
            <Typography variant="h6">Amount</Typography>
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              sx={{ bgcolor: "#d4d1cb" }}
              onChange={(e) =>
                setDestination({
                  ...destination,
                  amount: e.target.value,
                })
              }
            />
            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ my: 1 }}
              onClick={async (e) => {
                e.preventDefault();
                setLoading(true);
                const sending = await sendFunds(
                  destination?.publicKey,
                  wallet?.secretKey,
                  destination?.amount
                );
                // unless an error, transactions always take few seconds / minutes to be completely done
                setLoading(false);
                console.log(sending);
              }}
            >
              Send Payments
            </Button> */}
        </Grid>
      )}
    </React.Fragment>
  );
}
